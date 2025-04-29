import axios from 'axios';
import { baseUrl } from '../config';

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/inspectors`);
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/inspectors/${id}`);
    return response.data;
};

const create = async (inspector) => {
    const response = await axios.post(`${baseUrl}/inspectors`, inspector);
    return response.data;
};

const update = async (id, inspector) => {
    const response = await axios.put(`${baseUrl}/inspectors/${id}`, inspector);
    return response.data;
};

const remove = async (id) => {
    await axios.delete(`${baseUrl}/inspectors/${id}`);
};

const inspectorService = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default inspectorService;
