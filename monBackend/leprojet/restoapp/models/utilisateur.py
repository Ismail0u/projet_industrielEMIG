from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UtilisateurManager(BaseUserManager):
    """
    Manager personnalisé pour le modèle Utilisateur.
    """
    def create_user(self, email, motpasse=None, **extra_fields):
        """ Crée et retourne un utilisateur avec l'email et le mot de passe spécifiés. """
        if not email:
            raise ValueError("L'email doit être défini")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(motpasse)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, motpasse=None, **extra_fields):
        """ Crée et retourne un superutilisateur avec tous les privilèges. """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, motpasse, **extra_fields)

class Utilisateur(AbstractBaseUser):
    """
    Modèle représentant un utilisateur du système.
    """
    idUtilisateur = models.AutoField(db_column='idUtilisateur', primary_key=True)
    nom = models.CharField(max_length=20, blank=True, null=True)
    prenom = models.CharField(max_length=20)
    password = models.CharField(db_column='motPasse', max_length=255)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    telephone = models.CharField(unique=True, max_length=25)
    role = models.CharField(max_length=19)
    last_login = models.DateTimeField(db_column='dateCreation', blank=True, null=True)

    objects = UtilisateurManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'telephone', 'role']
    
    @property
    def get_full_name_role(self):
        """ Retourne le nom complet de l'utilisateur. """
        return f"{self.nom} {self.prenom} -> {self.role}"
    
    @property
    def get_role(self):
        return self.role
    
    def get_rapport(self):
        from .rapport import Rapport
        return Rapport.objects.filter(idUtilisateur=self)
    
    def reset_password(self, motpasse):
        """ Réinitialise le mot de passe de l'utilisateur. """
        self.set_password(motpasse)
        self.save()

    class Meta:
        managed = False
        db_table = 'utilisateur'


