import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

class CategorieService {
    getCategories() {
        return axios.get(`${API_URL}/categories/`);
    }

    getCategorie(id) {
        return axios.get(`${API_URL}/categories/${id}/`);
    }

    createCategorie(categorie) {
        return axios.post(`${API_URL}/categories/`, categorie);
    }

    updateCategorie(id, categorie) {
        return axios.put(`${API_URL}/categories/${id}/`, categorie);
    }

    deleteCategorie(id) {
        return axios.delete(`${API_URL}/categories/${id}/`);
    }
}

export default new CategorieService();
