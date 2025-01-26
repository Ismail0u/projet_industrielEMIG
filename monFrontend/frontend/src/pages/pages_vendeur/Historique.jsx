import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";

const Historique = () => {

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
    { icon: "🏠", name: "Hello" },
    { icon: "⚙", name: "Settings" },
    { icon: "📊", name: "Reports" },
  ];

  const userOptions = [
    { icon: "👤", name: "Profile" },
    { icon: "🚪", name: "Logout" },
  ];
  

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
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Historique;
