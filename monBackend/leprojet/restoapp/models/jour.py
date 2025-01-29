from django.db import models
from django.utils import timezone

class Jour(models.Model):
    idJour = models.IntegerField(db_column='idJour', primary_key=True)  # Field name made lowercase.
    nomJour = models.CharField(db_column='nomJour', max_length=10)  # Field name made lowercase.

    @property
    def get_nomJour(self):
        return f"{self.nomJour}"
    
    @property
    def get_nbre_reserve_jour(self):
        from .reservation import Reservation
        return Reservation.objects.filter(idJour=self).count()
    
    @property
    def get_nbre_reserve_lendemain(self, periode_nom):
        """
        Retourne le nombre de personnes qui ont réservé pour le lendemain pour une période donnée.
        :param periode_nom: Nom de la période (petit dej, dejeuner, diner)
        :return: Nombre de réservations pour le lendemain pour la période donnée
        """
        from .periode import Periode
        from .reservation import Reservation
        lendemain = timezone.now().date() + timezone.timedelta(days=1)
        periode = Periode.objects.get(nomPeriode=periode_nom)
        return Reservation.objects.filter(
            dateReservation=lendemain,
            idJour=self,
            idPeriode=periode
        ).count()

    class Meta:
        managed = False
        db_table = 'jour'

