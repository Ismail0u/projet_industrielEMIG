import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems, userOptions } from "../../components/Layout/Layout_V/SidebarData_V";

const H_Montant = () => {
  const [historiqueMontants, setHistoriqueMontants] = useState([]);

  useEffect(() => {
    fetchHistoriqueMontants();
  }, []);

  const fetchHistoriqueMontants = async () => {
    try {
      const response = await axios.get("/api/argent-remis/");
      console.log("📥 Données brutes reçues depuis l'API :", response.data);
      setHistoriqueMontants(response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des montants remis :", error);
    }
  };

  // Vérification si les données sont bien mises à jour
  useEffect(() => {
    console.log("📊 Données mises à jour dans historiqueMontants :", historiqueMontants);
  }, [historiqueMontants]);

  // Transformation des données pour DataTable
  const tableData =
    historiqueMontants.length > 0
      ? historiqueMontants.map((montant) => ({
          "Montant Remis": montant.montant,
          "Date de la Remise": montant.date,
        }))
      : [];

  console.log("📤 Données envoyées à DataTable :", tableData);

  const rowsPerPage = 8;
  const editableColumns = [];

  return (
    <div className="h-screen flex w-full overflow-hidden">
      <Sidebar menuItems={menuItems} userOptions={userOptions} />
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Historique des montants remis" h_role="Vendeur de ticket" h_user="Soumana" />
        <div className="flex-1 overflow-hidden p-1">
          <DataTable
            data={tableData}
            rowsPerPage={rowsPerPage}
            editableColumns={editableColumns}
            headers={["Montant Remis", "Date de la Remise"]}
          />
        </div>
      </div>
    </div>
  );
};

export default H_Montant;
