// Base URL for the API
// Use local development API when running locally, production API when deployed
export const baseUrl: string = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5207/api'
    : 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api';

// Other configuration values can be added here
