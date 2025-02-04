import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import Profile from "../../components/Layout/Profile";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";

const Profile_M = () => {
  const user = {
    fullName: "Soumana Issoufou",
    firstName: "Soumana",
    lastName: "Issoufou",
    role: "Vendeur de ticket",
    email: "soumana.issoufou@example.com",
    phone: "+227 90 12 34 56",
    password: "motdepasse123",
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} userOptions={userOptions} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <Header h_title="Profil" h_role="Vendeur de ticket" h_user="Soumana Issoufou" />

        {/* Profile Section */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center items-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <Profile user={user} editable={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_M;
