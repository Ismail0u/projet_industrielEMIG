import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import DataTable from "../../components/Layout/DataTable";
import { menuItems, userOptions } from "../../components/Layout/Layout_V/SidebarData_V";

const H_Lot = () => {
  const [historiqueLots, setHistoriqueLots] = useState([]);

  useEffect(() => {
    fetchHistoriqueLots();
  }, []);

  const fetchHistoriqueLots = async () => {
    try {
      const response = await axios.get("/api/lots/");
      console.log("📥 Données brutes reçues depuis l'API :", response.data);
      setHistoriqueLots(response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de l'historique des lots :", error);
    }
  };

  useEffect(() => {
    console.log("📊 Données mises à jour dans historiqueLots :", historiqueLots);
  }, [historiqueLots]);

  const tableData =
    historiqueLots.length > 0
      ? historiqueLots.map((lot) => ({
          ID: lot.id,
          "Type de Lot": lot.type_lot,
          "Nombre de Lot": lot.nombre_lot,
          "Date d'Ajout": lot.date,
        }))
      : [];

  console.log("📤 Données transformées pour DataTable :", tableData);

  const rowsPerPage = 8;
  const editableColumns = [];

  return (
    <div className="h-screen flex w-full overflow-hidden">
      <Sidebar menuItems={menuItems} userOptions={userOptions} />
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Historique des lots" h_role="Vendeur de ticket" h_user="Soumana" />
        <div className="flex-1 overflow-hidden p-1">
          <DataTable
            data={tableData}
            rowsPerPage={rowsPerPage}
            editableColumns={editableColumns}
            headers={["ID", "Type de Lot", "Nombre de Lot", "Date d'Ajout"]}
          />
        </div>
      </div>
    </div>
  );
};

export default H_Lot;