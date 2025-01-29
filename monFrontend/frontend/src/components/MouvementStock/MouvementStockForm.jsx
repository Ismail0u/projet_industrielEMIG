import React, { useState, useEffect } from 'react';
import { mouvementStockService, produitService, rapportService } from '../../services/apiService';

const MouvementStockForm = ({ onSubmit, initialData = {} }) => {
  // États pour stocker les données du formulaire et les données de référence
  const [idProduit, setIdProduit] = useState(initialData.idProduit || '');
  const [quantite, setQuantite] = useState(initialData.quantite || '');
  const [dateMouvement, setDateMouvement] = useState(initialData.dateMouvement || new Date().toISOString().slice(0, 10)); // Date du jour par défaut
  const [estSortie, setEstSortie] = useState(initialData.estSortie !== undefined ? initialData.estSortie : 0); // 0 pour entrée, 1 pour sortie
  const [idRapport, setIdRapport] = useState(initialData.idRapport || '');
  const [produits, setProduits] = useState([]);
  const [rapports, setRapports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effet de cycle de vie pour charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const produitsData = await produitService.get();
        setProduits(produitsData);
        const rapportsData = await rapportService.get();
        setRapports(rapportsData);
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
    if (!idProduit || !quantite || !dateMouvement || idRapport === '') {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const formData = {
        idProduit,
        quantite: parseFloat(quantite),
        dateMouvement: new Date(dateMouvement).toISOString(),
        estSortie,
        idRapport,
      };
      await onSubmit(formData);

      // Réinitialisation du formulaire après une soumission réussie
      setIdProduit('');
      setQuantite('');
      setDateMouvement('');
      setEstSortie(0);
      setIdRapport('');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError(error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  // Affichage du formulaire ou d'un message de chargement
  if (loading) return <div>Chargement...</div>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <label htmlFor="idProduit">Produit :</label>
      <select id="idProduit" value={idProduit} onChange={(e) => setIdProduit(e.target.value)} required>
        <option value="">Sélectionnez un produit</option>
        {produits.map(produit => (
          <option key={produit.idProduit} value={produit.idProduit}>
            {produit.nomProduit}
          </option>
        ))}
      </select>

      <label htmlFor="quantite">Quantité :</label>
      <input type="number" id="quantite" value={quantite} onChange={(e) => setQuantite(e.target.value)} required />

      <label htmlFor="dateMouvement">Date du mouvement :</label>
      <input type="date" id="dateMouvement" value={dateMouvement} onChange={(e) => setDateMouvement(e.target.value)} required />

      <label htmlFor="estSortie">Type de mouvement :</label>
      <select id="estSortie" value={estSortie} onChange={(e) => setEstSortie(e.target.value)} required>
        <option value={0}>Entrée</option>
        <option value={1}>Sortie</option>
      </select>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default MouvementStockForm;