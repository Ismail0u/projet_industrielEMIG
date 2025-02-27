import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/Auth/AuthForm";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;  // Montre un message de chargement tant que l'utilisateur n'est pas déterminé

  // Vérification avec localStorage si user est null
  const storedUser = user || JSON.parse(localStorage.getItem("user"));

  console.log("Utilisateur dans PrivateRoute:", storedUser);

  if (!storedUser) return <Navigate to="/login" />;  // Redirige si l'utilisateur n'est pas connecté

  if (allowedRoles && !allowedRoles.includes(storedUser.role)) {
      return <Navigate to="/unauthorized" />;  // Redirige si l'utilisateur n'a pas le bon rôle
  }

  return <Outlet />;  // Si l'utilisateur est valide et a accès, on affiche la page
};

export default PrivateRoute;
