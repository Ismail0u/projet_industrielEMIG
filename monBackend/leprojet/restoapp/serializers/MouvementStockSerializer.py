from rest_framework import serializers
from ..models.mouvementstock import MouvementStock

class MouvementStockSerializer(serializers.ModelSerializer):
    is_outgoing = serializers.BooleanField(read_only=True)
    total_quantity = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = MouvementStock
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['is_outgoing'] = instance.get_estsortie
        representation['total_quantity'] = instance.get_quantite_mouve
        return representation
