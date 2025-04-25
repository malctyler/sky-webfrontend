import apiClient from './apiClient';

export const login = async (email, password) => {
    const response = await apiClient.post('/Auth/login', { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await apiClient.post('/Auth/register', userData);
    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post('/Auth/logout');
    return response.data;
};