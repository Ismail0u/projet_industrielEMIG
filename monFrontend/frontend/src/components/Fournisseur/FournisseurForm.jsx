import React, { useState } from 'react';

const FournisseurForm = ({ onSubmit, initialData = {} }) => {
  const [idFournisseur, setIdFournisseur] = useState(initialData.idFournisseur || '');
  const [nomFournisseur, setNomFournisseur] = useState(initialData.nomFournisseur || '');
  const [contact, setContact] = useState(initialData.contact || '');
  const [dateAjout, setDateAjout] = useState(
    initialData.dateAjout ? new Date(initialData.dateAjout).toISOString().slice(0, 16) : ''
  );
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation des champs
    if (!idFournisseur.trim() || !nomFournisseur.trim() || !contact.trim()) {
      setError("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = {
        idFournisseur,  // Ajout de l'ID au payload
        nomFournisseur,
        contact,
        dateAjout: dateAjout ? new Date(dateAjout).toISOString() : null,
      };

      console.log("Données à soumettre:", formData);
      await onSubmit(formData);

      // Réinitialisation du formulaire après soumission
      setIdFournisseur('');
      setNomFournisseur('');
      setContact('');
      setDateAjout('');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError(error.message || "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex flex-col">
        <label htmlFor="idFournisseur" className="mb-1 font-medium text-gray-700">
          ID Fournisseur
        </label>
        <input
          type="text"
          id="idFournisseur"
          value={idFournisseur}
          onChange={(e) => setIdFournisseur(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="nomFournisseur" className="mb-1 font-medium text-gray-700">
          Nom Fournisseur
        </label>
        <input
          type="text"
          id="nomFournisseur"
          value={nomFournisseur}
          onChange={(e) => setNomFournisseur(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="contact" className="mb-1 font-medium text-gray-700">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="dateAjout" className="mb-1 font-medium text-gray-700">
          Date d'ajout
        </label>
        <input
          type="datetime-local"
          id="dateAjout"
          value={dateAjout}
          onChange={(e) => setDateAjout(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button 
        type="submit" 
        disabled={submitting} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
      >
        {submitting ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
};

export default FournisseurForm;
