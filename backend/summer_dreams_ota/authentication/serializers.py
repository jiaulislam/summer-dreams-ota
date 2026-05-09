from rest_framework import serializers

from summer_dreams_ota.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "is_staff"]
        read_only_fields = ["email", "is_staff"]


class LoginSerializer(serializers.Serializer):
    """
    Serializer for email/password login.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class SignupSerializer(serializers.Serializer):
    """
    Serializer for email/password signup.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)


class SocialLoginSerializer(serializers.Serializer):
    """
    Serializer for social login tokens.
    """

    access_token = serializers.CharField()
