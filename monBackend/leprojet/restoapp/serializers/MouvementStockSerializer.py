from rest_framework import serializers
from ..models.mouvementstock import MouvementStock

class MouvementStockSerializer(serializers.ModelSerializer):
    is_outgoing = serializers.SerializerMethodField()
    total_quantity = serializers.SerializerMethodField()
    produit_nom = serializers.CharField(source='idProduit.nomProduit', read_only=True)
    jour_nom = serializers.CharField(source='idJour.nomJour', read_only=True)

    class Meta:
        model = MouvementStock
        fields = [
            'idMouvement', 'idProduit','produit_nom', 'quantite', 
            'dateMouvement', 'estSortie', 'is_outgoing', 'total_quantity',
            'idRapport', 'idJour', 'jour_nom'
        ]
       

    def get_is_outgoing(self, obj):
        return obj.get_estsortie

    def get_total_quantity(self, obj):
        return obj.get_quantite_mouve
