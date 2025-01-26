from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.typerapport import TypeRapport
from ..serializers.TypeRapportSerializer import TypeRapportSerializer

class TyperapportListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des types de rapports.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de types de rapports.
        """
        typerapports = TypeRapport.objects.all()
        serializer = TypeRapportSerializer(typerapports, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau type de rapport.
        """
        serializer = TypeRapportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TyperapportDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul type de rapport.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul type de rapport.
        """
        try:
            typerapport = TypeRapport.objects.get(pk=pk)
        except TypeRapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TypeRapportSerializer(typerapport)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul type de rapport.
        """
        try:
            typerapport = TypeRapport.objects.get(pk=pk)
        except TypeRapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TypeRapportSerializer(typerapport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul type de rapport.
        """
        try:
            typerapport = TypeRapport.objects.get(pk=pk)
        except TypeRapport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        typerapport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
