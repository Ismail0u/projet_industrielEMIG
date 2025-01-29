from rest_framework import serializers
from ..models import TypeRapport

class TypeRapportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRapport
        fields = '__all__'