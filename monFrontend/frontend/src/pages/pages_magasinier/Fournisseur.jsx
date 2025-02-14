// Fournisseur.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import FournisseurForm from "../../components/Fournisseur/FournisseurForm";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import { fournisseurService } from "../../services/apiService";

const Fournisseurs = () => {
  const [data, setData] = useState([]);
  const rowsPerPage = 6;
  const editableColumns = [];

  // State pour la modale d'ajout et le message de confirmation
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  // Chargement dynamique des fournisseurs via fournisseurService
  const loadData = async () => {
    try {
      const fetchedData = await fournisseurService.get();
      console.log("Data received from API:", fetchedData);
      // On mappe les données pour les adapter à DataTable
      const mappedData = fetchedData.map(item => ({
        ID: item.idFournisseur,
        Nom: item.nomFournisseur,
        Contact: item.contact,
        "Date d'ajout": item.dateAjout
          ? new Date(item.dateAjout).toISOString().split("T")[0]
          : "",
        Actions: "Edit | Delete"
      }));
      setData(mappedData);
    } catch (error) {
      console.error("Erreur lors du chargement des fournisseurs", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ajout d'un nouveau fournisseur via fournisseurService
  const handleAddFournisseur = async (formData) => {
    try {
      const createdFournisseur = await fournisseurService.create(formData);
      const newFournisseur = {
        ID: createdFournisseur.idFournisseur,
        Nom: createdFournisseur.nomFournisseur,
        Contact: createdFournisseur.contact,
        "Date d'ajout": createdFournisseur.dateAjout
          ? new Date(createdFournisseur.dateAjout).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        Actions: "Edit | Delete"
      };

      // Recharger la liste après création
      loadData();

      // Afficher le message de confirmation
      setConfirmationData(newFournisseur);
      setShowAddModal(false);
    } catch (error) {
      console.error("Erreur lors de la création du fournisseur:", error);
    }
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Barre latérale */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Fournisseur" h_role="Magasinier" h_user="Soumana" />

        <div className="flex-1 overflow-hidden p-1">
          {/* Affichage du tableau */}
          <DataTable data={data} rowsPerPage={rowsPerPage} editableColumns={editableColumns} pdfFileName="Liste_Fournisseur"/>

          {/* Bouton "Ajouter Fournisseur" en bas du tableau */}
          <div className="flex mt-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-4"
            >
              Ajouter Fournisseur
            </button>
          </div>
        </div>
      </div>

      {/* Fenêtre modale pour l'ajout de fournisseur */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Ajouter Fournisseur</h2>
            <FournisseurForm onSubmit={handleAddFournisseur} />
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Message de confirmation affiché après l'ajout */}
      {confirmationData && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
          <p>Fournisseur ajouté avec succès !</p>
          <p>
            <strong>ID:</strong> {confirmationData.ID}
          </p>
          <p>
            <strong>Nom:</strong> {confirmationData.Nom}
          </p>
          <p>
            <strong>Contact:</strong> {confirmationData.Contact}
          </p>
          <p>
            <strong>Date d'ajout:</strong> {confirmationData["Date d'ajout"]}
          </p>
          <button
            onClick={() => setConfirmationData(null)}
            className="mt-2 bg-white text-green-500 py-1 px-2 rounded"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default Fournisseurs;
