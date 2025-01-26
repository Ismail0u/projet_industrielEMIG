from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.fournisseur import Fournisseur
from ..serializers.FournisseurSerializer import FournisseurSerializer

class FournisseurListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des fournisseurs.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de fournisseurs.
        """
        fournisseurs = Fournisseur.objects.all()
        serializer = FournisseurSerializer(fournisseurs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau fournisseur.
        """
        serializer = FournisseurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FournisseurDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul fournisseur.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul fournisseur.
        """
        try:
            fournisseur = Fournisseur.objects.get(pk=pk)
        except Fournisseur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FournisseurSerializer(fournisseur)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul fournisseur.
        """
        try:
            fournisseur = Fournisseur.objects.get(pk=pk)
        except Fournisseur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FournisseurSerializer(fournisseur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul fournisseur.
        """
        try:
            fournisseur = Fournisseur.objects.get(pk=pk)
        except Fournisseur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        fournisseur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
