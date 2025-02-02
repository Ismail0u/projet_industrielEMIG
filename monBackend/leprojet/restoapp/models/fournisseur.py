from django.db import models

class Fournisseur(models.Model):
    """
    Modèle représentant un fournisseur de produits.
    """
    idFournisseur = models.CharField(db_column='idFournisseur', primary_key=True, max_length=5)  # Field name made lowercase.
    nomFournisseur = models.CharField(db_column='nomFournisseur', max_length=45)  # Field name made lowercase.
    contact = models.CharField(max_length=55)
    dateAjout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)  # Field name made lowercase.
    
    @property
    def get_produit_fourni(self):
        from .produit import Produit
        return Produit.objects.filter(idFournisseur=self).count()
    
    def get_produits(self):
        """ Retourne tous les produits fournis par ce fournisseur. """
        return self.produit_set.all()


    class Meta:
        managed = False
        db_table = 'fournisseur'

