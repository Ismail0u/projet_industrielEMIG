import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { produitService, fournisseurService, recuService } from "../../services/apiService";
import logoEmig from "../../assets/images/logoEmig.jfif";

const RecuForm = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const [dateRecu, setDateRecu] = useState("");
    const [quantite, setQuantite] = useState("");
    const [idProduit, setIdProduit] = useState("");
    const [idFournisseur, setIdFournisseur] = useState("");
    const [produits, setProduits] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [recuData, setRecuData] = useState(null);

    useEffect(() => {
        if (initialData) {
            setDateRecu(initialData.dateRecu || "");
            setQuantite(initialData.quantite || "");
            setIdProduit(initialData.idProduit || "");
        }
    }, [initialData]);

    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const [produitsData, fournisseursData] = await Promise.all([
                    produitService.get(),
                    fournisseurService.get()
                ]);
                setProduits(produitsData);
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
                idProduit: parseInt(idProduit, 10),
                idFournisseur,
            };

            await recuService.create(recuData);
            console.log("✅ Reçu enregistré :", recuData);
            setRecuData(recuData);

            onSubmit();
            alert("✅ Reçu enregistré avec succès !");
        } catch (error) {
            console.error("❌ Erreur lors de la soumission:", error);
            setError(error.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setSubmitting(false);
        }
    };

    const generatePDF = () => {
        if (!recuData) return;

        const produit = produits.find((p) => p.idProduit === recuData.idProduit);
        const fournisseur = fournisseurs.find((f) => f.idFournisseur === recuData.idFournisseur);

        const doc = new jsPDF();
        doc.setFont("helvetica");
        
        // Ajouter le logo de l'EMIG
        doc.addImage(logoEmig, "PNG", 14, 10, 25, 25); // Modifiez la position et la taille selon vos besoins
        doc.setFontSize(14);
        doc.text("École des Mines, de l'Industrie et de la Géologie (EMIG)", 50, 25);

        doc.setFontSize(12);
        doc.text("Reçu de Stock", 14, 40);

        doc.autoTable({
            startY: 50,
            head: [["", ""]],
            body: [
                ["Date de réception", recuData.dateRecu],
                ["Produit", produit?.nomProduit || "Inconnu"],
                ["Quantité", recuData.quantite],
                ["Fournisseur", fournisseur?.nomFournisseur || "Inconnu"],
            ],
        });

        // Ajouter la mention que c'est le magasinier qui a fait le reçu
        doc.text("Fait par le magasinier", 14, doc.lastAutoTable.finalY + 10);

        // Ajouter la zone pour la signature
        doc.text("Signature:", 14, doc.lastAutoTable.finalY + 30);
        //doc.line(40, doc.lastAutoTable.finalY + 28, 100, doc.lastAutoTable.finalY + 28); // Ligne pour la signature

        doc.save(`Recu_${recuData.dateRecu}.pdf`);
    };

    if (!isOpen) return null;

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

                        <label className="block text-gray-700 text-sm font-bold mb-2">Date de réception :</label>
                        <input
                            type="date"
                            value={dateRecu}
                            onChange={(e) => setDateRecu(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Quantité :</label>
                        <input
                            type="number"
                            value={quantite}
                            onChange={(e) => setQuantite(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Produit :</label>
                        <select
                            value={idProduit}
                            onChange={(e) => setIdProduit(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md mb-3"
                            disabled={!!idProduit}
                        >
                            <option value="">Sélectionnez un produit</option>
                            {produits.map((produit) => (
                                <option key={produit.idProduit} value={produit.idProduit}>
                                    {produit.nomProduit}
                                </option>
                            ))}
                        </select>

                        <label className="block text-gray-700 text-sm font-bold mb-2">Fournisseur :</label>
                        <select
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

                        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Enregistrer
                        </button>

                        {recuData && (
                            <button type="button" onClick={generatePDF} className="mt-2 w-full p-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                                Télécharger le reçu PDF
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default RecuForm;
