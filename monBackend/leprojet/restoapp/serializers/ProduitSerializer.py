from rest_framework import serializers
from ..models.produit import Produit

class ProduitSerializer(serializers.ModelSerializer):
    is_critical = serializers.BooleanField(read_only=True)
    out_of_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = Produit
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['is_critical'] = instance.est_critique()
        representation['out_of_stock'] = instance.is_out_of_stock()
        return representation
