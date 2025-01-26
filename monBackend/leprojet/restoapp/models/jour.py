from django.db import models

class Jour(models.Model):
    idjour = models.IntegerField(db_column='idJour', primary_key=True)  # Field name made lowercase.
    nomjour = models.CharField(db_column='nomJour', max_length=10)  # Field name made lowercase.

    @property
    def get_nomJour(self):
        return f"{self.nomjour}"
    
    @property
    def get_nbre_reserve_jour(self):
        from .reservation import Reservation
        return Reservation.objects.filter(idJour=self).count()

    class Meta:
        managed = False
        db_table = 'jour'

