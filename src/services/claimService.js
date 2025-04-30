import apiClient from './apiClient';

const getClaims = async (userId) => {
  const res = await apiClient.get(`/Claims/${userId}`);
  return res.data;
};

const addClaim = async (userId, claim) => {
  await apiClient.post(`/Claims/${userId}/claims`, claim);
};

const deleteClaim = async (userId, type) => {
  await apiClient.delete(`/Claims/${userId}/claims/${type}`);
};

export default {
  getClaims,
  addClaim,
  deleteClaim,
};
