import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { sortieStock,StockTableService } from "../../services/apiService";
import { menuItems,userOptions } from "../../components/Layout/Layout_M/SidebarData_M";

const Sortie = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        // Charger les données de l'API
        const fetchProduits = async () => {
            try {
                const response = await StockTableService.get("?estSortie=1");
        
                // Ajouter l'unité si disponible
                const produitsAvecUnite = response.map(produit => ({
                    ...produit,
                    Produit: produit.unite 
                        ? `${produit.Produit} (${produit.unite})` 
                        : produit.Produit
                }));
        
                setProduits(produitsAvecUnite);
            } catch (error) {
                console.error("Erreur lors du chargement des produits :", error);
            }
        };
        

        fetchProduits();
    }, []);

    // Fonction pour envoyer la mise à jour à l'API
    const handleStockOut = async (produit, jour, quantite) => {
      console.log("📤 Données envoyées :", { produit, jour, quantite });
  
      if (!produit || !jour || isNaN(quantite) || quantite < 0) {
          alert("❌ Erreur : Données invalides !");
          return;
      }
  
      try {
          // Envoyer la requête à l'API
          const response = await sortieStock(produit, jour, quantite);
  
          // Vérifier si l'API a renvoyé une erreur
          if (response.error) {
              alert(`❌ Erreur : ${response.error}`);
              return;
          }
  
          console.log("✅ Stock mis à jour avec succès !");
          
          // Mettre à jour l'affichage en modifiant l'état
          setProduits((prevProduits) =>
              prevProduits.map((p) => {
                  if (p.Produit === produit) {
                      const newProduit = { ...p, [jour]: quantite };
  
                      // Recalculer le total
                      newProduit.Total = joursSemaine.reduce(
                          (total, j) => total + (parseFloat(newProduit[j]) || 0),
                          0
                      );
  
                      return newProduit;
                  }
                  return p;
              })
          );
  
          // Message de succès
          alert("✅ Mise à jour réussie !");
      } catch (error) {
          console.error("❌ Erreur lors de la mise à jour du stock :", error);
          
          // Vérifier si l'erreur contient une réponse de l'API
          if (error.response && error.response.data && error.response.data.error) {
              alert(`❌ Erreur : ${error.response.data.error}`);
          } else {
              alert("❌ Une erreur est survenue lors de la mise à jour du stock.");
          }
      }
  };
  
    // Déterminer les colonnes modifiables
    const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const jourActuel = joursSemaine[new Date().getDay()];
    const editableColumns = [jourActuel];

    return (
        <div className="h-screen flex w-full overflow-hidden">
            {/* Barre latérale */}
            <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col h-screen">
                {/* En-tête */}
                <Header h_title="Sortie de Stock" h_role="Magasinier" h_user="Ousseini" />

                {/* Contenu du tableau */}
                <div className="flex-1 overflow-hidden p-1">
                <DataTable
                  data={produits}
                  editableColumns={editableColumns}
                  rowsPerPage={8}
                  onUpdateStock={handleStockOut} // s On passe la fonction pour gérer la mise à jour
                  pdfFileName="Sortie_fiche"
                />
                

                </div>
            </div>
        </div>
    );
};

export default Sortie;
