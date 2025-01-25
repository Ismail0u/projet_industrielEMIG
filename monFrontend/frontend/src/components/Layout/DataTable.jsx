import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";// Icônes pour les flèches

const DataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8; // Nombre de lignes par page

  // Filtrer les données en fonction de la recherche
  const filteredData = data.filter(
    (item) =>
      item.col1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.col2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.col3.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.col4.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trier les données
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage); // Nombre total de pages

  // Obtenir les données de la page actuelle
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Barre de recherche et boutons */}
      <div className="flex justify-between items-center mb-4">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2">
          {/* Bouton Trier par */}
          <div className="relative">
  <button
    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    Trier par
    <ChevronDown className="w-4 h-4" />
  </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("col1");
                    setIsDropdownOpen(false);
                  }}
                >
                  Colonne 1
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("col2");
                    setIsDropdownOpen(false);
                  }}
                >
                  Colonne 2
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy("col3");
                    setIsDropdownOpen(false);
                  }}
                >
                  Colonne 3
                </button>
              </div>
            )}
          </div>

          {/* Bouton Imprimer */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => window.print()}
          >
            Imprimer
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Colonne 1</th>
              <th className="border p-2">Colonne 2</th>
              <th className="border p-2">Colonne 3</th>
              <th className="border p-2">Colonne 4</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="border hover:bg-gray-50">
                  <td className="border p-2">{item.col1}</td>
                  <td className="border p-2">{item.col2}</td>
                  <td className="border p-2">{item.col3}</td>
                  <td className="border p-2">{item.col4}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 p-2 border-t">
          {/* Affichage de la page en bas à gauche */}
          <span className="text-gray-700 text-sm">
            Affiche {currentPage} sur {totalPages}
          </span>

          {/* Boutons de navigation en bas à droite */}
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
