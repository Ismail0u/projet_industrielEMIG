import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DashboardContent from "../../components/Layout/DashboardContent";

const Dashboard = () => {
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
        <div className="flex-1 overflow-hidden p-0">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
