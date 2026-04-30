from summer_dreams_ota.shared.errors import AbstractError, ErrorBody, ErrorCodeEnum, StrOrPromise


class AuthenticationError(AbstractError):
    """Base class for all authentication-related service errors."""

    @property
    def error(self) -> ErrorCodeEnum:
        return ErrorCodeEnum.UNAUTHORIZED

    def serialize_errors(self) -> list[ErrorBody]:
        return [{"message": self.message}]


class UserAlreadyExistsError(AuthenticationError):
    """Raised when a user attempts to sign up with an email that is already registered."""

    @property
    def error(self) -> ErrorCodeEnum:
        return ErrorCodeEnum.BAD_REQUEST

    def __init__(self, email: str, message: StrOrPromise = "") -> None:
        self.email = email
        if not message:
            message = f"User with email '{email}' already exists."
        super().__init__(message)
