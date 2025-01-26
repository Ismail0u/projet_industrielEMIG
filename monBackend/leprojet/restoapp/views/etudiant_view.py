from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.etudiant import Etudiant
from ..serializers.EtudiantSerializer import EtudiantSerializer

class EtudiantListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des étudiants.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste d'étudiants.
        """
        etudiants = Etudiant.objects.all()
        serializer = EtudiantSerializer(etudiants, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouvel étudiant.
        """
        serializer = EtudiantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EtudiantDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul étudiant.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul étudiant.
        """
        try:
            etudiant = Etudiant.objects.get(pk=pk)
        except Etudiant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EtudiantSerializer(etudiant)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul étudiant.
        """
        try:
            etudiant = Etudiant.objects.get(pk=pk)
        except Etudiant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EtudiantSerializer(etudiant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul étudiant.
        """
        try:
            etudiant = Etudiant.objects.get(pk=pk)
        except Etudiant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        etudiant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
