from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.lotstickets import LotsTicket
from ..serializers.LotsTicketSerializer import LotsTicketSerializer

class LotsTicketListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des lots de tickets.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de lots de tickets.
        """
        lots_tickets = LotsTicket.objects.all()
        serializer = LotsTicketSerializer(lots_tickets, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée un nouveau lot de tickets.
        """
        serializer = LotsTicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LotsTicketDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer un seul lot de tickets.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère un seul lot de tickets.
        """
        try:
            lot_ticket = LotsTicket.objects.get(pk=pk)
        except LotsTicket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LotsTicketSerializer(lot_ticket)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour un seul lot de tickets.
        """
        try:
            lot_ticket = LotsTicket.objects.get(pk=pk)
        except LotsTicket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LotsTicketSerializer(lot_ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime un seul lot de tickets.
        """
        try:
            lot_ticket = LotsTicket.objects.get(pk=pk)
        except LotsTicket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        lot_ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
