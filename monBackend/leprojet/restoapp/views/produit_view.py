from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.produit import Produit
from ..serializers.ProduitSerializer import ProduitSerializer

class ProduitListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des produits.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de produits.
        """
        produits = Produit.objects.all()
        serializer = ProduitSerializer(produits, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau produit.
        """
        serializer = ProduitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProduitDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul produit.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul produit.
        """
        try:
            produit = Produit.objects.get(pk=pk)
        except Produit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProduitSerializer(produit)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul produit.
        """
        try:
            produit = Produit.objects.get(pk=pk)
        except Produit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProduitSerializer(produit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul produit.
        """
        try:
            produit = Produit.objects.get(pk=pk)
        except Produit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        produit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
