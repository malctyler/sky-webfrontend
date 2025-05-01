import apiClient from './apiClient';

const getRoles = async () => {
  const res = await apiClient.get('/Roles');
  return res.data;
};

const createRole = async (roleName) => {
  const roleDto = {
    id: '', // ID will be assigned by the server
    name: roleName
  };
  const res = await apiClient.post('/Roles', roleDto);
  return res.data;
};

const deleteRole = async (id) => {
  await apiClient.delete(`/Roles/${id}`);
};

// New: Get roles assigned to a user
const getUserRoles = async (userId) => {
  const res = await apiClient.get(`/Users/${userId}/roles`);
  return res.data;
};

// New: Assign a role to a user
const assignRoleToUser = async (userId, roleName) => {
  await apiClient.post(`/Users/${userId}/roles`, { roleName });
};

// New: Remove a role from a user
const removeRoleFromUser = async (userId, roleName) => {
  await apiClient.delete(`/Users/${userId}/roles/${roleName}`);
};

export default {
  getRoles,
  createRole,
  deleteRole,
  getUserRoles,
  assignRoleToUser,
  removeRoleFromUser
};
