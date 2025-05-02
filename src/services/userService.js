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
    emailConfirmed: userData.emailConfirmed // Include emailConfirmed in the creation request
  };
  
  const res = await apiClient.post('/Users', registerDto);
  
  // After creating the user, add the IsCustomer claim
  if (res.data && res.data.id) {
    await apiClient.post(`/Claims/${res.data.id}/claims`, {
      type: "IsCustomer",
      value: userData.isCustomer.toString()
    });
  }
  
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
