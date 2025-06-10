import apiClient from './apiClient';
import { 
    Role,
    CreateRoleDto,
    AssignRoleDto
} from '../types/roleTypes';

const roleService = {
    getAll: async (): Promise<Role[]> => {
        const response = await apiClient.get<Role[]>('roles');
        return response.data;
    },

    getById: async (id: string): Promise<Role> => {
        const response = await apiClient.get<Role>(`roles/${id}`);
        return response.data;
    },

    create: async (roleDto: CreateRoleDto): Promise<Role> => {
        const response = await apiClient.post<Role>('roles', roleDto);
        return response.data;
    },

    update: async (id: string, roleDto: CreateRoleDto): Promise<Role> => {
        const response = await apiClient.put<Role>(`roles/${id}`, roleDto);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`roles/${id}`);
    },

    assignRole: async (assignRoleDto: AssignRoleDto): Promise<void> => {
        await apiClient.post(`users/${assignRoleDto.userId}/roles/${assignRoleDto.roleId}`, null);
    },

    removeRole: async (assignRoleDto: AssignRoleDto): Promise<void> => {
        await apiClient.delete(`users/${assignRoleDto.userId}/roles/${assignRoleDto.roleId}`);
    },

    getUserRoles: async (userId: string): Promise<Role[]> => {
        const response = await apiClient.get<Role[]>(`users/${userId}/roles`);
        return response.data;
    }
};

export default roleService;
