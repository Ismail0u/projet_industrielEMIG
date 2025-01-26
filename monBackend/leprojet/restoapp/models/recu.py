from django.db import models
from .produit import Produit
from .fournisseur import Fournisseur

class Recu(models.Model):
    idrecu = models.BigAutoField(db_column='idRecu', primary_key=True)  # Field name made lowercase.
    daterecu = models.DateField(db_column='dateRecu')  # Field name made lowercase.
    idproduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    idfournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')  # Field name made lowercase.
    
    @property
    def get_produit(self):
        return self.idproduit
    
    @property
    def get_fournisseur(self):
        return self.idfournisseur

    class Meta:
        managed = False
        db_table = 'recu'

