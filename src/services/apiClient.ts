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
        // Reject the request with a 401-like error to trigger the response interceptor
        return Promise.reject({
            response: {
                status: 401,
                statusText: 'Token Expired',
                data: { message: 'Authentication token has expired. Please log in again.' }
            },
            config,
            isAxiosError: true,
            name: 'AxiosError',
            message: 'Token expired'
        });
    } else {
        console.log('Debug: No token found');
        // Define endpoints that don't require authentication
        const publicEndpoints = [
            '/auth/login',
            '/auth/register',
            '/auth/secure-login',
            '/auth/forgot-password',
            '/auth/reset-password',
            '/auth/check-email-confirmation'
        ];
        
        const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
        
        if (!isPublicEndpoint) {
            console.log('Debug: Protected endpoint accessed without token, rejecting request');
            return Promise.reject({
                response: {
                    status: 401,
                    statusText: 'No Token',
                    data: { message: 'No authentication token found. Please log in.' }
                },
                config,
                isAxiosError: true,
                name: 'AxiosError',
                message: 'No authentication token'
            });
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
            // Clear any client-side auth remnants
            removeAuthToken();
            console.log('Unauthorized request, cleared auth token:', error.config?.url);
            
            // Check if this is a token expiration specifically
            const errorData = error.response?.data as any;
            const isTokenExpired = errorData?.message?.includes('expired') || 
                                 errorData?.message?.includes('Token has been revoked') ||
                                 error.response?.headers?.['token-expired'] === 'true';
            
            if (isTokenExpired) {
                console.log('Token expired, redirecting to login may be required');
                // You could emit an event here or use a callback to trigger login redirect
            }
        }
        return Promise.reject(error);
    }
);

// Create the API client instance
const apiClient = instance;

// Export the configured instance as the default export
export default apiClient;
