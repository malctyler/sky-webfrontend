import axios from 'axios';
import { baseUrl } from '../config';
import { generatePdfBlob, getPdfFileName } from '../components/Inspection/InspectionCertificateTemplate';
import {
    InspectionItem,
    InspectionFormData,
    InspectionDueDatesResponse,
    ScheduleInspectionRequest,
} from '../types/inspectionTypes';
import { 
    ScheduledInspection,
    CreateUpdateScheduledInspectionDto 
} from '../types/scheduledInspectionTypes';
import apiClient from './apiClient';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to convert frontend ScheduledInspection to backend DTO
const toCreateUpdateDto = (inspection: ScheduledInspection): CreateUpdateScheduledInspectionDto => {
    return {
        holdingID: inspection.holdingID,
        scheduledDate: inspection.scheduledDate,
        location: inspection.location,
        notes: inspection.notes,
        inspectorID: inspection.inspectorID,
        isCompleted: inspection.isCompleted
    };
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

const getInspectionDueDates = async (): Promise<InspectionDueDatesResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get<InspectionDueDatesResponse>(`${baseUrl}/inspectionduedates`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching inspection due dates:', error);
        if (axios.isAxiosError(error)) {
            console.error('Status:', error.response?.status);
            console.error('Response data:', error.response?.data);
        }
        throw new Error(axios.isAxiosError(error) 
            ? `Failed to fetch inspection due dates: ${error.response?.data?.message || error.message}`
            : 'Failed to fetch inspection due dates');
    }
};

const scheduleInspection = async (request: ScheduleInspectionRequest): Promise<void> => {
    if (!request.holdingID) {
        throw new Error('HoldingID is required for scheduling an inspection');
    }

    // Ensure the data is formatted correctly
    const formattedRequest = {
        ...request,
        holdingID: Number(request.holdingID),
        scheduledDate: new Date(request.scheduledDate).toISOString(),
        inspectorID: Number(request.inspectorID),
        force: request.force || false
    };
    
    try {
        const response = await axios.post(`${baseUrl}/scheduledInspection`, formattedRequest, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error scheduling inspection:', error);
        if (axios.isAxiosError(error)) {
            // Handle 409 Conflict with detailed message
            if (error.response?.status === 409) {
                const data = error.response.data;
                throw {
                    isAxiosError: true,
                    response: {
                        status: 409,
                        data: {
                            message: data.message,
                            existingDate: data.existingDate,
                            serialNumber: data.serialNumber
                        }
                    }
                };
            }
            // For other errors, throw with a descriptive message
            const errorMessage = error.response?.data?.message || error.message;
            throw new Error(`Failed to schedule inspection: ${errorMessage}`);
        }
        throw error;
    }
};

const getScheduledInspections = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get<ScheduledInspection[]>(`${baseUrl}/scheduledInspection`, { headers });
    return response.data;
};

const createScheduledInspection = async (inspection: ScheduledInspection) => {
    const headers = getAuthHeaders();
    const dto = toCreateUpdateDto(inspection);
    const response = await axios.post<ScheduledInspection>(`${baseUrl}/scheduledInspection`, dto, { headers });
    return response.data;
};

const updateScheduledInspection = async (id: string, inspection: ScheduledInspection) => {
    const headers = getAuthHeaders();
    const dto = toCreateUpdateDto(inspection);
    const response = await axios.put<ScheduledInspection>(`${baseUrl}/scheduledInspection/${id}`, dto, { headers });
    return response.data;
};

const deleteScheduledInspection = async (id: string) => {
    const headers = getAuthHeaders();
    await axios.delete(`${baseUrl}/scheduledInspection/${id}`, { headers });
};

const inspectionService = {
    getAll,
    getById,
    getByPlantHolding,
    create,
    update,
    remove,
    emailCertificate,
    getInspectionDueDates,
    scheduleInspection,
    getScheduledInspections,
    createScheduledInspection,
    updateScheduledInspection,
    deleteScheduledInspection
};

export default inspectionService;
