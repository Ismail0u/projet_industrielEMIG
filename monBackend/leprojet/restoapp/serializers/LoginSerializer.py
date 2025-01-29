
from rest_framework import serializers
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    motpasse = serializers.CharField(max_length=255)

    def validate(self, data):
        email = data.get("email")
        motpasse = data.get("motpasse")

        # Utiliser l'email comme username pour l'authentification
        user = authenticate(username=email, motpasse=motpasse)

        if user is None:
            raise serializers.ValidationError("Unable to log in with provided credentials.")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        data["user"] = user
        return data
