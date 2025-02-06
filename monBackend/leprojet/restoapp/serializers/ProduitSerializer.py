from rest_framework import serializers
from ..models.produit import Produit

class ProduitSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Produit avec uniquement `nomFournisseur` et `nomCategorie`.
    """
    nomFournisseur = serializers.SerializerMethodField()
    nomCategorie = serializers.SerializerMethodField()
    etat = serializers.SerializerMethodField()
    is_critical = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        fields = ['idProduit', 'nomProduit', 'quantiteDisponible', 'seuilCritique', 'ration', 'etat', 'nomFournisseur', 'nomCategorie','is_critical']
        
    def get_is_critical(self,obj):
        return obj.est_critique()

    def get_nomFournisseur(self, obj):
        """
        Retourne uniquement le nom du fournisseur.
        """
        return obj.idFournisseur.nomFournisseur if obj.idFournisseur else None

    def get_nomCategorie(self, obj):
        """
        Retourne uniquement le nom de la catégorie.
        """
        return obj.idCategorie.nomCategorie if obj.idCategorie else None

    def get_etat(self, obj):
        """
        Retourne l'état du produit (Rupture, Critique, Disponible).
        """
        obj.set_etat()  # Met à jour l'état
        return obj.etat
