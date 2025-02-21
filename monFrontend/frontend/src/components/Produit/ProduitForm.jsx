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
    unite: "", // Champ "unité"
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
      const { idProduit, ...dataWithoutId } = formData;
      // 1️⃣ Ajouter le produit
      const produitData = {
        nomProduit: dataWithoutId.nomProduit,
        quantiteDisponible: 0,
        seuilCritique: dataWithoutId.seuilCritique,
        ration: dataWithoutId.ration,
        idFournisseur: dataWithoutId.idFournisseur,
        idCategorie: dataWithoutId.idCategorie,
        unite: dataWithoutId.unite, // Champ facultatif unité
      };
      const produit = await produitEnvoieService.create(produitData);
      console.log("Produit ajouté :", produit);

      if (!produit.idProduit) {
        setError("Erreur: idProduit non retourné. Impossible de continuer.");
        return;
      }

      const produitId = produit.idProduit;

      // 2️⃣ Déterminer la date et l'id du jour
      const today = new Date();
      const dateMouvement = today.toISOString().split("T")[0];
      const jourSemaine = today.getDay();
      const idJour = jourSemaine === 0 ? 7 : jourSemaine;

      // 3️⃣ Ajouter le mouvement de stock (entrée)
      const mouvementStockData = {
        idProduit: produitId,
        quantite: formData.quantiteDisponible,
        dateMouvement: dateMouvement,
        estSortie: false,
        idRapport: 1,
        idJour: idJour,
      };

      console.log("Données mouvement stock envoyées :", mouvementStockData);
      await mouvementStockService.create(mouvementStockData);

      // 4️⃣ Ajouter le mouvement de stock (sortie, ici avec quantité 0)
      const mouvementStockSortieData = {
        idProduit: produitId,
        quantite: 0,
        dateMouvement: dateMouvement,
        estSortie: true,
        idRapport: 1,
        idJour: idJour,
      };
      await mouvementStockService.create(mouvementStockSortieData);

      console.log("Mouvement de stock ajouté :", mouvementStockData);

      setMessage("Produit ajouté avec succès !");
      setFormData({
        nomProduit: "",
        quantiteDisponible: "",
        seuilCritique: "",
        ration: "",
        idFournisseur: "",
        idCategorie: "",
        unite: "", // Réinitialiser le champ unité
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
        {/* Utilisation d'un input avec datalist pour le champ unité */}
        <input
          type="text"
          name="unite"
          value={formData.unite}
          onChange={handleChange}
          placeholder="Unité (ex: kg, boite, unité, litre, paquet ou autre)"
          className="w-full p-2 border border-gray-300 rounded-lg"
          list="unit-options"
        />
        <datalist id="unit-options">
          <option value="kg" />
          <option value="boite" />
          <option value="unité" />
          <option value="litre" />
          <option value="paquet" />
        </datalist>
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
