import React, { useState, useEffect } from "react";
import { produitEnvoieService, fournisseurService, categorieService, mouvementStockService } from "../../services/apiService";

const ProduitForm = ({ onProduitAjoute }) => {
  const [formData, setFormData] = useState({
    idProduit: "",
    nomProduit: "",
    quantiteDisponible: "",
    seuilCritique: "",
    ration: "",
    idFournisseur: "",
    idCategorie: "",
  });
  const [fournisseurs, setFournisseurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fournisseursData = await fournisseurService.get();
        setFournisseurs(fournisseursData);
        const categoriesData = await categorieService.get();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setError("Impossible de charger les fournisseurs et catégories.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    console.log("Données soumises :", formData);

    if (!formData.idFournisseur || !formData.idCategorie) {
      setError("Veuillez sélectionner un fournisseur et une catégorie.");
      return;
    }

    try {
      // 1️⃣ Ajouter le produit
      const produit = await produitEnvoieService.create(formData);
      console.log("Produit ajouté :", produit);

      // 2️⃣ Déterminer la date et l'id du jour
      const today = new Date();
      const dateMouvement = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
      const jourSemaine = today.getDay(); // Dimanche = 0, Lundi = 1, etc.
      const idJour = jourSemaine === 0 ? 7 : jourSemaine; // Si dimanche (0), alors idJour = 7

      // 3️⃣ Ajouter le mouvement de stock (entrée par défaut)
      const mouvementStockData = {
        idProduit: produit.idProduit, // ID du produit créé
        quantite: formData.quantiteDisponible,
        dateMouvement: dateMouvement, // Date du mouvement
        estSortie: false, // Entrée en stock
        idRapport: 1, // À modifier si nécessaire
        idJour: idJour, // ID du jour
      };

      console.log("Données mouvement stock envoyées :", mouvementStockData);
      await mouvementStockService.create(mouvementStockData);
            // 3️⃣ Ajouter le mouvement de stock (entrée par défaut)
            const mouvementStockSortieData = {
              idProduit: produit.idProduit, // ID du produit créé
              quantite: 0,
              dateMouvement: dateMouvement, // Date du mouvement
              estSortie: true, // Sortie en stock
              idRapport: 1, // À modifier si nécessaire
              idJour: idJour, // ID du jour
            };
          await mouvementStockService.create(mouvementStockSortieData);
      console.log("Mouvement de stock ajouté :", mouvementStockData);

      setMessage("Produit ajouté avec succès !");
      setFormData({
        idProduit: "",
        nomProduit: "",
        quantiteDisponible: "",
        seuilCritique: "",
        ration: "",
        idFournisseur: "",
        idCategorie: "",
      });

      if (onProduitAjoute) {
        onProduitAjoute();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setError("Échec de l'ajout du produit.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter un Produit</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="idProduit"
          value={formData.idProduit}
          onChange={handleChange}
          placeholder="ID du produit"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="nomProduit"
          value={formData.nomProduit}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="number"
          name="quantiteDisponible"
          value={formData.quantiteDisponible}
          onChange={handleChange}
          placeholder="Quantité disponible"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="number"
          name="seuilCritique"
          value={formData.seuilCritique}
          onChange={handleChange}
          placeholder="Seuil critique"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="number"
          step="0.01"
          name="ration"
          value={formData.ration}
          onChange={handleChange}
          placeholder="Ration"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <select
          name="idFournisseur"
          value={formData.idFournisseur}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Sélectionner un fournisseur</option>
          {fournisseurs.map((fournisseur) => (
            <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>
              {fournisseur.nomFournisseur}
            </option>
          ))}
        </select>
        <select
          name="idCategorie"
          value={formData.idCategorie}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.idCategorie} value={categorie.idCategorie}>
              {categorie.nomCategorie}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter Produit
        </button>
      </form>
    </div>
  );
};

export default ProduitForm;
