CREATE DATABASE IF NOT EXISTS KayanAbinchi;
use KayanAbinchi;

create table utilisateur(
	idUtilisateur int auto_increment not null,
	nom varchar(20),
	prenom varchar(20) not null,
	motPasse varchar(255) not null,
	email varchar(100) unique,
	telephone varchar(25) unique not null,
	role enum('ADMIN','MAGAZINIER','VENDEUR_TICKET','RESPONSABLE_GUICHET','CHEF_SERV_RESTO','DMGC') not null,
	dateCreation timestamp default current_timestamp,
    constraint fk_primaireUser primary key(idUtilisateur)
);

create table ticket(
	idTicket int not null,
	prixTicket int not null,
    constraint fk_primaireTicket primary key(idTicket)
);

create table lots_ticket(
	idLots bigint auto_increment not null,
    typeLot varchar(20),
    nbreTickets int not null,
    prixLot bigint not null,
    idTicket int not null,
    dateCreation timestamp default current_timestamp,
    constraint fk_etran_tick_lot foreign key(idTicket) references ticket(idTicket),
    constraint fk_primaireLots_ticket primary key(idLots),
   constraint check_prix check(prixLot >0)
);
-- drop table lots_ticket;

create table typeRapport(
	idTypeRapport bigint auto_increment not null,
    nomTypeRapport varchar(25) not null,
    constraint fk_primaireTypRapp primary key(idTypeRapport)
);

create table Rapport(
	idRapport bigint auto_increment not null,
    idTypeRapport bigint not null,
    fichier varchar(255),
    dateRapport timestamp default current_timestamp not null,
    idUtilisateur int not null,
    constraint fk_primaireRapport primary key(idRapport),
    constraint fk_etranidTypeRapport foreign key(idTypeRapport) references typeRapport(idTypeRapport),
   constraint fk_etranidUtilisateur foreign key(idUtilisateur) references utilisateur(idUtilisateur)
);

create table gestion_tickets(
	idGestionTickets bigint auto_increment not null,
    nbreTicketVendu int not null,
    nbreTicketRestant int not null,
    idLots bigint not null,
    dategestionTicket date not null,
    argentARemettre float not null,
    argentRemis float not null,
    idRapport bigint not null,
    constraint fk_primaireGestionTicket primary key(idGestionTickets),
    constraint fk_etranLots foreign Key(idLots) references Lots_ticket(idLots),
    constraint fk_etranRapport foreign key(idRapport) references Rapport(idRapport)
);

create table categorie(
	idCategorie int not null,
    nomCategorie varchar(25) not null,
    constraint fk_primaireCategorie primary Key(idCategorie)
);

create table fournisseur(
	idFournisseur varchar(5) not null,
    nomFournisseur varchar(45) not null,
    contact varchar(55) not null,
    dateAjout timestamp default current_timestamp,
    constraint fk_primaireFournisseur primary key(idFournisseur)
    );
    
create table produit(
	idProduit Varchar(5) not null,
    nomProduit varchar(25) not null,
    quantiteDisponible decimal(10,2) not null,
     seuilCritique decimal(10,2) not null,
    ration float,
    etat ENUM('DISPONIBLE','RUPTURE','CRITIQUE') not null,
    idFournisseur varchar(5) not null,
    idCategorie int not null,
    dateAjout timestamp default current_timestamp,
    constraint fk_primaireProduit primary key(idProduit),
    constraint fk_etranFourni foreign key(idFournisseur) references fournisseur(idFournisseur),
    constraint fk_etranCategorie foreign key(idCategorie) references categorie(idCategorie)
);

create table etudiant(
	idEtudiant int not null,
    nomEtudiant varchar(50) not null,
    prenomEtudiant varchar(45) not null,
    constraint fk_primaireEtudiant primary key(idEtudiant)
);

create table jour(
	idJour int not null,
    nomJour varchar(10) not null,
    constraint fk_primaireJour primary key(idJour)
);

create table periode(
	idPeriode int not null,
    nomPeriode varchar(10) not null,
    constraint fk_primaireperiode primary key(idPeriode)
);

create table reservation(
	idReservation bigint auto_increment not null,
    dateReservation date not null,
    idEtudiant int not null,
    idJour int not null,
    idPeriode int not null,
    constraint fk_primaireReserve primary key(idReservation),
    constraint fk_etranJour foreign key(idJour) references jour(idJour),
    constraint fk_etranEtudiant foreign key(idEtudiant) references etudiant(idEtudiant),
    constraint fk_etranPeriode foreign key(idPeriode) references periode(idPeriode)
);

create table mouvement_stock(
	idMouvement bigint auto_increment not null,
    idProduit varchar(5) not null,
    quantite decimal(10,2) not null,
    datemouvement timestamp default current_timestamp not null,
    estsortie boolean not null,
    idRapport bigint not null,
    constraint fk_primaireMouveStock primary key(idMouvement),
    constraint fk_etranProdMvmnt foreign key(idProduit) references produit(idProduit),
    constraint fk_etranRappMvmnt foreign key(idRapport) references Rapport(idRapport)
);

create table stock(
	idStock int not null,
    idProduit varchar(5) ,
    idMouvement bigint not null,
    idRapport bigint not null,
    dateStock date not null,
    constraint fk_etranProduStock foreign key(idProduit) references produit(idProduit),
    constraint fk_primaireStock primary key(idStock,idProduit,dateStock),
    constraint fk_etranRappStock foreign key(idRapport) references Rapport(idRapport),
    constraint fk_etranMvmntStock foreign key(idMouvement) references mouvement_stock(idMouvement)
);

create table recu(
		idRecu bigint auto_increment not null,
        dateRecu date not null,
        idProduit varchar(5) not null,
        idFournisseur varchar(5) not null,
        constraint fk_primaireRecu primary key(idRecu),
        constraint fk_etranProduRecu foreign key(idProduit) references produit(idProduit),
        constraint fk_etranFourniREcu foreign key(idFournisseur) references fournisseur(idFournisseur)
);

