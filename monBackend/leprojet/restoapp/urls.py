from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


router = DefaultRouter()

# Register each viewset with the router
router.register(r'utilisateurs', views.UtilisateurViewSet, basename='utilisateurs')
router.register(r'categories', views.CategorieViewSet, basename='categories')
router.register(r'etudiants', views.EtudiantViewSet, basename='etudiants')
router.register(r'fournisseurs', views.FournisseurViewSet, basename='fournisseurs')
router.register(r'gestiontickets', views.GestionTicketsViewSet, basename='gestiontickets')
router.register(r'jours', views.JourViewSet, basename='jours')
router.register(r'lotstickets', views.LotsTicketViewSet, basename='lotstickets')
router.register(r'mouvementstocks', views.MouvementStockViewSet, basename='mouvementstocks')
router.register(r'periodes', views.PeriodeViewSet, basename='periodes')
router.register(r'produits', views.ProduitViewSet, basename='produits')
router.register(r'ProduitEnvoie', views.ProduitEnvoieViewSet, basename='ProduitEnvoie')
router.register(r'rapports', views.RapportViewSet, basename='rapports')
router.register(r'recus', views.RecuViewSet, basename='recus')
router.register(r'reservations', views.ReservationViewSet, basename='reservations')
router.register(r'stocks', views.StockViewSet, basename='stocks')
router.register(r'tickets', views.TicketViewSet, basename='tickets')
router.register(r'typerapports', views.TypeRapportViewSet, basename='typerapports')

router.register(r'tickets-vendus', views.TicketVenduViewSet, basename='tickets-vendus')
router.register(r'lots', views.LotViewSet, basename='lots')
router.register(r'argent-remis', views.ArgentRemisViewSet, basename='argent-remis')



 # Endpoint pour l'API


urlpatterns = [
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    path('accounts/', include('allauth.urls')),  # Pour gérer l'authentification
    path('auth/', include('dj_rest_auth.urls')),  # Pour gérer les API d'authentification
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Pour gérer l'inscription
    path('auth/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('me/', views.UserProfileView.as_view(), name='user-profile'),
    path('user/', views.UserView.as_view(), name='user-info'),
    path('logout/', views.logout_view, name='logout'),
    path('mouvements-stock-table/', views.MouvementStockTableView.as_view(), name="mouvements_stock_table"),
    path('mouvement-stock-update/', views.update_mouvement_stock, name="mouvement_stock_update"),
    path('sortie-stock/', views.sortie_stock, name="sortie_stock"),

]


