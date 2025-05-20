import { ApiResponse } from './apiTypes';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    email: string;
    roles: string[];
    emailConfirmed: boolean;
    firstName?: string;
    lastName?: string;
    customerId?: string;
}

export interface TokenValidationResponse {
    valid: boolean;
    user?: AuthResponse;
}

export interface EmailConfirmationResponse {
    confirmed: boolean;
    token?: string;
}

// Typed API responses
export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
export type LogoutResponse = ApiResponse<void>;
export type ValidateTokenResponse = ApiResponse<TokenValidationResponse>;
export type EmailConfirmationCheckResponse = ApiResponse<EmailConfirmationResponse>;
