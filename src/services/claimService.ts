import apiClient from './apiClient';
import { Claim, AddClaimDto, ClaimType } from '../types/claimTypes';

const claimService = {
    getAllClaims: async (): Promise<Claim[]> => {
        const response = await apiClient.get<Claim[]>('claims');
        return response.data;
    },

    getClaimById: async (id: number): Promise<Claim> => {
        const response = await apiClient.get<Claim>(`claims/${id}`);
        return response.data;
    },

    addClaim: async (claim: AddClaimDto): Promise<Claim> => {
        const response = await apiClient.post<Claim>('claims', claim);
        return response.data;
    },

    updateClaim: async (id: number, claim: AddClaimDto): Promise<void> => {
        await apiClient.put(`claims/${id}`, claim);
    },

    deleteClaim: async (id: number): Promise<void> => {
        await apiClient.delete(`claims/${id}`);
    },

    getAllClaimTypes: async (): Promise<ClaimType[]> => {
        const response = await apiClient.get<ClaimType[]>('claims/types');
        return response.data;
    }
};

export default claimService;
