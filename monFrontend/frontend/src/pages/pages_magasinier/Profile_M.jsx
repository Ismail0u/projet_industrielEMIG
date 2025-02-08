import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import Profile from "../../components/Layout/Profile";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";

const Profile_M = () => {
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    fullName: "Soumana",
    role: "Vendeur de ticket",
    bio: "Je suis un vendeur de ticket passionné par mon travail.",
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <Header h_title="Profile" h_role="Magasinier" h_user="Soumana" />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-hidden p-0 flex items-center justify-center">
          <Profile user={user} editable={true} />
        </div>
      </div>
    </div>
  );
};

export default Profile_M;
