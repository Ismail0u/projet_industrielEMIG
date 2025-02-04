// Sortie.js
import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems,userOptions } from "../../components/Layout/Layout_M/SidebarData_M";

const Fournisseurs = () => {
    const data = [
        { ID: 1, Nom: "Fournisseur A", Contact: "contactA@example.com", "Date d'ajout": "2023-10-01", Actions: "Edit | Delete" },
        { ID: 2, Nom: "Fournisseur B", Contact: "contactB@example.com", "Date d'ajout": "2023-10-02", Actions: "Edit | Delete" },
        { ID: 3, Nom: "Fournisseur C", Contact: "contactC@example.com", "Date d'ajout": "2023-10-03", Actions: "Edit | Delete" },
        { ID: 4, Nom: "Fournisseur D", Contact: "contactD@example.com", "Date d'ajout": "2023-10-04", Actions: "Edit | Delete" },
    ];

    // Obtenir le jour actuel en français
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const jourActuel = jours[new Date().getDay()];

    // Seule la colonne du jour actuel sera modifiable
    const editableColumns = [jourActuel];

    const rowsPerPage = 6;

    return (
        <div className="h-screen flex w-full overflow-hidden">
            {/* Barre latérale */}
            <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col h-screen">
                {/* En-tête */}
                <Header h_title="Tableau de bord" h_role="Vendeur de ticket" h_user="Soumana" />

                {/* Contenu du tableau de bord sans débordement */}
                <div className="flex-1 overflow-hidden p-1">
                    <DataTable data={data} editableColumns={editableColumns} rowsPerPage={rowsPerPage} />
                </div>
            </div>
        </div>
    );
};

export default Fournisseurs;