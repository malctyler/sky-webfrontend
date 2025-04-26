export const API_BASE_URL = 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API endpoints
export const fetchCustomers = () => authenticatedFetch('/api/Customers');
export const fetchSummaries = () => authenticatedFetch('/api/Summaries');
export const fetchNotes = () => authenticatedFetch('/api/Notes');
export const fetchPlantCategories = () => authenticatedFetch('/api/PlantCategories');
export const fetchAllPlants = () => authenticatedFetch('/api/AllPlants');
export const fetchStatuses = () => authenticatedFetch('/api/Statuses');
export const fetchPlantHoldings = () => authenticatedFetch('/api/PlantHoldings');
export const fetchInspections = () => authenticatedFetch('/api/Inspections');
export const fetchInspectors = () => authenticatedFetch('/api/Inspectors');