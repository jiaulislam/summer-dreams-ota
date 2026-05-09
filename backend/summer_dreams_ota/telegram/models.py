import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from summer_dreams_ota.shared.models import BaseModel


class ChatSession(BaseModel):
    session_id: models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name: models.CharField = models.CharField(_("name"), max_length=255)
    contact: models.CharField = models.CharField(_("contact"), max_length=255)

    def __str__(self) -> str:
        return f"{self.name} ({self.session_id})"

    class Meta:
        verbose_name = _("Chat Session")
        verbose_name_plural = _("Chat Sessions")


class ChatMessage(BaseModel):
    class SenderChoices(models.TextChoices):
        USER = "user", _("User")
        AGENT = "agent", _("Agent")

    session: models.ForeignKey = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="messages", verbose_name=_("session")
    )
    message_text: models.TextField = models.TextField(_("message text"))
    sender: models.CharField = models.CharField(
        _("sender"), max_length=10, choices=SenderChoices.choices, default=SenderChoices.USER
    )

    def __str__(self) -> str:
        return f"{self.sender}: {self.message_text[:20]}"

    class Meta:
        verbose_name = _("Chat Message")
        verbose_name_plural = _("Chat Messages")
        ordering = ["created_at"]
