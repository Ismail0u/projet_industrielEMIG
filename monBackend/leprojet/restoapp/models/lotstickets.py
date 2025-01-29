from django.db import models
from .ticket import Ticket

class LotsTicket(models.Model):
    idLots = models.BigAutoField(db_column='idLots', primary_key=True)  # Field name made lowercase.
    typeLot = models.CharField(db_column='typeLot', max_length=20, blank=True, null=True)  # Field name made lowercase.
    nbreTickets = models.IntegerField(db_column='nbreTickets')  # Field name made lowercase.
    prixLot = models.BigIntegerField(db_column='prixLot')  # Field name made lowercase.
    idTicket = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='idTicket')  # Field name made lowercase.
    dateCreation = models.DateTimeField(db_column='dateCreation', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lots_ticket'
