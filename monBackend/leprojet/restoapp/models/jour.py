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

    def get_nbre_reserve_lendemain(self, periode_id):
        from .periode import Periode
        from .reservation import Reservation
        try:
            periode = Periode.objects.get(idPeriode=periode_id)
        except Periode.DoesNotExist:
            print(f"Période {periode_id} inexistante")
            return 0

        lendemain = timezone.now().date() + timezone.timedelta(days=1)
        print(f"Vérification des réservations pour {lendemain} et période {periode_id}")
        count = Reservation.objects.filter(dateReservation=lendemain, idJour=self, idPeriode=periode).count()
        print(f"Réservations pour {lendemain} : {count}")
        return count


    class Meta:
        managed = False
        db_table = 'jour'

