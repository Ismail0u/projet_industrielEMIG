from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.periode import Periode
from ..serializers.PeriodeSerializer import PeriodeSerializer

class PeriodeListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des périodes.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de périodes.
        """
        periodes = Periode.objects.all()
        serializer = PeriodeSerializer(periodes, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée une nouvelle période.
        """
        serializer = PeriodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PeriodeDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer une seule période.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère une seule période.
        """
        try:
            periode = Periode.objects.get(pk=pk)
        except Periode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PeriodeSerializer(periode)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour une seule période.
        """
        try:
            periode = Periode.objects.get(pk=pk)
        except Periode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PeriodeSerializer(periode, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime une seule période.
        """
        try:
            periode = Periode.objects.get(pk=pk)
        except Periode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        periode.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
