import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems, userOptions } from "../../components/Layout/Layout_R/SidebarData_R";
import { etudiantService, jourService, periodeService, reservationService } from "../../services/apiService";

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

      // Création de la Map initiale de réservations
      const initialReservations = new Map();
      etudiantRes.forEach(etudiant => {
        initialReservations.set(etudiant.idEtudiant, new Map());
      });

      // Stocker l'objet réservation complet pour avoir accès à dateReservation
      reservationRes.forEach(reservation => {
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

  // useEffect pour compter les réservations du jour (déjeuners et dîners)
  useEffect(() => {
    // On attend que les réservations et les données de périodes soient chargées
    if (reservations.size === 0 || periodes.length === 0) return;

    const today = new Date().toISOString().split("T")[0]; // Format "YYYY-MM-DD"
    let lunchCount = 0;
    let dinnerCount = 0;

    reservations.forEach((studentReservations) => {
      studentReservations.forEach((reservationObj) => {
        if (reservationObj && reservationObj.dateReservation === today) {
          // Récupère les infos de la période via idPeriode contenu dans l'objet réservation
          const periodeData = periodes.find(p => p.idPeriode == reservationObj.idPeriode);
          if (periodeData) {
            const nomPeriode = periodeData.nomPeriode.toLowerCase();
            if (nomPeriode.includes("déjeuner")) {
              lunchCount++;
            } else if (nomPeriode.includes("dîner")) {
              dinnerCount++;
            }
          }
        }
      });
    });

    console.log(`Déjeuners: ${lunchCount}, Dîners: ${dinnerCount}`);
    localStorage.setItem("todayReservations", JSON.stringify({ lunchCount, dinnerCount }));
  }, [reservations, periodes]);

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
    const reservationObj = studentReservations.get(key);

    if (!reservationObj) {
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
          if (!studentReservations.has(key)) {
            try {
              const today = new Date();
              const dateReservation = today.toISOString().split("T")[0];
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
              {/* Barre de recherche, tri et export */}
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="p-2 border rounded-md w-1/3"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      Trier par
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                        {["idEtudiant", "nomEtudiant", "prenomEtudiant"].map((col) => (
                          <button
                            key={col}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setSortBy(col);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={exportToPDF}
                  >
                    Exporter en PDF
                  </button>
                </div>
              </div>

              {/* Tableau des réservations */}
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th rowSpan="2" className="border px-4 py-2">ID</th>
                    <th rowSpan="2" className="border px-4 py-2">Nom</th>
                    <th rowSpan="2" className="border px-4 py-2">Prénom</th>
                    <th rowSpan="2" className="border px-4 py-2">Tout cocher</th>
                    {jours.map(jour => (
                      <th
                        key={jour.idJour}
                        colSpan={periodes.length}
                        className="border px-4 py-2 text-center"
                      >
                        {jour.nomJour}
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-gray-100">
                    {jours.map(jour =>
                      periodes.map(periode => (
                        <th
                          key={`${jour.idJour}-${periode.idPeriode}`}
                          className="border px-4 py-2 text-center"
                        >
                          {periode.idPeriode}
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedEtudiants.map(etudiant => {
                    const studentReservations = reservations.get(etudiant.idEtudiant) || new Map();
                    const totalCells = jours.length * periodes.length;
                    const allChecked = studentReservations.size === totalCells;
                    return (
                      <tr key={etudiant.idEtudiant}>
                        <td className="border px-4 py-2">{etudiant.idEtudiant}</td>
                        <td className="border px-4 py-2">{etudiant.nomEtudiant}</td>
                        <td className="border px-4 py-2">{etudiant.prenomEtudiant}</td>
                        <td className="border px-4 py-2 text-center">
                          <button
                            className={`p-2 rounded ${allChecked ? "bg-red-500" : "bg-green-500"}`}
                            onClick={() => handleToggleAll(etudiant.idEtudiant)}
                          >
                            {allChecked ? <X size={8} color="white" /> : <Check size={8} color="white" />}
                          </button>
                        </td>
                        {jours.map(jour =>
                          periodes.map(periode => {
                            const key = `${jour.idJour}-${periode.idPeriode}`;
                            const isReserved = studentReservations.get(key) ? true : false;
                            return (
                              <td key={`${etudiant.idEtudiant}-${key}`} className="border px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={isReserved}
                                  onChange={() =>
                                    handleReservationToggle(etudiant.idEtudiant, jour.idJour, periode.idPeriode)
                                  }
                                  onKeyDown={(event) =>
                                    handleKeyDown(event, etudiant.idEtudiant, jour.idJour, periode.idPeriode)
                                  }
                                />
                              </td>
                            );
                          })
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 border-t pt-2">
                  <span>
                    Page {currentPage} sur {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200"}`}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200"}`}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
