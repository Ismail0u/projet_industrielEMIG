import React from "react";

const DataTable_R = ({
  etudiants,           // Tableau d'étudiants
  jours,               // Tableau des jours (pour l'en-tête)
  periodes,            // Tableau des périodes (pour l'en-tête)
  reservations,        // Map des réservations : pour chaque étudiant (clé = idEtudiant), une Map avec clé "idJour-idPeriode" et valeur (ici, l'idReservation ou une valeur truthy)
  rowsPerPage,         // (Optionnel) si tu souhaites intégrer la pagination ultérieurement
  onCheckboxToggle,    // Fonction appelée lorsque l'utilisateur change l'état d'une checkbox
  handleKeyDown        // Fonction appelée lors d'une touche dans la checkbox (pour la touche "Enter")
}) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th rowSpan="2" className="border p-2">ID</th>
          <th rowSpan="2" className="border p-2">Nom</th>
          <th rowSpan="2" className="border p-2">Prénom</th>
          {jours.map((jour, index) => (
            <th
              key={jour.idJour}
              colSpan={periodes.length}
              className={`border p-2 text-center ${index !== 0 ? "border-l-4 border-gray-500" : ""}`}
            >
              {jour.nomJour}
            </th>
          ))}
        </tr>
        <tr className="bg-gray-200">
          {jours.map((jour, index) =>
            periodes.map((periode) => (
              <th
                key={`${jour.idJour}-${periode.idPeriode}`}
                className={`border p-2 ${index !== 0 ? "border-l-4 border-gray-500" : ""}`}
              >
                {periode.idPeriode}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {etudiants.map((etudiant) => (
          <tr key={etudiant.idEtudiant} className="border">
            <td className="border p-2">{etudiant.idEtudiant}</td>
            <td className="border p-2">{etudiant.nomEtudiant}</td>
            <td className="border p-2">{etudiant.prenomEtudiant}</td>
            {jours.map((jour, index) =>
              periodes.map((periode) => {
                const key = `${jour.idJour}-${periode.idPeriode}`;
                // La case est cochée si la Map reservations pour cet étudiant contient une réservation pour cette clé
                const isChecked = reservations.get(etudiant.idEtudiant)?.get(key) ? true : false;
                return (
                  <td
                    key={`${etudiant.idEtudiant}-${key}`}
                    className={`border p-2 text-center ${index !== 0 ? "border-l-4 border-gray-500" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onCheckboxToggle(etudiant.idEtudiant, key)}
                      onKeyDown={(event) =>
                        handleKeyDown(event, etudiant.idEtudiant, jour.idJour, periode.idPeriode)
                      }
                      tabIndex={0}
                    />
                  </td>
                );
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable_R;
