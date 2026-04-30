from summer_dreams_ota.shared.errors.base import AbstractError, ErrorBody
from summer_dreams_ota.shared.errors.constants import ErrorCodeEnum, StrOrPromise


class ValidationError(AbstractError):
    """
    Custom error for generic validation failures.

    This error is raised when validation fails but doesn't fit into
    more specific validation error categories.
    """

    @property
    def error(self) -> ErrorCodeEnum:
        """Return the error code associated with this error."""
        return ErrorCodeEnum.BAD_REQUEST

    def __init__(self, message: StrOrPromise = "Validation failed.") -> None:
        """
        Initialize the validation error with a message.

        :param message: The validation error message. Defaults to "Validation failed."
        """
        super().__init__(message)

    def serialize_errors(self) -> list[ErrorBody]:
        """Serialize the validation error details."""
        error_body: ErrorBody = {
            "message": self.message,
        }
        return [error_body]
