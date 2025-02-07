from django.db import models
from .produit import Produit
from .rapport import Rapport
from .jour import Jour

class MouvementStock(models.Model):
    """
    Modèle représentant un mouvement de stock (entrée ou sortie).
    """
    idMouvement = models.BigAutoField(db_column='idMouvement', primary_key=True)
    idProduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')
    quantite = models.DecimalField(max_digits=10, decimal_places=2)
    dateMouvement = models.DateField(db_column='datemouvement')
    estSortie = models.BooleanField()  # True = Sortie, False = Entrée
    idRapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')
    idJour = models.ForeignKey(Jour,models.DO_NOTHING,db_column='idJour')
    
    @property
    def get_estsortie(self):
        return self.estSortie == 1
    
    @property
    def get_quantite_mouve(self):
        return self.quantite


    def save(self, *args, **kwargs):
        """
        Surcharge de la méthode `save` pour mettre à jour la quantité du produit.
        """
        produit = self.idProduit  # Récupérer le produit lié au mouvement

        if self.estSortie:  
            # Sortie → On diminue la quantité du produit
            produit.diminuer_produit(self.quantite)
        else:
            # Entrée → On ajoute la quantité au produit
            produit.ajouter_produit(self.quantite)

        super().save(*args, **kwargs)  # Enregistre le mouvement après mise à jour du produit

    class Meta:
        db_table = 'mouvement_stock'