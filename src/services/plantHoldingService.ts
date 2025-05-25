import apiClient from './apiClient';
import { PlantHolding } from '../types/plantholdingTypes';

const plantHoldingService = {
    getByCustomerId: async (customerId: string | number): Promise<PlantHolding[]> => {
        const response = await apiClient.get<PlantHolding[]>(`/PlantHolding/customer/${customerId}`);
        return response.data;
    }
};

export default plantHoldingService;