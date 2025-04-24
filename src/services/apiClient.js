import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
