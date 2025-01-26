from django.db import models

class Fournisseur(models.Model):
    idfournisseur = models.CharField(db_column='idFournisseur', primary_key=True, max_length=5)  # Field name made lowercase.
    nomfournisseur = models.CharField(db_column='nomFournisseur', max_length=45)  # Field name made lowercase.
    contact = models.CharField(max_length=55)
    dateajout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)  # Field name made lowercase.
    
    @property
    def get_produit_fourni(self):
        from .produit import Produit
        return Produit.objects.filter(idfournisseur=self).count()

    class Meta:
        managed = False
        db_table = 'fournisseur'

