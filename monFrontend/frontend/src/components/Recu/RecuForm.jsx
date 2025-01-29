import React, { useState, useEffect } from 'react';
import { produitService, fournisseurService, mouvementStockService } from '../../services/apiService';

const RecuForm = ({ onSubmit, initialData = {} }) => {
    // États pour stocker les données du formulaire et les données de référence
    const [dateRecu, setDateRecu] = useState(initialData.dateRecu || '');
    const [quantite, setQuantite] = useState(initialData.quantite || '');
    const [idProduit, setIdProduit] = useState(initialData.idProduit || '');
    const [idFournisseur, setIdFournisseur] = useState(initialData.idFournisseur || '');
    const [produits, setProduits] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Effet de cycle de vie pour charger les produits et les fournisseurs au montage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const produitsData = await produitService.get();
                setProduits(produitsData);
                const fournisseursData = await fournisseurService.get();
                setFournisseurs(fournisseursData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                setError("Erreur lors du chargement des données.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation des données
        if (!dateRecu || !quantite || !idProduit || !idFournisseur) {
            setError("Tous les champs sont obligatoires.");
            return;
        }
        if (isNaN(quantite)) {
            setError("La quantité doit être un nombre.");
            return;
        }

        try {
            const formData = {
                dateRecu,
                quantite: parseFloat(quantite),
                idProduit,
                idFournisseur,
            };
            await onSubmit(formData); // Appelle la fonction de soumission transmise en props
                    // Ensuite, créer le mouvement de stock (mouvement stock avec estSortie=0)
            const mouvementData = {
                idProduit,
                quantite: parseFloat(quantite),
                dateMouvement: dateRecu,
                estSortie: 0,  // On définit estSortie à 0 pour l'entrée en stock
                idRapport: 1,
            };

            // Appel API pour créer un mouvement de stock
            await mouvementStockService.create(mouvementData); // On appelle une fonction apiService qui va gérer ça

            // Réinitialisation du formulaire après une soumission réussie
            setDateRecu('');
            setQuantite('');
            setIdProduit('');
            setIdFournisseur('');
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            setError(error.response?.data?.message || "Une erreur est survenue.");
        }
    };

    // Affichage du formulaire ou d'un message de chargement
    if (loading) return <div>Chargement...</div>;

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Champs du formulaire avec labels explicites */}
            <label htmlFor="dateRecu">Date de réception :</label>
            <input type="date" id="dateRecu" value={dateRecu} onChange={(e) => setDateRecu(e.target.value)} required />

            <label htmlFor="quantite">Quantité :</label>
            <input type="number" id="quantite" value={quantite} onChange={(e) => setQuantite(e.target.value)} required />

            {/* Sélection du produit et du fournisseur à partir des données récupérées */}
            <label htmlFor="idProduit">Produit :</label>
            <select id="idProduit" value={idProduit} onChange={(e) => setIdProduit(e.target.value)} required>
                <option value="">Sélectionnez un produit</option>
                {produits.map(produit => (
                    <option key={produit.idProduit} value={produit.idProduit}>
                        {produit.nomProduit}
                    </option>
                ))}
            </select>

            <label htmlFor="idFournisseur">Fournisseur :</label>
            <select id="idFournisseur" value={idFournisseur} onChange={(e) => setIdFournisseur(e.target.value)} required>
                <option value="">Sélectionnez un fournisseur</option>
                {fournisseurs.map(fournisseur => (
                    <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>
                        {fournisseur.nomFournisseur}
                    </option>
                ))}
            </select>

            <button type="submit">Enregistrer</button>
        </form>
    );
};

export default RecuForm;