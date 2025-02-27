import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthForm";
import PrivateRoute from "./privateRoute";

// Pages
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

// Vendeur
import Dashboard from "./pages/pages_vendeur/Dashboard";
import Profile_V from "./pages/pages_vendeur/Profile_V";
import H_Montant from "./pages/pages_vendeur/H_Montant";
import H_Lot from "./pages/pages_vendeur/H_Lot";

// Magasinier
import Dashboard_M from "./pages/pages_magasinier/Dashboard_M";
import Entree from "./pages/pages_magasinier/Entree";
import Sortie from "./pages/pages_magasinier/Sortie";
import Stock from "./pages/pages_magasinier/Stock";
import Profile_M from "./pages/pages_magasinier/Profile_M";
import ProduitFormulaire from "./pages/pages_magasinier/ProduitFormulaire";
import Fournisseurs from "./pages/pages_magasinier/Fournisseur";

// Responsable guichet
import Dashboard_R from "./pages/pages_rguichet/Dashboard_R";
import Reservation from "./pages/pages_rguichet/Reservation";
import Profile_R from "./pages/pages_rguichet/Profile_R";
import ListeEtudiant from "./pages/pages_rguichet/ListeEtudiant";

// Autres composants
import RecuList from "./components/Recu/RecuList";
import EtudiantForm from "./components/Etudiant/EtudiantFormulaire";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          

          {/* Routes du Magasinier */}
          <Route element={<PrivateRoute allowedRoles={["MAGAZINIER"]} />}>
            <Route path="/dashboard_M" element={<Dashboard_M />} />
            <Route path="/entree" element={<Entree />} />
            <Route path="/sortie" element={<Sortie />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/profile_M" element={<Profile_M />} />
            <Route path="/fournisseurs" element={<Fournisseurs />} />
            <Route path="/produit" element={<ProduitFormulaire />} />
          </Route>

          {/* Routes du Vendeur */}
          <Route element={<PrivateRoute allowedRoles={["VENDEUR"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile_V" element={<Profile_V />} />
            <Route path="/H_lot" element={<H_Lot />} />
            <Route path="/H_montant" element={<H_Montant />} />
          </Route>

          {/* Routes du Responsable Guichet */}
          <Route element={<PrivateRoute allowedRoles={["RESPONSABLE_GUICHET"]} />}>
            <Route path="/dashboard_R" element={<Dashboard_R />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/profile_R" element={<Profile_R />} />
            <Route path="/listeEtudiant" element={<ListeEtudiant />} />
          </Route>

          {/* Routes accessibles à plusieurs rôles */}
          <Route element={<PrivateRoute allowedRoles={["MAGAZINIER", "RESPONSABLE_GUICHET"]} />}>
            <Route path="/etudiant" element={<EtudiantForm />} />
            <Route path="/reculist" element={<RecuList />} />
          </Route>

          {/* Route par défaut si aucune correspondance */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router> 
  );
}

export default App;
