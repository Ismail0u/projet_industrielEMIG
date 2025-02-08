import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import { StockTableService, StockUpdateService, recuService } from "../../services/apiService";
import RecuForm from "../../components/Recu/RecuForm";

const Entree = () => {
    const [produits, setProduits] = useState([]);
    const [showRecuForm, setShowRecuForm] = useState(false);
    const [recuData, setRecuData] = useState(null); // Stocker les données pour le formulaire

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const data = await StockTableService.get("", { params: { estSortie: 0 } });
                console.log("Data received in ProduitList:", data);
                setProduits(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits api", error);
            }
        };
        fetchProduits();
    }, []);

    const handleStockOut = async (produit, jour, quantite) => {
        console.log("📤 Données envoyées :", { produit, jour, quantite });

        if (!produit || !jour || isNaN(quantite) || quantite < 0) {
            console.error("❌ Erreur : Données invalides !");
            return;
        }

        try {
            const response = await StockUpdateService(produit, jour, quantite);
            console.log("Réponse API :", response);

            setProduits((prevProduits) =>
                prevProduits.map((p) => {
                    if (p.Produit === produit) {
                        const newProduit = { ...p, [jour]: quantite };
                        newProduit.Total = joursSemaine.reduce(
                            (total, j) => total + (parseFloat(newProduit[j]) || 0),
                            0
                        );
                        return newProduit;
                    }
                    return p;
                })
            );

            alert("✅ Mise à jour réussie !");

            // Stocker les données du reçu et afficher le formulaire
            setRecuData({ produit, jour, quantite });
            setShowRecuForm(true);

        } catch (error) {
            console.error("❌ Erreur lors de la mise à jour du stock :", error);
            alert("❌ Une erreur est survenue lors de la mise à jour du stock.");
        }
    };

    const handleCreate = async (data) => {
        try {
            await recuService.create(data);
            alert("✅ Reçu enregistré avec succès !");
            setShowRecuForm(false); // Fermer le formulaire après validation
        } catch (error) {
            console.error("Erreur lors de la création du reçu:", error);
        }
    };

    const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const jourActuel = joursSemaine[new Date().getDay()];
    const editableColumns = [jourActuel];

    return (
        <div className="h-screen flex w-full overflow-hidden">
            <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

            <div className="flex-1 flex flex-col h-screen">
                <Header h_title="Entrée en stock"  h_role="Magasinier" h_user="Soumana" />

                <div className="flex-1 overflow-hidden p-1">
                    <DataTable
                        data={produits}
                        editableColumns={editableColumns}
                        rowsPerPage={8}
                        onUpdateStock={handleStockOut}
                    />
                </div>

                {/* Affichage du formulaire RecuForm seulement si showRecuForm est true */}
                {showRecuForm && (
                    <RecuForm
                        isOpen={showRecuForm}
                        onClose={() => setShowRecuForm(false)} // Ferme la modale
                        onSubmit={handleCreate} // Soumet les données à l'API
                        initialData={recuData} // Passe les données initiales à la modale
                    />
                )}
            </div>
        </div>
    );
};

export default Entree;
