import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { reservationService } from "../../../services/apiService";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Fonction pour obtenir les dates de la semaine en cours (du lundi au dimanche)
const getCurrentWeekDates = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Lundi
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });
  return weekDates;
};

const joursSemaine = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const GraphComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const weekDates = getCurrentWeekDates();

  useEffect(() => {
    reservationService.get()
      .then(response => {
        setReservations(response);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des réservations :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Chargement des données...</div>;
  }

  if (reservations.length === 0) {
    return <div className="p-4 text-center text-gray-500">Aucune réservation trouvée.</div>;
  }

  // Filtrer les réservations pour ne garder que celles de la semaine actuelle
  const filteredReservations = reservations.filter(reservation =>
    weekDates.includes(reservation.dateReservation)
  );

  // Grouper les réservations par jour de la semaine actuelle
  const reservationsByDay = filteredReservations.reduce((acc, reservation) => {
    const dayIndex = weekDates.indexOf(reservation.dateReservation);
    acc[dayIndex] = (acc[dayIndex] || 0) + 1;
    return acc;
  }, {});

  // Remplir les valeurs manquantes avec 0
  const completeData = weekDates.map((_, index) => reservationsByDay[index] || 0);

  const chartData = {
    labels: joursSemaine,
    datasets: [
      {
        label: "Réservations par jour",
        data: completeData,
        borderColor: "#3357ff",
        backgroundColor: "rgba(42, 127, 255, 0.5)",
        pointBackgroundColor: "#3357ff",
        pointBorderColor: "#3357ff",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} réservations`,
        },
      },
    },
    scales: {
      x: {
        title: { display: false },
        ticks: { maxTicksLimit: 7 },
      },
      y: {
        title: { display: false },
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-3">Réservations de la semaine 🗓️</h2>
      <div className="w-full h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GraphComponent;
