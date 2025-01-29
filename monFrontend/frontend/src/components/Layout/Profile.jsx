import React, { useState } from "react";

const Profile=({ user, editable }) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg w-full">
        <h2 className="text-lg font-semibold">Profile Information</h2>
        
        {/* Affichage du profil */}
        <div className="mt-4 flex items-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold">{user.fullName}</h3>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>
  
        {/* Champs modifiables si 'editable' est activé */}
        {editable && (
          <div className="mt-6">
            <label className="block text-gray-600">Bio</label>
            <textarea
              className="w-full border p-2 rounded-md"
              defaultValue={user.bio}
            />
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md">
              Save Changes
            </button>
          </div>
        )}
      </div>
    );
  }
  export default Profile;