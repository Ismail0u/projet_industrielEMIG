from django.db import models

class Periode(models.Model):
    idperiode = models.IntegerField(db_column='idPeriode', primary_key=True)  # Field name made lowercase.
    nomperiode = models.CharField(db_column='nomPeriode', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'periode'

