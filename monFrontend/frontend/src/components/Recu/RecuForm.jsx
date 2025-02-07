import React, { useState, useEffect } from "react";
import { produitService, fournisseurService, recuService } from "../../services/apiService";

const RecuForm = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    // États du formulaire
    const [dateRecu, setDateRecu] = useState(initialData.dateRecu || "");
    const [quantite, setQuantite] = useState(initialData.quantite || "");
    const [idProduit, setIdProduit] = useState(initialData.idProduit || "");
    const [idFournisseur, setIdFournisseur] = useState(initialData.idFournisseur || "");

    // États des produits et fournisseurs
    const [produits, setProduits] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);

    // États de gestion
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Charger les produits et fournisseurs au montage
    useEffect(() => {
        if (!isOpen) return; // Charger les données seulement si la modale est ouverte

        const fetchData = async () => {
            try {
                const produitsData = await produitService.get();
                setProduits(produitsData);

                const fournisseursData = await fournisseurService.get();
                setFournisseurs(fournisseursData);
            } catch (error) {
                console.error("❌ Erreur lors du chargement des données:", error);
                setError("Impossible de récupérer les données.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isOpen]);

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        if (!dateRecu || !quantite || !idProduit || !idFournisseur) {
            setError("⚠️ Tous les champs sont obligatoires.");
            setSubmitting(false);
            return;
        }

        if (isNaN(quantite) || quantite <= 0) {
            setError("⚠️ La quantité doit être un nombre positif.");
            setSubmitting(false);
            return;
        }

        try {
            const recuData = {
                dateRecu,
                quantite: parseFloat(quantite),
                idProduit,
                idFournisseur,
            };

            await recuService.create(recuData);
            console.log(recuData);
            onSubmit(); // Callback après succès
            onClose();  // Fermer la modale

            // Réinitialisation du formulaire
            setDateRecu("");
            setQuantite("");
            setIdProduit("");
            setIdFournisseur("");
        } catch (error) {
            console.error("❌ Erreur lors de la soumission:", error);
            setError(error.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null; // Ne pas afficher la modale si elle est fermée

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">
                    &times;
                </button>

                <h2 className="text-xl font-bold text-gray-700 mb-4">Ajouter un reçu</h2>

                {loading ? (
                    <div className="text-center text-gray-600">Chargement des données...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateRecu">
                            Date de réception :
                        </label>
                        <input
                            type="date"
                            id="dateRecu"
                            value={dateRecu}
                            onChange={(e) => setDateRecu(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantite">
                            Quantité :
                        </label>
                        <input
                            type="number"
                            id="quantite"
                            value={quantite}
                            onChange={(e) => setQuantite(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idProduit">
                            Produit :
                        </label>
                        <select
                            id="idProduit"
                            value={idProduit}
                            onChange={(e) => setIdProduit(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        >
                            <option value="">Sélectionnez un produit</option>
                            {produits.map((produit) => (
                                <option key={produit.idProduit} value={produit.idProduit}>
                                    {produit.nomProduit}
                                </option>
                            ))}
                        </select>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idFournisseur">
                            Fournisseur :
                        </label>
                        <select
                            id="idFournisseur"
                            value={idFournisseur}
                            onChange={(e) => setIdFournisseur(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        >
                            <option value="">Sélectionnez un fournisseur</option>
                            {fournisseurs.map((fournisseur) => (
                                <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>
                                    {fournisseur.nomFournisseur}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full p-2 text-white rounded-md transition ${
                                submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {submitting ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RecuForm;
