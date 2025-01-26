from django.contrib import admin
from .models import Categorie,Fournisseur,Utilisateur,Produit,Etudiant,Stock,MouvementStock,GestionTickets,Jour,Periode,LotsTicket,Rapport,Recu,Reservation,Ticket,TypeRapport

mesmodels = [Categorie,Fournisseur,Utilisateur,Produit,Etudiant,Stock,MouvementStock,GestionTickets,Jour,Periode,LotsTicket,Rapport,
    Recu,Reservation,Ticket,TypeRapport]
for monmodel in mesmodels:
    admin.site.register(monmodel)

# Register your models here.
