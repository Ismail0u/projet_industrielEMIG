import React, { useState, useEffect } from 'react';
import { stockService, produitService, mouvementStockService, rapportService } from './apiServices';
import StockForm from './StockForm';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [editingStock, setEditingStock] = useState(null);
    const [produits, setProduits] = useState({});
    const [mouvements, setMouvements] = useState({});
    const [rapports, setRapports] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const produitsData = await produitService.get();
            const produitsMap = {};
            produitsData.forEach(p => produitsMap[p.idProduit] = p.nomProduit);
            setProduits(produitsMap);

            const mouvementsData = await mouvementStockService.get();
            const mouvementsMap = {};
            mouvementsData.forEach(m => mouvementsMap[m.idMouvement] = m.idMouvement); // Adapt if needed
            setMouvements(mouvementsMap);

            const rapportsData = await rapportService.get();
            const rapportsMap = {};
            rapportsData.forEach(r => rapportsMap[r.idRapport] = r.idRapport); // Adapt if needed
            setRapports(rapportsMap);

            const stocksData = await stockService.get();
            setStocks(stocksData);
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
            await stockService.create(data);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la création du stock:", error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await stockService.update(editingStock.idStock, data);
            setEditingStock(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du stock:", error);
        }
    };
};

export default StockList;