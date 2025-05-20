import apiClient from './apiClient';
import { Claim, AddClaimDto, ClaimType } from '../types/claimTypes';

const getClaims = async (userId: string): Promise<Claim[]> => {
    const res = await apiClient.get<Claim[]>(`/Claims/${userId}`);
    return res.data;
};

const addClaim = async (userId: string, claim: AddClaimDto): Promise<void> => {
    await apiClient.post(`/Claims/${userId}/claims`, claim);
};

const deleteClaim = async (userId: string, type: ClaimType): Promise<void> => {
    await apiClient.delete(`/Claims/${userId}/claims/${type}`);
};

const claimService = {
    getClaims,
    addClaim,
    deleteClaim,
};

export default claimService;
