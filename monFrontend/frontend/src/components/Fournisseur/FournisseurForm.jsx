import React, { useState, useEffect } from 'react';

const FournisseurForm = ({ onSubmit, initialData = {} }) => {
    const [idFournisseur, setIdFournisseur] = useState(initialData.idFournisseur || '');
    const [nomFournisseur, setNomFournisseur] = useState(initialData.nomFournisseur || '');
    const [contact, setContact] = useState(initialData.contact || '');
    const [dateAjout, setDateAjout] = useState(
        initialData.dateAjout ? new Date(initialData.dateAjout).toISOString().slice(0, 16) : ''
    );
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Utilisation de useEffect pour mettre à jour les valeurs initiales
    /*useEffect(() => {
        if (initialData) {
            setIdFournisseur(initialData.idFournisseur || '');
            setNomFournisseur(initialData.nomFournisseur || '');
            setContact(initialData.contact || '');
            setDateAjout(
                initialData.dateAjout ? new Date(initialData.dateAjout).toISOString().slice(0, 16) : ''
            );
        }
    }, [initialData]);*/

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation des champs
        if (!idFournisseur.trim() || !nomFournisseur.trim() || !contact.trim()) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        setSubmitting(true); // Désactivation du bouton pendant la soumission

        try {
            const formData = {
                idFournisseur,
                nomFournisseur,
                contact,
                dateAjout: dateAjout ? new Date(dateAjout).toISOString() : null,
            };

            // Affiche les données dans la console pour déboguer
            console.log("Données à soumettre:", formData);

            // Appel à la fonction onSubmit pour envoyer les données
            await onSubmit(formData);

            // Si soumission réussie, réinitialiser le formulaire
            setIdFournisseur('');
            setNomFournisseur('');
            setContact('');
            setDateAjout('');

        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            setError(error.message || "Une erreur est survenue.");
        } finally {
            setSubmitting(false); // Réactivation du bouton après la soumission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <label htmlFor="idFournisseur">ID Fournisseur :</label>
            <input
                type="text"
                id="idFournisseur"
                value={idFournisseur}
                onChange={(e) => setIdFournisseur(e.target.value)}
                required
            />

            <label htmlFor="nomFournisseur">Nom Fournisseur :</label>
            <input
                type="text"
                id="nomFournisseur"
                value={nomFournisseur}
                onChange={(e) => setNomFournisseur(e.target.value)}
                required
            />

            <label htmlFor="contact">Contact :</label>
            <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
            />

            <label htmlFor="dateAjout">Date d'ajout :</label>
            <input
                type="datetime-local"
                id="dateAjout"
                value={dateAjout}
                onChange={(e) => setDateAjout(e.target.value)}
            />

            <button type="submit" disabled={submitting}>
                {submitting ? "Enregistrement..." : "Enregistrer"}
            </button>
        </form>
    );
};

export default FournisseurForm;
