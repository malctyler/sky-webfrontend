import apiClient from './apiClient';
import { Inspector } from '../types/inspectorTypes';

const inspectorService = {
    getAll: async (): Promise<Inspector[]> => {
        const response = await apiClient.get<Inspector[]>('inspectors');
        return response.data;
    },

    getById: async (id: number): Promise<Inspector> => {
        const response = await apiClient.get<Inspector>(`inspectors/${id}`);
        return response.data;
    },

    create: async (inspector: Omit<Inspector, 'inspectorID'>): Promise<Inspector> => {
        const response = await apiClient.post<Inspector>('inspectors', inspector);
        return response.data;
    },

    update: async (id: number, inspector: Omit<Inspector, 'inspectorID'>): Promise<Inspector> => {
        const response = await apiClient.put<Inspector>(`inspectors/${id}`, inspector);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`inspectors/${id}`);
    }
};

export default inspectorService;
