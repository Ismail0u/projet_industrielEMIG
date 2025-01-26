from rest_framework import serializers
from ..models.recu import Recu

class RecuSerializer(serializers.ModelSerializer):
    produit = serializers.PrimaryKeyRelatedField(read_only=True)
    fournisseur = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Recu
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['produit'] = instance.get_produit()
        representation['fournisseur'] = instance.get_fournisseur()
        return representation
