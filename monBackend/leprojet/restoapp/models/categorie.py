from django.db import models

class Categorie(models.Model):
    idcategorie = models.IntegerField(db_column='idCategorie', primary_key=True)  # Field name made lowercase.
    nomcategorie = models.CharField(db_column='nomcategorie', max_length=25)  # Field name made lowercase.

    
    @property
    def get_produitCategorieNbre(self):
        from .produit import Produit
        return Produit.objects.filter(idcategorie=self).count()
    
    @property
    def get_produit_categorie(self):
        from .produit import Produit
        return Produit.objects.filter(idcategorie=self.idcategorie)

    class Meta:
        managed = False
        db_table = 'categorie'
    

