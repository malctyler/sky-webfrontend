import axios from 'axios';
import { baseUrl } from '../config';
import { Inspector } from '../types/inspectorTypes';

const inspectorService = {
  getAll: async (): Promise<Inspector[]> => {
    try {
      const response = await axios.get<Inspector[]>(`${baseUrl}/Inspectors`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch inspectors:', error);
      return [];
    }
  }
};

export default inspectorService;
