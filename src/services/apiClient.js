import axios from 'axios';
import { baseUrl } from '../config';

const apiClient = axios.create({
    baseURL: baseUrl
});

export default apiClient;
