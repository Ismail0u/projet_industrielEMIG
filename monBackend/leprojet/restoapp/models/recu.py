from django.db import models
from .produit import Produit
from .fournisseur import Fournisseur

class Recu(models.Model):
    idRecu = models.BigAutoField(db_column='idRecu', primary_key=True)  # Field name made lowercase.
    dateRecu = models.DateField(db_column='dateRecu')  # Field name made lowercase.
    quantite = models.DecimalField(db_column='quantite', max_digits=10, decimal_places=2)
    idProduit = models.ForeignKey(Produit, on_delete=models.CASCADE, db_column='idProduit')
    idFournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')  # Field name made lowercase.
    
    @property
    def get_produit(self):
        return self.idProduit
    
    @property
    def get_fournisseur(self):
        return self.idFournisseur

    class Meta:
        managed = False
        db_table = 'recu'

