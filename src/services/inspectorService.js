import axios from 'axios';
import { baseUrl } from '../config';

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/inspector`);
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/inspector/${id}`);
    return response.data;
};

const create = async (inspector) => {
    const response = await axios.post(`${baseUrl}/inspector`, inspector);
    return response.data;
};

const update = async (id, inspector) => {
    const response = await axios.put(`${baseUrl}/inspector/${id}`, inspector);
    return response.data;
};

const remove = async (id) => {
    await axios.delete(`${baseUrl}/inspector/${id}`);
};

const inspectorService = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default inspectorService;
