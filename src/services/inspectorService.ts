import axios from 'axios';
import { baseUrl } from '../config';
import { Inspector } from '../types/inspectorTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const inspectorService = {
    getAll: async (): Promise<Inspector[]> => {
        try {            const headers = getAuthHeaders();
            const response = await axios.get<Inspector[]>(`${baseUrl}/Inspectors`, { headers });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch inspectors:', error);
            // If we get a 401, it means our token is invalid
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // Clear the invalid token
                localStorage.removeItem('user');
                // Redirect to login
                window.location.href = '/login';
            }
            throw error;
        }
    }
};

export default inspectorService;
