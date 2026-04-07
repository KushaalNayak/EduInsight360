import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const studentService = {
    getAll: async () => {
        try {
            const response = await api.get('/students');
            return response.data;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },
    getById: async (id) => {
        const response = await api.get(`/students/${id}`);
        return response.data;
    },
    create: async (student) => {
        const response = await api.post('/students', student);
        return response.data;
    },
    update: async (id, student) => {
        const response = await api.put(`/students/${id}`, student);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/students/${id}`);
    },
};

export default api;
