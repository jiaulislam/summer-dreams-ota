import uuid
from unittest.mock import patch

from rest_framework import status
from rest_framework.test import APITestCase

from django.urls import reverse

from summer_dreams_ota.telegram.models import ChatMessage, ChatSession


class TelegramIntegrationTests(APITestCase):
    def setUp(self):
        self.session_id = str(uuid.uuid4())
        self.send_url = reverse("telegram:send")
        self.messages_url = reverse("telegram:messages")
        self.webhook_url = reverse("telegram:webhook")

    @patch("summer_dreams_ota.telegram.services.requests.post")
    def test_send_lead_and_message(self, mock_post):
        mock_post.return_value.status_code = 200

        # Test Lead Capture
        payload = {
            "sessionId": self.session_id,
            "name": "Test User",
            "contact": "test@example.com",
            "type": "lead",
        }
        response = self.client.post(self.send_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ChatSession.objects.filter(session_id=self.session_id).exists())

        # Test User Message
        payload = {
            "sessionId": self.session_id,
            "name": "Test User",
            "contact": "test@example.com",
            "type": "message",
            "message": "Hello Bot",
        }
        response = self.client.post(self.send_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ChatMessage.objects.filter(session_id=self.session_id).count(), 1)
        self.assertEqual(ChatMessage.objects.first().message_text, "Hello Bot")

    def test_get_messages_not_found(self):
        url = f"{self.messages_url}?session_id={uuid.uuid4()}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch("summer_dreams_ota.telegram.services.requests.get")
    def test_webhook_agent_reply(self, _):
        # Create session first
        ChatSession.objects.create(session_id=self.session_id, name="Test", contact="test")

        # Simulate Webhook Agent Reply (Manual ID)
        payload = {
            "message": {
                "text": f"ID: {self.session_id} Hello from agent",
                "chat": {"id": 123},
                "date": 1600000000,
            }
        }
        response = self.client.post(self.webhook_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(ChatMessage.objects.filter(session_id=self.session_id, sender="agent").count(), 1)
        self.assertEqual(ChatMessage.objects.filter(sender="agent").first().message_text, "Hello from agent")

    def test_webhook_agent_reply_by_reply(self):
        # Create session first
        ChatSession.objects.create(session_id=self.session_id, name="Test", contact="test")

        # Simulate Webhook Agent Reply (by Reply feature)
        payload = {
            "message": {
                "text": "How can I help you?",
                "reply_to_message": {"text": f"ID: {self.session_id} User: hi"},
                "chat": {"id": 123},
                "date": 1600000000,
            }
        }
        response = self.client.post(self.webhook_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(ChatMessage.objects.filter(session_id=self.session_id, sender="agent").count(), 1)
        msg = ChatMessage.objects.filter(sender="agent").first()
        self.assertEqual(msg.message_text, "How can I help you?")
