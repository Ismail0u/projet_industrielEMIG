import React, { useEffect, useState } from 'react';
import { produitService } from '../services/apiService';

const ProduitList = () => {
    const [produits, setProduits] = useState([]);
    const [criticalProducts, setCriticalProducts] = useState(0);
    const [lastUpdate, setLastUpdate] = useState('');

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const data = await produitService.get();
                console.log('Data received in ProduitList:', data); // Ajout d'un log pour vérifier les données reçues
                setProduits(data);
                setCriticalProducts(data.filter(produit => produit.is_critical).length);
                setLastUpdate(new Date().toLocaleDateString());
            } catch (error) {
                console.error('Erreur lors de la récupération des produits', error);
            }
        };

        fetchProduits();
    }, []);

    return (
        <div className="container">
            <h1>Stock des produits</h1>
            <div className="summary">
                <div className="critical">Produits dans le seuil critique: {criticalProducts} produits</div>
                <div className="last-update">Date du dernier bilan: {lastUpdate}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th>Date d'ajout</th>
                        <th>Quantité disponible</th>
                        <th>État</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map(produit => (
                        <tr key={produit.idProduit}>
                            <td>{produit.idProduit}</td>
                            <td>{produit.nomProduit}</td>
                            <td>{produit.idCategorie}</td>
                            <td>{new Date(produit.dateAjout).toLocaleDateString()}</td>
                            <td>{produit.quantiteDisponible}</td>
                            <td>{produit.etat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProduitList;
