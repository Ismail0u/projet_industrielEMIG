import React, { useState, useEffect } from 'react';
import { reservationService } from '../../services/ApiService'; // Import du service

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Charger les réservations et créer des alertes
    reservationService.get().then(response => {
      const newAlerts = response.map(reservation => {
        if (reservation.status === 'annulée') {
          return `Réservation annulée pour l'étudiant ${reservation.etudiant}.`;
        } else if (reservation.status === 'confirmée') {
          return `Réservation confirmée pour l'étudiant ${reservation.etudiant}.`;
        }
        return null;
      }).filter(alert => alert !== null);
      setAlerts(newAlerts);
    }).catch(error => {
      console.error("Erreur lors du chargement des alertes :", error);
    });
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">Alertes</h2>
      <ul className="list-disc pl-5 mt-2">
        {alerts.map((alert, index) => (
          <li key={index} className="text-sm text-gray-700">{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertComponent;
