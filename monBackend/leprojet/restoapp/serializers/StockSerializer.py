from rest_framework import serializers
from ..models.stock import Stock

class StockSerializer(serializers.ModelSerializer):
    produit = serializers.PrimaryKeyRelatedField(read_only=True)
   # mouvement = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Stock
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['produit'] = instance.get_produit()
        #representation['mouvement'] = instance.get_mouvement()
        return representation
