import Profile from "../../components/Layout/Profile";
import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems,userOptions } from "../../components/Layout/Layout_V/SidebarData_V";
import { Columns2, FileClock, User, LogOut } from "lucide-react";


const Profile_V = () => {
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    fullName: "Soumana",
    role: "Vendeur de ticket",
    bio: "Je suis un vendeur de ticket passionné par mon travail.",
  };

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
        <Profile user={user} editable={true} />
        </div>
      </div>
    </div>
  );
};
export default Profile_V