from summer_dreams_ota.shared.errors import AbstractError, ErrorBody, ErrorCodeEnum


class MarketingError(AbstractError):
    """Base class for all marketing-related service errors."""

    @property
    def error(self) -> ErrorCodeEnum:
        return ErrorCodeEnum.BAD_REQUEST

    def serialize_errors(self) -> list[ErrorBody]:
        return [{"message": self.message}]


class EmailSendError(MarketingError):
    """Raised when there is an error sending an email."""

    def __init__(self, message: str = "Failed to send contact inquiry email.") -> None:
        super().__init__(message)
