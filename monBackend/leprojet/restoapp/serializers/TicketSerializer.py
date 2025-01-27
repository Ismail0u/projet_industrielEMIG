from rest_framework import serializers
from ..models.ticket import Ticket

class TicketSerializer(serializers.ModelSerializer):
    prix = serializers.IntegerField(read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['prix'] = instance.get_prix
        return representation
