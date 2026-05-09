from summer_dreams_ota.shared.errors.base import AbstractError


class TelegramError(AbstractError):
    """Base error for the telegram app."""

    pass


class TelegramMessageSendError(TelegramError):
    """Raised when a message fails to send to Telegram."""

    message = "Failed to send message to Telegram."
    code = "telegram_send_error"
