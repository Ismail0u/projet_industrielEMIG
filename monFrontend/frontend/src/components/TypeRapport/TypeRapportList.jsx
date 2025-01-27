import React, { useState, useEffect } from 'react';
import { typerapportService } from '../../services/apiService';
import TypeRapportForm from './TypeRapportForm';

const TypeRapportList = () => {
    const [typeRapports, setTypeRapports] = useState([]);
    const [editingTypeRapport, setEditingTypeRapport] = useState(null);

    useEffect(() => {
        fetchTypeRapports();
    }, []);

    const fetchTypeRapports = async () => {
        try {
            const data = await typerapportService.get();
            setTypeRapports(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des types de rapports:", error);
        }
    };

    const handleCreate = async (data) => {
        try {
            await typerapportService.create(data);
            fetchTypeRapports();
        } catch (error) {
            console.error("Erreur lors de la création du type de rapport:", error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await typerapportService.update(editingTypeRapport.idTypeRapport, data);
            setEditingTypeRapport(null);
            fetchTypeRapports();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du type de rapport:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await typerapportService.delete(id);
            fetchTypeRapports();
        } catch (error) {
            console.error("Erreur lors de la suppression du type de rapport:", error);
        }
    };

    return (
        <div>
            <h1>Types de Rapports</h1>

            <TypeRapportForm onSubmit={handleCreate} />

            {editingTypeRapport && (
                <div>
                    <h2>Modifier Type Rapport</h2>
                    <TypeRapportForm onSubmit={handleUpdate} initialData={editingTypeRapport} />
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {typeRapports.map(typeRapport => (
                        <tr key={typeRapport.idTypeRapport}>
                            <td>{typeRapport.idTypeRapport}</td>
                            <td>{typeRapport.nomTypeRapport}</td>
                            <td>
                                <button onClick={() => setEditingTypeRapport(typeRapport)}>Modifier</button>
                                <button onClick={() => handleDelete(typeRapport.idTypeRapport)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TypeRapportList;