from django.db import models
from .produit import Produit
from .mouvementstock import MouvementStock
from .rapport import Rapport

class Stock(models.Model):
    idStock = models.IntegerField(db_column='idStock', primary_key=True)  # Field name made lowercase. The composite primary key (idStock, idProduit, dateStock) found, that is not supported. The first column is selected.
    idProduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    idMouvement = models.ForeignKey(MouvementStock, models.DO_NOTHING, db_column='idMouvement')  # Field name made lowercase.
    idRapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    dateStock = models.DateField(db_column='dateStock')  # Field name made lowercase.
    
    @property
    def get_produit(self):
        return self.idProduit

    class Meta:
        managed = False
        db_table = 'stock'
        unique_together = (('idStock', 'idProduit', 'dateStock'),)

