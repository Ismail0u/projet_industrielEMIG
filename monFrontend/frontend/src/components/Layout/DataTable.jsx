import React, { useState,useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Pencil } from "lucide-react";

const DataTable = ({ data, editableColumns, rowsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableData, setEditableData] = useState(data);
  const [editingCell, setEditingCell] = useState(null);
  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const filteredData = editableData.filter((item) =>
    columns.some((col) =>
      String(item[col]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Fonction pour modifier une cellule
  const handleCellChange = (rowIndex, colName, value) => {
    const updatedData = [...editableData];
    updatedData[rowIndex][colName] = value;
    setEditableData(updatedData);
    
  };
  console.log("Données reçues dans DataTable :", data);
  console.log("Colonnes détectées :", data.length > 0 ? Object.keys(data[0]) : "Aucune donnée");
  
  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Barre de recherche */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
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
                <th key={col} className="border p-2 overflow-hidden text-ellipsis whitespace-nowrap " >{col}</th>
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
                        className={`border p-2 relative group ${isEditable ? "bg-blue-200" : ""}`}
                        onClick={() => isEditable && setEditingCell(`${rowIndex}-${col}`)}
                      >
                      {editingCell === `${rowIndex}-${col}` ? (
                       <input
                       type="text"
                       value={item[col]}
                       onChange={(e) => handleCellChange(rowIndex, col, e.target.value)}
                       onBlur={() => setEditingCell(null)}
                       onKeyDown={(e) => {
                         if (e.key === "Enter") setEditingCell(null);
                       }}
                       className="w-full p-1 border border-gray-300 rounded-md text-center" // Largeur fixe pour 4 chiffres
                       autoFocus
                     />
                      ) : (
                        <div className="flex items-center justify-center">
                        {item[col]}
                        {isEditable && <Pencil className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer ml-4" />}
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

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 p-2 border-t">
          <span className="text-gray-700 text-sm">
            Affiche {currentPage} sur {totalPages}
          </span>
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
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
