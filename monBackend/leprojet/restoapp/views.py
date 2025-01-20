#from django.shortcuts import render

# Create your views here.
# restoapp/views.py

from rest_framework import viewsets
from .models import Produit, Categorie, Fournisseur, Utilisateur
from .serializers import ProduitSerializer, CategorieSerializer, FournisseurSerializer, UtilisateurSerializer

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class FournisseurViewSet(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
