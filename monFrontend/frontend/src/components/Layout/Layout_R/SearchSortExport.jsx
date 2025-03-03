import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SearchSortExport = ({ searchTerm, setSearchTerm, setSortBy, exportToPDF }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Rechercher..."
        className="p-2 border rounded-md w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
  );
};

export default SearchSortExport;
