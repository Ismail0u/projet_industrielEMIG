import React from "react";
import Dashboard from "./pages/pages_vendeur/Dashboard";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard_M from "./pages/pages_magasinier/Dashboard_M";
import Entree from "./pages/pages_magasinier/Entree";
import Sortie from "./pages/pages_magasinier/Sortie";
import Stock from "./pages/pages_magasinier/Stock";
import Profile_M from "./pages/pages_magasinier/Profile_M";
import Profile_V from "./pages/pages_vendeur/Profile_V";
import H_Montant from "./pages/pages_vendeur/H_Montant";
import H_Lot from "./pages/pages_vendeur/H_Lot";
import RecuList from "./components/Recu/RecuList";
import ProduitFormulaire from "./pages/pages_magasinier/produitFormulaire";
import Fournisseurs from "./pages/pages_magasinier/Fournisseur";
import EtudiantForm from "./components/Etudiant/EtudiantFormulaire";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/Dashboard_M" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/H_lot" element={<H_Lot />} />
        <Route path="/H_montant" element={<H_Montant />} />
        <Route path="/profile_M" element={<Profile_M />} />
        <Route path="/fournisseurs" element={<Fournisseurs />} />
        
        <Route path="/etudiant" element={<EtudiantForm />} />
        <Route path="/reculist" element={<RecuList />} />
        <Route path="/produit" element={<ProduitFormulaire />} />
        <Route path="/dashboard_M" element={<Dashboard_M />} />
        <Route path="/entree" element={<Entree/>} />
        <Route path="/sortie" element={<Sortie/>} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/profile_V" element={<Profile_V />} />
        
        

      </Routes>
    </Router>
  );
}


export default App;