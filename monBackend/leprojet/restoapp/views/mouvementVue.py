from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from ..models import MouvementStock, Produit,Jour
from rest_framework.decorators import api_view
from ..serializers import MouvementStockSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Max
class MouvementStockTableView(APIView):
    """
    API pour récupérer les mouvements de stock sous forme de tableau structuré par jour.
    """

    def get(self, request):
        # Récupérer le paramètre `estSortie` depuis la requête (par défaut None)
        est_sortie_param = request.query_params.get("estSortie")

        # Vérifier que `estSortie` est bien un nombre valide (0 ou 1)
        if est_sortie_param not in ["0", "1"]:
            return Response({"error": "Paramètre estSortie invalide. Utilisez 0 pour entrée et 1 pour sortie."}, status=400)

        est_sortie = bool(int(est_sortie_param))  # Convertir en booléen

        # Liste des jours de la semaine
        jours_semaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

        # Récupérer uniquement le dernier mouvement pour chaque produit et jour avec le filtre estSortie
        latest_movement = MouvementStock.objects.filter(estSortie=est_sortie).values('idProduit', 'idJour').annotate(
            last_id=Max('idMouvement')  # Récupérer le dernier ID pour chaque produit et jour
        )

        # Filtrer les mouvements avec les derniers ID et le bon `estSortie`
        mouvements = MouvementStock.objects.filter(
            idMouvement__in=latest_movement.values('last_id')
        ).values('idProduit__nomProduit', 'idJour__nomJour', 'quantite')

        print("DEBUG - Mouvements récupérés :", list(mouvements))

        # Dictionnaire pour structurer les données sous forme de tableau
        data = {}

        for mouvement in mouvements:
            produit = mouvement["idProduit__nomProduit"]
            jour = mouvement["idJour__nomJour"]
            quantite = mouvement["quantite"]

            # Si le produit n'existe pas encore dans le dictionnaire, on l'initialise
            if produit not in data:
                data[produit] = {"Produit": produit}
                for jour_nom in jours_semaine:
                    data[produit][jour_nom] = 0  # Initialiser tous les jours à 0
                data[produit]["Total"] = 0  # Initialiser le total

            # Ajouter ou mettre à jour la quantité pour le jour correspondant
            data[produit][jour] = quantite
            data[produit]["Total"] += quantite  # Mettre à jour le total

        # Retourner les données sous forme de liste
        return Response(list(data.values()))


@api_view(['POST'])
def update_mouvement_stock(request):
    """
    API pour mettre à jour les quantités de stock à partir du tableau interactif.
    """
    produit_nom = request.data.get("produit")
    jour_nom = request.data.get("jour")
    quantite = request.data.get("quantite")

    produit = get_object_or_404(Produit, nomProduit=produit_nom)
    jour = get_object_or_404(Jour, nomJour=jour_nom)

    # Supprimer les doublons avant la mise à jour
    MouvementStock.objects.filter(idProduit=produit, idJour=jour, estSortie=False).delete()

    # Créer un nouveau mouvement avec la quantité mise à jour
    mouvement = MouvementStock.objects.create(
        idProduit=produit,
        idJour=jour,
        quantite=quantite,
        estSortie=False  # Adapte selon le contexte
    )

    # Utilisation du sérialiseur pour formater la réponse
    serializer = MouvementStockSerializer(mouvement)

    return Response({
        "message": "Quantité mise à jour",
        "mouvement": serializer.data
    })
