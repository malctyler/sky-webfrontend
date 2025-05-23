import apiClient from './apiClient';
import { Customer, CustomerFormData } from '../types/customerTypes';

export const customerService = {
    getAll: async (): Promise<Customer[]> => {
        const response = await apiClient.get<Customer[]>('/Customers');
        return response.data;
    },

    getById: async (id: number): Promise<Customer> => {
        const response = await apiClient.get<Customer>(`/Customers/${id}`);
        return response.data;
    },

    create: async (customerData: CustomerFormData): Promise<Customer> => {
        const response = await apiClient.post<Customer>('/Customers', customerData);
        return response.data;
    },

    update: async (id: number, customerData: Partial<Customer>): Promise<Customer> => {
        const response = await apiClient.put<Customer>(`/Customers/${id}`, customerData);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/Customers/${id}`);
    },

    search: async (query: string): Promise<Customer[]> => {
        const allCustomers = await customerService.getAll();
        return allCustomers.filter(customer => 
            customer.companyName?.toLowerCase().includes(query.toLowerCase()) ||
            customer.contactFirstNames?.toLowerCase().includes(query.toLowerCase()) ||
            customer.contactSurname?.toLowerCase().includes(query.toLowerCase()) ||
            customer.email?.toLowerCase().includes(query.toLowerCase()) ||
            customer.telephone?.includes(query.toLowerCase()) ||
            customer.postcode?.toLowerCase().includes(query.toLowerCase())
        );
    }
};

export default customerService;
