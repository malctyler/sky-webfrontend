import axios from 'axios';
import { baseUrl } from '../config';
import { CreateInspectorDto, Inspector, InspectorResponse, InspectorsResponse, UpdateInspectorDto } from '../types/inspectorTypes';

const getToken = (): string | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user).token;
  } catch {
    return null;
  }
};

const getAll = async (): Promise<Inspector[]> => {
  const token = getToken();
  const response = await axios.get<InspectorsResponse>(`${baseUrl}/inspectors`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const getById = async (id: number): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.get<InspectorResponse>(`${baseUrl}/inspectors/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const create = async (inspector: CreateInspectorDto): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.post<InspectorResponse>(`${baseUrl}/inspectors`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const update = async (id: number, inspector: UpdateInspectorDto): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.put<InspectorResponse>(`${baseUrl}/inspectors/${id}`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const remove = async (id: number): Promise<void> => {
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
