# serializers.py
from rest_framework import serializers
from ..models.jour import Jour

class JourSerializer(serializers.ModelSerializer):
    nbre_reserve_jour = serializers.SerializerMethodField()
    nbre_reserve_lendemain_petitDej = serializers.SerializerMethodField()
    nbre_reserve_lendemain_dejeuner = serializers.SerializerMethodField()
    nbre_reserve_lendemain_diner = serializers.SerializerMethodField()

    class Meta:
        model = Jour
        fields = ['idJour', 'nomJour', 'nbre_reserve_jour', 'nbre_reserve_lendemain_petitDej', 'nbre_reserve_lendemain_dejeuner', 'nbre_reserve_lendemain_diner']

    def get_nbre_reserve_jour(self, obj):
        return obj.get_nbre_reserve_jour
    
    def get_nbre_reserve_lendemain_petitDej(self, obj):
        return obj.get_nbre_reserve_lendemain(1)  # Période 1: Petit Déjeuner
    
    def get_nbre_reserve_lendemain_dejeuner(self, obj):
        return obj.get_nbre_reserve_lendemain(2)  # Période 2: Déjeuner

    def get_nbre_reserve_lendemain_diner(self, obj):
        return obj.get_nbre_reserve_lendemain(3)  # Période 3: Dîner
