import apiClient from './apiClient';
import { 
    User,
    CreateUserDto,
    UpdateUserDto
} from '../types/userTypes';

export const getAll = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('users');
    return response.data;
};

export const getById = async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`users/${id}`);
    return response.data;
};

export const create = async (userDto: CreateUserDto): Promise<User> => {
    const response = await apiClient.post<User>('users', userDto);
    return response.data;
};

export const update = async (id: string, userDto: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>(`users/${id}`, userDto);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`users/${id}`);
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get<User>('users/current');
        return response.data;
    } catch (error) {
        return null;
    }
};
