import axios, { AxiosError, AxiosInstance } from 'axios';
import { baseUrl } from '../config';
import { ApiClientConfig } from '../types/apiTypes';
import { getAuthToken, removeAuthToken } from '../utils/authUtils';

// Create and configure the axios instance
const instance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configure interceptors
instance.interceptors.request.use((config: ApiClientConfig) => {    // Get the token from cookie
    const token = getAuthToken();
    
    // If token exists, add it to the Authorization header
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 Unauthorized
instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {            // Clear the token if it's invalid or expired
            removeAuthToken();
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
