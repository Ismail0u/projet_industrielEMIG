import React from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const Header = ({h_title,h_user,h_role}) => {
  return (
    <div className="bg-white px-6 py-1 flex justify-between items-center shadow-sm">
      {/* Titre à gauche */}
      <h1 className="text-lg font-bold text-gray-800">{h_title}</h1>

      {/* Barre de recherche plus petite et alignée à droite */}
      <div className="relative flex items-center ml-auto mr-6 w-40">
        <FiSearch className="absolute left-3 text-gray-400" />
        <input
          type="texte"
          placeholder="Rechercher"
          className="pl-10 pr-4 py-1 w-full border border-gray-300 rounded-full bg-gray-100 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Utilisateur à droite */}
      <div className="flex items-center space-x-2">
        <div>
          <p className="text-sm font-medium text-gray-800">{h_user}</p>
          <p className="text-xs text-gray-500">{h_role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
