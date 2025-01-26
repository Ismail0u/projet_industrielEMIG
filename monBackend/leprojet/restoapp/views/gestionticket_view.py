from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.gestionticket import GestionTickets
from ..serializers.GestionTicketSerializer import GestionTicketsSerializer

class GestionTicketsListCreateView(APIView):
    """
    Point d'entrée API qui permet de visualiser ou de créer des gestions de tickets.
    """
    def get(self, request, *args, **kwargs):
        """
        Récupère une liste de gestions de tickets.
        """
        gestion_tickets = GestionTickets.objects.all()
        serializer = GestionTicketsSerializer(gestion_tickets, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Crée une nouvelle gestion de tickets.
        """
        serializer = GestionTicketsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GestionTicketsDetailView(APIView):
    """
    Point d'entrée API qui permet de visualiser, mettre à jour ou supprimer une seule gestion de tickets.
    """
    def get(self, request, pk, *args, **kwargs):
        """
        Récupère une seule gestion de tickets.
        """
        try:
            gestion_ticket = GestionTickets.objects.get(pk=pk)
        except GestionTickets.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = GestionTicketsSerializer(gestion_ticket)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        """
        Met à jour une seule gestion de tickets.
        """
        try:
            gestion_ticket = GestionTickets.objects.get(pk=pk)
        except GestionTickets.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = GestionTicketsSerializer(gestion_ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        """
        Supprime une seule gestion de tickets.
        """
        try:
            gestion_ticket = GestionTickets.objects.get(pk=pk)
        except GestionTickets.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        gestion_ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
