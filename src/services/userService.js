import apiClient from './apiClient';

const getUsers = async () => {
  const res = await apiClient.get('/Users');
  return res.data;
};

const getUser = async (id) => {
  const res = await apiClient.get(`/Users/${id}`);
  return res.data;
};

const createUser = async (userData) => {
  // Convert customerId to number if it exists, null if empty
  const customerId = userData.customerId ? parseInt(userData.customerId) : null;
  
  const registerDto = {
    email: userData.email,
    password: userData.password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    isCustomer: userData.isCustomer,
    customerId: customerId,
    emailConfirmed: userData.emailConfirmed
  };
  
  const res = await apiClient.post('/Users', registerDto);
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
