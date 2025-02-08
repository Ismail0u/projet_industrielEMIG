import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Pencil } from "lucide-react";

const DataTable = ({ data, editableColumns, rowsPerPage, onUpdateStock }) => {
  // États pour la recherche, le tri, la pagination et l'édition des cellules
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableData, setEditableData] = useState(data);
  const [editingCell, setEditingCell] = useState(null);
  const [tempValue, setTempValue] = useState(""); // Stocke la valeur temporaire en cours d'édition

  // Met à jour les données éditables lorsque les données d'origine changent
  useEffect(() => {
    setEditableData(data);
  }, [data]);

  // Obtient les colonnes du tableau dynamiquement à partir des données
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Filtrage des données en fonction du terme de recherche
  const filteredData = editableData.filter((item) =>
    columns.some((col) =>
      String(item[col]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Tri des données si une colonne est sélectionnée pour le tri
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) =>
        typeof a[sortBy] === "string"
          ? a[sortBy].localeCompare(b[sortBy]) // Tri alphabétique pour les chaînes
          : a[sortBy] - b[sortBy] // Tri numérique pour les nombres
      )
    : filteredData;

  // Gestion de la pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Met à jour la valeur temporaire lors de la modification d'une cellule
  const handleCellChange = (value) => {
    setTempValue(value);
  };

  // Gère la validation de la modification (lorsqu'on appuie sur Entrée)
  const handleKeyDown = async (e, rowIndex, colName) => {
    if (e.key === "Enter") {
      const newValue = tempValue.trim() === "" ? 0 : parseFloat(tempValue) || 0;
      setEditingCell(null); // Quitte le mode édition

      // Mise à jour locale des données
      const updatedData = [...editableData];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [colName]: newValue };
      setEditableData(updatedData);

      // Envoi de la mise à jour au serveur si la fonction onUpdateStock est définie
      if (onUpdateStock) {
        try {
          await onUpdateStock(updatedData[rowIndex]["Produit"], colName, newValue);
          console.log("✅ Mise à jour réussie !");
        } catch (error) {
          console.error("❌ Erreur lors de la mise à jour du stock", error);
        }
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Barre de recherche et tri */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          {/* Bouton pour trier les données */}
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
                {columns.map((col) => (
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
          {/* Bouton d'impression */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.print()}
          >
            Imprimer
          </button>
        </div>
      </div>

      {/* Tableau dynamique */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-white">
              {columns.map((col) => (
                <th key={col} className="border p-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
                <tr key={rowIndex} className="border hover:bg-gray-50">
                  {columns.map((col) => {
                    const isEditable = editableColumns.includes(col);
                    return (
                      <td
                        key={col}
                        className={`border p-2 relative group ${isEditable ? "bg-blue-200 cursor-pointer" : ""}`}
                        onClick={() => {
                          if (isEditable) {
                            setEditingCell(`${rowIndex}-${col}`);
                            setTempValue(editableData[startIndex + rowIndex][col]); // Correctement synchronisé avec la pagination
                          }
                        }}
                      >
                        {editingCell === `${rowIndex}-${col}` ? (
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => handleCellChange(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, startIndex + rowIndex, col)}
                            className="w-full p-1 border border-gray-300 rounded-md text-center"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center justify-between">
                            {editableData[startIndex + rowIndex][col]}
                            {isEditable && <Pencil className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 ml-2" />}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-2 text-center">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 p-2 border-t">
          <span className="text-gray-700 text-sm">
            Page {currentPage} sur {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
