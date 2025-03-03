import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems, userOptions } from "../../components/Layout/Layout_R/SidebarData_R";
import { etudiantService, jourService, periodeService, reservationService } from "../../services/apiService";
import Table from "../../components/Layout/Layout_R/Table";
import SearchSortExport from "../../components/Layout/Layout_R/SearchSortExport";
import Pagination from "../../components/Layout/Layout_R/Pagination";

const Reservation = () => {
  // États pour les données
  const [etudiants, setEtudiants] = useState([]);
  const [jours, setJours] = useState([]);
  const [periodes, setPeriodes] = useState([]);
  // On stocke les réservations dans une Map : idEtudiant => Map(key = "idJour-idPeriode" => reservation object)
  const [reservations, setReservations] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour le DataTable
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    fetchData();
  }, []);

  // Récupération des données via les services API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [etudiantRes, jourRes, periodeRes, reservationRes] = await Promise.all([
        etudiantService.get(),
        jourService.get(),
        periodeService.get(),
        reservationService.get()
      ]);
  
      setEtudiants(etudiantRes);
      setJours(jourRes);
      setPeriodes(periodeRes);
  
      // 1️⃣ Récupérer la date de début et de fin de la semaine actuelle
      const startOfWeek = getWeekStartDate(); // Date du lundi de la semaine
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Dimanche de la semaine
  
      console.log("Début de la semaine :", startOfWeek.toISOString());
      console.log("Fin de la semaine :", endOfWeek.toISOString());
  
      // 2️⃣ Filtrer les réservations pour ne garder que celles de cette semaine
      const filteredReservations = reservationRes.filter(reservation => {
        const resDate = new Date(reservation.dateReservation);
        return resDate >= startOfWeek && resDate <= endOfWeek;
      });
  
      console.log("Réservations filtrées :", filteredReservations);
  
      // 3️⃣ Créer la Map initiale de réservations
      const initialReservations = new Map();
      etudiantRes.forEach(etudiant => {
        initialReservations.set(etudiant.idEtudiant, new Map());
      });
  
      // Stocker l'objet réservation complet pour avoir accès à dateReservation
      filteredReservations.forEach(reservation => {
        const { idReservation, idEtudiant, idJour, idPeriode } = reservation;
        const studentReservations = initialReservations.get(idEtudiant) || new Map();
        const key = `${idJour}-${idPeriode}`;
        studentReservations.set(key, reservation);
        initialReservations.set(idEtudiant, studentReservations);
      });
  
      setReservations(initialReservations);
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Impossible de charger les données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  
  const getWeekStartDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Dimanche, 6 = Samedi
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? 1 : 0); // Si dimanche, commencer lundi prochain
  
    return new Date(today.setDate(diff));
  };
  

 const getReservationDate = (dayOffset) => {
    const weekStart = getWeekStartDate();
    const reservationDate = new Date(weekStart);
    reservationDate.setDate(weekStart.getDate() + dayOffset);
    return reservationDate.toISOString().split("T")[0];
  };

  const handleKeyDown = (event, idEtudiant, idJour, idPeriode) => {
    if (event.key === "Enter" || event.key === " ") { // Vérifie si la touche est "Enter" ou "Espace"
      event.preventDefault(); // Empêche le comportement par défaut
      handleReservationToggle(idEtudiant, idJour, idPeriode); // Bascule la réservation
    }
  };  

  const handleReservationToggle = async (idEtudiant, idJour, idPeriode) => {
    const newReservations = new Map(reservations);
    const studentReservations = newReservations.get(idEtudiant) || new Map();
    const key = `${idJour}-${idPeriode}`;
    const reservationObj = studentReservations.get(key);

    const jourIndex = jours.findIndex(j => j.idJour === idJour);
    if (jourIndex === -1) return;
    const dateReservation = getReservationDate(jourIndex);

    if (!reservationObj) {
      // Création de la réservation
      try {
        const response = await reservationService.create({
          dateReservation,
          idEtudiant,
          idJour,
          idPeriode
        });
        // On stocke l'objet réservation complet retourné par l'API
        studentReservations.set(key, response);
      } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error);
      }
    } else {
      // Suppression de la réservation existante
      try {
        await reservationService.delete(reservationObj.idReservation);
        studentReservations.delete(key);
      } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
      }
    }
    newReservations.set(idEtudiant, studentReservations);
    setReservations(newReservations);
  };

  // Fonction pour basculer entre tout cocher et tout décocher pour un étudiant
  const handleToggleAll = async (idEtudiant) => {
    const newReservations = new Map(reservations);
    const studentReservations = newReservations.get(idEtudiant) || new Map();
    const totalCells = jours.length * periodes.length;
    
    if (studentReservations.size === totalCells) {
      // Tout décocher : suppression de toutes les réservations pour cet étudiant
      for (const [key, reservationObj] of studentReservations.entries()) {
        try {
          await reservationService.delete(reservationObj.idReservation);
          studentReservations.delete(key);
        } catch (error) {
          console.error(`Erreur lors de la suppression de la réservation pour ${key}:`, error);
        }
      }
    } else {
      // Tout cocher : création des réservations manquantes
      for (const jour of jours) {
        for (const periode of periodes) {
          const key = `${jour.idJour}-${periode.idPeriode}`;
          const jourIndex = jours.findIndex(j => j.idJour === jour.idJour);
              if (jourIndex === -1) return;
              const dateReservation = getReservationDate(jourIndex);  
          if (!studentReservations.has(key)) {
            try {        
              const response = await reservationService.create({
                dateReservation,
                idEtudiant,
                idJour: jour.idJour,
                idPeriode: periode.idPeriode,
              });
              studentReservations.set(key, response);
            } catch (error) {
              console.error(`Erreur lors de la création de la réservation pour ${key}:`, error);
            }
          }
        }
      }
    }
    newReservations.set(idEtudiant, studentReservations);
    setReservations(newReservations);
  };

  // Filtrer les étudiants selon la recherche
  const filteredEtudiants = etudiants.filter(etudiant =>
    etudiant.nomEtudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etudiant.prenomEtudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(etudiant.idEtudiant).includes(searchTerm)
  );

  // Trier les étudiants si sortBy est défini
  const sortedEtudiants = sortBy
    ? [...filteredEtudiants].sort((a, b) => {
        if (typeof a[sortBy] === "string") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return a[sortBy] - b[sortBy];
      })
    : filteredEtudiants;

  // Pagination
  const totalPages = Math.ceil(sortedEtudiants.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEtudiants = sortedEtudiants.slice(startIndex, startIndex + rowsPerPage);

  // Fonction pour exporter en PDF
  const exportToPDF = () => {
    const pdf = new jsPDF("landscape");
    pdf.text("Liste des Réservations", 14, 10);

    const tableColumn = ["ID", "Nom", "Prénom", ...jours.map(jour => jour.nomJour)];
    const tableRows = sortedEtudiants.map(etudiant => {
      const row = [
        etudiant.idEtudiant,
        etudiant.nomEtudiant,
        etudiant.prenomEtudiant
      ];
      jours.forEach(jour => {
        let reservationStr = "";
        periodes.forEach(periode => {
          const key = `${jour.idJour}-${periode.idPeriode}`;
          reservationStr += (reservations.get(etudiant.idEtudiant)?.get(key) ? "✔ " : "✘ ");
        });
        row.push(reservationStr.trim());
      });
      return row;
    });

    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    pdf.save("Reservations.pdf");
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      <Sidebar menuItems={menuItems} userOptions={userOptions} />
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Réservations" h_role="Admin" h_user="Nom Utilisateur" />
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="text-center">Chargement des données...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              <SearchSortExport
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSortBy={setSortBy}
                exportToPDF={exportToPDF}
              />
              <Table 
                etudiants={paginatedEtudiants}
                jours={jours}
                periodes={periodes}
                reservations={reservations}
                handleReservationToggle={handleReservationToggle}
                handleToggleAll={handleToggleAll}
                handleKeyDown={handleKeyDown}
                getReservationDate={getReservationDate} // 🔥 Ajout de cette ligne
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
