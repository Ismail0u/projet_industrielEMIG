import React from "react";

const DashboardContent_M= () => {
  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center p-4">
      {/* Section des cartes */}
      <div className="grid grid-cols-4 grid-rows-4 h-full w-full gap-4">
        
        {/* Cartes réduites */}
        <div className="row-span-2 col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Nombre de tickets vendus</h2>
          <p className="text-sm text-gray-600">Contenu de la première carte.</p>
        </div>

        <div className="row-span-2 col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Carte 2</h2>
          <p className="text-sm text-gray-600">Contenu de la deuxième carte.</p>
        </div>

        <div className="row-span-2 col-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-6">Carte 3</h2>
          <p className="text-sm text-gray-600">Contenu de la troisième carte.</p>
        </div>

         {/* Carte 4 (grande hauteur) */}
         <div className="row-span-2 col-span-1 bg-white shadow-md rounded-lg p-6 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Carte 4</h2>
          <p className="text-sm text-gray-600 ">
            Contenu de la quatrième carte. Le texte est centré.
          </p>
        </div>

      
       
      </div>
    </div>
  );
};

export default DashboardContent_M;
