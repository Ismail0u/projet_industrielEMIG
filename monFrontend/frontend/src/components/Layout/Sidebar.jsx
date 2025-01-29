import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ menuItems, userOptions }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`w-${isOpen ? "44" : "16"} text-white h-screen flex flex-col transition-all duration-500 bg-blue-600`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)} // Se ferme uniquement si on ne clique sur rien
    >
      {/* Titre ou logo */}
      <div className="p-2 flex items-center justify-center">
        <h5
          className={`p-2 text-xl font-bold transition-opacity duration-500 flex items-center justify-center text-center ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-bleu">Kayan</span>
          <span className="text-rouge">Abintchi</span>
        </h5>
      </div>

      {/* Menu principal */}
      <div className="p-5">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link
                to={item.path}
                className="flex items-center"
                onClick={() => setIsOpen(true)} // Reste ouvert après clic
              >
                <span className="h-5 w-5 mr-3 flex-shrink-0">{item.icon}</span>
                <span
                  className={`transition-opacity duration-500 whitespace-nowrap ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-400 mx-5 my-3" />

      {/* Options utilisateur */}
      <div className="mt-auto p-5">
        <ul className="space-y-4">
          {userOptions.map((option, index) => (
            <li key={index} className="flex items-center">
              <span className="h-5 w-5 mr-3 flex-shrink-0">{option.icon}</span>
              <span
                className={`transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {option.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
