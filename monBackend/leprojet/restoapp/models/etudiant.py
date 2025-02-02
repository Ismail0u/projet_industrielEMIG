from django.db import models

class Etudiant(models.Model):
    idEtudiant = models.IntegerField(db_column='idEtudiant', primary_key=True)  # Field name made lowercase.
    nomEtudiant = models.CharField(db_column='nomEtudiant', max_length=50)  # Field name made lowercase.
    prenomEtudiant = models.CharField(db_column='prenomEtudiant', max_length=45)  # Field name made lowercase.

    @property
    def get_fullName(self):
        return f"{self.nomEtudiant} {self.prenomEtudiant}"
    
    def existe_reserv_pour_periode_date(self,periode):
        from .reservation import Reservation
        from datetime import date
        return Reservation.objects.filter(idEtudiant=self, idPeriode=periode, dateReservation=date.today()).count()
    
    # Improve reservation check method
    def existe_reserv_pour_periode_date(self, periode, date=None):
        from .reservation import Reservation
        from datetime import date as today_date
        check_date = date or today_date.today()
        return Reservation.objects.filter(
            idEtudiant=self,
            idPeriode=periode,
            dateReservation=check_date
        ).exists()
    

    class Meta:
        managed = False
        db_table = 'etudiant'

