from django.db import models
from .lotstickets import LotsTicket
from .rapport import Rapport

class GestionTickets(models.Model):
    idgestiontickets = models.BigAutoField(db_column='idGestionTickets', primary_key=True)  # Field name made lowercase.
    nbreticketvendu = models.IntegerField(db_column='nbreTicketVendu')  # Field name made lowercase.
    nbreticketrestant = models.IntegerField(db_column='nbreTicketRestant')  # Field name made lowercase.
    idlots = models.ForeignKey(LotsTicket, models.DO_NOTHING, db_column='idLots')  # Field name made lowercase.
    dategestionticket = models.DateField(db_column='dategestionTicket')  # Field name made lowercase.
    argentaremettre = models.FloatField(db_column='argentARemettre')  # Field name made lowercase.
    argentremis = models.FloatField(db_column='argentRemis')  # Field name made lowercase.
    idrapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    
    @property
    def get_nbreticketvendu(self):
        return self.nbreticketvendu
    
    @property
    def get_nbreticketrestant(self):
        return self.nbreticketrestant

    class Meta:
        managed = False
        db_table = 'gestion_tickets'

