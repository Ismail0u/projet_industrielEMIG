import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import { produitService } from "../../services/apiService";
import ProduitForm from "../../components/Produit/ProduitForm";// Assurez-vous que le chemin est correct

const Stock = () => {
  const [data, setData] = useState([]); // Données formatées pour DataTable
  const [criticalProducts, setCriticalProducts] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;
  const editableColumns = []; // Aucune colonne éditable pour le moment

  // État pour contrôler l'affichage du formulaire popup d'ajout de produit
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction de chargement des produits depuis l'API
  const loadData = async () => {
    try {
      const fetchedData = await produitService.get();
      console.log("Données reçues depuis l'API :", fetchedData);
      
      // Mise en forme des données pour DataTable
      const mappedData = fetchedData.map((item) => ({
        Produit: item.nomProduit,
        Quantité: item.quantiteDisponible,
        "Seuil Critique": item.seuilCritique,
        Ration: item.ration,
        Catégorie: item.nomCategorie || "N/A",
        Statut:
          item.etat
      }));
      
      setData(mappedData);
      // Calcul du nombre de produits en seuil critique
      setCriticalProducts(fetchedData.filter((item) => item.is_critical).length);
      setLastUpdate(new Date().toLocaleDateString());
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-screen flex w-full overflow-hidden bg-gray-100">
      {/* Barre latérale */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Stock" h_role="Magasinier" h_user="Ousseini" />

        <div className="flex-1 p-4 bg-gray-100">
          {/* Cartes récapitulatives */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2 h-16 bg-white shadow-md rounded-lg p-2">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Produits dans le seuil critique
              </h2>
              <p className="text-sm text-gray-600">{criticalProducts} produits</p>
            </div>
            <div className="w-1/2 h-16 bg-white shadow-md rounded-lg p-2">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Date du dernier bilan
              </h2>
              <p className="text-sm text-gray-600">{lastUpdate}</p>
            </div>
          </div>

          {/* Tableau des produits */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <DataTable
              data={data}
              rowsPerPage={rowsPerPage}
              editableColumns={editableColumns}
              pdfFileName="Stock_Fiche"
            />
          </div>

          {/* Bouton pour ouvrir le formulaire d'ajout de produit */}
          {/* Bouton pour ouvrir le formulaire d'ajout de produit */}
<div className="mt-4 flex justify-start">
  <button
    onClick={() => setIsModalOpen(true)}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Ajouter un produit
  </button>
</div>

        </div>
      </div>

      {/* Popup modal pour ajouter un produit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
           
            <ProduitForm
              onProduitAjoute={() => {
                setIsModalOpen(false);
                loadData(); // Recharge les données après l'ajout
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
