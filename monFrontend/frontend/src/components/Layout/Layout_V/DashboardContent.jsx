import React from "react";


const DashboardContent = () => {
  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center p-4">
      {/* Section des cartes */}
      <div className="grid grid-cols-3 grid-rows-6 h-full w-full gap-3">
        
        {/* Cartes réduites */}
        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">Nombre de ticket vendus</h2>
          <p className="text-xs text-gray-600">Contenu de la première carte.</p>
        </div>

        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">Nombre de ticket invendus</h2>
          <p className="text-xs text-gray-600">Contenu de la deuxième carte.</p>
        </div>

        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">Montant à remettre</h2>
          <p className="text-xs text-gray-600">Contenu de la troisième carte.</p>
        </div>

        {/* Carte 4 (grande hauteur) */}
        <div className="row-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">Tickets vendus</h2>
          <form action="#">
            <div className="grid grid-cols-2 gap-2">
              {/* Type de ticket */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Type de ticket</p>
                <select className="border border-gray-200 px-4 py-3 text-xs rounded-m name=" id="">
                  <option value="">Petit-déjeuner</option>
                  <option value="">Déjeuner</option>
                </select>
              </div>

              <div className="flex flex-col">
  <p className="text-xs text-gray-600 mb-1">Nombre de ticket</p>
  <input
    type="number"
    className="border border-gray-200 px-4 py-3 text-xs rounded-md"
    min="0" // Optionnel : définir une valeur minimale
    step="1" // Optionnel : définir l'incrément/décrément
  />
</div>

              {/* Date */}
             
              {/* Montant */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  placeholder="Montant"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md">
                Confirmer
              </button>
            </div>
          </form>
        </div>

        {/* Carte 5 (large) */}
        <div className="row-span-3 col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">Ajouter un lot</h2>
          <form action="#">
            <div className="grid grid-cols-2 gap-2">
              {/* Type de ticket */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Type de lot</p>
                <select className="border border-gray-200 px-4 py-3 text-xs rounded-m name=">
                  <option value="">Petit-déjeuner</option>
                  <option value="">Déjeuner</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Nombre de lot</p>
                <input
    type="number"
    className="border border-gray-200 px-4 py-3 text-xs rounded-md"
    min="0" // Optionnel : définir une valeur minimale
    step="1" // Optionnel : définir l'incrément/décrément
  />
              </div>

              {/* Montant */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Montant</p>
                <input
                  type="text"
                  placeholder="Montant"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                />
              </div>

              {/* Autre champ */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  placeholder="Autre champ"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md">
                Ajouter
              </button>
            </div>
          </form>
        </div>

        {/* Carte 6 (large) */}
        <div className="row-span-3 col-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">Montant remis</h2>
          <form action="#">
            <div className="grid grid-cols-2 gap-2">
              {/* Tant */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Montant</p>
                <input
                  type="text"
                  
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                />
              </div>

              {/* Mont */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;