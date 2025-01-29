import React, { useState, useEffect } from 'react';

const TypeRapportForm = ({ onSubmit, initialData = {} }) => {
    const [nomTypeRapport, setNomTypeRapport] = useState(initialData.nomTypeRapport || '');
    const [error, setError] = useState(null);

    // Modifié pour ne s'exécuter qu'une seule fois au montage du composant
    // ou lorsque initialData change réellement
    useEffect(() => {
        if (initialData.nomTypeRapport) {
            setNomTypeRapport(initialData.nomTypeRapport);
        }
    }, [initialData.nomTypeRapport]); // Dépendance plus précise

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!nomTypeRapport.trim()) {
            setError("Le nom du type de rapport est obligatoire.");
            return;
        }

        try {
            const response = await onSubmit({ nomTypeRapport });
            console.log('Réponse du serveur:', response);
            setNomTypeRapport(''); // Réinitialise le champ après la soumission réussie
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            if (error.response) {
                setError(`Erreur: ${error.response.data.nomTypeRapport ? error.response.data.nomTypeRapport[0] : error.message}`);
                console.error("Détails de l'erreur:", error.response.data);
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label htmlFor="nomTypeRapport">Nom du type de rapport :</label>
            <input
                type="text"
                id="nomTypeRapport"
                value={nomTypeRapport}
                onChange={(e) => setNomTypeRapport(e.target.value)}
            />
            <button type="submit">Enregistrer</button>
        </form>
    );
};

export default TypeRapportForm;