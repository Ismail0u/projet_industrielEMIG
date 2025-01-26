from django.db import models
from .etudiant import Etudiant
from .jour import Jour
from .periode import Periode

class Reservation(models.Model):
    idreservation = models.BigAutoField(db_column='idReservation', primary_key=True)  # Field name made lowercase.
    datereservation = models.DateField(db_column='dateReservation')  # Field name made lowercase.
    idetudiant = models.ForeignKey(Etudiant, models.DO_NOTHING, db_column='idEtudiant')  # Field name made lowercase.
    idjour = models.ForeignKey(Jour, models.DO_NOTHING, db_column='idJour')  # Field name made lowercase.
    idperiode = models.ForeignKey(Periode, models.DO_NOTHING, db_column='idPeriode')  # Field name made lowercase.
    
    @property
    def get_etudiant(self):
        return self.idetudiant
    
    @property
    def get_jour(self):
        return self.idjour

    class Meta:
        managed = False
        db_table = 'reservation'
