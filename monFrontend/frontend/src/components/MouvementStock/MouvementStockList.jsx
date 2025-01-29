import React, { useState, useEffect } from 'react';
import { mouvementStockService, produitService } from '../../services/apiService';
import MouvementStockForm from './MouvementStockForm';

const MouvementStockList = () => {
  const [mouvements, setMouvements] = useState([]);
  const [editingMouvement, setEditingMouvement] = useState(null);
  const [produits, setProduits] = useState({});
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

      const mouvementsData = await mouvementStockService.get();
      setMouvements(mouvementsData);
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
      await mouvementStockService.create(data);
      loadData();
    } catch (error) {
      console.error("Erreur lors de la création du mouvement:", error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await mouvementStockService.update(editingMouvement.idMouvement, data);
      setEditingMouvement(null);
      loadData();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mouvement:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce mouvement ?')) {
      try {
        await mouvementStockService.delete(id);
        loadData();
      } catch (error) {
        console.error("Erreur lors de la suppression du mouvement:", error);
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Liste des mouvements de stock</h1>
      {editingMouvement && (
        <div>
          <h2>Modifier un mouvement</h2>
          <MouvementStockForm onSubmit={handleUpdate} initialData={editingMouvement} />
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Sortie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mouvements.map(mouvement => (
            <tr key={mouvement.idMouvement}>
              <td>{mouvement.idMouvement}</td>
              <td>{produits[mouvement.idProduit]}</td>
              <td>{mouvement.quantite}</td>
              <td>{new Date(mouvement.dateMouvement).toLocaleDateString()}</td>
              <td>{mouvement.estSortie ? 'Oui' : 'Non'}</td>
              <td>
                <button onClick={() => setEditingMouvement(mouvement)}>Modifier</button>
                <button onClick={() => handleDelete(mouvement.idMouvement)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MouvementStockList;
