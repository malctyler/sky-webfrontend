import {
    MultiInspectionItem,
    MultiInspectionRequest,
    CreateMultiInspection
} from '../types/inspectionTypes';
import apiClient from './apiClient';

export class MultiInspectionService {
    /**
     * Get plant holdings for multi-inspection by customer and categories
     */
    static async getMultiInspectionItems(request: MultiInspectionRequest): Promise<MultiInspectionItem[]> {
        const response = await apiClient.post('/multiinspection/items', request);
        return response.data.data || response.data; // Handle both wrapped and unwrapped responses
    }

    /**
     * Create multiple inspections from a multi-inspection request
     */
    static async createMultiInspection(createData: CreateMultiInspection): Promise<any[]> {
        const response = await apiClient.post('/multiinspection/create', createData);
        return response.data.data || response.data; // Handle both wrapped and unwrapped responses
    }

    /**
     * Get available plant categories for selection
     */
    static async getPlantCategories(): Promise<any[]> {
        const response = await apiClient.get('/plantcategories');
        return response.data.data || response.data;
    }

    /**
     * Get plant categories that have holdings for a specific customer
     */
    static async getCategoriesWithHoldingsByCustomer(customerId: number): Promise<any[]> {
        const response = await apiClient.get(`/multiinspection/categories/${customerId}`);
        return response.data.data || response.data;
    }

    /**
     * Get all available inspectors
     */
    static async getInspectors(): Promise<any[]> {
        const response = await apiClient.get('/inspectors');
        return response.data.data || response.data;
    }

    /**
     * Get completed multi-inspections for a customer and date
     */
    static async getMultiInspectionsByCustomerAndDate(customerId: number, inspectionDate: string): Promise<any[]> {
        const response = await apiClient.get(`/multiinspection/completed/${customerId}/${inspectionDate}`);
        return response.data.data || response.data;
    }

    /**
     * Send multi-inspection certificate via email
     */
    static async emailMultiCertificate(pdfFile: File, customerEmail?: string): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append('pdf', pdfFile, pdfFile.name);
            if (customerEmail) {
                formData.append('email', customerEmail);
            }

            await apiClient.post('/multiinspection/email', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return true;
        } catch (error) {
            console.error('Error sending multi-inspection certificate:', error);
            return false;
        }
    }
}

export default MultiInspectionService;
