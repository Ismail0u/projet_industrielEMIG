import React, { useState } from "react";

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || "+227",
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Profil</h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={user.profilePicture}
            alt="Profil"
            className="w-20 h-20 rounded-full border"
          />
          <h3 className="text-lg font-bold mt-2">{user.fullName}</h3>
          <p className="text-gray-500">{user.role}</p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full"
        >
          {isEditing ? "Annuler" : "Modifier le profil"}
        </button>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-600 text-sm">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
              disabled={!isEditing}
              placeholder="Nouveau mot de passe"
            />
          </div>

          {isEditing && (
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md w-full">
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
