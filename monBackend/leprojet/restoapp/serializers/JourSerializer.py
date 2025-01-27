from rest_framework import serializers
from ..models.jour import Jour

class JourSerializer(serializers.ModelSerializer):
    total_reservations = serializers.IntegerField(read_only=True)

    class Meta:
        model = Jour
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['total_reservations'] = instance.get_nbre_reserve_jour
        return representation
