import axios, { AxiosError, AxiosInstance } from 'axios';
import { baseUrl } from '../config';
import { ApiClientConfig, User } from '../types/apiTypes';

// Create and configure the axios instance
const instance: AxiosInstance = axios.create({
    baseURL: baseUrl
});

// Configure interceptors
instance.interceptors.request.use((config: ApiClientConfig) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user: User = JSON.parse(userStr);
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
}, (error: AxiosError) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 Unauthorized
instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('user');
            // Let the component handle navigation through its error handling
        }
        return Promise.reject(error);
    }
);

// Create the API client instance
const apiClient = instance;

// Export the configured instance as the default export
export default apiClient;
