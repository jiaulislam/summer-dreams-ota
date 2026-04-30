import logging
from typing import Any, cast

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.conf import settings

from summer_dreams_ota.authentication.serializers import LoginSerializer, SignupSerializer
from summer_dreams_ota.authentication.services import AuthService

logger = logging.getLogger(__name__)


class SignupView(APIView):
    """
    API View for email/password registration.
    """

    permission_classes = [AllowAny]
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            logger.warning(f"Signup validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = cast(dict[str, Any], serializer.validated_data)
        email = validated_data["email"]
        password = validated_data["password"]

        extra_fields = {
            "first_name": validated_data.get("first_name", ""),
            "last_name": validated_data.get("last_name", ""),
        }

        user = AuthService.signup_user(email, password, **extra_fields)
        tokens = AuthService.get_tokens_for_user(user)

        return Response(tokens, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    API View for email/password login.
    """

    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            logger.warning(f"Login validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = cast(dict[str, Any], serializer.validated_data)
        email = validated_data["email"]
        password = validated_data["password"]

        user = AuthService.authenticate_user(email, password)
        if user is not None:
            tokens = AuthService.get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class GoogleLoginView(SocialLoginView):
    """
    API View for Google Social Login.
    Note: SocialLoginView is an APIView subclass from dj-rest-auth.
    """

    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    permission_classes = [AllowAny]

    @property
    def callback_url(self):
        # This URL is used by the backend in the code-for-token exchange with Google.
        # It must match one of the "Authorized redirect URIs" in your Google Cloud Console
        # and the one used by your frontend. Loading from settings allows for
        # environment-specific configurations (dev, staging, prod).
        return settings.GOOGLE_OAUTH_CALLBACK_URL
