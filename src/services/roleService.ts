import apiClient from './apiClient';
import { 
    Role,
    CreateRoleDto,
    AssignRoleDto
} from '../types/roleTypes';

const getRoles = async (): Promise<Role[]> => {
    const res = await apiClient.get<Role[]>('/Roles');
    return res.data;
};

const createRole = async (roleName: string): Promise<Role> => {
    const roleDto: CreateRoleDto = {
        id: '', // ID will be assigned by the server
        name: roleName
    };
    const res = await apiClient.post<Role>('/Roles', roleDto);
    return res.data;
};

const deleteRole = async (id: string): Promise<void> => {
    await apiClient.delete(`/Roles/${id}`);
};

// Get roles assigned to a user
const getUserRoles = async (userId: string): Promise<string[]> => {
    const res = await apiClient.get<string[]>(`/Users/${userId}/roles`);
    return res.data;
};

// Assign a role to a user
const assignRoleToUser = async (userId: string, roleName: string): Promise<void> => {
    const dto: AssignRoleDto = { roleName };
    await apiClient.post(`/Users/${userId}/roles`, dto);
};

// Remove a role from a user
const removeRoleFromUser = async (userId: string, roleName: string): Promise<void> => {
    await apiClient.delete(`/Users/${userId}/roles/${roleName}`);
};

const roleService = {
    getRoles,
    createRole,
    deleteRole,
    getUserRoles,
    assignRoleToUser,
    removeRoleFromUser
};

export default roleService;
