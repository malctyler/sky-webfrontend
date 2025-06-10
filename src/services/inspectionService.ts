import { format, startOfDay } from 'date-fns';
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

// Helper function to convert a date to ISO string while preserving the local date
const toISODateString = (date: Date | null): string | null => {
    if (!date) return null;
    const d = startOfDay(date);
    return format(d, 'yyyy-MM-dd');
};

// Helper function to convert frontend ScheduledInspection to backend DTO
const toCreateUpdateDto = (inspection: ScheduledInspection): CreateUpdateScheduledInspectionDto => {
    // Always ensure we have a valid date by using the current date as fallback
    const date = inspection.scheduledDate ? new Date(inspection.scheduledDate) : new Date();
    return {
        holdingID: inspection.holdingID,
        scheduledDate: toISODateString(date) || date.toISOString().split('T')[0],
        location: inspection.location,
        notes: inspection.notes,
        inspectorID: inspection.inspectorID,
        isCompleted: inspection.isCompleted
    };
};

const createDto = (inspection: InspectionFormData) => {
    // Convert dates to ISO date strings while preserving the local date
    const inspectionDate = toISODateString(inspection.inspectionDate);
    const latestDate = toISODateString(inspection.latestDate);

    // Ensure we return the exact shape the backend expects
    return {
        holdingID: inspection.holdingID,
        inspectionDate,
        latestDate,
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
    const response = await apiClient.get<InspectionItem[]>(`Inspection`);
    return response.data;
};

const getById = async (id: string | number): Promise<InspectionItem> => {
    const response = await apiClient.get<InspectionItem>(`Inspection/${id}`);
    return response.data;
};

const getByPlantHolding = async (holdingId: string | number): Promise<InspectionItem[]> => {
    const response = await apiClient.get<InspectionItem[]>(`Inspection/plantholding/${holdingId}`);
    return response.data;
};

const create = async (inspection: InspectionFormData): Promise<InspectionItem> => {
    const dto = createDto(inspection);
    console.log('Sending inspection DTO to server:', dto);
    try {
        const response = await apiClient.post<InspectionItem>('Inspection', dto);
        return response.data;
    } catch (error) {
        console.error('Server response:', error);
        throw error;
    }
};

const update = async (uniqueRef: string | number, inspection: InspectionFormData): Promise<InspectionItem> => {
    const dto = createDto(inspection);
    console.log('Sending inspection DTO to server:', dto);
    try {
        const response = await apiClient.put<InspectionItem>(`Inspection/${uniqueRef}`, dto);
        return response.data;
    } catch (error) {
        console.error('Server response:', error);
        throw error;
    }
};

const remove = async (id: string | number): Promise<void> => {
    await apiClient.delete(`Inspection/${id}`);
};

const emailCertificate = async (id: string | number): Promise<boolean> => {
    try {
        const inspection = await getById(id);
        const pdfBlob = await generatePdfBlob(inspection);
        const filename = getPdfFileName(inspection);
        
        const formData = new FormData();
        formData.append('pdf', pdfBlob, filename);
        
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        await apiClient.post(`Inspection/${id}/email`, formData, { headers });
        return true;
    } catch (error) {
        console.error('Error sending certificate:', error);
        return false;
    }
};

const getInspectionDueDates = async (): Promise<InspectionDueDatesResponse> => {
    try {
        const response = await apiClient.get<InspectionDueDatesResponse>('inspectionduedates');
        console.log('Raw inspection due dates response:', response.data);
        const inspectionsWithPostcodes = response.data.map(inspection => {
            console.log(`Inspection for ${inspection.companyName}:`, inspection);
            return inspection;
        });
        return inspectionsWithPostcodes;
    } catch (error) {
        console.error('Error fetching inspection due dates:', error);
        throw new Error('Failed to fetch inspection due dates');
    }
};

const scheduleInspection = async (request: ScheduleInspectionRequest): Promise<void> => {
    if (!request.holdingID) {
        throw new Error('HoldingID is required for scheduling an inspection');
    }

    // Convert the scheduled date using our safe conversion method
    const scheduledDate = request.scheduledDate ? 
        toISODateString(new Date(request.scheduledDate)) :
        toISODateString(new Date());

    // Ensure the data is formatted correctly
    const formattedRequest = {
        ...request,
        holdingID: Number(request.holdingID),
        scheduledDate,
        inspectorID: Number(request.inspectorID),
        force: request.force || false
    };
    
    try {
        const response = await apiClient.post('scheduledInspection', formattedRequest);
        return response.data;
    } catch (error) {
        console.error('Schedule inspection error:', error);
        throw error;
    }
};

const getScheduledInspections = async () => {
    const response = await apiClient.get<ScheduledInspection[]>('scheduledInspection');
    return response.data;
};

const createScheduledInspection = async (inspection: ScheduledInspection) => {
    const dto = toCreateUpdateDto(inspection);
    const response = await apiClient.post<ScheduledInspection>('scheduledInspection', dto);
    return response.data;
};

const updateScheduledInspection = async (id: string, inspection: ScheduledInspection) => {
    const dto = toCreateUpdateDto(inspection);
    const response = await apiClient.put<ScheduledInspection>(`scheduledInspection/${id}`, dto);
    return response.data;
};

const deleteScheduledInspection = async (id: string) => {
    await apiClient.delete(`scheduledInspection/${id}`);
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
