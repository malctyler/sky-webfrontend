import axios from 'axios';
import { baseUrl } from '../config';

const apiClient = axios.create({
    baseURL: baseUrl
});

apiClient.interceptors.request.use((config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user?.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Remove invalid data
            localStorage.removeItem('user');
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('user');
            // Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
