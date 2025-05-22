// Direct axios import instead of using apiClient
import axios from 'axios';
import { baseUrl } from '../config';
import { generatePdfBlob, getPdfFileName } from '../components/InspectionCertificateTemplate';
import {
    InspectionItem,
    CreateInspectionDto,
    UpdateInspectionDto,
    InspectionFormData
} from '../types/inspectionTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString();
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
    const inspectionDto: CreateInspectionDto = {
        ...inspection,
        inspectionDate: formatDate(inspection.inspectionDate),
        latestDate: formatDate(inspection.latestDate),
        holdingID: Number(inspection.holdingID)
    };
    const response = await axios.post<InspectionItem>(`${baseUrl}/Inspection`, inspectionDto, { headers });
    return response.data;
};

const update = async (uniqueRef: string | number, inspection: InspectionFormData): Promise<InspectionItem> => {
    const headers = getAuthHeaders();
    const inspectionDto: UpdateInspectionDto = {
        ...inspection,
        inspectionDate: formatDate(inspection.inspectionDate),
        latestDate: formatDate(inspection.latestDate),
        holdingID: Number(inspection.holdingID)
    };
    const response = await axios.put<InspectionItem>(`${baseUrl}/Inspection/${uniqueRef}`, inspectionDto, { headers });
    return response.data;
};

const remove = async (id: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/Inspection/${id}`, { headers });
};

const emailCertificate = async (id: string | number): Promise<boolean> => {
    try {
        const inspection = await getById(id);
        const pdfBlob = await generatePdfBlob(inspection as any); // TODO: Fix type mismatch between InspectionItem and InspectionCertificate
        const filename = getPdfFileName(inspection as any);

        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
        
        const headers = {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data'
        };

        await axios.post(`${baseUrl}/inspection/${id}/email`, formData, { headers });
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
