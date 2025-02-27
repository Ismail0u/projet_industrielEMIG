import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { email, password });

        if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;  // Retourne toute la réponse, pas seulement les tokens.
    } catch (error) {
        console.error("Login error:", error.response?.data);
        throw error;
    }
};


const getUserData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Aucun token, l'utilisateur doit se reconnecter.");

    try {
        const response = await axios.get(`${API_URL}/me/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        throw error;
    }
};

export { login, getUserData };
