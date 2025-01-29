import React from "react";
import Dashboard from "./pages/pages_vendeur/Dashboard";
import Historique from "./pages/pages_vendeur/Historique";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard_M from "./pages/pages_magasinier/Dashboard_M";
import Entree from "./pages/pages_magasinier/Entree";
import Sortie from "./pages/pages_magasinier/Sortie";
import Stock from "./pages/pages_magasinier/Stock";


function App() {
  return (
    <Router>
      <Routes>

         <Route path="/" element={<Navigate to="/Dashboard_M" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historique" element={<Historique />} />
        

        <Route path="/dashboard_M" element={<Dashboard_M />} />
        <Route path="/entree" element={<Entree/>} />
        <Route path="/sortie" element={<Sortie/>} />
        <Route path="/stock" element={<Stock />} />
        

      </Routes>
    </Router>
  );
}


export default App;