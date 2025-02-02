import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API requests

const DashboardContent = () => {
  const [ticketsVendus, setTicketsVendus] = useState([]);
  const [lots, setLots] = useState([]);
  const [argentRemis, setArgentRemis] = useState([]);

  const [formData, setFormData] = useState({
    type_ticket: "",
    nombre_ticket: 0,
    date: "",
  });

  const [lotFormData, setLotFormData] = useState({
    type_lot: "",
    nombre_lot: 0,
    date: "",
  });

  const [argentFormData, setArgentFormData] = useState({
    montant: 0,
    date: "",
  });

  // Fetch data from the backend
  useEffect(() => {
    fetchTicketsVendus();
    fetchLots();
    fetchArgentRemis();
  }, []);

  const fetchTicketsVendus = async () => {
    const response = await axios.get("/api/tickets-vendus/");
    setTicketsVendus(response.data);
  };

  const fetchLots = async () => {
    const response = await axios.get("/api/lots/");
    setLots(response.data);
  };

  const fetchArgentRemis = async () => {
    const response = await axios.get("/api/argent-remis/");
    setArgentRemis(response.data);
  };

  // Handle form submissions
  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/tickets-vendus/", formData);
    fetchTicketsVendus(); // Refresh data
  };

  const handleLotSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/lots/", lotFormData);
    fetchLots(); // Refresh data
  };

  const handleArgentSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/argent-remis/", argentFormData);
    fetchArgentRemis(); // Refresh data
  };

  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center p-4">
      {/* Section des cartes */}
      <div className="grid grid-cols-3 grid-rows-6 h-full w-full gap-3">
        {/* Cartes réduites */}
        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Nombre de tickets vendus
          </h2>
          <p className="text-xs text-gray-600">
            {ticketsVendus.reduce((acc, ticket) => acc + ticket.nombre_ticket, 0)}
          </p>
        </div>

        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Nombre de tickets invendus
          </h2>
          <p className="text-xs text-gray-600">Calculer en fonction des lots.</p>
        </div>

        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Montant à remettre
          </h2>
          <p className="text-xs text-gray-600">
            {lots.reduce((acc, lot) => acc + lot.montant, 0)}
          </p>
        </div>

        {/* Carte 4 (grande hauteur) */}
        <div className="row-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Tickets vendus
          </h2>
          <form onSubmit={handleTicketSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Type de ticket */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Type de ticket</p>
                <select
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.type_ticket}
                  onChange={(e) =>
                    setFormData({ ...formData, type_ticket: e.target.value })
                  }
                >
                  <option value="Petit-déjeuner">Petit-déjeuner</option>
                  <option value="Déjeuner">Déjeuner</option>
                </select>
              </div>

              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Nombre de ticket</p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.nombre_ticket}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre_ticket: e.target.value })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md"
              >
                Confirmer
              </button>
            </div>
          </form>
        </div>

        {/* Carte 5 (large) */}
        <div className="row-span-3 col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Ajouter un lot
          </h2>
          <form onSubmit={handleLotSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Type de lot */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Type de lot</p>
                <select
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.type_lot}
                  onChange={(e) =>
                    setLotFormData({ ...lotFormData, type_lot: e.target.value })
                  }
                >
                  <option value="Petit-déjeuner">Petit-déjeuner</option>
                  <option value="Déjeuner">Déjeuner</option>
                </select>
              </div>

              {/* Nombre de lot */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Nombre de lot</p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.nombre_lot}
                  onChange={(e) =>
                    setLotFormData({ ...lotFormData, nombre_lot: e.target.value })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.date}
                  onChange={(e) =>
                    setLotFormData({ ...lotFormData, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        {/* Carte 6 (large) */}
        <div className="row-span-3 col-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Montant remis
          </h2>
          <form onSubmit={handleArgentSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Montant */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Montant</p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={argentFormData.montant}
                  onChange={(e) =>
                    setArgentFormData({ ...argentFormData, montant: e.target.value })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={argentFormData.date}
                  onChange={(e) =>
                    setArgentFormData({ ...argentFormData, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Bouton aligné en bas à droite */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 text-xs rounded-md"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;