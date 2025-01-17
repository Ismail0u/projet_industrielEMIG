# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Categorie(models.Model):
    idcategorie = models.IntegerField(db_column='idCategorie', primary_key=True)  # Field name made lowercase.
    nomcategorie = models.CharField(db_column='nomCategorie', max_length=25)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'categorie'


class Etudiant(models.Model):
    idetudiant = models.IntegerField(db_column='idEtudiant', primary_key=True)  # Field name made lowercase.
    nometudiant = models.CharField(db_column='nomEtudiant', max_length=50)  # Field name made lowercase.
    prenometudiant = models.CharField(db_column='prenomEtudiant', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'etudiant'


class Fournisseur(models.Model):
    idfournisseur = models.CharField(db_column='idFournisseur', primary_key=True, max_length=5)  # Field name made lowercase.
    nomfournisseur = models.CharField(db_column='nomFournisseur', max_length=45)  # Field name made lowercase.
    contact = models.CharField(max_length=55)
    dateajout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'fournisseur'


class GestionTickets(models.Model):
    idgestiontickets = models.BigAutoField(db_column='idGestionTickets', primary_key=True)  # Field name made lowercase.
    nbreticketvendu = models.IntegerField(db_column='nbreTicketVendu')  # Field name made lowercase.
    nbreticketrestant = models.IntegerField(db_column='nbreTicketRestant')  # Field name made lowercase.
    idlots = models.ForeignKey('LotsTicket', models.DO_NOTHING, db_column='idLots')  # Field name made lowercase.
    dategestionticket = models.DateField(db_column='dategestionTicket')  # Field name made lowercase.
    argentaremettre = models.FloatField(db_column='argentARemettre')  # Field name made lowercase.
    argentremis = models.FloatField(db_column='argentRemis')  # Field name made lowercase.
    idrapport = models.ForeignKey('Rapport', models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'gestion_tickets'


class Jour(models.Model):
    idjour = models.IntegerField(db_column='idJour', primary_key=True)  # Field name made lowercase.
    nomjour = models.CharField(db_column='nomJour', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'jour'


class LotsTicket(models.Model):
    idlots = models.BigAutoField(db_column='idLots', primary_key=True)  # Field name made lowercase.
    typelot = models.CharField(db_column='typeLot', max_length=20, blank=True, null=True)  # Field name made lowercase.
    nbretickets = models.IntegerField(db_column='nbreTickets')  # Field name made lowercase.
    prixlot = models.BigIntegerField(db_column='prixLot')  # Field name made lowercase.
    idticket = models.ForeignKey('Ticket', models.DO_NOTHING, db_column='idTicket')  # Field name made lowercase.
    datecreation = models.DateTimeField(db_column='dateCreation', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lots_ticket'


class MouvementStock(models.Model):
    idmouvement = models.BigAutoField(db_column='idMouvement', primary_key=True)  # Field name made lowercase.
    idproduit = models.ForeignKey('Produit', models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    quantite = models.DecimalField(max_digits=10, decimal_places=2)
    datemouvement = models.DateTimeField()
    estsortie = models.IntegerField()
    idrapport = models.ForeignKey('Rapport', models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mouvement_stock'


class Periode(models.Model):
    idperiode = models.IntegerField(db_column='idPeriode', primary_key=True)  # Field name made lowercase.
    nomperiode = models.CharField(db_column='nomPeriode', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'periode'


class Produit(models.Model):
    idproduit = models.CharField(db_column='idProduit', primary_key=True, max_length=5)  # Field name made lowercase.
    nomproduit = models.CharField(db_column='nomProduit', max_length=25)  # Field name made lowercase.
    quantitedisponible = models.DecimalField(db_column='quantiteDisponible', max_digits=10, decimal_places=2)  # Field name made lowercase.
    seuilcritique = models.DecimalField(db_column='seuilCritique', max_digits=10, decimal_places=2)  # Field name made lowercase.
    ration = models.FloatField(blank=True, null=True)
    etat = models.CharField(max_length=10)
    idfournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')  # Field name made lowercase.
    idcategorie = models.ForeignKey(Categorie, models.DO_NOTHING, db_column='idCategorie')  # Field name made lowercase.
    dateajout = models.DateTimeField(db_column='dateAjout', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'produit'


class Rapport(models.Model):
    idrapport = models.BigAutoField(db_column='idRapport', primary_key=True)  # Field name made lowercase.
    idtyperapport = models.ForeignKey('Typerapport', models.DO_NOTHING, db_column='idTypeRapport')  # Field name made lowercase.
    fichier = models.CharField(max_length=255, blank=True, null=True)
    daterapport = models.DateTimeField(db_column='dateRapport')  # Field name made lowercase.
    idutilisateur = models.ForeignKey('Utilisateur', models.DO_NOTHING, db_column='idUtilisateur')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rapport'


class Recu(models.Model):
    idrecu = models.BigAutoField(db_column='idRecu', primary_key=True)  # Field name made lowercase.
    daterecu = models.DateField(db_column='dateRecu')  # Field name made lowercase.
    idproduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    idfournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='idFournisseur')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'recu'


class Reservation(models.Model):
    idreservation = models.BigAutoField(db_column='idReservation', primary_key=True)  # Field name made lowercase.
    datereservation = models.DateField(db_column='dateReservation')  # Field name made lowercase.
    idetudiant = models.ForeignKey(Etudiant, models.DO_NOTHING, db_column='idEtudiant')  # Field name made lowercase.
    idjour = models.ForeignKey(Jour, models.DO_NOTHING, db_column='idJour')  # Field name made lowercase.
    idperiode = models.ForeignKey(Periode, models.DO_NOTHING, db_column='idPeriode')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'reservation'


class Stock(models.Model):
    idstock = models.IntegerField(db_column='idStock', primary_key=True)  # Field name made lowercase. The composite primary key (idStock, idProduit, dateStock) found, that is not supported. The first column is selected.
    idproduit = models.ForeignKey(Produit, models.DO_NOTHING, db_column='idProduit')  # Field name made lowercase.
    idmouvement = models.ForeignKey(MouvementStock, models.DO_NOTHING, db_column='idMouvement')  # Field name made lowercase.
    idrapport = models.ForeignKey(Rapport, models.DO_NOTHING, db_column='idRapport')  # Field name made lowercase.
    datestock = models.DateField(db_column='dateStock')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stock'
        unique_together = (('idstock', 'idproduit', 'datestock'),)


class Ticket(models.Model):
    idticket = models.IntegerField(db_column='idTicket', primary_key=True)  # Field name made lowercase.
    prixticket = models.IntegerField(db_column='prixTicket')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ticket'


class Typerapport(models.Model):
    idtyperapport = models.BigAutoField(db_column='idTypeRapport', primary_key=True)  # Field name made lowercase.
    nomtyperapport = models.CharField(db_column='nomTypeRapport', max_length=25)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'typerapport'


class Utilisateur(models.Model):
    idutilisateur = models.AutoField(db_column='idUtilisateur', primary_key=True)  # Field name made lowercase.
    nom = models.CharField(max_length=20, blank=True, null=True)
    prenom = models.CharField(max_length=20)
    motpasse = models.CharField(db_column='motPasse', max_length=255)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    telephone = models.CharField(unique=True, max_length=25)
    role = models.CharField(max_length=19)
    datecreation = models.DateTimeField(db_column='dateCreation', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'utilisateur'
