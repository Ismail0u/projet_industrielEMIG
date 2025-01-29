import React, { useState, useEffect } from 'react';
import { fournisseurService } from '../../services/apiService';
import FournisseurForm from './FournisseurForm';

const FournisseurList = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [editingFournisseur, setEditingFournisseur] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const data = await fournisseurService.get();
            setFournisseurs(data);
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
            await fournisseurService.create(data);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la création du fournisseur:", error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await fournisseurService.update(editingFournisseur.idFournisseur, data);
            setEditingFournisseur(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du fournisseur:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
            try {
                await fournisseurService.delete(id);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression du fournisseur:", error);
            }
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <h1>Fournisseurs</h1>
            <FournisseurForm onSubmit={handleCreate} />
            {editingFournisseur && (
                <div>
                    <h2>Modifier Fournisseur</h2>
                    <FournisseurForm onSubmit={handleUpdate} initialData={editingFournisseur} />
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Contact</th>
                        <th>Date d'ajout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs.map(fournisseur => (
                        <tr key={fournisseur.idFournisseur}>
                            <td>{fournisseur.idFournisseur}</td>
                            <td>{fournisseur.nomFournisseur}</td>
                            <td>{fournisseur.contact}</td>
                            <td>{fournisseur.dateAjout ? new Date(fournisseur.dateAjout).toLocaleString() : ''}</td>
                            <td>
                                <button onClick={() => setEditingFournisseur(fournisseur)}>Modifier</button>
                                <button onClick={() => handleDelete(fournisseur.idFournisseur)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FournisseurList;