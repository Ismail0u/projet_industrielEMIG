from django.db import models
from .produit import Produit
from .rapport import Rapport

class MouvementStock(models.Model):
    idmouvement = models.BigAutoField(db_column='idMouvement', primary_key=True)  # Field name made lowercase.
    idproduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    quantite = models.DecimalField(max_digits=10, decimal_places=2)
    datemouvement = models.DateTimeField()
    estsortie = models.IntegerField()
    idrapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    
    @property
    def get_estsortie(self):
        return self.estsortie == 1
    
    @property
    def get_quantite_mouve(self):
        return self.quantite
    

    class Meta:
        managed = False
        db_table = 'mouvement_stock'

