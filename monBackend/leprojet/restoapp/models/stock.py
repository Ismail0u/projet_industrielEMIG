from django.db import models
from .produit import Produit
from .mouvementstock import MouvementStock
from .rapport import Rapport

class Stock(models.Model):
    idstock = models.IntegerField(db_column='idStock', primary_key=True)  # Field name made lowercase. The composite primary key (idStock, idProduit, dateStock) found, that is not supported. The first column is selected.
    idproduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    idmouvement = models.ForeignKey(MouvementStock, models.DO_NOTHING, db_column='idMouvement')  # Field name made lowercase.
    idrapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    datestock = models.DateField(db_column='dateStock')  # Field name made lowercase.
    
    @property
    def get_produit(self):
        return self.idproduit

    class Meta:
        managed = False
        db_table = 'stock'
        unique_together = (('idstock', 'idproduit', 'datestock'),)

