import axios from 'axios';
import { baseUrl } from '../config';
import { 
    User,
    CreateUserDto,
    UpdateUserDto
} from '../types/userTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getUsers = async (): Promise<User[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<User[]>(`${baseUrl}/Users`, { headers });
    return response.data;
};

const getUser = async (id: string): Promise<User> => {
    const headers = getAuthHeaders();
    const response = await axios.get<User>(`${baseUrl}/Users/${id}`, { headers });
    return response.data;
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
    
    const headers = getAuthHeaders();
    const response = await axios.post<User>(`${baseUrl}/Users`, registerDto, { headers });
    return response.data;
};

const updateUser = async (id: string, user: UpdateUserDto): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.put<void>(`${baseUrl}/Users/${id}`, user, { headers });
};

const deleteUser = async (id: string): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Users/${id}`, { headers });
};

const userService = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;
