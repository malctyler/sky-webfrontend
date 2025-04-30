import apiClient from './apiClient';

const getUsers = async () => {
  const res = await apiClient.get('/Users');
  return res.data;
};

const getUser = async (id) => {
  const res = await apiClient.get(`/Users/${id}`);
  return res.data;
};

const createUser = async (user) => {
  const res = await apiClient.post('/Users', user);
  return res.data;
};

const updateUser = async (id, user) => {
  await apiClient.put(`/Users/${id}`, user);
};

const deleteUser = async (id) => {
  await apiClient.delete(`/Users/${id}`);
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
