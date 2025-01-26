from django.db import models
from .ticket import Ticket

class LotsTicket(models.Model):
    idlots = models.BigAutoField(db_column='idLots', primary_key=True)  # Field name made lowercase.
    typelot = models.CharField(db_column='typeLot', max_length=20, blank=True, null=True)  # Field name made lowercase.
    nbretickets = models.IntegerField(db_column='nbreTickets')  # Field name made lowercase.
    prixlot = models.BigIntegerField(db_column='prixLot')  # Field name made lowercase.
    idticket = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='idTicket')  # Field name made lowercase.
    datecreation = models.DateTimeField(db_column='dateCreation', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lots_ticket'
