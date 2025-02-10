import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems, userOptions } from "../../components/Layout/Layout_R/SidebarData_R";
import { reservationService } from "../../services/apiService";

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);     // Add error state

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await reservationService.get();
            console.log("📥 Données reçues :", response);
    
            if (!response || !response.data) {
                throw new Error("Aucune donnée reçue de l'API.");
            }
    
            setReservations(response.data);
        } catch (err) {
            console.error("❌ Erreur lors de la récupération des réservations :", err);
            setError(err.message || "Impossible de récupérer les réservations.");
        } finally {
            setLoading(false);
        }
    };
    

    const tableData = reservations.length > 0
        ? reservations.map((reservation) => ({
            id: reservation.idReservation, // Important: Add a unique ID!
            Date: reservation.dateReservation, // Use snake_case from your model
            Etudiant: reservation.idEtudiant, // Access related data (adjust as needed)
            Jour: reservation.jour.nom_jour, // Access related data
            Periode: reservation.periode.nom_periode, // Access related data
            // ... other fields from your Reservation model
        }))
        : [];

    const rowsPerPage = 8;
    const editableColumns = []; // Add editable columns if needed

    return (
        <div className="h-screen flex w-full overflow-hidden">
            <Sidebar menuItems={menuItems} userOptions={userOptions} />
            <div className="flex-1 flex flex-col h-screen">
                <Header h_title="Reservations" h_role="Your Role" h_user="Your Name" />
                <div className="flex-1 overflow-hidden p-1">
                    {loading ? (
                        <div className="text-center">Loading reservations...</div> // Display loading message
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div> // Display error message
                    ) : (
                        <DataTable
                            data={tableData}
                            rowsPerPage={rowsPerPage}
                            editableColumns={editableColumns}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservation;