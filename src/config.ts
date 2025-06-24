// Base URL for the API
// Use Vite proxy in development to connect to Azure API, direct URL in production
export const baseUrl: string = process.env.NODE_ENV === 'development' 
    ? '/api' // This will use Vite proxy to redirect to Azure
    : 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api';

// Other configuration values can be added here
