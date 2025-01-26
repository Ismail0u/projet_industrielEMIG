import React, { useState } from "react";
import { AiOutlinePhone, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BackgroundImage from "../assets/images/background.png"; 
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
    className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0D519F] to-[#E6292E] overflow-hidden"
  >  
      {/* Login card */}
      <div className="z-10 bg-white rounded-lg shadow-md w-full max-w-sm p-6">
        <h2 className="text-xl font-roboto font-semibold text-center text-blue-600 mb-6">
          Se connecter
        </h2>
        <form>
          {/* Phone number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-roboto font-medium text-gray-700"
            >
              Numéro de téléphone
            </label>
            <div className="flex items-center border rounded-md mt-1 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <AiOutlinePhone className="text-gray-400 text-lg mr-2" />
              <input
                type="text"
                id="phone"
                placeholder="+227"
                className="w-full border-none focus:outline-none focus:ring-0 sm:text-sm"
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nom d'utilisateur
            </label>
            <div className="flex items-center border rounded-md mt-1 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <AiOutlineUser className="text-gray-400 text-lg mr-2" />
              <input
                type="text"
                id="username"
                placeholder=""
                className="w-full border-none focus:outline-none focus:ring-0 sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="flex items-center border rounded-md mt-1 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=""
                className="w-full border-none focus:outline-none focus:ring-0 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 text-lg focus:outline-none"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <div className="text-right text-sm text-blue-600 mt-1">
              <a href="#">Mot de passe oublié ?</a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
