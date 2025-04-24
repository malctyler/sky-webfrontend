import apiClient from './apiClient';

const inspectorService = {
    getAll: async () => {
        const response = await apiClient.get('/inspectors');
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/inspectors/${id}`);
        return response.data;
    },

    create: async (inspectorData) => {
        const response = await apiClient.post('/inspectors', inspectorData);
        return response.data;
    },

    update: async (id, inspectorData) => {
        const response = await apiClient.put(`/inspectors/${id}`, inspectorData);
        return response.data;
    },

    delete: async (id) => {
        await apiClient.delete(`/inspectors/${id}`);
    }
};

export default inspectorService;
