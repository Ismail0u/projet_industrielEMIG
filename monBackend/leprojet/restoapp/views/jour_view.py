from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.jour import Jour
from ..serializers.JourSerializer import JourSerializer

class JourListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des jours.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de jours.
        """
        jours = Jour.objects.all()
        serializer = JourSerializer(jours, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau jour.
        """
        serializer = JourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JourDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul jour.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul jour.
        """
        try:
            jour = Jour.objects.get(pk=pk)
        except Jour.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = JourSerializer(jour)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul jour.
        """
        try:
            jour = Jour.objects.get(pk=pk)
        except Jour.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = JourSerializer(jour, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul jour.
        """
        try:
            jour = Jour.objects.get(pk=pk)
        except Jour.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        jour.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
