# stock/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProduitViewSet, CategorieViewSet, FournisseurViewSet, UtilisateurViewSet

router = DefaultRouter()
router.register(r'produits', ProduitViewSet)
router.register(r'categories', CategorieViewSet)
router.register(r'fournisseurs', FournisseurViewSet)
router.register(r'utilisateurs', UtilisateurViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
