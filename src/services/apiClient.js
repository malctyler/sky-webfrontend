import axios from 'axios';
import { baseUrl } from '../config';

const apiClient = axios.create({
    baseURL: baseUrl
});

apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default apiClient;
