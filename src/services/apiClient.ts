import axios, { AxiosError, AxiosInstance } from 'axios';
import { baseUrl } from '../config';
import { ApiClientConfig } from '../types/apiTypes';

// Create and configure the axios instance
const instance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true // This ensures cookies are sent with requests
});

// Configure interceptors
instance.interceptors.request.use((config: ApiClientConfig) => {
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 Unauthorized
instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Let the component handle navigation through its error handling
            console.log('Unauthorized request:', error.config?.url);
        }
        return Promise.reject(error);
    }
);

// Create the API client instance
const apiClient = instance;

// Export the configured instance as the default export
export default apiClient;
