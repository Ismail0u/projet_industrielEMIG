from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from ..models.utilisateur import Utilisateur

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email").strip().lower()  # Normalisation
        password = data.get("password")

        print(f"Tentative de connexion avec email : {email}")

        user = Utilisateur.objects.filter(email=email).first()
        if not user:
            print("🚨 Utilisateur introuvable en Django")
            raise serializers.ValidationError("Email ou mot de passe incorrect")

        if not user.check_password(password):
            print("🚨 Mot de passe incorrect")
            raise serializers.ValidationError("Email ou mot de passe incorrect")

        print("✅ Connexion validée")
        return {
            "user": user, 
            "email": email,  # Ajout des données pour être accessibles dans `validated_data`
            "password": password
        }
