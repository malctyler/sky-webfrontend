import apiClient from './apiClient';

const getRoles = async () => {
  const res = await apiClient.get('/Roles');
  return res.data;
};

const createRole = async (role) => {
  const res = await apiClient.post('/Roles', role);
  return res.data;
};

const deleteRole = async (id) => {
  await apiClient.delete(`/Roles/${id}`);
};

export default {
  getRoles,
  createRole,
  deleteRole,
};
