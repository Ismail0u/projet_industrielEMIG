import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUserData } from "../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Utilisation de useNavigate ici

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getUserData();
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
                handleLogout(); // Déconnexion en cas d'erreur
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogin = async (email, password) => {
      try {
          const data = await login(email, password);  // Appelle le service login
  
          if (data.access && data.refresh) {
              localStorage.setItem("access_token", data.access);
              localStorage.setItem("refresh_token", data.refresh);
              localStorage.setItem("user", JSON.stringify(data.user));
  
              setUser(data.user);  // Assure-toi de définir l'utilisateur
              console.log("Utilisateur connecté :", data.user);
              navigate(getRedirectPath(data.user.role));  // Redirige en fonction du rôle
          } else {
              throw new Error("Token non reçu après connexion");
          }
      } catch (error) {
          console.error("Erreur de connexion :", error);
          setError("Email ou mot de passe incorrect"); // Gère l'affichage de l'erreur
      }
  };
  

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

const getRedirectPath = (role) => {
    switch (role) {
        case "MAGAZINIER":
            return "/dashboard_M";
        case "RESPONSABLE_GUICHET":
            return "/dashboard_R";
        case "VENDEUR":
            return "/dashboard";
        default:
            return "/unauthorized";
    }
};
