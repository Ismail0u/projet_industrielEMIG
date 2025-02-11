from rest_framework import serializers
from ..models.reservation import Reservation
from .EtudiantSerializer import EtudiantSerializer
from .JourSerializer import JourSerializer

class ReservationSerializer(serializers.ModelSerializer):
    #etudiant = EtudiantSerializer(source='idEtudiant', read_only=True)  # Sérialiseur imbriqué pour l'étudiant
    #jour = JourSerializer(source='idJour', read_only=True)  # Sérialiseur imbriqué pour le jour
    
    #details_reservation = serializers.SerializerMethodField()  # Champ calculé

    class Meta:
        model = Reservation
        fields = '__all__'
        
    #def get_details_reservation(self, obj):  # Méthode pour calculer la valeur du champ
    #   return obj.get_details_reservation()  # Appel à la méthode du modèle

    """def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['etudiant'] = instance.get_etudiant()
        representation['jour'] = instance.get_jour()
        return representation """
