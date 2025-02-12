import React, { useState, useRef } from "react";
import * as XLSX from "xlsx"; // Pour lire le fichier Excel
import { etudiantService } from "../../services/apiService";
import {
  FilePlus,
  Printer,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";




const EtudiantForm = () => {
  // États pour gérer les données et l'interface
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // États pour la recherche, le tri et la pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Référence sur la zone du tableau à exporter
  const printRef = useRef();

  // Fonction pour lire le fichier Excel et en extraire les données
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        setStudents(jsonData);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la lecture du fichier Excel.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // Fonction pour envoyer les étudiants à l'API Django
  const handleSubmit = async () => {
    if (students.length === 0) {
      alert("Aucune donnée à envoyer");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const transformedStudents = students.map((student) => ({
        idEtudiant: parseInt(student.idEtudiant || student.id, 10),
        nomEtudiant: student.nomEtudiant || student.nom,
        prenomEtudiant: student.prenomEtudiant || student.prenom,
      }));
      console.log("Données envoyées :", transformedStudents);
      await etudiantService.bulk_create(transformedStudents);
      alert("Tous les étudiants ont été ajoutés avec succès !");
      setStudents([]);
      setFileName("");
    } catch (error) {
      console.error("Erreur lors de l'ajout des étudiants", error);
      setError("Une erreur est survenue lors de l'envoi des données.");
    }
    setLoading(false);
  };

  // Fonction pour exporter la zone du tableau en PDF
  const exportPDF = () => {
    try {
      const pdf = new jsPDF("landscape");
      // Définir les colonnes à partir des en-têtes du tableau
      const tableColumn = columns;
      // Générer les lignes à partir de l'ensemble des données triées (sans pagination)
      const tableRows = sortedStudents.map((student) =>
        columns.map((col) => student[col])
      );
      // Utiliser autoTable pour créer le tableau dans le PDF
      pdf.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });
      pdf.save("tableau_etudiants.pdf");
    } catch (err) {
      console.error("Erreur lors de l'export en PDF :", err);
    }
  };

  // Filtrage des étudiants selon le terme de recherche
  const filteredStudents = students.filter((student) => {
    const keys = Object.keys(student);
    return keys.some((key) =>
      String(student[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Tri des données si un critère de tri est sélectionné
  const sortedStudents = sortBy
    ? [...filteredStudents].sort((a, b) => {
        if (typeof a[sortBy] === "string") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return a[sortBy] - b[sortBy];
      })
    : filteredStudents;

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedStudents = sortedStudents.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Détermination dynamique des colonnes à partir des données
  const columns = students.length > 0 ? Object.keys(students[0]) : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* En-tête avec bouton importer, recherche, tri et export PDF */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md cursor-pointer">
            <FilePlus className="w-5 h-5" />
            <span>Ajouter un fichier Excel</span>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <input
            type="text"
            placeholder="Rechercher..."
            className="p-2 border rounded-md w-60"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md"
            >
              Trier par
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
                {columns.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      setSortBy(col);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
  onClick={exportPDF}
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  <Printer className="w-5 h-5" />
  <span>Exporter en PDF</span>
</button>

        </div>
      </div>

      {fileName && (
        <p className="text-sm text-gray-500 mb-2">Fichier chargé : {fileName}</p>
      )}

      {/* Zone à exporter en PDF : tableau d'aperçu avec pagination */}
      <div ref={printRef} className="overflow-x-auto">
        {students.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 table-auto">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="border p-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student, index) => (
                  <tr key={index} className="border hover:bg-gray-50">
                    {columns.map((col, idx) => (
                      <td key={idx} className="border p-2">
                        {student[col]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-2">
                    Aucun résultat trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">Aucune donnée importée.</p>
        )}
      </div>

      {/* Contrôles de pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 border-t pt-2">
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Bouton pour envoyer les données à l'API */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading || students.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Plus className="w-5 h-5" />
          {loading ? "Envoi en cours..." : "Ajouter les étudiants"}
        </button>
      </div>
    </div>
  );
};

export default EtudiantForm;
