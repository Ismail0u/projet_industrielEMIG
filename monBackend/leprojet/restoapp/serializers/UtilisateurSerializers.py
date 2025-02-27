from rest_framework import serializers
from ..models.utilisateur import Utilisateur

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['idUtilisateur', 'nom', 'prenom', 'email', 'telephone', 'role']

class UtilisateurCreateSerializer(serializers.ModelSerializer):
    """ Sérializer pour la création d’un utilisateur """
    class Meta:
        model = Utilisateur
        fields = ['nom', 'prenom', 'email', 'telephone', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Utilisateur.objects.create_user(**validated_data)
        return user
