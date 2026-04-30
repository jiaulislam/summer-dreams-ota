from abc import ABC, abstractmethod
from typing import NotRequired, TypedDict

from summer_dreams_ota.shared.errors.constants import ErrorCodeEnum, StrOrPromise


class ErrorBody(TypedDict):
    """TypedDict for the error response body."""

    message: StrOrPromise
    field: NotRequired[str]


class ErrorResponse(TypedDict):
    """TypedDict for the final, assembled error response."""

    error_code: str
    errors: list[ErrorBody]


class AbstractError(Exception, ABC):
    """Abstract base class for all custom errors in the application."""

    def __init__(self, message: StrOrPromise) -> None:
        """
        Initialize the error with a message.

        :param message: The error message to be displayed.
        """
        super().__init__(message)
        self.message = message

    @property
    @abstractmethod
    def error(self) -> ErrorCodeEnum:
        """Return the HTTP status code associated with the error."""
        raise NotImplementedError

    @abstractmethod
    def serialize_errors(self) -> list[ErrorBody]:
        """Serialize the error details for logging or response."""
        raise NotImplementedError

    def to_response(self) -> ErrorResponse:
        """
        Convert the error to a response format.

        :return: A dictionary containing the error details.
        """
        return {
            "error_code": self.error.value.error_code,
            "errors": self.serialize_errors(),
        }
