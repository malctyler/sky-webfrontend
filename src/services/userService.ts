import apiClient from './apiClient';
import { 
    User,
    CreateUserDto,
    UpdateUserDto
} from '../types/userTypes';

const getUsers = async (): Promise<User[]> => {
    const res = await apiClient.get<User[]>('/Users');
    return res.data;
};

const getUser = async (id: string): Promise<User> => {
    const res = await apiClient.get<User>(`/Users/${id}`);
    return res.data;
};

const createUser = async (userData: CreateUserDto): Promise<User> => {
    // Convert customerId to number if it exists, null if empty
    const customerId = userData.customerId ? parseInt(userData.customerId.toString()) : null;
    
    const registerDto: CreateUserDto = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isCustomer: userData.isCustomer,
        customerId: customerId,
        emailConfirmed: userData.emailConfirmed
    };
    
    const res = await apiClient.post<User>('/Users', registerDto);
    return res.data;
};

const updateUser = async (id: string, user: UpdateUserDto): Promise<void> => {
    await apiClient.put<void>(`/Users/${id}`, user);
};

const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(`/Users/${id}`);
};

const userService = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;
