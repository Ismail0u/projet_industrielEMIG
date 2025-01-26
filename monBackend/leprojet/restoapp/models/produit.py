from django.db import models
from .fournisseur import Fournisseur
from .categorie import Categorie

class Produit(models.Model):
    idproduit = models.CharField(db_column='idProduit', primary_key=True, max_length=5)
    nomproduit = models.CharField(db_column='nomProduit', max_length=25)
    quantitedisponible = models.DecimalField(db_column='quantiteDisponible', max_digits=10, decimal_places=2)
    seuilcritique = models.DecimalField(db_column='seuilCritique', max_digits=10, decimal_places=2)
    ration = models.FloatField(blank=True, null=True)
    etat = models.CharField(max_length=10)
    idfournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')
    idcategorie = models.ForeignKey(Categorie, models.DO_NOTHING, db_column='idCategorie')
    dateajout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)

    def est_critique(self):
        return self.quantitedisponible <= self.seuilcritique

    def ajouter_produit(self, quantite):
        self.quantitedisponible += quantite
        self.save()

    def diminuer_produit(self, quantite):
        self.quantitedisponible -= quantite
        self.save()

    def is_out_of_stock(self):
        return self.quantitedisponible == 0

    class Meta:
        managed = False
        db_table = 'produit'
