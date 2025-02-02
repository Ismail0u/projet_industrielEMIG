from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


class BaseViewSet(viewsets.ModelViewSet):
    """
    ViewSet de base fournissant les opérations CRUD standard et une gestion d'erreur améliorée.
    """
    def destroy(self, request, *args, **kwargs):
        """
        Méthode destroy surchargée pour une meilleure gestion des erreurs.
        """
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "L'élément a été supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
        except APIException as e:
            return Response({'error': str(e)}, status=e.status_code)
        except Exception as e:
            return Response({'error': f'Une erreur interne est survenue : {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        """
        Méthode create surchargée pour une logique personnalisée si nécessaire.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Méthode update surchargée pour une logique personnalisée si nécessaire.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        """
        Gère les mises à jour partielles (requêtes PATCH).
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


# Définition des ViewSets spécifiques, héritant de BaseViewSet
from ..models import Produit, Categorie, Utilisateur, Etudiant, Fournisseur, GestionTickets, Jour, LotsTicket, MouvementStock, Periode, Rapport, Recu, Reservation, Stock, Ticket, TypeRapport
from ..serializers import ProduitSerializer, CategorieSerializer, UtilisateurSerializer, EtudiantSerializer, FournisseurSerializer, GestionTicketsSerializer, JourSerializer, LotsTicketSerializer, MouvementStockSerializer, PeriodeSerializer, RapportSerializer, RecuSerializer, ReservationSerializer, StockSerializer, TicketSerializer, TypeRapportSerializer

class ProduitViewSet(BaseViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

class CategorieViewSet(BaseViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class UtilisateurViewSet(BaseViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer

class EtudiantViewSet(BaseViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer

class FournisseurViewSet(BaseViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

class GestionTicketsViewSet(BaseViewSet):
    queryset = GestionTickets.objects.all()
    serializer_class = GestionTicketsSerializer

class JourViewSet(BaseViewSet):
    queryset = Jour.objects.all()
    serializer_class = JourSerializer

class LotsTicketViewSet(BaseViewSet):
    queryset = LotsTicket.objects.all()
    serializer_class = LotsTicketSerializer

class MouvementStockViewSet(BaseViewSet):
    queryset = MouvementStock.objects.all()
    serializer_class = MouvementStockSerializer

class PeriodeViewSet(BaseViewSet):
    queryset = Periode.objects.all()
    serializer_class = PeriodeSerializer

class RapportViewSet(BaseViewSet):
    queryset = Rapport.objects.all()
    serializer_class = RapportSerializer

class RecuViewSet(BaseViewSet):
    queryset = Recu.objects.all()
    serializer_class = RecuSerializer

class ReservationViewSet(BaseViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class StockViewSet(BaseViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class TicketViewSet(BaseViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TypeRapportViewSet(BaseViewSet):
    queryset = TypeRapport.objects.all()
    serializer_class = TypeRapportSerializer
