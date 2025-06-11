import React from "react";
import { Check, X } from "lucide-react";

const Table = ({ etudiants, jours, periodes, reservations, handleReservationToggle, handleToggleAll, handleKeyDown, getReservationDate }) => {
  const today = new Date();

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th rowSpan="2" className="border px-4 py-2">ID</th>
          <th rowSpan="2" className="border px-4 py-2">Nom</th>
          <th rowSpan="2" className="border px-4 py-2">Prénom</th>
          <th rowSpan="2" className="border px-4 py-2">Tout cocher</th>
          {jours.map(jour => (
            <th key={jour.idJour} colSpan={periodes.length} className="border px-4 py-2 text-center">
              {jour.nomJour}
            </th>
          ))}
        </tr>
        <tr className="bg-gray-100">
          {jours.map(jour =>
            periodes.map(periode => (
              <th key={`${jour.idJour}-${periode.idPeriode}`} className="border px-4 py-2 text-center">
                {periode.idPeriode}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {etudiants.map(etudiant => {
          const studentReservations = reservations.get(etudiant.idEtudiant) || new Map();
          const totalCells = jours.length * periodes.length;
          const allChecked = studentReservations.size === totalCells;

          return (
            <tr key={etudiant.idEtudiant}>
              <td className="border px-4 py-2">{etudiant.idEtudiant}</td>
              <td className="border px-4 py-2">{etudiant.nomEtudiant}</td>
              <td className="border px-4 py-2">{etudiant.prenomEtudiant}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className={`p-2 rounded ${allChecked ? "bg-red-500" : "bg-green-500"}`}
                  onClick={() => handleToggleAll(etudiant.idEtudiant)}
                >
                  {allChecked ? <X size={14} color="white" /> : <Check size={14} color="white" />}
                </button>
              </td>
              {jours.map(jour =>
                periodes.map(periode => {
                  const key = `${jour.idJour}-${periode.idPeriode}`;
                  const isReserved = studentReservations.get(key) || false;

                  // Calcul de la date de réservation pour chaque jour
                  const resDate = new Date(getReservationDate(jour.idJour));
                  const isPast = resDate < today;

                  return (
                    <td key={`${etudiant.idEtudiant}-${key}`} className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={isReserved}
                        onChange={() => !isPast && handleReservationToggle(etudiant.idEtudiant, jour.idJour, periode.idPeriode)}
                        onKeyDown={(event) => !isPast && handleKeyDown(event, etudiant.idEtudiant, jour.idJour, periode.idPeriode)}
                        tabIndex={0}
                        disabled={isPast} // Désactive la case si le jour est déjà passé
                      />
                    </td>
                  );
                })
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
