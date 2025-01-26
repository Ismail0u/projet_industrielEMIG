from django.db import models

class Ticket(models.Model):
    idticket = models.IntegerField(db_column='idTicket', primary_key=True)  # Field name made lowercase.
    prixticket = models.IntegerField(db_column='prixTicket')  # Field name made lowercase.
    
    @property
    def get_prix(self):
        return self.prixticket

    class Meta:
        managed = False
        db_table = 'ticket'
