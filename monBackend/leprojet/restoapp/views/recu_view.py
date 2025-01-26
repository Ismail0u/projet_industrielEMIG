from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.recu import Recu
from ..serializers.recuSerializer import RecuSerializer

class RecuListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des reçus.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de reçus.
        """
        recus = Recu.objects.all()
        serializer = RecuSerializer(recus, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau reçu.
        """
        serializer = RecuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecuDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul reçu.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul reçu.
        """
        try:
            recu = Recu.objects.get(pk=pk)
        except Recu.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RecuSerializer(recu)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul reçu.
        """
        try:
            recu = Recu.objects.get(pk=pk)
        except Recu.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RecuSerializer(recu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul reçu.
        """
        try:
            recu = Recu.objects.get(pk=pk)
        except Recu.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        recu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
