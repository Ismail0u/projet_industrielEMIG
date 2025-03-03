import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
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
  );
};

export default Pagination;
