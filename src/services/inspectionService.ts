import axios from 'axios';
import { baseUrl } from '../config';
import { generatePdfBlob, getPdfFileName } from '../components/Inspection/InspectionCertificateTemplate';
import {
    InspectionItem,
    InspectionFormData
} from '../types/inspectionTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const createDto = (inspection: InspectionFormData) => {
    // Ensure we return the exact shape the backend expects
    return {
        holdingID: inspection.holdingID,
        inspectionDate: inspection.inspectionDate ? inspection.inspectionDate.toISOString() : null,
        latestDate: inspection.latestDate ? inspection.latestDate.toISOString() : null,
        location: inspection.location || null,
        recentCheck: inspection.recentCheck || null,
        previousCheck: inspection.previousCheck || null,
        safeWorking: inspection.safeWorking || null,
        defects: inspection.defects || null,
        rectified: inspection.rectified || null,
        testDetails: inspection.testDetails || null,
        miscNotes: inspection.miscNotes || null,
        inspectorID: inspection.inspectorID
    };
};

const getAll = async (): Promise<InspectionItem[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<InspectionItem[]>(`${baseUrl}/Inspection`, { headers });
    return response.data;
};

const getById = async (id: string | number): Promise<InspectionItem> => {
    const headers = getAuthHeaders();
    const response = await axios.get<InspectionItem>(`${baseUrl}/Inspection/${id}`, { headers });
    return response.data;
};

const getByPlantHolding = async (holdingId: string | number): Promise<InspectionItem[]> => {
    const headers = getAuthHeaders();
    const response = await axios.get<InspectionItem[]>(`${baseUrl}/Inspection/plantholding/${holdingId}`, { headers });
    return response.data;
};

const create = async (inspection: InspectionFormData): Promise<InspectionItem> => {
    const headers = getAuthHeaders();
    const dto = createDto(inspection);
    console.log('Sending inspection DTO to server:', dto);
    try {
        const response = await axios.post<InspectionItem>(`${baseUrl}/Inspection`, dto, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server response:', error.response.data);
        }
        throw error;
    }
};

const update = async (uniqueRef: string | number, inspection: InspectionFormData): Promise<InspectionItem> => {
    const headers = getAuthHeaders();
    const dto = createDto(inspection);
    console.log('Sending inspection DTO to server:', dto);
    try {
        const response = await axios.put<InspectionItem>(`${baseUrl}/Inspection/${uniqueRef}`, dto, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server response:', error.response.data);
        }
        throw error;
    }
};

const remove = async (id: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Inspection/${id}`, { headers });
};

const emailCertificate = async (id: string | number): Promise<boolean> => {
    try {
        const inspection = await getById(id);
        const pdfBlob = await generatePdfBlob(inspection);
        const filename = getPdfFileName(inspection);
        
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
        
        const headers = {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data'
        };

        await axios.post(`${baseUrl}/Inspection/${id}/email`, formData, { headers });
        return true;
    } catch (error) {
        console.error('Error sending certificate:', error);
        return false;
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
