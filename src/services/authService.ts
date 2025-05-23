import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { 
    RegisterData,
    AuthResponse,
    TokenValidationResponse,
    EmailConfirmationResponse
} from '../types/authTypes';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/Auth/login`, { email, password });
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/Auth/register`, userData);
    return response.data;
};

export const logout = async (): Promise<void> => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        // If no user data exists, just resolve without making the API call
        return;
    }

    try {
        await apiClient.post<void>(`/Auth/logout`);
    } catch (error) {
        // If we get a 401, that's fine - the token is already invalid
        if ((error as AxiosError)?.response?.status !== 401) {
            throw error;
        }
    }
};

export const validateToken = async (): Promise<TokenValidationResponse> => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        throw new Error('No user data found');
    }

    try {
        const user = JSON.parse(userStr);
        if (!user?.token) {
            throw new Error('No token found');
        }

        const response = await apiClient.get<TokenValidationResponse>(`/Auth/validate`);
        return response.data;
    } catch (error) {
        localStorage.removeItem('user');
        throw error;
    }
};

export const checkEmailConfirmation = async (email: string): Promise<EmailConfirmationResponse> => {
    const response = await apiClient.get<EmailConfirmationResponse>(`/Auth/check-email-confirmation/${email}`);
    return response.data;
};
