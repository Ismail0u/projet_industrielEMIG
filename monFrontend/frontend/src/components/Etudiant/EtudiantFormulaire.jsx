import React, { useState } from "react";
import ExcelJS from "exceljs"; // Importer ExcelJS
import { etudiantService } from "../../services/apiService";

const EtudiantForm = () => {
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour lire et traiter le fichier Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data); // Charger le fichier Excel avec ExcelJS
      const worksheet = workbook.worksheets[0]; // Prendre la première feuille
      const jsonData = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Sauter la première ligne si c'est un en-tête
          const student = {};
          row.eachCell((cell, colNumber) => {
            const columnName = worksheet.getRow(1).getCell(colNumber).value; // Récupérer le nom de la colonne
            student[columnName] = cell.value;
          });
          jsonData.push(student); // Ajouter l'étudiant
        }
      });

      setStudents(jsonData); // Stocker les données extraites
    };
    reader.readAsArrayBuffer(file);
  };

  // Fonction pour envoyer les étudiants un par un à l'API Django
  const handleSubmit = async () => {
    if (students.length === 0) {
      alert("Aucune donnée à envoyer");
      return;
    }

    setLoading(true);
    setError(null);

    try {
        console.log(students);
        await etudiantService.create(students);
      alert("Tous les étudiants ont été ajoutés avec succès !");
      setStudents([]); // Réinitialiser après l'envoi
    } catch (error) {
      console.error("Erreur lors de l'ajout des étudiants", error);
      setError("Une erreur est survenue lors de l'envoi des données.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Importer un fichier Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />
      {fileName && <p className="text-sm text-gray-500">Fichier chargé: {fileName}</p>}
      
      {students.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mt-4">Aperçu des données :</h3>
          <table className="w-full border mt-2">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(students[0]).map((key) => (
                  <th key={key} className="border p-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student, index) => (
                <tr key={index} className="border">
                  {Object.values(student).map((value, idx) => (
                    <td key={idx} className="border p-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || students.length === 0}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Envoi en cours..." : "Ajouter les étudiants"}
      </button>
    </div>
  );
};

export default EtudiantForm;
