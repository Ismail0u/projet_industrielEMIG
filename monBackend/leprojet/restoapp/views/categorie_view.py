from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.categorie import Categorie
from ..serializers.CategorieSerializer import CategorieSerializer

class CategorieListCreateView(APIView):
  """
  API endpoint for listing or creating categories.
  """
  def get(self, request, *args, **kwargs):
    """
    Retrieves a list of categories.
    """
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)

  def post(self, request, *args, **kwargs):
    """
    Creates a new category.
    """
    serializer = CategorieSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategorieDetailView(APIView):
  """
  API endpoint for retrieving, updating, or deleting a single category.
  """
  def get_object(self, pk):
    try:
      return Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
      return None

  def get(self, request, pk, *args, **kwargs):
    """
    Retrieves a single category.
    """
    categorie = self.get_object(pk)
    if not categorie:
      return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorieSerializer(categorie)
    return Response(serializer.data)

  def put(self, request, pk, *args, **kwargs):
    """
    Updates a single category.
    """
    categorie = self.get_object(pk)
    if not categorie:
      return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorieSerializer(categorie, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, *args, **kwargs):
    """
    Deletes a single category.
    """
    categorie = self.get_object(pk)
    if not categorie:
      return Response(status=status.HTTP_404_NOT_FOUND)
    categorie.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)