import React, { useState, useEffect } from 'react';
import { recuService, produitService, fournisseurService } from '../../services/apiService';
import RecuForm from './RecuForm';

const RecuList = () => {
    const [recus, setRecus] = useState([]);
    const [editingRecu, setEditingRecu] = useState(null);
    const [produits, setProduits] = useState({});
    const [fournisseurs, setFournisseurs] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const produitsData = await produitService.get();
            const produitsMap = {};
            produitsData.forEach(produit => {
                produitsMap[produit.idProduit] = produit.nomProduit;
            });
            setProduits(produitsMap);

            const fournisseursData = await fournisseurService.get();
            const fournisseursMap = {};
            fournisseursData.forEach(fournisseur => {
                fournisseursMap[fournisseur.idFournisseur] = fournisseur.nomFournisseur;
            });
            setFournisseurs(fournisseursMap);

            const recusData = await recuService.get();
            setRecus(recusData);
            setLoading(false);
        } catch (err) {
            setError("Erreur lors du chargement des données");
            setLoading(false);
            console.error("Erreur:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = async (data) => {
        try {
            await recuService.create(data);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la création du reçu:", error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await recuService.update(editingRecu.idRecu, data);
            setEditingRecu(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du reçu:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce reçu ?')) {
            try {
                await recuService.delete(id);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression du reçu:", error);
            }
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <h1>Reçus</h1>
            <RecuForm onSubmit={handleCreate} />
            {editingRecu && (
                <div>
                    <h2>Modifier Reçu</h2>
                    <RecuForm onSubmit={handleUpdate} initialData={editingRecu} />
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Quantité</th>
                        <th>Produit</th>
                        <th>Fournisseur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recus.map(recu => (
                        <tr key={recu.idRecu}>
                            <td>{recu.idRecu}</td>
                            <td>{new Date(recu.dateRecu).toLocaleDateString()}</td>
                            <td>{recu.quantite}</td>
                            <td>{produits[recu.idProduit]}</td>
                            <td>{fournisseurs[recu.idFournisseur]}</td>
                            <td>
                                <button onClick={() => setEditingRecu(recu)}>Modifier</button>
                                <button onClick={() => handleDelete(recu.idRecu)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecuList;