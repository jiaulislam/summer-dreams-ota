from typing import Any

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

from summer_dreams_ota.users.models import User


class AuthService:
    """
    Service to handle authentication related business logic.
    """

    @staticmethod
    def get_tokens_for_user(user: User) -> dict[str, str]:
        """
        Generate access and refresh tokens for a given user.
        """
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
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
        return User.objects.create_user(email=email, password=password, **extra_fields)
