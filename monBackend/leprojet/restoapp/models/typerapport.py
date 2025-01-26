from django.db import models

class TypeRapport(models.Model):
    idtyperapport = models.BigAutoField(db_column='idTypeRapport', primary_key=True)  # Field name made lowercase.
    nomtyperapport = models.CharField(db_column='nomTypeRapport', max_length=25)  # Field name made lowercase.
    
    """def get_rapports(self):
        from .rapport import Rapport
        return Rapport.objects.filter(idrapport=self).count()
    
    def get_rapports_for_period(self, start_date, end_date):
        from .rapport import Rapport
        return Rapport.objects.filter(idtyperapport=self, daterapport__range=(start_date, end_date)) """

    class Meta:
        managed = False
        db_table = 'typeRapport'
