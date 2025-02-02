import Profile from "../../components/Layout/Profile";
import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { Columns2, FileClock, User, LogOut } from "lucide-react";


const Profile_V = () => {
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    fullName: "Soumana",
    role: "Vendeur de ticket",
    bio: "Je suis un vendeur de ticket passionné par mon travail.",
  };

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
    { icon: <User size={20} />, name: "Profile", path: "/profile_V" },
    { icon: <LogOut size={20} />, name: "Se déconnecter", path: "/logout" }, // Ajoutez un chemin pour la déconnexion
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
        <Profile user={user} editable={true} />
        </div>
      </div>
    </div>
  );
};
export default Profile_V