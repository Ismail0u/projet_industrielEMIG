from rest_framework import serializers
from ..models.gestionticket import GestionTickets

class GestionTicketsSerializer(serializers.ModelSerializer):
    ticket_vendu = serializers.FloatField(read_only=True)
    ticket_restant = serializers.BooleanField(read_only=True)

    class Meta:
        model = GestionTickets
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['ticket_vendu'] = instance.get_nbreticketvendu()
        representation['ticket_restant'] = instance.get_nbreticketrestant()
        return representation
