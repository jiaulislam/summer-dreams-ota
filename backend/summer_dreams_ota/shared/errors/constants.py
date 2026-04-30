from enum import Enum
from typing import NamedTuple

from rest_framework import status

from django.utils.functional import Promise

StrOrPromise = str | Promise


class ErrorInfo(NamedTuple):
    status_code: int
    error_code: str

    def __str__(self):
        return f"{self.error_code} ({self.status_code})"


class ErrorCodeEnum(Enum):
    BAD_REQUEST = ErrorInfo(status.HTTP_400_BAD_REQUEST, "BAD_REQUEST")
    UNAUTHORIZED = ErrorInfo(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED")
    PERMISSION_DENIED = ErrorInfo(status.HTTP_403_FORBIDDEN, "PERMISSION_DENIED")
    NOT_FOUND = ErrorInfo(status.HTTP_404_NOT_FOUND, "NOT_FOUND")
