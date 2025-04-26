export const API_BASE_URL = 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net';

const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const defaultOptions: RequestInit = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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