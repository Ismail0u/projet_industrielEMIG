from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.reservation import Reservation
from ..serializers.ReservationSerializer import ReservationSerializer

class ReservationListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des réservations.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de réservations.
        """
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée une nouvelle réservation.
        """
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReservationDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer une seule réservation.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère une seule réservation.
        """
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour une seule réservation.
        """
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime une seule réservation.
        """
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
