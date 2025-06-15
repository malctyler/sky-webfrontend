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
    console.log('Login response:', response);
    console.log('Response headers:', response.headers);
    console.log('Debug token:', response.headers['x-debug-token']);
    console.log('Cookies after login:', document.cookie);
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

export const validateToken = async (): Promise<{ valid: boolean; user?: AuthResponse }> => {
    try {
        const response = await apiClient.get<{
            valid: boolean;
            userId: string;
            email: string;
            roles: string[];
        }>(`/Auth/validate`);
        
        if (response.data.valid) {
            // Convert the validate response to an AuthResponse format
            const user: AuthResponse = {
                id: response.data.userId,
                email: response.data.email,
                roles: response.data.roles,
                isCustomer: response.data.roles.includes('Customer'),
                emailConfirmed: true, // We know it's confirmed if the token is valid
            };
            return { valid: true, user };
        }
        
        return { valid: false };
    } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
            return { valid: false };
        }
        console.error('Token validation error:', error);
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
