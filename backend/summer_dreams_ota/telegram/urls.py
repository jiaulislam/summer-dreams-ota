from django.urls import path

from summer_dreams_ota.telegram.views import (
    TelegramMessageListView,
    TelegramSendMessageView,
    TelegramWebhookView,
)

app_name = "telegram"

urlpatterns = [
    path("send/", TelegramSendMessageView.as_view(), name="send"),
    path("messages/", TelegramMessageListView.as_view(), name="messages"),
    path("webhook/", TelegramWebhookView.as_view(), name="webhook"),
]
