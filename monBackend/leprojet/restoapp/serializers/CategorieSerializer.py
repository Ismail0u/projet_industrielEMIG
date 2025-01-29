from rest_framework import serializers
from ..models.categorie import Categorie

class CategorieSerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Categorie
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['product_count'] = instance.get_produitCategorieNbre
        return representation
