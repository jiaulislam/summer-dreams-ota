from typing import Any

from rest_framework.exceptions import ErrorDetail

from .base import AbstractError, ErrorBody
from .constants import ErrorCodeEnum


class SerializerError(AbstractError):
    """
    Custom error for serializer validation failures.

    This error is raised when serializer validation fails, providing a structured response.
    """

    @property
    def error(self) -> ErrorCodeEnum:
        """Return the error code associated with this error."""
        return ErrorCodeEnum.BAD_REQUEST

    def __init__(self, errors: dict[str, Any]) -> None:
        """
        Initialize the validation error with a message and an optional field.

        :param errors: A dictionary containing validation errors.
        """
        self.errors = errors
        super().__init__("Input Validation failed.")

    def serialize_errors(self) -> list[ErrorBody]:
        """Serialize the validation error details."""
        return self._parse_error_dict(self.errors)

    def _parse_error_dict(self, errors_dict: dict[str, Any], parent_field: str | None = None) -> list[ErrorBody]:
        """Parse a dictionary of errors into ErrorBody list."""
        error_list = []

        for field, field_errors in errors_dict.items():
            # Construct the full field path for nested fields
            full_field_name = f"{parent_field}.{field}" if parent_field else field

            if isinstance(field_errors, list):
                # Handle multiple errors for the same field
                for error in field_errors:
                    if isinstance(error, dict):
                        # Handle nested serializer errors
                        nested_errors = self._parse_error_dict(error, full_field_name)
                        error_list.extend(nested_errors)
                    else:
                        message = self._extract_error_message(error)
                        error_list.append(
                            {
                                "message": message,
                                "field": full_field_name if full_field_name != "non_field_errors" else None,
                            }
                        )
            elif isinstance(field_errors, dict):
                # Handle nested dictionary of errors (nested serializers)
                nested_errors = self._parse_error_dict(field_errors, full_field_name)
                error_list.extend(nested_errors)
            else:
                # Handle a single error for the field
                message = self._extract_error_message(field_errors)
                error_list.append(
                    {"message": message, "field": full_field_name if full_field_name != "non_field_errors" else None}
                )

        return error_list

    def _extract_error_message(self, error) -> str:
        """Extract the actual error message from various error types."""
        if isinstance(error, ErrorDetail):
            return str(error)
        elif isinstance(error, dict):
            # Handle nested error dictionaries
            if "message" in error:
                return str(error["message"])
            else:
                # If it's a dict with field errors, parse each field
                result_messages = []
                for _field, field_errors in error.items():
                    if isinstance(field_errors, list):
                        for field_error in field_errors:
                            msg = self._extract_single_error_message(field_error)
                            result_messages.append(msg)
                    else:
                        msg = self._extract_single_error_message(field_errors)
                        result_messages.append(msg)
                return "; ".join(result_messages) if result_messages else str(error)
        elif hasattr(error, "message"):
            return str(error.message)
        else:
            return self._extract_single_error_message(error)

    def _extract_single_error_message(self, error) -> str:
        """Extract message from a single error object."""
        error_str = str(error)

        # Handle ErrorDetail representation in string form
        if "ErrorDetail(string=" in error_str:
            import re

            match = re.search(r"ErrorDetail\(string='([^']*)'", error_str)
            if match:
                return match.group(1)

        # Handle cases where the error is already a clean string
        if isinstance(error, str) and not ("ErrorDetail" in error or "{" in error):
            return error

        return error_str
