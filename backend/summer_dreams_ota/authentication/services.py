from typing import Any

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

from summer_dreams_ota.authentication.errors import UserAlreadyExistsError
from summer_dreams_ota.users.models import User


class AuthService:
    """
    Service to handle authentication related business logic.
    """

    @staticmethod
    def get_tokens_for_user(user: User) -> dict[str, Any]:
        """
        Generate access and refresh tokens for a given user.
        """
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": str(user.pk),
                "email": str(user.email),
                "first_name": str(user.first_name),
                "last_name": str(user.last_name),
            },
        }

    @staticmethod
    def authenticate_user(email: str, password: str) -> User | None:
        """
        Authenticate a user with email and password.
        """
        return authenticate(email=email, password=password)

    @staticmethod
    def signup_user(email: str, password: str, **extra_fields: Any) -> User:
        """
        Create a new user with email and password.
        """
        if User.objects.filter(email=email).exists():
            raise UserAlreadyExistsError(email)

        return User.objects.create_user(email=email, password=password, **extra_fields)
