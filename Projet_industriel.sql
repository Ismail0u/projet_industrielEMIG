-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour kayanabinchi
CREATE DATABASE IF NOT EXISTS `kayanabinchi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kayanabinchi`;

-- Listage de la structure de table kayanabinchi. auth_group
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_group : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. auth_group_permissions
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_group_permissions : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. auth_permission
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_permission : ~100 rows (environ)
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can view log entry', 1, 'view_logentry'),
	(5, 'Can add permission', 2, 'add_permission'),
	(6, 'Can change permission', 2, 'change_permission'),
	(7, 'Can delete permission', 2, 'delete_permission'),
	(8, 'Can view permission', 2, 'view_permission'),
	(9, 'Can add group', 3, 'add_group'),
	(10, 'Can change group', 3, 'change_group'),
	(11, 'Can delete group', 3, 'delete_group'),
	(12, 'Can view group', 3, 'view_group'),
	(13, 'Can add user', 4, 'add_user'),
	(14, 'Can change user', 4, 'change_user'),
	(15, 'Can delete user', 4, 'delete_user'),
	(16, 'Can view user', 4, 'view_user'),
	(17, 'Can add content type', 5, 'add_contenttype'),
	(18, 'Can change content type', 5, 'change_contenttype'),
	(19, 'Can delete content type', 5, 'delete_contenttype'),
	(20, 'Can view content type', 5, 'view_contenttype'),
	(21, 'Can add session', 6, 'add_session'),
	(22, 'Can change session', 6, 'change_session'),
	(23, 'Can delete session', 6, 'delete_session'),
	(24, 'Can view session', 6, 'view_session'),
	(25, 'Can add categorie', 7, 'add_categorie'),
	(26, 'Can change categorie', 7, 'change_categorie'),
	(27, 'Can delete categorie', 7, 'delete_categorie'),
	(28, 'Can view categorie', 7, 'view_categorie'),
	(29, 'Can add etudiant', 8, 'add_etudiant'),
	(30, 'Can change etudiant', 8, 'change_etudiant'),
	(31, 'Can delete etudiant', 8, 'delete_etudiant'),
	(32, 'Can view etudiant', 8, 'view_etudiant'),
	(33, 'Can add fournisseur', 9, 'add_fournisseur'),
	(34, 'Can change fournisseur', 9, 'change_fournisseur'),
	(35, 'Can delete fournisseur', 9, 'delete_fournisseur'),
	(36, 'Can view fournisseur', 9, 'view_fournisseur'),
	(37, 'Can add gestion tickets', 10, 'add_gestiontickets'),
	(38, 'Can change gestion tickets', 10, 'change_gestiontickets'),
	(39, 'Can delete gestion tickets', 10, 'delete_gestiontickets'),
	(40, 'Can view gestion tickets', 10, 'view_gestiontickets'),
	(41, 'Can add jour', 11, 'add_jour'),
	(42, 'Can change jour', 11, 'change_jour'),
	(43, 'Can delete jour', 11, 'delete_jour'),
	(44, 'Can view jour', 11, 'view_jour'),
	(45, 'Can add lots ticket', 12, 'add_lotsticket'),
	(46, 'Can change lots ticket', 12, 'change_lotsticket'),
	(47, 'Can delete lots ticket', 12, 'delete_lotsticket'),
	(48, 'Can view lots ticket', 12, 'view_lotsticket'),
	(49, 'Can add mouvement stock', 13, 'add_mouvementstock'),
	(50, 'Can change mouvement stock', 13, 'change_mouvementstock'),
	(51, 'Can delete mouvement stock', 13, 'delete_mouvementstock'),
	(52, 'Can view mouvement stock', 13, 'view_mouvementstock'),
	(53, 'Can add periode', 14, 'add_periode'),
	(54, 'Can change periode', 14, 'change_periode'),
	(55, 'Can delete periode', 14, 'delete_periode'),
	(56, 'Can view periode', 14, 'view_periode'),
	(57, 'Can add produit', 15, 'add_produit'),
	(58, 'Can change produit', 15, 'change_produit'),
	(59, 'Can delete produit', 15, 'delete_produit'),
	(60, 'Can view produit', 15, 'view_produit'),
	(61, 'Can add rapport', 16, 'add_rapport'),
	(62, 'Can change rapport', 16, 'change_rapport'),
	(63, 'Can delete rapport', 16, 'delete_rapport'),
	(64, 'Can view rapport', 16, 'view_rapport'),
	(65, 'Can add recu', 17, 'add_recu'),
	(66, 'Can change recu', 17, 'change_recu'),
	(67, 'Can delete recu', 17, 'delete_recu'),
	(68, 'Can view recu', 17, 'view_recu'),
	(69, 'Can add reservation', 18, 'add_reservation'),
	(70, 'Can change reservation', 18, 'change_reservation'),
	(71, 'Can delete reservation', 18, 'delete_reservation'),
	(72, 'Can view reservation', 18, 'view_reservation'),
	(73, 'Can add stock', 19, 'add_stock'),
	(74, 'Can change stock', 19, 'change_stock'),
	(75, 'Can delete stock', 19, 'delete_stock'),
	(76, 'Can view stock', 19, 'view_stock'),
	(77, 'Can add ticket', 20, 'add_ticket'),
	(78, 'Can change ticket', 20, 'change_ticket'),
	(79, 'Can delete ticket', 20, 'delete_ticket'),
	(80, 'Can view ticket', 20, 'view_ticket'),
	(81, 'Can add typerapport', 21, 'add_typerapport'),
	(82, 'Can change typerapport', 21, 'change_typerapport'),
	(83, 'Can delete typerapport', 21, 'delete_typerapport'),
	(84, 'Can view typerapport', 21, 'view_typerapport'),
	(85, 'Can add utilisateur', 22, 'add_utilisateur'),
	(86, 'Can change utilisateur', 22, 'change_utilisateur'),
	(87, 'Can delete utilisateur', 22, 'delete_utilisateur'),
	(88, 'Can view utilisateur', 22, 'view_utilisateur'),
	(89, 'Can add argent remis', 23, 'add_argentremis'),
	(90, 'Can change argent remis', 23, 'change_argentremis'),
	(91, 'Can delete argent remis', 23, 'delete_argentremis'),
	(92, 'Can view argent remis', 23, 'view_argentremis'),
	(93, 'Can add lot', 24, 'add_lot'),
	(94, 'Can change lot', 24, 'change_lot'),
	(95, 'Can delete lot', 24, 'delete_lot'),
	(96, 'Can view lot', 24, 'view_lot'),
	(97, 'Can add ticket vendu', 25, 'add_ticketvendu'),
	(98, 'Can change ticket vendu', 25, 'change_ticketvendu'),
	(99, 'Can delete ticket vendu', 25, 'delete_ticketvendu'),
	(100, 'Can view ticket vendu', 25, 'view_ticketvendu');

-- Listage de la structure de table kayanabinchi. auth_user
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_user : ~0 rows (environ)
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
	(1, 'pbkdf2_sha256$870000$BvMSZjr3rgxOrJ9ObngYXo$tpmfj3K8AiacMCqxcjGdpkl6xU2nQYAeRhwY6teqJgA=', '2025-01-18 22:25:16.700479', 1, 'emigadmin', '', '', 'moussaisma05@gmail.com', 1, 1, '2025-01-18 22:20:39.162524');

-- Listage de la structure de table kayanabinchi. auth_user_groups
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_user_groups : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. auth_user_user_permissions
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.auth_user_user_permissions : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. categorie
CREATE TABLE IF NOT EXISTS `categorie` (
  `idCategorie` int NOT NULL,
  `nomCategorie` varchar(25) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.categorie : ~7 rows (environ)
INSERT INTO `categorie` (`idCategorie`, `nomCategorie`) VALUES
	(1, 'denrée'),
	(2, 'rafine'),
	(3, 'piments'),
	(4, 'produits laitiers'),
	(5, 'légumes'),
	(6, 'céréales'),
	(7, 'produits Sucrés');

-- Listage de la structure de table kayanabinchi. django_admin_log
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.django_admin_log : ~3 rows (environ)
INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
	(1, '2025-01-20 22:57:58.114894', '1', 'Utilisateur object (1)', 1, '[{"added": {}}]', 22, 1),
	(2, '2025-01-21 14:00:18.687419', 'F001', 'Fournisseur object (F001)', 1, '[{"added": {}}]', 9, 1),
	(3, '2025-01-21 14:00:55.252351', 'F002', 'Fournisseur object (F002)', 1, '[{"added": {}}]', 9, 1);

-- Listage de la structure de table kayanabinchi. django_content_type
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.django_content_type : ~22 rows (environ)
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(1, 'admin', 'logentry'),
	(3, 'auth', 'group'),
	(2, 'auth', 'permission'),
	(4, 'auth', 'user'),
	(5, 'contenttypes', 'contenttype'),
	(23, 'restoapp', 'argentremis'),
	(7, 'restoapp', 'categorie'),
	(8, 'restoapp', 'etudiant'),
	(9, 'restoapp', 'fournisseur'),
	(10, 'restoapp', 'gestiontickets'),
	(11, 'restoapp', 'jour'),
	(24, 'restoapp', 'lot'),
	(12, 'restoapp', 'lotsticket'),
	(13, 'restoapp', 'mouvementstock'),
	(14, 'restoapp', 'periode'),
	(15, 'restoapp', 'produit'),
	(16, 'restoapp', 'rapport'),
	(17, 'restoapp', 'recu'),
	(18, 'restoapp', 'reservation'),
	(19, 'restoapp', 'stock'),
	(20, 'restoapp', 'ticket'),
	(25, 'restoapp', 'ticketvendu'),
	(21, 'restoapp', 'typerapport'),
	(22, 'restoapp', 'utilisateur'),
	(6, 'sessions', 'session');

-- Listage de la structure de table kayanabinchi. django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.django_migrations : ~18 rows (environ)
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'contenttypes', '0001_initial', '2025-01-18 21:30:06.041836'),
	(2, 'auth', '0001_initial', '2025-01-18 21:30:09.713682'),
	(3, 'admin', '0001_initial', '2025-01-18 21:30:10.448069'),
	(4, 'admin', '0002_logentry_remove_auto_add', '2025-01-18 21:30:10.510560'),
	(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-01-18 21:30:10.557423'),
	(6, 'contenttypes', '0002_remove_content_type_name', '2025-01-18 21:30:10.916800'),
	(7, 'auth', '0002_alter_permission_name_max_length', '2025-01-18 21:30:11.198047'),
	(8, 'auth', '0003_alter_user_email_max_length', '2025-01-18 21:30:11.323047'),
	(9, 'auth', '0004_alter_user_username_opts', '2025-01-18 21:30:11.354296'),
	(10, 'auth', '0005_alter_user_last_login_null', '2025-01-18 21:30:11.619945'),
	(11, 'auth', '0006_require_contenttypes_0002', '2025-01-18 21:30:11.651189'),
	(12, 'auth', '0007_alter_validators_add_error_messages', '2025-01-18 21:30:11.682437'),
	(13, 'auth', '0008_alter_user_username_max_length', '2025-01-18 21:30:11.932511'),
	(14, 'auth', '0009_alter_user_last_name_max_length', '2025-01-18 21:30:12.244934'),
	(15, 'auth', '0010_alter_group_name_max_length', '2025-01-18 21:30:12.323135'),
	(16, 'auth', '0011_update_proxy_permissions', '2025-01-18 21:30:12.369940'),
	(17, 'auth', '0012_alter_user_first_name_max_length', '2025-01-18 21:30:12.760550'),
	(19, 'sessions', '0001_initial', '2025-01-18 21:30:13.166809'),
	(23, 'restoapp', '0001_initial', '2025-02-03 15:27:13.527034');

-- Listage de la structure de table kayanabinchi. django_session
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.django_session : ~1 rows (environ)
INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
	('w1v8fug541zlwbhwfkunsybjk4300y2c', '.eJxVjMsOwiAUBf-FtSGAlF5cuu83EO4DqZo2Ke3K-O_apAvdnpk5L5Xytta0NVnSyOqirDr9bpjpIdMO-J6n26xpntZlRL0r-qBNDzPL83q4fwc1t_qtAZBKjAQY2KEVAEcRTfBRyHchFN-X2APbYk3EzMYZtiSdOwcpDlC9P-87OBw:1tZHFl:ziCK0dWcRfDB8UNRFePovEu6UgQnUcJ5u0ihwQIVsio', '2025-02-01 22:25:17.137018');

-- Listage de la structure de table kayanabinchi. etudiant
CREATE TABLE IF NOT EXISTS `etudiant` (
  `idEtudiant` int NOT NULL,
  `nomEtudiant` varchar(50) NOT NULL,
  `prenomEtudiant` varchar(45) NOT NULL,
  PRIMARY KEY (`idEtudiant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.etudiant : ~2 rows (environ)
INSERT INTO `etudiant` (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`) VALUES
	(1, 'MANSOUR', 'Chaibou'),
	(2, 'ISSA', 'Mohamed');

-- Listage de la structure de table kayanabinchi. fournisseur
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `idFournisseur` varchar(5) NOT NULL,
  `nomFournisseur` varchar(45) NOT NULL,
  `contact` varchar(55) NOT NULL,
  `dateAjout` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idFournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.fournisseur : ~5 rows (environ)
INSERT INTO `fournisseur` (`idFournisseur`, `nomFournisseur`, `contact`, `dateAjout`) VALUES
	('F001', 'hhhh', '123654789', '2025-01-21 12:00:00'),
	('F002', 'MOUSSAKAINA', '654123987', '2025-01-21 13:00:51'),
	('F003', 'karimoune', 'niamey 2000', NULL),
	('F004', 'issia', 'dfghjkfghjklfghjk', '2025-01-29 20:23:00'),
	('F005', 'moussa issa', 'aqzesrdtfyuhikopl', '2025-01-30 20:58:00'),
	('F006', 'MOUSSA Isder', 'azscccccghuilllllllmoijhbv', '2025-02-05 23:50:00'),
	('F007', 'Ibrahimou', 'Gamkalé', '2025-02-08 10:52:00');

-- Listage de la structure de table kayanabinchi. gestion_tickets
CREATE TABLE IF NOT EXISTS `gestion_tickets` (
  `idGestionTickets` bigint NOT NULL AUTO_INCREMENT,
  `nbreTicketVendu` int NOT NULL,
  `nbreTicketRestant` int NOT NULL,
  `idLots` bigint NOT NULL,
  `dategestionTicket` date NOT NULL,
  `argentARemettre` float NOT NULL,
  `argentRemis` float NOT NULL,
  `idRapport` bigint NOT NULL,
  PRIMARY KEY (`idGestionTickets`),
  KEY `fk_etranLots` (`idLots`),
  KEY `fk_etranRapport` (`idRapport`),
  CONSTRAINT `fk_etranLots` FOREIGN KEY (`idLots`) REFERENCES `lots_ticket` (`idLots`),
  CONSTRAINT `fk_etranRapport` FOREIGN KEY (`idRapport`) REFERENCES `rapport` (`idRapport`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.gestion_tickets : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. jour
CREATE TABLE IF NOT EXISTS `jour` (
  `idJour` int NOT NULL,
  `nomJour` varchar(10) NOT NULL,
  PRIMARY KEY (`idJour`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.jour : ~7 rows (environ)
INSERT INTO `jour` (`idJour`, `nomJour`) VALUES
	(1, 'Lundi'),
	(2, 'Mardi'),
	(3, 'Mercredi'),
	(4, 'Jeudi'),
	(5, 'Vendredi'),
	(6, 'Samedi'),
	(7, 'Dimanche');

-- Listage de la structure de table kayanabinchi. lots_ticket
CREATE TABLE IF NOT EXISTS `lots_ticket` (
  `idLots` bigint NOT NULL AUTO_INCREMENT,
  `typeLot` varchar(20) DEFAULT NULL,
  `nbreTickets` int NOT NULL,
  `prixLot` bigint NOT NULL,
  `idTicket` int NOT NULL,
  `dateCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idLots`),
  KEY `fk_etran_tick_lot` (`idTicket`),
  CONSTRAINT `fk_etran_tick_lot` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`),
  CONSTRAINT `check_prix` CHECK ((`prixLot` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.lots_ticket : ~0 rows (environ)
INSERT INTO `lots_ticket` (`idLots`, `typeLot`, `nbreTickets`, `prixLot`, `idTicket`, `dateCreation`) VALUES
	(1, '1', 55, 45111, 1, NULL);

-- Listage de la structure de table kayanabinchi. mouvement_stock
CREATE TABLE IF NOT EXISTS `mouvement_stock` (
  `idMouvement` bigint NOT NULL AUTO_INCREMENT,
  `idProduit` varchar(5) NOT NULL,
  `quantite` decimal(10,2) NOT NULL,
  `idRapport` bigint DEFAULT NULL,
  `idJour` int NOT NULL,
  `datemouvement` date DEFAULT NULL,
  `estSortie` int DEFAULT NULL,
  PRIMARY KEY (`idMouvement`),
  KEY `idJour` (`idJour`),
  KEY `fk_etranProdMvmnt` (`idProduit`),
  CONSTRAINT `fk_etranJourMvmnt` FOREIGN KEY (`idJour`) REFERENCES `jour` (`idJour`),
  CONSTRAINT `fk_etranProdMvmnt` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.mouvement_stock : ~18 rows (environ)
INSERT INTO `mouvement_stock` (`idMouvement`, `idProduit`, `quantite`, `idRapport`, `idJour`, `datemouvement`, `estSortie`) VALUES
	(1, 'P0001', 450.00, 1, 5, '2025-02-14', 0),
	(2, 'P0001', 0.00, 1, 5, '2025-02-14', 1),
	(4, 'P0002', 0.00, 1, 5, '2025-02-14', 1),
	(5, 'P0003', 100.00, 1, 5, '2025-02-14', 1),
	(6, 'P0003', 0.00, 1, 5, '2025-02-14', 1),
	(7, 'P0004', 150.00, 1, 5, '2025-02-14', 0),
	(8, 'P0004', 0.00, 1, 5, '2025-02-14', 1),
	(9, 'P0005', 450.00, 1, 5, '2025-02-14', 0),
	(10, 'P0005', 0.00, 1, 5, '2025-02-14', 1),
	(12, 'P0006', 45.00, 1, 5, '2025-02-14', 1),
	(13, 'P0008', 250.00, 1, 5, '2025-02-14', 0),
	(14, 'P0008', 0.00, 1, 5, '2025-02-14', 1),
	(15, 'P0009', 400.00, 1, 5, '2025-02-14', 0),
	(16, 'P0009', 0.00, 1, 5, '2025-02-14', 1),
	(17, 'P0006', 500.00, NULL, 5, NULL, 0),
	(18, 'P0002', 500.00, NULL, 5, NULL, 0),
	(19, 'P0006', 50.00, NULL, 6, NULL, 1),
	(20, 'P0001', 50.00, NULL, 7, NULL, 1),
	(21, 'P0002', 300.00, NULL, 7, NULL, 1);

-- Listage de la structure de table kayanabinchi. periode
CREATE TABLE IF NOT EXISTS `periode` (
  `idPeriode` int NOT NULL,
  `nomPeriode` varchar(10) NOT NULL,
  PRIMARY KEY (`idPeriode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.periode : ~2 rows (environ)
INSERT INTO `periode` (`idPeriode`, `nomPeriode`) VALUES
	(1, 'petitDej'),
	(2, 'dejeuner'),
	(3, 'diner');

-- Listage de la structure de table kayanabinchi. produit
CREATE TABLE IF NOT EXISTS `produit` (
  `idProduit` varchar(5) NOT NULL,
  `nomProduit` varchar(25) NOT NULL,
  `quantiteDisponible` decimal(10,2) NOT NULL,
  `seuilCritique` decimal(10,2) NOT NULL,
  `ration` float DEFAULT NULL,
  `etat` enum('DISPONIBLE','RUPTURE','CRITIQUE') NOT NULL,
  `idFournisseur` varchar(5) NOT NULL,
  `idCategorie` int NOT NULL,
  `dateAjout` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idProduit`),
  KEY `fk_etranFourni` (`idFournisseur`),
  KEY `fk_etranCategorie` (`idCategorie`),
  CONSTRAINT `fk_etranCategorie` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`),
  CONSTRAINT `fk_etranFourni` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.produit : ~8 rows (environ)
INSERT INTO `produit` (`idProduit`, `nomProduit`, `quantiteDisponible`, `seuilCritique`, `ration`, `etat`, `idFournisseur`, `idCategorie`, `dateAjout`) VALUES
	('P0001', 'Riz(kg)', 0.00, 150.00, 0.3, 'CRITIQUE', 'F007', 6, NULL),
	('P0002', 'Poivre(KG)', 50.00, 50.00, 0.5, 'CRITIQUE', 'F004', 5, NULL),
	('P0003', 'pomme de terre(KG)', 50.00, 300.00, 1, 'CRITIQUE', 'F003', 1, NULL),
	('P0004', 'Sucre(KG)', 150.00, 50.00, 0.6, 'DISPONIBLE', 'F002', 7, NULL),
	('P0005', 'manioc(kg)', 450.00, 165.00, 4, 'DISPONIBLE', 'F007', 6, NULL),
	('P0006', 'igname(KG)', 55.00, 300.00, 1, 'CRITIQUE', 'F001', 1, NULL),
	('P0008', 'lait concentré', 250.00, 120.00, 0.6, 'DISPONIBLE', 'F006', 4, NULL),
	('P0009', 'pain', 400.00, 200.00, 0.2, 'DISPONIBLE', 'F003', 2, NULL);

-- Listage de la structure de table kayanabinchi. rapport
CREATE TABLE IF NOT EXISTS `rapport` (
  `idRapport` bigint NOT NULL AUTO_INCREMENT,
  `idTypeRapport` bigint NOT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `dateRapport` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUtilisateur` int NOT NULL,
  PRIMARY KEY (`idRapport`),
  KEY `fk_etranidTypeRapport` (`idTypeRapport`),
  KEY `fk_etranidUtilisateur` (`idUtilisateur`),
  CONSTRAINT `fk_etranidTypeRapport` FOREIGN KEY (`idTypeRapport`) REFERENCES `typerapport` (`idTypeRapport`),
  CONSTRAINT `fk_etranidUtilisateur` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.rapport : ~0 rows (environ)
INSERT INTO `rapport` (`idRapport`, `idTypeRapport`, `fichier`, `dateRapport`, `idUtilisateur`) VALUES
	(1, 1, 'bonjour comment allez vous ?', '2025-01-26 22:25:00', 2);

-- Listage de la structure de table kayanabinchi. recu
CREATE TABLE IF NOT EXISTS `recu` (
  `idRecu` bigint NOT NULL AUTO_INCREMENT,
  `dateRecu` date NOT NULL,
  `idProduit` varchar(5) NOT NULL,
  `idFournisseur` varchar(5) NOT NULL,
  `quantite` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idRecu`),
  KEY `fk_etranFourniREcu` (`idFournisseur`),
  KEY `fk_etranProdRecu` (`idProduit`),
  CONSTRAINT `fk_etranFourniREcu` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`),
  CONSTRAINT `fk_etranProdRecu` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.recu : ~2 rows (environ)
INSERT INTO `recu` (`idRecu`, `dateRecu`, `idProduit`, `idFournisseur`, `quantite`) VALUES
	(1, '2025-02-14', 'P0003', 'F005', 500.00),
	(2, '2025-02-14', 'P0001', 'F007', 500.00);

-- Listage de la structure de table kayanabinchi. reservation
CREATE TABLE IF NOT EXISTS `reservation` (
  `idReservation` bigint NOT NULL AUTO_INCREMENT,
  `dateReservation` date NOT NULL,
  `idEtudiant` int NOT NULL,
  `idJour` int NOT NULL,
  `idPeriode` int NOT NULL,
  PRIMARY KEY (`idReservation`),
  KEY `fk_etranJour` (`idJour`),
  KEY `fk_etranEtudiant` (`idEtudiant`),
  KEY `fk_etranPeriode` (`idPeriode`),
  CONSTRAINT `fk_etranEtudiant` FOREIGN KEY (`idEtudiant`) REFERENCES `etudiant` (`idEtudiant`),
  CONSTRAINT `fk_etranJour` FOREIGN KEY (`idJour`) REFERENCES `jour` (`idJour`),
  CONSTRAINT `fk_etranPeriode` FOREIGN KEY (`idPeriode`) REFERENCES `periode` (`idPeriode`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.reservation : ~18 rows (environ)
INSERT INTO `reservation` (`idReservation`, `dateReservation`, `idEtudiant`, `idJour`, `idPeriode`) VALUES
	(40, '2025-02-13', 1, 5, 2),
	(42, '2025-02-13', 1, 5, 3),
	(44, '2025-02-13', 1, 6, 1),
	(46, '2025-02-13', 1, 6, 2),
	(48, '2025-02-13', 1, 6, 3),
	(50, '2025-02-13', 1, 7, 1),
	(52, '2025-02-13', 1, 7, 2),
	(54, '2025-02-13', 1, 7, 3),
	(98, '2025-02-13', 1, 5, 1),
	(100, '2025-02-13', 1, 5, 2),
	(102, '2025-02-13', 1, 5, 3),
	(104, '2025-02-13', 1, 6, 1),
	(106, '2025-02-13', 1, 6, 2),
	(108, '2025-02-13', 1, 6, 3),
	(110, '2025-02-13', 1, 7, 1),
	(112, '2025-02-13', 1, 7, 2),
	(114, '2025-02-13', 1, 7, 3),
	(116, '2025-02-13', 1, 1, 1),
	(117, '2025-02-13', 1, 1, 2),
	(118, '2025-02-13', 1, 1, 3);

-- Listage de la structure de table kayanabinchi. restoapp_argentremis
CREATE TABLE IF NOT EXISTS `restoapp_argentremis` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `montant` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.restoapp_argentremis : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. restoapp_lot
CREATE TABLE IF NOT EXISTS `restoapp_lot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_lot` varchar(20) NOT NULL,
  `nombre_lot` int NOT NULL,
  `montant` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.restoapp_lot : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. restoapp_ticketvendu
CREATE TABLE IF NOT EXISTS `restoapp_ticketvendu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type_ticket` varchar(20) NOT NULL,
  `nombre_ticket` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.restoapp_ticketvendu : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. stock
CREATE TABLE IF NOT EXISTS `stock` (
  `idStock` int NOT NULL,
  `idProduit` varchar(5) NOT NULL,
  `idMouvement` bigint NOT NULL,
  `idRapport` bigint NOT NULL,
  `dateStock` date NOT NULL,
  PRIMARY KEY (`idStock`,`idProduit`,`dateStock`),
  KEY `fk_etranProdStock` (`idProduit`),
  KEY `fk_etranMvnmStock` (`idMouvement`),
  KEY `fk_etranRappStock` (`idRapport`),
  CONSTRAINT `fk_etranMvnmStock` FOREIGN KEY (`idMouvement`) REFERENCES `mouvement_stock` (`idMouvement`),
  CONSTRAINT `fk_etranProdStock` FOREIGN KEY (`idProduit`) REFERENCES `produit` (`idProduit`),
  CONSTRAINT `fk_etranRappStock` FOREIGN KEY (`idRapport`) REFERENCES `rapport` (`idRapport`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.stock : ~0 rows (environ)

-- Listage de la structure de table kayanabinchi. ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `idTicket` int NOT NULL,
  `prixTicket` int NOT NULL,
  PRIMARY KEY (`idTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.ticket : ~2 rows (environ)
INSERT INTO `ticket` (`idTicket`, `prixTicket`) VALUES
	(1, 80),
	(2, 125);

-- Listage de la structure de table kayanabinchi. typerapport
CREATE TABLE IF NOT EXISTS `typerapport` (
  `idTypeRapport` bigint NOT NULL AUTO_INCREMENT,
  `nomTypeRapport` varchar(25) NOT NULL,
  PRIMARY KEY (`idTypeRapport`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.typerapport : ~1 rows (environ)
INSERT INTO `typerapport` (`idTypeRapport`, `nomTypeRapport`) VALUES
	(1, 'fichiejk'),
	(5, 'gthyy');

-- Listage de la structure de table kayanabinchi. utilisateur
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) DEFAULT NULL,
  `prenom` varchar(20) NOT NULL,
  `motPasse` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telephone` varchar(25) NOT NULL,
  `role` enum('ADMIN','MAGAZINIER','VENDEUR_TICKET','RESPONSABLE_GUICHET','CHEF_SERV_RESTO','DMGC') NOT NULL,
  `dateCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `telephone` (`telephone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table kayanabinchi.utilisateur : ~0 rows (environ)
INSERT INTO `utilisateur` (`idUtilisateur`, `nom`, `prenom`, `motPasse`, `email`, `telephone`, `role`, `dateCreation`) VALUES
	(1, 'MOUSSA', 'seydou', 'moussaseydou', 'memig@gmail.com', '98765432', 'MAGAZINIER', '2025-01-20 21:57:53'),
	(2, 'Ibrahima', 'issa', 'issaibrahima', 'issa@gmail.com', '78451236', 'RESPONSABLE_GUICHET', '2025-01-26 21:59:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
