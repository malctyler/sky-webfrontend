import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { 
    RegisterData,
    AuthResponse,
    TokenValidationResponse,
    EmailConfirmationResponse,
    LoginResponse
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
    try {
        await apiClient.post<void>(`/Auth/logout`);
    } catch (error) {
        // If we get a 401, that's fine - the token is already invalid
        if ((error as AxiosError)?.response?.status !== 401) {
            throw error;
        }
    }
};

export const validateToken = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get<TokenValidationResponse>(`/Auth/validate`);
        return response.data.valid;
    } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
            return false;
        }
        throw error;
    }
};

export const checkEmailConfirmation = async (email: string): Promise<EmailConfirmationResponse> => {
    const response = await apiClient.get<EmailConfirmationResponse>(`/Auth/check-email-confirmation/${email}`);
    return response.data;
};

export const getCurrentUser = async (): Promise<LoginResponse> => {
    const response = await apiClient.get<LoginResponse>('/auth/current');
    return response.data;
};
