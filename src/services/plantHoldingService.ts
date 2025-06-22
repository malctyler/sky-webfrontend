import apiClient from './apiClient';
import { PlantHolding } from '../types/plantholdingTypes';

const plantHoldingService = {
    getByCustomerId: async (customerId: string | number): Promise<PlantHolding[]> => {
        console.log('Debug: plantHoldingService.getByCustomerId called with customerId:', customerId);
        const response = await apiClient.get<PlantHolding[]>(`/PlantHolding/customer/${customerId}`);
        console.log('Debug: plantHoldingService.getByCustomerId response:', response.data);
        return response.data;
    }
};

export default plantHoldingService;