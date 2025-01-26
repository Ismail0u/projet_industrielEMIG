from rest_framework import serializers
from ..models.rapport import Rapport

class RapportSerializer(serializers.ModelSerializer):
    mouvement_stock_count = serializers.IntegerField(read_only=True)
    #has_pending_movements = serializers.BooleanField(read_only=True)

    class Meta:
        model = Rapport
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['mouvement_stock_count'] = instance.get_mouvement_stock()
        #representation['has_pending_movements'] = instance.has_pending_movements()
        return representation
