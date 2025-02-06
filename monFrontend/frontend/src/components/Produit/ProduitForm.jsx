import React, { useState, useEffect } from "react";
import { produitEnvoieService, fournisseurService, categorieService } from "../../services/apiService";
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import { menuItems } from '../Layout/Layout_M/SidebarData_M';
import { userOptions } from '../Layout/Layout_M/SidebarData_M';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fournisseursData = await fournisseurService.get();
        setFournisseurs(fournisseursData);
        const categoriesData = await categorieService.get();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  

    // Vérification des champs obligatoires avant envoi
    if (!formData.idFournisseur || !formData.idCategorie) {
      setMessage("Veuillez sélectionner un fournisseur et une catégorie.");
      return;
    }

    try {
      await produitEnvoieService.create(formData);
      setMessage("Produit ajouté avec succès!");
      setFormData({
        idProduit: "",
        nomProduit: "",
        quantiteDisponible: "",
        seuilCritique: "",
        ration: "",
        idFournisseur: "",
        idCategorie: "",
      });
      onProduitAjoute();
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      setMessage("Échec de l'ajout du produit.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter un Produit</h2>
      {message && <p className="text-green-500">{message}</p>}
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
