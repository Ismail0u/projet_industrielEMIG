from rest_framework import serializers
from ..models.reservation import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    etudiant = serializers.PrimaryKeyRelatedField(read_only=True)
    jour = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        #representation['etudiant'] = instance.get_etudiant()
        #representation['jour'] = instance.get_jour()
        return representation
