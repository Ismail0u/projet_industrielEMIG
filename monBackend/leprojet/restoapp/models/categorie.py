from django.db import models

class Categorie(models.Model):
    idCategorie = models.IntegerField(db_column='idCategorie', primary_key=True)  # Field name made lowercase.
    nomCategorie = models.CharField(db_column='nomCategorie', max_length=25)  # Field name made lowercase.

    
    @property
    def get_produitCategorieNbre(self):
        from .produit import Produit
        return Produit.objects.filter(idCategorie=self).count()
    
    @property
    def get_produit_categorie(self):
        from .produit import Produit
        return Produit.objects.filter(idCategorie=self.idcategorie)

    class Meta:
        managed = False
        db_table = 'categorie'
    

