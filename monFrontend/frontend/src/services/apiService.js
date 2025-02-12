import axios from 'axios';

// Définition de l'URL de base de l'API.
const API_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  constructor(resourceName) {
    // Le constructeur prend le nom de la ressource (ex: 'produits')
    // et construit l'URL de base pour cette ressource.
    this.baseURL = `${API_URL}/${resourceName}/`; // Ajout d'un slash à la fin pour éviter les erreurs d'URL
  }

  async get(endpoint = "", config = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, config);
      console.log('Data received from API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }
  

  async getById(id) {
    try {
      // Effectue une requête GET pour récupérer un élément spécifique par son ID.
      const response = await axios.get(`${this.baseURL}${id}/`); // Ajout d'un slash à la fin pour éviter les erreurs d'URL
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'élément:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      // Effectue une requête POST pour créer un nouvel élément.
      const response = await axios.post(this.baseURL, data);
      console.log('Data sent to API:', data); // Ajout d'un log pour vérifier les données envoyées
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      console.log(data);
      throw error;
    }
  }

  async update(id, data) {
    try {
      // Effectue une requête PUT pour mettre à jour un élément existant (remplacement complet).
      const response = await axios.put(`${this.baseURL}${id}/`, data); // Ajout d'un slash à la fin pour éviter les erreurs d'URL
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  }

  async partialUpdate(id, data) {
    try {
      // Effectue une requête PATCH pour mettre à jour partiellement un élément existant.
      const response = await axios.patch(`${this.baseURL}${id}/`, data); // Ajout d'un slash à la fin pour éviter les erreurs d'URL
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour partielle:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      // Effectue une requête DELETE pour supprimer un élément.
      await axios.delete(`${this.baseURL}${id}/`); // Ajout d'un slash à la fin pour éviter les erreurs d'URL
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  }
}

// Crée des instances spécifiques de ApiService.
export const utilisateurService = new ApiService('utilisateurs');
export const categorieService = new ApiService('categories'); // Décommenté pour inclure les catégories
export const etudiantService = new ApiService('etudiants');

etudiantService.bulk_create = (data) => axios.post(`${API_URL}/etudiants/bulk_create/`, data);

export const fournisseurService = new ApiService('fournisseurs');
export const gestionTicketService = new ApiService('gestiontickets');
export const jourService = new ApiService('jours');
export const lotsTicketService = new ApiService('lotstickets');
export const mouvementStockService = new ApiService('mouvementstocks');
export const periodeService = new ApiService('periodes');
export const produitService = new ApiService('produits');
export const produitEnvoieService = new ApiService('ProduitEnvoie');
export const rapportService = new ApiService('rapports');
export const recuService = new ApiService('recus');
export const reservationService = new ApiService('reservations');
export const stockService = new ApiService('stocks');
export const ticketService = new ApiService('tickets');
export const typerapportService = new ApiService('typerapports');
export const loginService = new ApiService('login');
export const StockTableService = new ApiService('mouvements-stock-table');
export const StockUpdateService = (produit, jour, quantite) => {
  return axios.post(`${API_URL}/mouvement-stock-update/`, { produit, jour, quantite });
};
export const sortieStock = async (produit, jour, quantite) => {
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/sortie-stock/', {
          produit,
          jour,
          quantite
      });
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la sortie de stock :", error);
      throw error;
  }
};



// Exporte également la classe ApiService au cas où elle serait nécessaire pour d'autres ressources.
export default ApiService;
