import React, { useState } from "react";

const Profile = ({ user }) => {
  // Initialize formData with default values from the user if available.
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    fax: user.fax || "",
    country: user.country || "",
    city: user.city || "",
    postcode: user.postcode || "",
    state: user.state || "",
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle change of input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Handle save action (you can add your saving logic here)
  const handleSave = () => {
    // Example: Save the data, then disable editing.
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">General Information</h2>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="flex flex-col mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {formData.fullName || "John Doe"}
        </h3>
        <p className="text-gray-700">{user.role || "Role/Title"}</p>
      </div>

      {/* Button to toggle editing mode */}
      <div className="mb-4">
        <button
          onClick={toggleEditing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {isEditing ? "Annuler" : "Modifier"}
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Organization Information
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="fax"
          placeholder="Fax"
          value={formData.fax}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          value={formData.postcode}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border p-2 rounded-md border-gray-300"
          disabled={!isEditing}
        />
      </div>

      {isEditing && (
        <div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
