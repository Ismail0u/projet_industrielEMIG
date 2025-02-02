import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { Columns2, FileClock, User, LogOut } from "lucide-react";

const H_Lot = () => {

    const data = [
        { col1: "Alice", col2: "Manager", col3: "Paris", col4: "35 ans" },
        { col1: "Bob", col2: "Développeur", col3: "Lyon", col4: "29 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" },
        { col1: "Charlie", col2: "Designer", col3: "Marseille", col4: "26 ans" }
        
   ];
   const menuItems = [
    { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard" },
    {
      icon: <FileClock size={20} />,
      name: "Historique",
      subItems: [
        {
          
          name: "Historique des lots",
          path: "/H_lot",
        },
        {
          
          name: "Historique des montants remis",
          path: "/H_montant",
        },
      ],
    },
  ];

  const userOptions = [
    { icon: <User size={20} />, name: "Profile",path: "/profile_V" },
    { icon: <LogOut size={20} />, name: "Logout",path:"/profile_V"},
  ];
 const rowsPerPage = 8;
 const editableColumns = [];

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Barre latérale */}
      <Sidebar  menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        {/* En-tête */}
        <Header h_title="Historique des lots" h_role="Vendeur de ticket" h_user="Soumana" />

        {/* Contenu du tableau de bord sans débordement */}
        <div className="flex-1 overflow-hidden p-1">
          <DataTable data={data} rowsPerPage={rowsPerPage} editableColumns={editableColumns}/>
        </div>
      </div>
    </div>
  );
};

export default H_Lot;
