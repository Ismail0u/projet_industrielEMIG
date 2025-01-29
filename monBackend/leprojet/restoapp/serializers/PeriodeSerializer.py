from rest_framework import serializers
from ..models.periode import Periode

class PeriodeSerializer(serializers.ModelSerializer):
    #total_reservations = serializers.IntegerField(read_only=True)

    class Meta:
        model = Periode
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
       # representation['total_reservations'] = instance.get_total_reservations()
        return representation
