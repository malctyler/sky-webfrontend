import { ApiResponse } from './apiTypes';

export type ClaimType = 
    | 'Admin'
    | 'User'
    | 'Customer'
    | 'Inspector'
    | 'Manager'
    | string; // Allow for custom claim types

export interface Claim {
    type: ClaimType;
    value: string;
    userId: string;
}

export interface AddClaimDto {
    type: ClaimType;
    value: string;
}

// API Response types
export type ClaimsResponse = ApiResponse<Claim[]>;
export type AddClaimResponse = ApiResponse<void>;
export type DeleteClaimResponse = ApiResponse<void>;
