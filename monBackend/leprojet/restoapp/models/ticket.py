from django.db import models

class Ticket(models.Model):
    idTicket = models.IntegerField(db_column='idTicket', primary_key=True)  # Field name made lowercase.
    prixTicket = models.IntegerField(db_column='prixTicket')  # Field name made lowercase.
    
    @property
    def get_prix(self):
        return self.prixTicket

    class Meta:
        managed = False
        db_table = 'ticket'
