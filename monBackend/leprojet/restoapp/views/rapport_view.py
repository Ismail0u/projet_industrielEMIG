from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.rapport import Rapport
from ..serializers.RapportSerializer import RapportSerializer

class RapportListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des rapports.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de rapports.
        """
        rapports = Rapport.objects.all()
        serializer = RapportSerializer(rapports, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau rapport.
        """
        serializer = RapportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RapportDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul rapport.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul rapport.
        """
        try:
            rapport = Rapport.objects.get(pk=pk)
        except Rapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RapportSerializer(rapport)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul rapport.
        """
        try:
            rapport = Rapport.objects.get(pk=pk)
        except Rapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RapportSerializer(rapport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul rapport.
        """
        try:
            rapport = Rapport.objects.get(pk=pk)
        except Rapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        rapport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
