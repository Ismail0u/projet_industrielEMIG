from rest_framework import serializers
from ..models.fournisseur import Fournisseur

class FournisseurSerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Fournisseur
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['product_count'] = instance.get_produit_fourni
        return representation
