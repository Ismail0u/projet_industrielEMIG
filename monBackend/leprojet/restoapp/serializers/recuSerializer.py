from rest_framework import serializers
from ..models.recu import Recu

class RecuSerializer(serializers.ModelSerializer):
    #prod = serializers.PrimaryKeyRelatedField(read_only=True)
    #fourni = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Recu
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        #representation['prod'] = instance.get_produit
     #   representation['fourni'] = instance.get_fournisseur
        return representation
