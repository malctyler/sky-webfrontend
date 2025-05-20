import { ApiResponse } from './apiTypes';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isCustomer: boolean;
    customerId?: number | null;
    emailConfirmed: boolean;
    roles: string[];
}

export interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isCustomer: boolean;
    customerId?: number | null;
    emailConfirmed: boolean;
}

export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    isCustomer?: boolean;
    customerId?: number | null;
    emailConfirmed?: boolean;
}

// API Response types
export type UsersResponse = ApiResponse<User[]>;
export type UserResponse = ApiResponse<User>;
export type CreateUserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<void>;
export type DeleteUserResponse = ApiResponse<void>;
