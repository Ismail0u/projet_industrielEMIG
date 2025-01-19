# projet_industriel
 voici le versionning pour notre projet industriel , l'application web de gestion du restaurant de l'EMIG
 # quelsques explications sur les étapes de configuration et autres : 
-tout d'abord nous avions créer un repository github nommé projet_industriel , qui contiendra notre application et autres :
-- executer le fichier projet_industriel.sql (en faisant source cheminfichier) pour creer la base de donnée et les différents objets.
dans projet_industriel nous avions :
projet_industriel/
|
|__monBackend/
|
|__monFrontend/
|
|__.gitignore
|
|__readme.md

-- Dans le projet monBackend : nous avions configuré le framework django , le framework djangorestframework pour les APIREST et mysqlclient pour la connexion au SGBD Mysql ; les étapes utiliser pour la création : 
	- D'abord s'assurer que python est installer et vérifier la version  (en faisant python3 --version)
	- Installer pip ( il permettra de télécharger des packages nécessaires)
	-après, configuration d'un virtual environnement  dans le dossier monbackend pour pouvoir installer django , djangorestframework et mysqlclient (pour que leurs versions ne soit que pour cet environenement , vous pouviez avoir un autre environnement qui pourrait avoir d'autre version): en faisant python3 -m venv lenomdeenvironnement
	-après, nous avions activer le venv et installer django, djangorestframework et myqlclient : (activation: .lenomdeenvironnement\Scripts\activate ) après (installation : pip3 install django djangorestframework mysqlclient)
	-installation du projet : ( django-admin startproject nomprojet)
	- création d'une application dans le projet ( cd nomprojet) puis (python3 manage.py startapp nomappli)
	-ouvrez le fichier (settings.py qui se trouve dans nomprojet , et faites les modifications suivantes si nécessaires : 
		# myproject/settings.py
		DATABASES = {
		    'default': {
		        'ENGINE': 'django.db.backends.mysql',
		        'NAME': 'your_database_name',
		        'USER': 'your_database_user',
		        'PASSWORD': 'your_database_password',
		        'HOST': 'localhost',
		        'PORT': '3306',
		    }
		}

		INSTALLED_APPS = [
		    ...
		    'rest_framework',
		    'nomappli',
		]
	-génération des modéles à partir de notre base de données( python3 manage.py inspectdb > monappli/models.py) ouverture du fichier models.py pour vérifier si tout c'est bien passé
	-après cela tout etait normalement bien.
	-lancer le serveur Django ( taper la commande python3 manage.py runserver , après cela copier l'addresse url et mettez le dans votre navigateur)
	-nous avions quitter le repertoire monbackend et avions créer un autre repertoire monfrontend dans le dossier projet_industriel
-- dans le dossier monfrontend nous avions installer react et le framework axios : 
	-pour installer react nous avions fait : npm create vite@latest nomprojet (après nous avions fait les configuraion nécessaire)
	-aller dans le dossier nomprojet et installer axios ( npm install axios)
	- lancer le serveur react(en faissant npm start ou npm run dev)et copier l'adresse dans le navigateur .

VOICI TOUTES LES ETAPES EFFECTUEES POUR LA CONFIGURATION , QUAND VOUS ALLIEZ CLONER LE REPOSITORY ,VOUS N'AUREZ QU'A OUVRIR DEUX FENETRE DE L'INVITE DE COMMANDE ET ALLER DANS LES REPERTOIRES NECESSAIRES(MONBACKEND ET MONFRONTEND) ET LANCER LES SERVEURS DJANGO ET REACT 
