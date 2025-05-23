import { ApiResponse } from './apiTypes';

export interface Role {
    id: string;
    name: string;
}

export interface CreateRoleDto {
    id: string;
    name: string;
}

export interface AssignRoleDto {
    roleName: string;
}

// API Response types
export type RolesResponse = ApiResponse<Role[]>;
export type RoleResponse = ApiResponse<Role>;
export type UserRolesResponse = ApiResponse<string[]>;
export type CreateRoleResponse = ApiResponse<Role>;
export type DeleteRoleResponse = ApiResponse<void>;
export type AssignRoleResponse = ApiResponse<void>;
export type RemoveRoleResponse = ApiResponse<void>;
