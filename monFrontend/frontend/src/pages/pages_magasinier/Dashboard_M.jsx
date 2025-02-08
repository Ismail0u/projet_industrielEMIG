import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems,userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import DashboardContent_M from "../../components/Layout/Layout_M/DashboardContent_M";
import { ClipboardCopy, ClipboardPaste,Columns2,ClipboardList ,User, LogOut } from "lucide-react";
const Dashboard_M = () => {
  
  
  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Barre latérale */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        {/* En-tête */}
        <Header h_title="Tableau de bord" h_role="Magazinier" h_user="Seyni" />

        {/* Contenu du tableau de bord sans débordement */}
        <div className="flex-1 overflow-hidden p-0">
          <DashboardContent_M/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_M;
