from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken

class UtilisateurManager(BaseUserManager):
    def create_user(self, email, nom, prenom, telephone, role="MAGAZINIER", password=None):
        if not email:
            raise ValueError("L'email est requis")
        email = self.normalize_email(email)
        user = self.model(email=email, nom=nom, prenom=prenom, telephone=telephone, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nom, prenom, telephone, password):
        user = self.create_user(email, nom, prenom, telephone, role="ADMIN", password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Utilisateur(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('MAGAZINIER', 'Magasinier'),
        ('RESPONSABLE_GUICHET', 'Responsable Guichet'),
        ('CHEF_SERVICE_RESTAURANT', 'Chef Service Restaurant'),
        ('ADMIN', 'Administrateur'),
    ]

    idUtilisateur = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=100)
    telephone = models.CharField(max_length=25, unique=True)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default="MAGAZINIER")
    last_login = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name="utilisateur_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="utilisateur_permissions", blank=True)

    objects = UtilisateurManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'telephone']

    def __str__(self):
        return f"{self.nom} {self.prenom} ({self.email})"

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    class Meta:
        db_table = 'utilisateur'  # Django utilisera "utilisateur" au lieu de "restoapp_utilisateur"
