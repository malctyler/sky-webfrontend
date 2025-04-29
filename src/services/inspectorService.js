import axios from 'axios';
import { baseUrl } from '../config';

const getToken = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user).token;
  } catch {
    return null;
  }
};

const getAll = async () => {
  const token = getToken();
  const response = await axios.get(`${baseUrl}/inspectors`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const getById = async (id) => {
  const token = getToken();
  const response = await axios.get(`${baseUrl}/inspectors/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const create = async (inspector) => {
  const token = getToken();
  const response = await axios.post(`${baseUrl}/inspectors`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const update = async (id, inspector) => {
  const token = getToken();
  const response = await axios.put(`${baseUrl}/inspectors/${id}`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const remove = async (id) => {
  const token = getToken();
  await axios.delete(`${baseUrl}/inspectors/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const inspectorService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default inspectorService;
