from rest_framework import serializers
from ..models.etudiant import Etudiant

class EtudiantSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    areserver = serializers.BooleanField(read_only=True)

    class Meta:
        model = Etudiant
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['full_name'] = instance.get_fullName()
        representation['areserver'] = instance.existe_reserv_pour_periode_date()
        return representation
