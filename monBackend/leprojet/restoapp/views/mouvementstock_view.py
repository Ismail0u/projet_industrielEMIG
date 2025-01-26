from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.mouvementstock import MouvementStock
from ..serializers.MouvementStockSerializer import MouvementStockSerializer

class MouvementStockListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des mouvements de stock.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de mouvements de stock.
        """
        mouvement_stocks = MouvementStock.objects.all()
        serializer = MouvementStockSerializer(mouvement_stocks, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau mouvement de stock.
        """
        serializer = MouvementStockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MouvementStockDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul mouvement de stock.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul mouvement de stock.
        """
        try:
            mouvement_stock = MouvementStock.objects.get(pk=pk)
        except MouvementStock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MouvementStockSerializer(mouvement_stock)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul mouvement de stock.
        """
        try:
            mouvement_stock = MouvementStock.objects.get(pk=pk)
        except MouvementStock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MouvementStockSerializer(mouvement_stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul mouvement de stock.
        """
        try:
            mouvement_stock = MouvementStock.objects.get(pk=pk)
        except MouvementStock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        mouvement_stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
