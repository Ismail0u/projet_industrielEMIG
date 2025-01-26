from django.db import models

class Etudiant(models.Model):
    idetudiant = models.IntegerField(db_column='idEtudiant', primary_key=True)  # Field name made lowercase.
    nometudiant = models.CharField(db_column='nomEtudiant', max_length=50)  # Field name made lowercase.
    prenometudiant = models.CharField(db_column='prenomEtudiant', max_length=45)  # Field name made lowercase.

    @property
    def get_fullName(self):
        return f"{self.nometudiant} {self.prenometudiant}"
    
    def existe_reserv_pour_periode_date(self,periode):
        from .reservation import Reservation
        from datetime import date
        return Reservation.objects.filter(idetudiant=self, idperiode=periode, datereservation=date.today()).exists()
    

    class Meta:
        managed = False
        db_table = 'etudiant'

