import api from './api';

export const getTherapists = async () => {
    try {
        const response = await api.get('/therapists');
        return response.data;
    } catch (error) {
        console.error('Error fetching therapists:', error);
        throw error;
    }
};

export const getTherapistById = async (id) => {
    try {
        const response = await api.get(`/therapists/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching therapist with id ${id}:`, error);
        throw error;
    }
};

export const createTherapist = async (therapist) => {
    try {
        const response = await api.post('/therapists', therapist);
        return response.data;
    } catch (error) {
        console.error('Error creating therapist:', error);
        throw error;
    }
};

export const updateTherapist = async (therapist) => {
    try {
        const response = await api.put(`/therapists/${therapist.id}`, therapist);
        return response.data;
    } catch (error) {
        console.error(`Error updating therapist with id ${therapist.id}:`, error);
        throw error;
    }
};

export const deleteTherapist = async (id) => {
    try {
        const response = await api.delete(`/therapists/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting therapist with id ${id}:`, error);
        throw error;
    }
};