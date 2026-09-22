import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTravelLogs = (userId) => api.get(`/travel-logs?userId=${userId}`);
export const createTravelLog = (data) => api.post('/travel-logs', data);
export const updateTravelLog = (id, data) => api.put(`/travel-logs/${id}`, data);
export const deleteTravelLog = (id) => api.delete(`/travel-logs/${id}`);

// Similar for journey plans and auth...