import React, { useState, useEffect } from 'react';
import { rapportService,typerapportService } from '../../services/apiService';

const RapportForm = ({ onSubmit, initialData = {} }) => {
    const [selectedTypeRapport, setSelectedTypeRapport] = useState(initialData.idTypeRapport || '');
    const [fichier, setFichier] = useState(initialData.fichier || '');
    const [dateRapport, setDateRapport] = useState(
        initialData.dateRapport ? new Date(initialData.dateRapport).toISOString().slice(0, 16) : 
        new Date().toISOString().slice(0, 16)
    );
    
    const [typesRapport, setTypesRapport] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypesRapport = async () => {
            try {
                const data = await typerapportService.get();
                setTypesRapport(data);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement des types de rapport");
                setLoading(false);
                console.error("Erreur:", err);
            }
        };

        fetchTypesRapport();
    }, []);

    useEffect(() => {
        if (initialData.idTypeRapport) {
            setSelectedTypeRapport(initialData.idTypeRapport);
        }
        if (initialData.fichier) {
            setFichier(initialData.fichier);
        }
        if (initialData.dateRapport) {
            setDateRapport(new Date(initialData.dateRapport).toISOString().slice(0, 16));
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedTypeRapport) {
            setError("Veuillez sélectionner un type de rapport");
            return;
        }

        try {
            const formData = {
                idTypeRapport: selectedTypeRapport,
                fichier,
                dateRapport: new Date(dateRapport).toISOString(),
            };

            await rapportService.create(formData);
            
            // Réinitialiser le formulaire
            setFichier('');
            setDateRapport(new Date().toISOString().slice(0, 16));
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error('Erreur lors de la soumission:', err);
            setError(err.response?.data?.message || "Une erreur est survenue");
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="typeRapport" className="block mb-2">
                    Type de rapport :
                </label>
                <select
                    id="typeRapport"
                    value={selectedTypeRapport}
                    onChange={(e) => setSelectedTypeRapport(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Sélectionnez un type de rapport</option>
                    {typesRapport.map((type) => (
                        <option key={type.idTypeRapport} value={type.idTypeRapport}>
                            {type.nomTypeRapport}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="fichier" className="block mb-2">
                    Fichier :
                </label>
                <input
                    type="text"
                    id="fichier"
                    value={fichier}
                    onChange={(e) => setFichier(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="rapport"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dateRapport" className="block mb-2">
                    Date du rapport :
                </label>
                <input
                    type="datetime-local"
                    id="dateRapport"
                    value={dateRapport}
                    onChange={(e) => setDateRapport(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Enregistrer
            </button>
        </form>
    );
};

export default RapportForm;