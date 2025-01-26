from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.utilisateur import Utilisateur
from ..serializers.UtilisateurSerializers import UtilisateurSerializer

class UtilisateurListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des utilisateurs.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste d'utilisateurs.
        """
        utilisateurs = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouvel utilisateur.
        """
        serializer = UtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UtilisateurDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul utilisateur.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul utilisateur.
        """
        try:
            utilisateur = Utilisateur.objects.get(pk=pk)
        except Utilisateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UtilisateurSerializer(utilisateur)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul utilisateur.
        """
        try:
            utilisateur = Utilisateur.objects.get(pk=pk)
        except Utilisateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UtilisateurSerializer(utilisateur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul utilisateur.
        """
        try:
            utilisateur = Utilisateur.objects.get(pk=pk)
        except Utilisateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        utilisateur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
