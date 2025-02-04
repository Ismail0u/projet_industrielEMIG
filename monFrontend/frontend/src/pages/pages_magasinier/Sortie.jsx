import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems,userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import { ClipboardCopy, ClipboardPaste,Columns2,ClipboardList ,User, LogOut } from "lucide-react";
const Sortie = () => {


  const data = [
    { Produit: "Tomate concentrée", Unité: "kg", Lundi: 10, Mardi: 15, Mercredi: 8, Jeudi: 12, Vendredi: 9, Samedi: 14, Dimanche: 11, Total: 79 },
    { Produit: "Pomme de terre", Unité: "litres", Lundi: 5, Mardi: 5, Mercredi: 5, Jeudi: 5, Vendredi: 5, Samedi: 5, Dimanche: 5, Total: 35 },
    { Produit: "Gaz Butane ", Unité: "paquets", Lundi: 7, Mardi: 7, Mercredi: 7, Jeudi: 7, Vendredi: 7, Samedi: 7, Dimanche: 7, Total: 49 },
    { Produit: "Tomate concentrée", Unité: "kg", Lundi: 10, Mardi: 15, Mercredi: 8, Jeudi: 12, Vendredi: 9, Samedi: 14, Dimanche: 11, Total: 79 },
    { Produit: "Pomme de terre", Unité: "litres", Lundi: 5, Mardi: 5, Mercredi: 5, Jeudi: 5, Vendredi: 5, Samedi: 5, Dimanche: 5, Total: 35 },
    { Produit: "Gaz Butane ", Unité: "paquets", Lundi: 7, Mardi: 7, Mercredi: 7, Jeudi: 7, Vendredi: 7, Samedi: 7, Dimanche: 7, Total: 49 },
    { Produit: "Tomate concentrée", Unité: "kg", Lundi: 10, Mardi: 15, Mercredi: 8, Jeudi: 12, Vendredi: 9, Samedi: 14, Dimanche: 11, Total: 79 },
    { Produit: "Pomme de terre", Unité: "litres", Lundi: 5, Mardi: 5, Mercredi: 5, Jeudi: 5, Vendredi: 5, Samedi: 5, Dimanche: 5, Total: 35 },
    { Produit: "Gaz Butane ", Unité: "paquets", Lundi: 7, Mardi: 7, Mercredi: 7, Jeudi: 7, Vendredi: 7, Samedi: 7, Dimanche: 7, Total: 49 }
];

     // Obtenir le jour actuel en français
     const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
     const jourActuel = joursSemaine[new Date().getDay()]; 
 
     // Seule la colonne du jour actuel sera modifiable
     const editableColumns = [jourActuel];

   
  
  const rowsPerPage=6

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
          <DataTable data={data} editableColumns={editableColumns} rowsPerPage={rowsPerPage}/>
        </div>
      </div>
    </div>
  );
};

export default Sortie;
