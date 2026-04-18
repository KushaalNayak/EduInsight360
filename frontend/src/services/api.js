import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    register: async (username, password) => {
        const response = await api.post('/auth/register', { username, password });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};


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
    exportCSV: async () => {
        const response = await api.get('/students/export', { responseType: 'blob' });
        // Create a blob specifically for CSV
        const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `edu_students_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};



export default api;

