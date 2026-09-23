import api from './api';

export const getClients = async () => {
    try {
        const response = await api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const getClientById = async (id) => {
    try {
        const response = await api.get(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching client with id ${id}:`, error);
        throw error;
    }
};

export const createClient = async (client) => {
    try {
        const response = await api.post('/clients', client);
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

export const updateClient = async (client) => {
    try {
        const response = await api.put(`/clients/${client.id}`, client);
        return response.data;
    } catch (error) {
        console.error(`Error updating client with id ${client.id}:`, error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting client with id ${id}:`, error);
        throw error;
    }
};