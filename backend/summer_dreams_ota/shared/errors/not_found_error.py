from .base import AbstractError, ErrorBody
from .constants import ErrorCodeEnum, StrOrPromise


class NotFoundError(AbstractError):
    """
    Custom error for resource not found scenarios.

    This error is raised when a requested resource cannot be found,
    providing a structured 404 response.
    """

    @property
    def error(self) -> ErrorCodeEnum:
        """Return the error code associated with this error."""
        return ErrorCodeEnum.NOT_FOUND

    def __init__(self, resource_type: str, identifier: str | None = None, message: StrOrPromise = "") -> None:
        """
        Initialize the resource not found error.

        :param resource_type: The type of resource that was not found (e.g., "User", "Product", "Order")
        :param identifier: The identifier used to search for the resource (e.g., ID, email, slug)
        :param message: Custom error message. If not provided, a default message will be generated.
        """
        self.resource_type = resource_type
        self.identifier = identifier

        if message is None:
            if identifier:
                message = f"{resource_type} with identifier '{identifier}' not found."
            else:
                message = f"{resource_type} not found."

        super().__init__(message)

    def serialize_errors(self) -> list[ErrorBody]:
        """Serialize the resource not found error details."""
        error_body: ErrorBody = {
            "message": self.message,
        }
        return [error_body]
