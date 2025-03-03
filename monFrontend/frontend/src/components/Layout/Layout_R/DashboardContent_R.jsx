import React, { useEffect, useState } from "react";
import { jourService } from "../../../services/apiService";
import GraphComponent from "./GraphComponent";
import HistoryComponent from "./HistoryComponent";
import CalendarComponent from "./CalendarComponent";

const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const getTodayName = () => {
  const todayIndex = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  return joursSemaine[todayIndex]; // Récupérer le bon nom
};

const DashboardContent_R = () => {
  const [reservations, setReservations] = useState({
    allCount : 0,
    petitDejCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tomorrowName, setTomorrowName] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await jourService.get(""); // Récupération des jours depuis l'API
        console.log("Données reçues :", data);

        const todayName = getTodayName(); // Nom du jour actuel
        const todayIndex = joursSemaine.indexOf(todayName); // Index du jour actuel
        const tomorrowIndex = (todayIndex + 1) % joursSemaine.length; // Index du jour suivant
        const tomorrowName = joursSemaine[tomorrowIndex]; // Nom du lendemain

        setTomorrowName(tomorrowName); // Met à jour l'affichage

        // Chercher les réservations pour le lendemain
        const tomorrowData = data.find(jour => jour.nomJour === tomorrowName);

        console.log("Aujourd'hui :", todayName);
        console.log("Demain :", tomorrowName);
        console.log("Données du lendemain :", tomorrowData);

        if (tomorrowData) {
          setReservations({
            allCount: tomorrowData.nbre_reserve_jour,
            petitDejCount: tomorrowData.nbre_reserve_lendemain_petitDej,
            lunchCount: tomorrowData.nbre_reserve_lendemain_dejeuner,
            dinnerCount: tomorrowData.nbre_reserve_lendemain_diner,
          });
        } else {
          console.warn("Aucune donnée trouvée pour le lendemain !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        setError("Erreur lors de la récupération des réservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center p-4">
      {/* Section des cartes */}
      <div className="grid grid-cols-4 grid-rows-4 h-full w-full gap-4">
        
        {/* Carte réservations */}
        <div className="row-span-1 col-span-1 bg-white shadow-md rounded-lg p-2">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Réservations pour {tomorrowName}
          </h2>
          <p>TOTAL : {reservations.allCount}</p>
          <p>Petit Déjeuner : {reservations.petitDejCount}</p>
          <p>Déjeuner : {reservations.lunchCount}</p>
          <p>Dîner : {reservations.dinnerCount}</p>
        </div>

        {/* Carte 2 */}
        <div className="row-span-2 col-span-1 bg-white shadow-md rounded-lg p-4">
          <HistoryComponent />
        </div>

        {/* Carte 4 (grande hauteur) */}
        <div className="row-span-4 col-span-2 bg-white shadow-md rounded-lg p-6">
          <CalendarComponent />
        </div>
        {/* Carte 3 */}
        <div className="row-span-3 col-span-2 bg-white shadow-md rounded-lg p-4">
        <GraphComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent_R;
