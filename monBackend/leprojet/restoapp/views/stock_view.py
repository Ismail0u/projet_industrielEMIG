from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.stock import Stock
from ..serializers.StockSerializer import StockSerializer

class StockListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des stocks.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de stocks.
        """
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau stock.
        """
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul stock.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul stock.
        """
        try:
            stock = Stock.objects.get(pk=pk)
        except Stock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StockSerializer(stock)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul stock.
        """
        try:
            stock = Stock.objects.get(pk=pk)
        except Stock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StockSerializer(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul stock.
        """
        try:
            stock = Stock.objects.get(pk=pk)
        except Stock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
