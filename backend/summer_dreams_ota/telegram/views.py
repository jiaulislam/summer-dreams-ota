from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from summer_dreams_ota.telegram.models import ChatMessage, ChatSession
from summer_dreams_ota.telegram.serializers import ChatMessageSerializer
from summer_dreams_ota.telegram.services import TelegramService


@method_decorator(csrf_exempt, name="dispatch")
class TelegramWebhookView(APIView):
    """
    Endpoint for Telegram Webhooks.
    Telegram will POST updates here.
    """

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        TelegramService.process_webhook_update(request.data)
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class TelegramSendMessageView(APIView):
    """
    Endpoint A: POST /api/v1/telegram/send/
    Handles lead capture and user messages.
    """

    def post(self, request: Request) -> Response:
        session_id = request.data.get("sessionId")
        if not session_id:
            return Response({"error": "sessionId is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Business logic handled by service
        TelegramService.handle_send_payload(request.data)
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)


class TelegramMessageListView(APIView):
    """
    Endpoint B: GET /api/v1/telegram/messages/?session_id=<uuid>
    Syncs agent messages and returns the message list.
    """

    def get(self, request: Request) -> Response:
        session_id = request.query_params.get("session_id")

        if not session_id:
            return Response({"error": "session_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure session exists before syncing or fetching
        if not ChatSession.objects.filter(session_id=session_id).exists():
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        # Sync agent messages from Telegram
        TelegramService.sync_agent_messages(session_id)

        # Fetch all messages for the session
        messages = ChatMessage.objects.filter(session_id=session_id).order_by("created_at")
        serializer = ChatMessageSerializer(messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
