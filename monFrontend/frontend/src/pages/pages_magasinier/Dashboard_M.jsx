import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DashboardContent_M from "../../components/Layout/Layout_M/DashboardContent_M";
import { ClipboardCopy, ClipboardPaste,Columns2,ClipboardList ,User, LogOut } from "lucide-react";
const Dashboard_M = () => {
  const menuItems = [
    { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard_M" },
    { icon: <ClipboardList size={20} />, name: "Stock", path: "/stock" },
    { icon: <ClipboardCopy size={20} />, name: "Entrées", path: "/entree" },
    { icon: <ClipboardPaste size={20} />, name: "Sorties", path: "/sortie" },
  ];

  const userOptions = [
    { icon: <User size={20} />, name: "Profile",path: "/profile_M" },
    { icon: <LogOut size={20} />, name: "Se déconnecter",path:"/profile_V" },
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
          <DashboardContent_M/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_M;
