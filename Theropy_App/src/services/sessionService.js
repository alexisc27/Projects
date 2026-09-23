import api from './api';

export const getSessions = async () => {
    try {
        const response = await api.get('/sessions');
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
};

export const getSessionById = async (id) => {
    try {
        const response = await api.get(`/sessions/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching session with id ${id}:`, error);
        throw error;
    }
};

export const createSession = async (session) => {
    try {
        const response = await api.post('/sessions', session);
        return response.data;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export const updateSession = async (session) => {
    try {
        const response = await api.put(`/sessions/${session.id}`, session);
        return response.data;
    } catch (error) {
        console.error(`Error updating session with id ${session.id}:`, error);
        throw error;
    }
};

export const deleteSession = async (id) => {
    try {
        const response = await api.delete(`/sessions/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting session with id ${id}:`, error);
        throw error;
    }
};