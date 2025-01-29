

import React, { useState, useEffect } from 'react';
import { produitService, mouvementStockService, rapportService } from '../../services/apiService';

const StockForm = ({ onSubmit, initialData = {} }) => {
  const [idStock, setIdStock] = useState(initialData.idStock || '');
  const [idProduit, setIdProduit] = useState(initialData.idProduit || '');
  const [idMouvement, setIdMouvement] = useState(initialData.idMouvement || '');
  const [idRapport, setIdRapport] = useState(initialData.idRapport || '');
  const [dateStock, setDateStock] = useState(initialData.dateStock || '');
  const [produits, setProduits] = useState([]);
  const [mouvements, setMouvements] = useState([]);
  const [rapports, setRapports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produitsData = await produitService.get();
        setProduits(produitsData);

        const mouvementsData = await mouvementStockService.get();
        setMouvements(mouvementsData);

        const rapportsData = await rapportService.get();
        setRapports(rapportsData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false); // Ensure loading state is set to false even on errors
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setIdStock(initialData.idStock || '');
      setIdProduit(initialData.idProduit || '');
      setIdMouvement(initialData.idMouvement || '');
      setIdRapport(initialData.idRapport || '');
      setDateStock(initialData.dateStock || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!idProduit || !idMouvement || !idRapport || !dateStock) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const formData = {
        idStock: idStock ? parseInt(idStock) : null,
        idProduit,
        idMouvement,
        idRapport,
        dateStock,
      };

      await onSubmit(formData);
      setInitialData(formData);

      // Clear form fields only if submission is successful
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      if (error.response) {
        setError(error.response.data.message || "Une erreur est survenue.");
        console.error("Détails de l'erreur:", error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label htmlFor="idStock">ID Stock : (Optionnel pour la création)</label>
            <input type="number" id="idStock" value={idStock} onChange={(e) => setIdStock(e.target.value)} />

            <label htmlFor="idProduit">Produit :</label>
            <select id="idProduit" value={idProduit} onChange={(e) => setIdProduit(e.target.value)} required>
                <option value="">Sélectionnez un produit</option>
                {produits.map(produit => (
                    <option key={produit.idProduit} value={produit.idProduit}>
                        {produit.nomProduit}
                    </option>
                ))}
            </select>

            <label htmlFor="idMouvement">Mouvement :</label>
            <select id="idMouvement" value={idMouvement} onChange={(e) => setIdMouvement(e.target.value)} required>
                <option value="">Sélectionnez un mouvement</option>
                {mouvements.map(mouvement => (
                    <option key={mouvement.idMouvement} value={mouvement.idMouvement}>
                        {mouvement.idMouvement}
                    </option>
                ))}
            </select>

            <label htmlFor="idRapport">Rapport :</label>
            <select id="idRapport" value={idRapport} onChange={(e) => setIdRapport(e.target.value)} required>
                <option value="">Sélectionnez un rapport</option>
                {rapports.map(rapport => (
                    <option key={rapport.idRapport} value={rapport.idRapport}>
                        {rapport.idRapport}
                    </option>
                ))}
            </select>

            <label htmlFor="dateStock">Date Stock :</label>
            <input type="date" id="dateStock" value={dateStock} onChange={(e) => setDateStock(e.target.value)} required />

            <button type="submit">Enregistrer</button>
        </form>
    );
};

export default StockForm;
