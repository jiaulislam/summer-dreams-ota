import logging
import re
from typing import Any

import requests

from django.conf import settings
from django.db import transaction

from summer_dreams_ota.telegram.models import ChatMessage, ChatSession

logger = logging.getLogger(__name__)


class TelegramService:
    @staticmethod
    def send_telegram_message(text: str) -> bool:
        """
        Sends a message to the configured Telegram chat.
        """
        token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID

        if not token or not chat_id:
            logger.error("Telegram configuration missing (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)")
            return False

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown",
        }

        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return True
        except requests.RequestException:
            logger.exception("Failed to send message to Telegram")
            return False

    @staticmethod
    def handle_send_payload(data: dict[str, Any]) -> ChatMessage | None:
        """
        Processes the payload from the /send/ endpoint.
        """
        session_id = data.get("sessionId")
        name = data.get("name")
        contact = data.get("contact")
        msg_type = data.get("type")
        message_text = data.get("message")

        with transaction.atomic():
            session, created = ChatSession.objects.get_or_create(
                session_id=session_id,
                defaults={"name": name, "contact": contact},
            )

            if msg_type == "lead":
                text = (
                    f"🆕 *NEW LEAD CAPTURED*\n🆔 *Session ID:* {session_id}\n👤 *Name:* {name}\n📞 *Contact:* {contact}"
                )
                TelegramService.send_telegram_message(text)

            # Save the user message if present
            if message_text:
                chat_message = ChatMessage.objects.create(
                    session=session,
                    message_text=message_text,
                    sender=ChatMessage.SenderChoices.USER,
                )

                # Send formatted message to Telegram
                formatted_msg = f"[ID: {session_id}] {name}: {message_text}"
                TelegramService.send_telegram_message(formatted_msg)

                return chat_message

        return None

    @staticmethod
    def process_webhook_update(update_data: dict[str, Any]) -> None:
        """
        Processes an incoming webhook update from Telegram.
        """
        message = update_data.get("message")
        if not message:
            return

        text = message.get("text", "")
        reply_to = message.get("reply_to_message")

        # Pattern to find ID: uuid (with optional brackets)
        pattern = r"ID:\s*([a-f0-9\-]{36})"

        session_id = None
        # Check current message text (for manual ID prefix)
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            session_id = match.group(1)
            # Remove the ID prefix from the text to save a clean message
            text = re.sub(r"\[?ID:\s*[a-f0-9\-]{36}\]?", "", text, flags=re.IGNORECASE).strip()
        # Check the message being replied to
        elif reply_to:
            reply_text = reply_to.get("text", "")
            match = re.search(pattern, reply_text, re.IGNORECASE)
            if match:
                session_id = match.group(1)

        if session_id and text:
            try:
                # Ensure session exists to avoid IntegrityError
                if not ChatSession.objects.filter(session_id=session_id).exists():
                    logger.warning(f"Webhook message received for non-existent session: {session_id}")
                    return

                if not ChatMessage.objects.filter(
                    session_id=session_id,
                    message_text=text,
                    sender=ChatMessage.SenderChoices.AGENT,
                ).exists():
                    ChatMessage.objects.create(
                        session_id=session_id,
                        message_text=text,
                        sender=ChatMessage.SenderChoices.AGENT,
                    )
            except Exception:
                logger.exception(f"Error saving webhook message for session {session_id}")

    @staticmethod
    def sync_agent_messages(session_id: str) -> None:
        """
        Syncs agent messages from Telegram for a specific session.
        """
        # Ensure the session exists to avoid IntegrityError
        if not ChatSession.objects.filter(session_id=session_id).exists():
            logger.warning(f"Attempted to sync messages for non-existent session: {session_id}")
            return

        token = settings.TELEGRAM_BOT_TOKEN
        if not token:
            return

        url = f"https://api.telegram.org/bot{token}/getUpdates"

        try:
            response = requests.get(url, timeout=10)

            # Handle 409 Conflict: happens if a webhook is active.
            if response.status_code == 409:
                return

            response.raise_for_status()
            updates = response.json().get("result", [])

            for update in updates:
                message = update.get("message")
                if not message:
                    continue

                text = message.get("text", "")
                reply_to = message.get("reply_to_message")

                # Try to find the session ID
                target_session_id = None

                # Check if current message contains the ID
                if session_id in text:
                    target_session_id = session_id
                    clean_text = re.sub(r"\[?ID:\s*" + session_id + r"\]?", "", text, flags=re.IGNORECASE).strip()
                # Check if replying to a message containing the ID
                elif reply_to and session_id in reply_to.get("text", ""):
                    target_session_id = session_id
                    clean_text = text.strip()

                if target_session_id and clean_text:
                    if not ChatMessage.objects.filter(
                        session_id=target_session_id,
                        message_text=clean_text,
                        sender=ChatMessage.SenderChoices.AGENT,
                    ).exists():
                        ChatMessage.objects.create(
                            session_id=target_session_id,
                            message_text=clean_text,
                            sender=ChatMessage.SenderChoices.AGENT,
                        )
        except requests.RequestException:
            logger.exception("Failed to fetch updates from Telegram")
