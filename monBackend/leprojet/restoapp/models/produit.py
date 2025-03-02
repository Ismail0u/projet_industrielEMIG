from django.db import models
from .fournisseur import Fournisseur
from .categorie import Categorie
from decimal import Decimal


class Produit(models.Model):
    """
    Modèle représentant un produit stocké.
    """
    idProduit = models.AutoField(primary_key=True)
    nomProduit = models.CharField(db_column='nomProduit', max_length=100)
    quantiteDisponible = models.DecimalField(db_column='quantiteDisponible', max_digits=10, decimal_places=2)
    seuilCritique = models.DecimalField(db_column='seuilCritique', max_digits=10, decimal_places=2)
    ration = models.FloatField(blank=True, null=True)
    etat = models.CharField(max_length=10, default='Disponible')
    idFournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')
    idCategorie = models.ForeignKey(Categorie, models.DO_NOTHING, db_column='idCategorie')
    dateAjout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)
    unite = models.CharField(db_column='unite', max_length=20, blank=True, null=True)
    def est_critique(self):
        """ Vérifie si la quantité disponible atteint le seuil critique. """
        return self.quantiteDisponible <= self.seuilCritique

    def ajouter_produit(self, quantite):
        """ Ajoute une quantité au stock du produit. """
        self.quantiteDisponible += quantite
        self.save()

    def diminuer_produit(self, quantite):
        """ Retire une quantité du stock si disponible. """
        quantite = Decimal(str(quantite))  # Convertir en Decimal avant la soustraction

        if self.quantiteDisponible >= quantite:
            self.quantiteDisponible -= quantite
            self.save()
        else:
            raise ValueError("Stock insuffisant")
        
    def is_out_of_stock(self):
        return self.quantiteDisponible == 0
    
    def set_etat(self):
        if self.is_out_of_stock():
            self.etat="Rupture"
        elif self.est_critique():
            self.etat="Critique"
        else:
            self.etat="Disponible"
        self.save()
        
    def get_fournisseur(self):
        """ Retourne le fournisseur associé au produit. """
        return self.idFournisseur

    class Meta:
        managed = False
        db_table = 'produit'
