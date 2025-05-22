import apiClient from './apiClient';
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
    // Since we're using the apiClient, the auth token will be automatically included
    await apiClient.post<void>(`/Auth/logout`);
    return;
};

export const validateToken = async (): Promise<TokenValidationResponse> => {
    try {
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr)?.token : null;
        
        if (!token) {
            return { valid: false };
        }
        
        const response = await apiClient.get<TokenValidationResponse>(`/Auth/validate`);
        return response.data;
    } catch (error) {
        return { valid: false };
    }
};

export const checkEmailConfirmation = async (email: string): Promise<EmailConfirmationResponse> => {
    const response = await apiClient.get<EmailConfirmationResponse>(`/Auth/check-email-confirmation/${email}`);
    return response.data;
};
