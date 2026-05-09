from rest_framework import serializers

from summer_dreams_ota.telegram.models import ChatMessage, ChatSession


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["message_text", "sender", "created_at"]
        read_only_fields = ["created_at"]


class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ["session_id", "name", "contact"]
        read_only_fields = ["session_id"]
