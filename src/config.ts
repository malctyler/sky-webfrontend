// Base URL for the API
// Environment-aware API configuration
export const baseUrl: string = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'development' 
        ? '/api' // This will use Vite proxy to redirect to Azure
        : 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api');

// Environment configuration
export const config = {
    apiUrl: baseUrl,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || baseUrl.replace('/api', ''),
    environment: import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE,
    debug: import.meta.env.VITE_DEBUG === 'true' || import.meta.env.MODE === 'development'
};

// Log configuration in development
if (config.debug) {
    console.log('🔧 Frontend Configuration:', {
        mode: import.meta.env.MODE,
        environment: config.environment,
        apiUrl: config.apiUrl,
        apiBaseUrl: config.apiBaseUrl,
        debug: config.debug
    });
}
