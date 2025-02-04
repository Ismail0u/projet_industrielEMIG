import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardContent = () => {
  const [ticketsVendus, setTicketsVendus] = useState([]);
  const [lots, setLots] = useState([]);
  const [argentRemis, setArgentRemis] = useState([]);

  const [formData, setFormData] = useState({
    type_ticket: "",
    nombre_ticket: "",
    date: "",
  });

  const [lotFormData, setLotFormData] = useState({
    type_lot: "Petit-déjeuner", // valeur par défaut
    nombre_lot: "",
    date: "",
  });

  const [argentFormData, setArgentFormData] = useState({
    montant: "",
    date: "",
  });

  // Récupération des données depuis le backend
  useEffect(() => {
    fetchTicketsVendus();
    fetchLots();
    fetchArgentRemis();
  }, []);

  const fetchTicketsVendus = async () => {
    try {
      const response = await axios.get("/api/tickets-vendus/");
      setTicketsVendus(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets vendus :", error);
    }
  };

  const fetchLots = async () => {
    try {
      const response = await axios.get("/api/lots/");
      setLots(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lots :", error);
    }
  };

  const fetchArgentRemis = async () => {
    try {
      const response = await axios.get("/api/argent-remis/");
      setArgentRemis(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'argent remis :", error);
    }
  };

  // Calculs pour les cartes

  // Pour chaque type, le nombre de tickets disponibles est égal à la somme des lots (nombre_lot) multiplié par 14
  const availableTickets = (type) =>
    lots
      .filter((lot) => lot.type_lot === type)
      .reduce((acc, lot) => acc + (parseInt(lot.nombre_lot, 10) || 0) * 14, 0);

  // Nombre de tickets vendus pour un type donné
  const soldTickets = (type) =>
    ticketsVendus
      .filter((ticket) => ticket.type_ticket === type)
      .reduce((acc, ticket) => acc + (parseInt(ticket.nombre_ticket, 10) || 0), 0);

  // Nombre de tickets invendus = tickets disponibles - tickets vendus (pour la Card 2)
  const unsoldTickets = (type) => availableTickets(type) - soldTickets(type);

  // Prix par ticket pour chaque type
  const pricePerTicket = {
    "Petit-déjeuner": 75,
    "Déjeuner": 125,
  };

  // Pour la Card 3 : le montant à remettre dépend du nombre total de tickets disponibles dans les lots (et non des tickets vendus)
  const totalAmountToRemitBeforeDeduction =
    availableTickets("Déjeuner") * pricePerTicket["Déjeuner"] +
    availableTickets("Petit-déjeuner") * pricePerTicket["Petit-déjeuner"];

  // Montant total déjà remis
  const totalArgentRemis = argentRemis.reduce(
    (acc, entry) => acc + (parseInt(entry.montant, 10) || 0),
    0
  );

  // Montant final à remettre
  const finalTotalRemit = totalAmountToRemitBeforeDeduction - totalArgentRemis;

  // Formulaire Ticket vendu
  const handleTicketSubmit = async (e) => {
    e.preventDefault();

    // Validation : aucun nombre négatif
    if (parseInt(formData.nombre_ticket, 10) < 0) {
      alert("Le nombre de ticket ne peut être négatif.");
      return;
    }

    // Validation : la date ne peut excéder la date d'aujourd'hui
    const today = new Date().toISOString().slice(0, 10);
    if (formData.date > today) {
      alert("La date ne peut excéder la date du jour.");
      return;
    }

    // Validation : vérifier que le nombre de tickets vendus ne dépasse pas le nombre de tickets disponibles pour ce type
    const available = availableTickets(formData.type_ticket);
    const sold = soldTickets(formData.type_ticket);
    if (sold + parseInt(formData.nombre_ticket, 10) > available) {
      alert(
        `Il n'y a pas assez de tickets disponibles pour ${formData.type_ticket}. Disponibles: ${available - sold}`
      );
      return;
    }

    // Pop-up de confirmation avec les données saisies
    if (
      !window.confirm(
        `Confirmez-vous la vente de ${formData.nombre_ticket} ticket(s) de type ${formData.type_ticket} à la date ${formData.date} ?`
      )
    ) {
      return;
    }

    try {
      console.log("Données du formulaire ticket envoyées :", formData);
      await axios.post("/api/tickets-vendus/", formData);
      fetchTicketsVendus(); // Rafraîchir les données
      alert("Ticket vendu ajouté avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du ticket vendu :",
        error.response || error.message
      );
      alert("Erreur lors de l'ajout du ticket vendu.");
    }
  };

  // Formulaire Ajout de lot
  const handleLotSubmit = async (e) => {
    e.preventDefault();

    // Validation : aucun nombre négatif
    if (parseInt(lotFormData.nombre_lot, 10) < 0) {
      alert("Le nombre de lot ne peut être négatif.");
      return;
    }

    // Validation : la date ne peut excéder la date d'aujourd'hui
    const today = new Date().toISOString().slice(0, 10);
    if (lotFormData.date > today) {
      alert("La date ne peut excéder la date du jour.");
      return;
    }

    // Pop-up de confirmation avec les données saisies
    if (
      !window.confirm(
        `Confirmez-vous l'ajout du lot suivant ?\nType de lot : ${lotFormData.type_lot}\nNombre de lot : ${lotFormData.nombre_lot}\nDate : ${lotFormData.date}`
      )
    ) {
      return;
    }

    try {
      console.log("Données du formulaire lot envoyées :", lotFormData);
      await axios.post("/api/lots/", lotFormData);
      fetchLots(); // Rafraîchir les données
      alert("Lot ajouté avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du lot :",
        error.response || error.message
      );
      alert("Erreur lors de l'ajout du lot.");
    }
  };

  // Formulaire Argent remis
  const handleArgentSubmit = async (e) => {
    e.preventDefault();

    // Validation : aucun montant négatif
    if (parseInt(argentFormData.montant, 10) < 0) {
      alert("Le montant ne peut être négatif.");
      return;
    }

    // Validation : la date ne peut excéder la date d'aujourd'hui
    const today = new Date().toISOString().slice(0, 10);
    if (argentFormData.date > today) {
      alert("La date ne peut excéder la date du jour.");
      return;
    }

    // Validation : on ne peut remettre un montant supérieur au montant à remettre (total final)
    if (parseInt(argentFormData.montant, 10) > finalTotalRemit) {
      alert(
        `Le montant à remettre ne peut être supérieur à ${finalTotalRemit.toFixed(2)}.`
      );
      return;
    }

    // Pop-up de confirmation avec les données saisies
    if (
      !window.confirm(
        `Confirmez-vous l'ajout de la remise suivante ?\nMontant : ${argentFormData.montant}\nDate : ${argentFormData.date}`
      )
    ) {
      return;
    }

    try {
      console.log("Données du formulaire argent envoyées :", argentFormData);
      await axios.post("/api/argent-remis/", argentFormData);
      fetchArgentRemis(); // Rafraîchir les données
      alert("Montant remis ajouté avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du montant remis :",
        error.response || error.message
      );
      alert("Erreur lors de l'ajout du montant remis.");
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center p-4">
      {/* Section des cartes */}
      <div className="grid grid-cols-3 grid-rows-6 h-full w-full gap-3">
        {/* Card 1 : Tickets vendus */}
        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Tickets vendus
          </h2>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-600">
                Déjeuner : {soldTickets("Déjeuner")}
              </p>
              <p className="text-xs text-gray-600">
                Petit-déjeuner : {soldTickets("Petit-déjeuner")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Total :{" "}
                {soldTickets("Déjeuner") + soldTickets("Petit-déjeuner")}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 : Tickets invendus */}
        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Tickets invendus
          </h2>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-600">
                Déjeuner : {unsoldTickets("Déjeuner")}
              </p>
              <p className="text-xs text-gray-600">
                Petit-déjeuner : {unsoldTickets("Petit-déjeuner")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Total :{" "}
                {unsoldTickets("Déjeuner") + unsoldTickets("Petit-déjeuner")}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 : Montant à remettre (seulement le total) */}
        <div className="row-span-1 bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">
            Montant à remettre
          </h2>
          <div className="flex ">
            <p className="text-xs font-semibold text-gray-800">
              Total : {finalTotalRemit.toFixed(2)} FCFA
            </p>
          </div>
        </div>

        {/* Card 4 : Formulaire Tickets vendus */}
        <div className="row-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Tickets vendus
          </h2>
          <form onSubmit={handleTicketSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Type de ticket */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Type de ticket
                </p>
                <select
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.type_ticket}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type_ticket: e.target.value,
                    })
                  }
                >
                  <option value="">Sélectionnez</option>
                  <option value="Petit-déjeuner">
                    Petit-déjeuner
                  </option>
                  <option value="Déjeuner">Déjeuner</option>
                </select>
              </div>

              {/* Nombre de ticket */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Nombre de ticket
                </p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.nombre_ticket}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nombre_ticket:
                        parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Date
                </p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
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

        {/* Card 5 : Formulaire Ajout de lot */}
        <div className="row-span-3 col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Ajouter un lot
          </h2>
          <form onSubmit={handleLotSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Type de lot */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Type de lot
                </p>
                <select
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.type_lot}
                  onChange={(e) =>
                    setLotFormData({
                      ...lotFormData,
                      type_lot: e.target.value,
                    })
                  }
                >
                  <option value="Petit-déjeuner">
                    Petit-déjeuner
                  </option>
                  <option value="Déjeuner">Déjeuner</option>
                </select>
              </div>

              {/* Nombre de lot */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Nombre de lot
                </p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.nombre_lot}
                  onChange={(e) =>
                    setLotFormData({
                      ...lotFormData,
                      nombre_lot:
                        parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Date
                </p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={lotFormData.date}
                  onChange={(e) =>
                    setLotFormData({
                      ...lotFormData,
                      date: e.target.value,
                    })
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

        {/* Card 6 : Formulaire Montant remis */}
        <div className="row-span-3 col-span-3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-ml font-semibold text-gray-800 mb-2">
            Montant remis
          </h2>
          <form onSubmit={handleArgentSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {/* Montant */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Montant
                </p>
                <input
                  type="number"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={argentFormData.montant}
                  onChange={(e) =>
                    setArgentFormData({
                      ...argentFormData,
                      montant:
                        parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-600 mb-1">
                  Date
                </p>
                <input
                  type="date"
                  className="border border-gray-200 px-4 py-3 text-xs rounded-md"
                  value={argentFormData.date}
                  onChange={(e) =>
                    setArgentFormData({
                      ...argentFormData,
                      date: e.target.value,
                    })
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
