import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems,userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import { produitService } from "../../services/apiService";

const Stock = () => {
  /*const data = [
    { id: 1, Produit: "Tomate concentrée", Unité: "boite", Quantité:23, Statut: "En Stock" },
    { id: 2, Produit: "Riz", Unité: "kg", Quantité:13, Statut:"Seuil critique" },
    { id: 3, Produit: "Haricot", Unité: "kg", Quantité:1, Statut:"En rupture" },
    { id: 4, Produit: "Igname", Unité: "kg", Quantité:43, Statut:"En stock" },
    { id: 5, Produit: "Lait en poudre", Unité: "boite", Quantité:24, Statut:"En stock " }
    
  ];*/
  //const [data, setData] = useState([]); // Stocker les données récupérées
  const [produits, setProduits] = useState([]);
  const [criticalProducts, setCriticalProducts] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');
 

  const editableColumns = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const rowsPerPage=8;

  useEffect(() => {
    const fetchProduits = async () => {
        try {
            const data = await produitService.get();
            console.log('Data received in ProduitList:', data); // Ajout d'un log pour vérifier les données reçues
            setProduits(data);
            setCriticalProducts(data.filter(produit => produit.is_critical).length);
            setLastUpdate(new Date().toLocaleDateString());
        } catch (error) {
            console.error('Erreur lors de la récupération des produits api', error);
        }
    };

    fetchProduits();
}, []);

  return (
    <div className="h-screen flex w-full overflow-hidden bg-gray-100">
      {/* Barre latérale */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        {/* En-tête */}
        <Header h_title="Tableau de bord" h_role="Vendeur de ticket" h_user="Soumana" />

        {/* Contenu du tableau de bord avec fond gris */}
        {/* Section des cartes */}

{/* Contenu du tableau de bord avec fond gris */}
<div className="flex-1 p-4 bg-gray-100">
  {/* Section des cartes */}
  <div className="flex gap-4 mb-4">
    <div className="w-1/2 h-16 bg-white shadow-md rounded-lg p-2">
      <h2 className="text-sm font-semibold text-gray-800 mb-1"></h2>
      <p className="text-sm text-gray-600"></p>
    </div>

    <div className="w-1/2 h-16 bg-white shadow-md rounded-lg p-2">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Produits dans le seuil critique</h2>
      <p className="text-sm text-gray-600">{criticalProducts} produits</p>
    </div>

    <div className="w-1/2 h-16 bg-white shadow-md rounded-lg p-2">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Date du dernier bilan</h2>
      <p className="text-sm text-gray-600">{lastUpdate}</p>
    </div>
  </div>



          {/* Tableau */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <DataTable data={produits} editableColumns={editableColumns} rowsPerPage={rowsPerPage} />
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default Stock;
