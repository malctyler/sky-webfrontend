import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { 
    RegisterData,
    AuthResponse,
    TokenValidationResponse,
    EmailConfirmationResponse,
    LoginResponse
} from '../types/authTypes';
import { setAuthToken, removeAuthToken, getAuthToken, setUserInfo, removeUserInfo } from '../utils/authUtils';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/Auth/login`, { email, password });
    
    // Store the token if it's in the response
    if (response.data.token) {
        // Use 60 minutes for token expiration to match backend JWT settings
        setAuthToken(response.data.token);
        setUserInfo(response.data);
    }
    
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/Auth/register`, userData);
    
    // Store the token if it's in the response
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    
    return response.data;
};

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post<void>(`/Auth/logout`);
    } catch (error) {
        // If we get a 401, that's fine - the token is already invalid
        if ((error as AxiosError)?.response?.status !== 401) {
            throw error;
        }    } finally {        // Always clear the token and user info on logout
        removeAuthToken();
        removeUserInfo();
    }
};

export const validateToken = async (): Promise<{ valid: boolean; user?: AuthResponse }> => {
    try {
        const token = getAuthToken();
        if (!token) {
            return { valid: false };
        }

        const response = await apiClient.get<TokenValidationResponse>(`/Auth/validate`);
          if (response.data.valid && response.data.email) {
            // Get the current user data to ensure we have the complete user state
            const currentUserResponse = await getCurrentUser();
            return {
                valid: true,
                user: currentUserResponse.data
            };
        }
        
        return { valid: false };
    } catch (error) {        console.error('Token validation error:', error);
        removeAuthToken(); // Clear invalid token
        return { valid: false };
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
