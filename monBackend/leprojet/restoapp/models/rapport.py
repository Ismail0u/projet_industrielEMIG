from django.db import models

class Rapport(models.Model):
    idrapport = models.BigAutoField(db_column='idRapport', primary_key=True)  # Field name made lowercase.
    idtyperapport = models.ForeignKey('Typerapport', models.DO_NOTHING, db_column='idTypeRapport')  # Field name made lowercase.
    fichier = models.CharField(max_length=255, blank=True, null=True)
    daterapport = models.DateTimeField(db_column='dateRapport')  # Field name made lowercase.
    idutilisateur = models.ForeignKey('Utilisateur', models.DO_NOTHING, db_column='idUtilisateur')  # Field name made lowercase.
    
    def get_mouvement_stock(self):
        from .mouvementstock import MouvementStock
        return MouvementStock.objects.filter(idrapport=self).count()

    class Meta:
        managed = False
        db_table = 'rapport'

