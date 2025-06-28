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

    deleteClaimById: async (id: number): Promise<void> => {
        await apiClient.delete(`claims/${id}`);
    },

    getAllClaimTypes: async (): Promise<ClaimType[]> => {
        const response = await apiClient.get<ClaimType[]>('claims/types');
        return response.data;
    },

    // User-specific claim methods
    getClaims: async (userId: string): Promise<Claim[]> => {
        const response = await apiClient.get<Claim[]>(`claims/${userId}`);
        // Filter out internal claims that shouldn't be managed through UI
        const filteredClaims = response.data.filter(claim => 
            claim.type !== 'TransmissionPasswordHash'
        );
        return filteredClaims;
    },

    addUserClaim: async (userId: string, claim: AddClaimDto): Promise<Claim> => {
        const response = await apiClient.post<Claim>(`claims/${userId}/claims`, claim);
        return response.data;
    },

    deleteClaim: async (userId: string, claimType: ClaimType): Promise<void> => {
        await apiClient.delete(`claims/${userId}/claims/${encodeURIComponent(claimType)}`);
    }
};

export default claimService;
