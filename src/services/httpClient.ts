export const API_BASE_URL = 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net';

export const httpClient = {
  get: async (url: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }
};