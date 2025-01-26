import React, { useState, useEffect } from 'react';
import { categorieService } from '../services/apiService';

function CategorieList() {
    const [categories, setCategories] = useState([]);
    const [newCategorie, setNewCategorie] = useState({ idcategorie: 2 , nomcategorie: '' });
    const [editingCategorie, setEditingCategorie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categorieService.get();
            console.log('Data received from API:', data); // Ajout d'un log pour vérifier les données reçues
            setCategories(data);
        } catch (error) {
            setError("Erreur lors de la récupération des catégories : " + error.message);
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    const handleCreateCategorie = async () => {
        try {
            await categorieService.create(newCategorie);
            setNewCategorie({  idcategorie: 2 , nomcategorie: '' }); // Réinitialiser le formulaire
            fetchCategories(); // Rafraîchir la liste
        } catch (error) {
            setError("Erreur lors de la création de la catégorie : " + error.message);
            console.error("Erreur lors de la création de la catégorie :", error);
        }
    };

    const handleUpdateCategorie = async (id, updatedData) => {
        try {
            await categorieService.partialUpdate(id, updatedData);
            setEditingCategorie(null);
            fetchCategories();
        } catch (error) {
            setError("Erreur lors de la mise à jour de la catégorie : " + error.message);
            console.error("Erreur lors de la mise à jour de la catégorie :", error);
        }
    };

    const handleDeleteCategorie = async (id) => {
        try {
            await categorieService.delete(id);
            fetchCategories();
        } catch (error) {
            setError("Erreur lors de la suppression de la catégorie : " + error.message);
            console.error("Erreur lors de la suppression de la catégorie :", error);
        }
    };

    return (
        <div>
            <h2>Liste des Catégories</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Formulaire d'ajout */}
            <input
                type="number"
                placeholder="identifiant"
                value={newCategorie.idcategorie}
                onChange={e => setNewCategorie({ ...newCategorie, idcategorie: e.target.value })}
            />
            <input
                type="text"
                placeholder="Nom"
                value={newCategorie.nomcategorie}
                onChange={e => setNewCategorie({ ...newCategorie, nomcategorie: e.target.value })}
            />
            <button onClick={handleCreateCategorie}>Ajouter Catégorie</button>

            <ul>
                {categories.map(categorie => (
                    <li key={categorie.idcategorie}>
                        {editingCategorie === categorie.idcategorie ? (
                            <div>
                                <input
                                    type="text"
                                    value={categorie.nomcategorie}
                                    onChange={e => setCategories(categories.map(c => c.idcategorie === categorie.idcategorie ? { ...c, nomcategorie: e.target.value } : c))}
                                />
                                <button onClick={() => handleUpdateCategorie(categorie.idcategorie, { nomcategorie: categorie.nomcategorie })}>Enregistrer</button>
                                <button onClick={() => setEditingCategorie(null)}>Annuler</button>
                            </div>
                        ) : (
                            <div>
                                {categorie.nomcategorie}
                                <button onClick={() => setEditingCategorie(categorie.idcategorie)}>Modifier</button>
                                <button onClick={() => handleDeleteCategorie(categorie.idcategorie)}>Supprimer</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategorieList;
