from rest_framework import serializers
from ..models.utilisateur import Utilisateur

class UtilisateurSerializer(serializers.ModelSerializer):
    #is_active = serializers.IntegerField(read_only=True)
    full_name = serializers.CharField(read_only=True)
    #is_admin = serializers.BooleanField(read_only=True)

    class Meta:
        model = Utilisateur
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        #representation['is_active'] = instance.is_active()
        representation['full_name'] = instance.get_full_name_role
        #representation['is_admin'] = instance.is_admin()
        return representation
