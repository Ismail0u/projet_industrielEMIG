
from django.db import models

class MontantRemis(models.Model):
    montant = models.DecimalField(max_digits=10, decimal_places=2)  # Montant avec 2 décimales
    date = models.DateField()  # Date du montant remis

    def __str__(self):
        return f"{self.montant} remis le {self.date.strftime('%d/%m/%Y')}"