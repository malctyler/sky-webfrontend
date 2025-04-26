export const API_BASE_URL = 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net';

async function isTokenValid(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    throw new Error('No authentication token found');
  }

  // Validate token before making the request
  const valid = await isTokenValid(token);
  if (!valid) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Invalid or expired token');
  }

  const defaultOptions: RequestInit = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Authentication failed');
  }

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