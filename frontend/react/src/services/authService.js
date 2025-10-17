import api from "./api";

export const authService = {
    // Đăng ký
    register: async (userData) => {
        const reponse = await api.post('/auth/register', userData);
        return reponse.data;
    },

    login: async (userData) => {
        const reponse = await api.post('/auth/login', userData);
        return reponse.data;
    },

    logout: async () => {
        const reponse = await api.post('/auth/logout');
        return reponse.data;
    },
};