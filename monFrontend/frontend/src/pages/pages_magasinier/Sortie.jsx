import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { sortieStock,StockTableService } from "../../services/apiService";
import { ClipboardCopy, ClipboardPaste, Columns2, ClipboardList, User, LogOut } from "lucide-react";

const Sortie = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        // Charger les données de l'API
        const fetchProduits = async () => {
            try {
              const response = await StockTableService.get("?estSortie=1");

                setProduits(response);
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
        console.error("❌ Erreur : Données invalides !");
        return;
      }
    
      try {
        // Envoyer la requête de mise à jour à l'API
        const response = await sortieStock(produit, jour, quantite);
        console.log("Réponse API :", response);
    
        // Mettre à jour l'état des produits après validation de l'API
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
    
        // Retour visuel pour l'utilisateur
        alert("✅ Mise à jour réussie !");
      } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du stock :", error);
        alert("❌ Une erreur est survenue lors de la mise à jour du stock.");
      }
    };
    
    // Déterminer les colonnes modifiables
    const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const jourActuel = joursSemaine[new Date().getDay()];
    const editableColumns = [jourActuel];

    return (
        <div className="h-screen flex w-full overflow-hidden">
            {/* Barre latérale */}
            <Sidebar title="My Dashboard" menuItems={[
                { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard_M" },
                { icon: <ClipboardList size={20} />, name: "Stock", path: "/stock" },
                { icon: <ClipboardCopy size={20} />, name: "Entrées", path: "/entree" },
                { icon: <ClipboardPaste size={20} />, name: "Sorties", path: "/sortie" }
            ]} userOptions={[
                { icon: <User size={20} />, name: "Profile", path: "/profile_M" },
                { icon: <LogOut size={20} />, name: "Se déconnecter", path: "/profile_V" }
            ]} />

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col h-screen">
                {/* En-tête */}
                <Header h_title="Sortie de Stock" h_role="Magasinier" h_user="Soumana" />

                {/* Contenu du tableau */}
                <div className="flex-1 overflow-hidden p-1">
                <DataTable
                  data={produits}
                  editableColumns={editableColumns}
                  rowsPerPage={6}
                  onUpdateStock={handleStockOut} // s On passe la fonction pour gérer la mise à jour
                />
                

                </div>
            </div>
        </div>
    );
};

export default Sortie;
