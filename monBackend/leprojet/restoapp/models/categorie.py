from django.db import models

class Categorie(models.Model):
    """
    Modèle représentant une catégorie de produits.
    """
    idCategorie = models.IntegerField(db_column='idCategorie', primary_key=True)  
    nomCategorie = models.CharField(db_column='nomCategorie', max_length=25)  

    
    @property
    def get_produitCategorieNbre(self):
        from .produit import Produit
        return Produit.objects.filter(idCategorie=self).count()
    
    @property
    def get_produit_categorie(self):
        from .produit import Produit
        return Produit.objects.filter(idCategorie=self.idCategorie)
    
    def clean(self):
        if len(self.nomCategorie.strip()) < 2:
            raise ValidationError("Nom catégorie trop court")

    class Meta:
        managed = False
        db_table = 'categorie'
    

