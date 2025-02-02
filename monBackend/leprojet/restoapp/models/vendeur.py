from django.db import models

class TicketVendu(models.Model):
    TYPE_TICKET_CHOICES = [
        ('Petit-déjeuner', 'Petit-déjeuner'),
        ('Déjeuner', 'Déjeuner'),
    ]
    
    type_ticket = models.CharField(max_length=20, choices=TYPE_TICKET_CHOICES)
    nombre_ticket = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.type_ticket} - {self.nombre_ticket} tickets"


class Lot(models.Model):
    TYPE_LOT_CHOICES = [
        ('Petit-déjeuner', 'Petit-déjeuner'),
        ('Déjeuner', 'Déjeuner'),
    ]

    type_lot = models.CharField(max_length=20, choices=TYPE_LOT_CHOICES)
    nombre_lot = models.IntegerField()
    montant = models.IntegerField(editable=False)  # Calculé automatiquement
    date = models.DateField()

    def save(self, *args, **kwargs):
        prix_par_ticket = {'Petit-déjeuner': 75, 'Déjeuner': 125}
        tickets_par_lot = 14  # Un lot = 14 tickets
        self.montant = self.nombre_lot * tickets_par_lot * prix_par_ticket[self.type_lot]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.type_lot} - {self.nombre_lot} lots"


class ArgentRemis(models.Model):
    montant = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"Montant remis: {self.montant}"
