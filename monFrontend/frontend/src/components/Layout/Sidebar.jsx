import React from "react";

const Sidebar = ({ title, menuItems, userOptions }) => {
  return (
    <div
      className="group w-16 hover:w-40 bg-blue-500 text-white h-screen flex flex-col transition-all duration-300"
    >
      {/* Titre */}
      <div className="p-5">
        <h1 className="text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </h1>
      </div>

      {/* Menu principal */}
      <div className="p-5">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="h-5 w-5 mr-3">{item.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-600 mx-5 my-3" />

      {/* Options utilisateur (fixées en bas) */}
      <div className="mt-auto p-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          User Options
        </h2>
        <ul className="space-y-4">
          {userOptions.map((option, index) => (
            <li key={index} className="flex items-center">
              <span className="h-5 w-5 mr-3">{option.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
