import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { reservationService } from '../../../services/apiService';
import { periodeService } from '../../../services/apiService';  // Service pour obtenir les périodes

const CalendarComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [periods, setPeriods] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);

  // Chargement des réservations depuis l'API
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filtrage des réservations pour la date sélectionnée
  const selectedReservations = reservations.filter(reservation =>
    new Date(reservation.dateReservation).toDateString() === selectedDate.toDateString()
  );

  // Groupement des réservations par période
  const reservationsByPeriod = selectedReservations.reduce((acc, reservation) => {
    const period = reservation.idPeriode;  // ID de la période de la réservation
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(reservation);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Calendrier des Réservations</h2>

      {/* Gestion des erreurs */}
      {error && (
        <div className="text-red-500 my-4 p-2 border border-red-500 rounded">
          <strong>{error}</strong>
        </div>
      )}

      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            // Ajouter une classe de couleur sur les dates réservées
            if (reservations.some(reservation => new Date(reservation.dateReservation).toDateString() === date.toDateString())) {
              return 'bg-green-200 hover:bg-green-300'; // Date réservée en vert
            }
            return '';
          }}
          tileContent={({ date }) => {
            // Affichage d'une icône si la date est réservée
            if (reservations.some(reservation => new Date(reservation.dateReservation).toDateString() === date.toDateString())) {
              return <span className="text-sm text-green-700">📅</span>; // Icône pour indiquer une réservation
            }
            return null;
          }}
          aria-label="Calendrier des réservations" // Accessibilité pour les utilisateurs de lecteurs d'écran
        />
      </div>

      {/* Affichage des réservations par période */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Réservations du {selectedDate.toLocaleDateString()}
        </h3>

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
          <p>Aucune réservation pour cette date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
