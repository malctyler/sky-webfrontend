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
    customerId?: string;  // Added this field
}

export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isCustomer: boolean;
    roles: string[];
}

export interface AuthResponse {
    token: string;
    expiration?: string;
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
    isCustomer?: boolean;
    emailConfirmed: boolean;
    customerId?: number | null;
}

export interface TokenValidationResponse {
    valid: boolean;
    userId?: string;
    email?: string;
    roles?: string[];
}

export interface EmailConfirmationResponse {
    isConfirmed: boolean;
}

// Typed API responses
export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
export type LogoutResponse = ApiResponse<void>;
export type ValidateTokenResponse = ApiResponse<TokenValidationResponse>;
export type EmailConfirmationCheckResponse = ApiResponse<EmailConfirmationResponse>;
