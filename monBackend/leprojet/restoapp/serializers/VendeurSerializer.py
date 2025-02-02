from rest_framework import serializers
from ..models import TicketVendu, Lot, ArgentRemis

class TicketVenduSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketVendu
        fields = '__all__'

class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = '__all__'

class ArgentRemisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArgentRemis
        fields = '__all__'