import axios from 'axios';
import { generatePdfBlob, getPdfFileName } from '../components/InspectionCertificateTemplate';

const baseUrl = process.env.VITE_API_URL || 'http://localhost:5207/api';

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/inspection`);
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/inspection/${id}`);
    return response.data;
};

const getByPlantHolding = async (holdingId) => {
    const response = await axios.get(`${baseUrl}/inspection/plantholding/${holdingId}`);
    return response.data;
};

const create = async (inspection) => {
    const response = await axios.post(`${baseUrl}/inspection`, inspection);
    return response.data;
};

const update = async (id, inspection) => {
    const response = await axios.put(`${baseUrl}/inspection/${id}`, inspection);
    return response.data;
};

const remove = async (id) => {
    await axios.delete(`${baseUrl}/inspection/${id}`);
};

const emailCertificate = async (id) => {
    try {
        const inspection = await getById(id);
        const pdfBlob = await generatePdfBlob(inspection);
        const filename = getPdfFileName(inspection);

        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);

        await axios.post(`${baseUrl}/inspection/${id}/email`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return true;
    } catch (error) {
        console.error('Error sending certificate:', error);
        throw error;
    }
};

const inspectionService = {
    getAll,
    getById,
    getByPlantHolding,
    create,
    update,
    remove,
    emailCertificate
};

export default inspectionService;