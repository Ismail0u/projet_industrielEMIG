from django.db import models
from .lotstickets import LotsTicket
from .rapport import Rapport

class GestionTickets(models.Model):
    idGestionTickets = models.BigAutoField(db_column='idGestionTickets', primary_key=True)  # Field name made lowercase.
    nbreTicketVendu = models.IntegerField(db_column='nbreTicketVendu')  # Field name made lowercase.
    nbreTicketRestant = models.IntegerField(db_column='nbreTicketRestant')  # Field name made lowercase.
    idLots = models.ForeignKey(LotsTicket, models.DO_NOTHING, db_column='idLots')  # Field name made lowercase.
    dateGestionTicket = models.DateField(db_column='dategestionTicket')  # Field name made lowercase.
    argentARemettre = models.FloatField(db_column='argentARemettre')  # Field name made lowercase.
    argentRemis = models.FloatField(db_column='argentRemis')  # Field name made lowercase.
    idRapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    
    @property
    def get_nbreticketvendu(self):
        return self.nbreTicketVendu
    
    @property
    def get_nbreticketrestant(self):
        return self.nbreTicketRestant

    class Meta:
        managed = False
        db_table = 'gestion_tickets'

