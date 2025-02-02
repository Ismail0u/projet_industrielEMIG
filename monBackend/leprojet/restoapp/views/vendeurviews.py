
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
    

from ..models import TicketVendu, Lot, ArgentRemis
from ..serializers import TicketVenduSerializer, LotSerializer, ArgentRemisSerializer

class TicketVenduViewSet(viewsets.ModelViewSet):
    queryset = TicketVendu.objects.all()
    serializer_class = TicketVenduSerializer

class LotViewSet(viewsets.ModelViewSet):
    queryset = Lot.objects.all()
    serializer_class = LotSerializer

class ArgentRemisViewSet(viewsets.ModelViewSet):
    queryset = ArgentRemis.objects.all()
    serializer_class = ArgentRemisSerializer
