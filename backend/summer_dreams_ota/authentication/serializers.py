from rest_framework import serializers


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
