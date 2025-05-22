// Direct axios import instead of using apiClient
import axios from 'axios';
import { baseUrl } from '../config';
import { 
    RegisterData,
    AuthResponse,
    TokenValidationResponse,
    EmailConfirmationResponse
} from '../types/authTypes';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${baseUrl}/Auth/login`, { email, password });
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${baseUrl}/Auth/register`, userData);
    return response.data;
};

export const logout = async (): Promise<void> => {
    const response = await axios.post<void>(`${baseUrl}/Auth/logout`);
    return response.data;
};

export const validateToken = async (): Promise<TokenValidationResponse> => {
    try {
        // Get token from localStorage
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr)?.token : null;
        
        if (!token) {
            return { valid: false };
        }
        
        const response = await axios.get<TokenValidationResponse>(`${baseUrl}/Auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return { valid: false };
    }
};

export const checkEmailConfirmation = async (email: string): Promise<EmailConfirmationResponse> => {
    const response = await axios.get<EmailConfirmationResponse>(`${baseUrl}/Auth/check-email-confirmation/${email}`);
    return response.data;
};
