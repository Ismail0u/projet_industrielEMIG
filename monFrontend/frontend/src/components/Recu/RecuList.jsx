import React, { useState, useEffect } from 'react';
import { recuService, produitService, fournisseurService } from '../../services/apiService';
import RecuForm from './RecuForm';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import { menuItems } from '../Layout/Layout_M/SidebarData_M';
import { userOptions } from '../Layout/Layout_M/SidebarData_M';

const RecuList = () => {
    // États de gestion des données
    const [recus, setRecus] = useState([]);
    const [produits, setProduits] = useState({});
    const [fournisseurs, setFournisseurs] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // États pour la recherche, le tri, et l'ordre de tri
    const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
    const [sortColumn, setSortColumn] = useState("idRecu"); // Colonne de tri par défaut
    const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri (ascendant ou descendant)

    // Fonction pour charger les données
    const loadData = async () => {
        try {
            // Chargement des produits
            const produitsData = await produitService.get();
            const produitsMap = {};
            produitsData.forEach(produit => {
                produitsMap[produit.idProduit] = produit.nomProduit;
            });
            setProduits(produitsMap);

            // Chargement des fournisseurs
            const fournisseursData = await fournisseurService.get();
            const fournisseursMap = {};
            fournisseursData.forEach(fournisseur => {
                fournisseursMap[fournisseur.idFournisseur] = fournisseur.nomFournisseur;
            });
            setFournisseurs(fournisseursMap);

            // Chargement des reçus
            const recusData = await recuService.get();
            setRecus(recusData);
            setLoading(false); // On indique que le chargement est terminé
        } catch (err) {
            setError("Erreur lors du chargement des données");
            setLoading(false);
            console.error("Erreur:", err);
        }
    };

    // Utilisation de useEffect pour charger les données au montage du composant
    useEffect(() => {
        loadData();
    }, []);

    // Fonction de création de reçu
    const handleCreate = async (data) => {
        try {
            await recuService.create(data);
            loadData(); // Recharger les données après la création
        } catch (error) {
            console.error("Erreur lors de la création du reçu:", error);
        }
    };

    // Fonction pour supprimer un reçu
    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce reçu ?')) {
            try {
                await recuService.delete(id);
                loadData(); // Recharger les données après la suppression
            } catch (error) {
                console.error("Erreur lors de la suppression du reçu:", error);
            }
        }
    };

    // Fonction pour gérer le tri des colonnes
    const handleSort = (column) => {
        const order = (sortColumn === column && sortOrder === "asc") ? "desc" : "asc"; // Inverser l'ordre de tri
        setSortColumn(column); // Définir la colonne à trier
        setSortOrder(order); // Définir l'ordre de tri
    };

    // Fonction de recherche dans la table
    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Mettre à jour le terme de recherche
    };

    // Filtrer les reçus en fonction du terme de recherche
    const filteredRecus = recus.filter((recu) => {
        return (
            recu.idRecu.toString().includes(searchTerm) || // Recherche par ID de reçu
            produits[recu.idProduit].toLowerCase().includes(searchTerm.toLowerCase()) || // Recherche par nom du produit
            fournisseurs[recu.idFournisseur].toLowerCase().includes(searchTerm.toLowerCase()) // Recherche par nom du fournisseur
        );
    });

    // Fonction pour comparer les valeurs en fonction du type de données (nombre, chaîne, date)
    const compareValues = (a, b, column) => {
        const aValue = a[column];
        const bValue = b[column];

        // Comparaison des dates
        if (column === "dateRecu") {
            return new Date(aValue) - new Date(bValue);
        }

        // Comparaison des valeurs numériques
        if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
        }

        // Comparaison des chaînes de caractères
        return aValue.toString().localeCompare(bValue.toString());
    };

    // Trier les reçus filtrés en fonction de la colonne et de l'ordre
    const sortedRecus = filteredRecus.sort((a, b) => {
        const compareResult = compareValues(a, b, sortColumn);

        // Si l'ordre est descendant, on inverse le résultat
        return sortOrder === "asc" ? compareResult : -compareResult;
    });

    // Affichage d'un message de chargement ou d'erreur
    if (loading) return <div className="text-center text-gray-600">Chargement...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="h-screen flex w-full overflow-hidden">
            {/* Barre latérale */}
        <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Reçus" h_role="Magazinier" h_user="Soumana" />

        <div className="flex-1 overflow-hidden p-1">
        <div className="container mx-auto p-4">

            {/* Champ de recherche */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch} // Mettre à jour le terme de recherche
                    placeholder="Rechercher..."
                    className="p-2 border rounded-md mr-4 w-1/3"
                />
                <RecuForm onSubmit={handleCreate} /> {/* Formulaire pour créer un nouveau reçu */}
            </div>

            {/* Table des reçus */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
                <table className="min-w-full table-auto text-gray-800">
                    <thead>
                        <tr className="bg-gray-100">
                            {/* En-têtes de table avec tri sur chaque colonne */}
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSort("idRecu")}
                            >
                                ID {sortColumn === "idRecu" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSort("dateRecu")}
                            >
                                Date {sortColumn === "dateRecu" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSort("quantite")}
                            >
                                Quantité {sortColumn === "quantite" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>
                            <th className="px-4 py-2 text-left">Produit</th>
                            <th className="px-4 py-2 text-left">Fournisseur</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affichage des données triées et filtrées */}
                        {sortedRecus.map(recu => (
                            <tr key={recu.idRecu} className="border-t">
                                <td className="px-4 py-2">{recu.idRecu}</td>
                                <td className="px-4 py-2">{new Date(recu.dateRecu).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{recu.quantite}</td>
                                <td className="px-4 py-2">{produits[recu.idProduit]}</td>
                                <td className="px-4 py-2">{fournisseurs[recu.idFournisseur]}</td>
                                <td className="px-4 py-2">
                                    {/* Bouton pour supprimer le reçu */}
                                    <button
                                        onClick={() => handleDelete(recu.idRecu)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </div>
    </div>
    </div>
    );
};

export default RecuList;
