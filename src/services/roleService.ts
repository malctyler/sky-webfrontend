import axios from 'axios';
import { baseUrl } from '../config';
import { 
    Role,
    CreateRoleDto,
    AssignRoleDto
} from '../types/roleTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getRoles = async (): Promise<Role[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<Role[]>(`${baseUrl}/Roles`, { headers });
    return response.data;
};

const createRole = async (roleName: string): Promise<Role> => {
    const roleDto: CreateRoleDto = {
        id: '', // ID will be assigned by the server
        name: roleName
    };
    const headers = getAuthHeaders();
    const response = await axios.post<Role>(`${baseUrl}/Roles`, roleDto, { headers });
    return response.data;
};

const deleteRole = async (id: string): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Roles/${id}`, { headers });
};

// Get roles assigned to a user
const getUserRoles = async (userId: string): Promise<string[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<string[]>(`${baseUrl}/Users/${userId}/roles`, { headers });
    return response.data;
};

// Assign a role to a user
const assignRoleToUser = async (userId: string, roleName: string): Promise<void> => {
    const dto: AssignRoleDto = { roleName };
    const headers = getAuthHeaders();
    await axios.post(`${baseUrl}/Users/${userId}/roles`, dto, { headers });
};

// Remove a role from a user
const removeRoleFromUser = async (userId: string, roleName: string): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Users/${userId}/roles/${roleName}`, { headers });
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
