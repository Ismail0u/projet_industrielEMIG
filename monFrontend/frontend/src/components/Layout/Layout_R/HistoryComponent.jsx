import React, { useState, useEffect } from 'react';
import { reservationService } from '../../../services/apiService';
import { periodeService } from '../../../services/apiService';  // Service pour obtenir les périodes

const HistoryComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [periods, setPeriods] = useState({});
  const [error, setError] = useState(null);

  // Chargement des réservations et des périodes depuis l'API
  useEffect(() => {
    // Charger les réservations
    reservationService.get()
      .then(response => {
        setReservations(response);
        setError(null); // Réinitialisation de l'erreur si tout se passe bien
      })
      .catch(err => {
        setError("Une erreur s'est produite lors du chargement des réservations.");
        console.error("Erreur lors du chargement des réservations :", err);
      });

    // Charger les périodes
    periodeService.get()
      .then(response => {
        const periodMap = response.reduce((acc, period) => {
          acc[period.idPeriode] = period.nomPeriode; // Associé l'id à son nom
          return acc;
        }, {});
        setPeriods(periodMap);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des périodes :", err);
      });
  }, []);

  // Groupement des réservations par période
  const reservationsByPeriod = reservations.reduce((acc, reservation) => {
    const period = reservation.idPeriode;  // ID de la période de la réservation
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(reservation);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Historique des Réservations</h2>

      {/* Gestion des erreurs */}
      {error && (
        <div className="text-red-500 my-4 p-2 border border-red-500 rounded">
          <strong>{error}</strong>
        </div>
      )}

      {/* Affichage des réservations par période */}
      <div className="mt-6">
        {Object.keys(reservationsByPeriod).length > 0 ? (
          <div>
            {Object.keys(reservationsByPeriod).map((periodId, index) => {
              const periodName = periods[periodId];  // Récupère le nom de la période
              return (
                <div key={index} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">Période: {periodName}</h4>
                  <p className="text-gray-600">Total des réservations : {reservationsByPeriod[periodId].length}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Aucune réservation trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryComponent;
