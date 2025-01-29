from django.db import models
from .fournisseur import Fournisseur
from .categorie import Categorie

class Produit(models.Model):
    idProduit = models.CharField(db_column='idProduit', primary_key=True, max_length=5)
    nomProduit = models.CharField(db_column='nomProduit', max_length=25)
    quantiteDisponible = models.DecimalField(db_column='quantiteDisponible', max_digits=10, decimal_places=2)
    seuilCritique = models.DecimalField(db_column='seuilCritique', max_digits=10, decimal_places=2)
    ration = models.FloatField(blank=True, null=True)
    etat = models.CharField(max_length=10)
    idFournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')
    idCategorie = models.ForeignKey(Categorie, models.DO_NOTHING, db_column='idCategorie')
    dateAjout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)

    def est_critique(self):
        return self.quantiteDisponible <= self.seuilCritique

    def ajouter_produit(self, quantite):
        self.quantiteDisponible += quantite
        self.save()

    def diminuer_produit(self, quantite):
        self.quantiteDisponible -= quantite
        self.save()

    def is_out_of_stock(self):
        return self.quantiteDisponible == 0

    class Meta:
        managed = False
        db_table = 'produit'
