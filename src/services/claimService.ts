import axios from 'axios';
import { baseUrl } from '../config';
import { Claim, AddClaimDto, ClaimType } from '../types/claimTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getClaims = async (userId: string): Promise<Claim[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<Claim[]>(`${baseUrl}/Claims/${userId}`, { headers });
    return response.data;
};

const addClaim = async (userId: string, claim: AddClaimDto): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.post(`${baseUrl}/Claims/${userId}/claims`, claim, { headers });
};

const deleteClaim = async (userId: string, type: ClaimType): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Claims/${userId}/claims/${type}`, { headers });
};

const claimService = {
    getClaims,
    addClaim,
    deleteClaim,
};

export default claimService;
