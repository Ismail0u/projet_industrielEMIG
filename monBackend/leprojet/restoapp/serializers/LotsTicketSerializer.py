from rest_framework import serializers
from ..models.lotstickets import LotsTicket

class LotsTicketSerializer(serializers.ModelSerializer):
    #total_tickets = serializers.IntegerField(read_only=True)
    #total_price = serializers.IntegerField(read_only=True)

    class Meta:
        model = LotsTicket
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        #representation['total_tickets'] = instance.get_total_tickets()
       # representation['total_price'] = instance.get_total_price()
        return representation
