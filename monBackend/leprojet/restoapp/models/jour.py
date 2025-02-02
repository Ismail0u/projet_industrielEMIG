from django.db import models
from django.utils import timezone

class Jour(models.Model):
    idJour = models.IntegerField(db_column='idJour', primary_key=True)  # Field name made lowercase.
    nomJour = models.CharField(db_column='nomJour', max_length=10)  # Field name made lowercase.

    @property
    def get_nomJour(self):
        return f"{self.nomJour}"
    
    @property  # Gardez le @property pour l'accès en tant qu'attribut
    def get_nbre_reserve_jour(self):  # Correction : .count() ici !
        from .reservation import Reservation
        return Reservation.objects.filter(idJour=self).count() # .count() est crucial

    def get_nbre_reserve_lendemain(self, periode_nom):  # Pas besoin de @property ici
        from .periode import Periode
        from .reservation import Reservation
        try:  # Gestion des erreurs si la période n'existe pas
            periode = Periode.objects.get(nomPeriode=periode_nom)
        except Periode.DoesNotExist:
            return 0  # Ou une autre valeur par défaut en cas d'erreur
        lendemain = timezone.now().date() + timezone.timedelta(days=1)

        return Reservation.objects.filter(
            dateReservation=lendemain,
            idJour=self,
            idPeriode=periode
        ).count()  # .count() est crucial

    class Meta:
        managed = False
        db_table = 'jour'

