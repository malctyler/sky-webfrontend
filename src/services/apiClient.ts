import axios, { AxiosError, AxiosInstance } from 'axios';
import { baseUrl } from '../config';
import { ApiClientConfig } from '../types/apiTypes';
import { getAuthToken, removeAuthToken, isTokenValid } from '../utils/authUtils';

// Create and configure the axios instance
const instance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // This ensures cookies are sent with requests (for same-domain scenarios)
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configure interceptors
instance.interceptors.request.use((config: ApiClientConfig) => {
    // Get token using our improved auth utils (handles Azure Static Web Apps vs same-domain)
    const token = getAuthToken();
    
    if (token && isTokenValid(token)) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Debug: Adding Authorization header with valid token');
    } else if (token) {
        console.log('Debug: Token found but invalid/expired, removing it');
        removeAuthToken();
    } else {
        console.log('Debug: No token found');
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
            // Clear any client-side auth remnants
            removeAuthToken();
            console.log('Unauthorized request, cleared auth token:', error.config?.url);
        }
        return Promise.reject(error);
    }
);

// Create the API client instance
const apiClient = instance;

// Export the configured instance as the default export
export default apiClient;
