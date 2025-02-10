import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems, userOptions } from "../../components/Layout/Layout_R/SidebarData_R";
import { etudiantService, jourService, periodeService, reservationService } from "../../services/apiService";

const Reservation = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [jours, setJours] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [reservations, setReservations] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const [etudiantRes, jourRes, periodeRes, reservationRes] = await Promise.all([
                etudiantService.get(),
                jourService.get(),
                periodeService.get(),
                reservationService.get()  // 👈 Récupérer les réservations existantes
            ]);
    
            setEtudiants(etudiantRes);
            setJours(jourRes);
            setPeriodes(periodeRes);
    
            // Initialiser les réservations avec une Map
            const initialReservations = new Map();
            etudiantRes.forEach(etudiant => {
                initialReservations.set(etudiant.idEtudiant, new Map());
            });
    
            // Stocker les réservations avec `idReservation`
            reservationRes.forEach(reservation => {
                const { idReservation, idEtudiant, idJour, idPeriode } = reservation;
                const studentReservations = initialReservations.get(idEtudiant) || new Map();
                studentReservations.set(`${idJour}-${idPeriode}`, idReservation); // 👈 Stocke `idReservation`
                initialReservations.set(idEtudiant, studentReservations);
            });
    
            setReservations(initialReservations);
        } catch (err) {
            console.error("❌ Erreur lors du chargement des données :", err);
            setError("Impossible de charger les données. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };
    

    const handleKeyDown = (event, idEtudiant, idJour, idPeriode) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleReservationToggle(idEtudiant, idJour, idPeriode);
        }
    };

    const handleReservationToggle = async (idEtudiant, idJour, idPeriode) => {
        const newReservations = new Map(reservations);
        const studentReservations = newReservations.get(idEtudiant) || new Map();
    
        const key = `${idJour}-${idPeriode}`;
        const reservationId = studentReservations.get(key);
    
        if (!reservationId) {
            // Création de la réservation
            try {
                const today = new Date();
                const dateReservation = today.toISOString().split("T")[0];
    
                const response = await reservationService.create({
                    dateReservation,
                    idEtudiant,
                    idJour,
                    idPeriode
                });
    
                console.log("✅ Réservation créée :", response);
                studentReservations.set(key, response.idReservation);
            } catch (error) {
                console.error("❌ Erreur lors de la création de la réservation :", error);
            }
        } else {
            // Suppression de la réservation existante
            try {
                await reservationService.delete(reservationId);
                console.log("🗑️ Réservation supprimée :", reservationId);
                studentReservations.delete(key);
            } catch (error) {
                console.error("❌ Erreur lors de la suppression de la réservation :", error);
            }
        }
    
        newReservations.set(idEtudiant, studentReservations);
        setReservations(newReservations);
    };
    
    

    return (
        <div className="h-screen flex w-full overflow-hidden">
            <Sidebar menuItems={menuItems} userOptions={userOptions} />
            <div className="flex-1 flex flex-col h-screen">
                <Header h_title="Réservations" h_role="Admin" h_user="Nom Utilisateur" />
                <div className="flex-1 overflow-hidden p-4">
                    {loading ? (
                        <div className="text-center">Chargement des données...</div>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th rowSpan="2" className="border p-2">ID</th>
                                    <th rowSpan="2" className="border p-2">Nom</th>
                                    <th rowSpan="2" className="border p-2">Prénom</th>
                                    {jours.map((jour, index) => (
                                        <th 
                                            key={jour.idJour} 
                                            colSpan={periodes.length} 
                                            className={`border p-2 text-center ${
                                                index !== 0 ? "border-l-4 border-gray-500" : ""
                                            }`}
                                        >
                                            {jour.nomJour}
                                        </th>
                                    ))}
                                </tr>
                                <tr className="bg-gray-200">
                                    {jours.map((jour, index) => (
                                        periodes.map(periode => (
                                            <th 
                                                key={`${jour.idJour}-${periode.idPeriode}`} 
                                                className={`border p-2 ${
                                                    index !== 0 ? "border-l-4 border-gray-500" : ""
                                                }`}
                                            >
                                                {periode.idPeriode}
                                            </th>
                                        ))
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {etudiants.map(etudiant => (
                                    <tr key={etudiant.idEtudiant} className="border">
                                        <td className="border p-2">{etudiant.idEtudiant}</td>
                                        <td className="border p-2">{etudiant.nomEtudiant}</td>
                                        <td className="border p-2">{etudiant.prenomEtudiant}</td>
                                        {jours.map((jour, index) => (
                                            periodes.map(periode => (
                                                <td 
                                                    key={`${etudiant.idEtudiant}-${jour.idJour}-${periode.idPeriode}`} 
                                                    className={`border p-2 text-center ${
                                                        index !== 0 ? "border-l-4 border-gray-500" : ""
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={reservations.get(etudiant.idEtudiant)?.get(`${jour.idJour}-${periode.idPeriode}`) || false}
                                                        onChange={() => handleReservationToggle(etudiant.idEtudiant, jour.idJour, periode.idPeriode)}
                                                        onKeyDown={(event) => handleKeyDown(event, etudiant.idEtudiant, jour.idJour, periode.idPeriode)}
                                                        tabIndex={0}  
                                                    />
                                                </td>
                                            ))
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservation;
