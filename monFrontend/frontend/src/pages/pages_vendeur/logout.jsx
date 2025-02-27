import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Suppression du token et des infos utilisateur
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirection vers la page de login après 1 seconde
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-bold">Déconnexion en cours...</h2>
    </div>
  );
};

export default Logout;