from typing import Any

from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

from summer_dreams_ota.shared.errors.base import AbstractError


def custom_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    if isinstance(exc, AbstractError):
        return Response(exc.to_response(), status=exc.error.value.status_code)
    response = drf_exception_handler(exc, context)
    return response
