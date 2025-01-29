import React, { useState, useEffect } from 'react';
import { rapportService,typerapportService } from '../../services/apiService';

const RapportList = () => {
    const [rapports, setRapports] = useState([]);
    const [typesRapport, setTypesRapport] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            const typesData = await typerapportService.get();
            const typesMap = {};
            typesData.forEach(type => {
                typesMap[type.idTypeRapport] = type.nomTypeRapport;
            });
            setTypesRapport(typesMap);

            const rapportsData = await rapportService.get();
            setRapports(rapportsData);
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

    const handleDelete = async (idRapport) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
            try {
                await rapportService.delete(idRapport);
                // Recharger les données après la suppression
                await loadData();
                // Afficher un message de succès si vous le souhaitez
                alert('Rapport supprimé avec succès');
            } catch (err) {
                setError("Erreur lors de la suppression du rapport");
                console.error("Erreur:", err);
                // Afficher l'erreur spécifique à l'utilisateur si disponible
                alert(err.response?.data?.message || "Erreur lors de la suppression");
            }
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Liste des Rapports</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 border-b text-left">ID</th>
                            <th className="px-6 py-3 border-b text-left">Type de Rapport</th>
                            <th className="px-6 py-3 border-b text-left">Fichier</th>
                            <th className="px-6 py-3 border-b text-left">Date du Rapport</th>
                            <th className="px-6 py-3 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapports.map((rapport) => (
                            <tr key={rapport.idRapport} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b">
                                    {rapport.idRapport}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {typesRapport[rapport.idTypeRapport] || 'Type inconnu'}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {rapport.fichier || 'Aucun fichier'}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {new Date(rapport.dateRapport).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {rapports.length === 0 && (
                <p className="text-center py-4">Aucun rapport trouvé</p>
            )}
        </div>
    );
};

export default RapportList;