from django.db import models
from .etudiant import Etudiant
from .jour import Jour
from .periode import Periode

class Reservation(models.Model):
    idReservation = models.BigAutoField(db_column='idReservation', primary_key=True)  # Field name made lowercase.
    dateReservation = models.DateField(db_column='dateReservation')  # Field name made lowercase.
    idEtudiant = models.ForeignKey(Etudiant, models.DO_NOTHING, db_column='idEtudiant')  # Field name made lowercase.
    idJour = models.ForeignKey(Jour, models.DO_NOTHING, db_column='idJour')  # Field name made lowercase.
    idPeriode = models.ForeignKey(Periode, models.DO_NOTHING, db_column='idPeriode')  # Field name made lowercase.
    
    @property
    def get_etudiant(self):
        from .etudiant import Etudiant
        return Etudiant.objects.filter(idEtudiant=self.idEtudiant)
    
    @property
    def get_jour(self):
        return self.idJour

    class Meta:
        managed = False
        db_table = 'reservation'
