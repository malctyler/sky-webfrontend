import { ApiResponse } from './apiTypes';

export interface Inspector {
    id: string;
    name: string;
    signature?: string;
}

export interface InspectionItem {
    id: string;
    plantHoldingId: string;
    inspectionDate: string;
    inspectedBy: string;
    inspectorName?: string;
    inspectorSignature?: string;
    result: string;
    notes?: string;
    status: 'Pending' | 'Completed' | 'Failed';
    emailSent?: boolean;
    emailSentDate?: string;
}

export interface CreateInspectionDto {
    plantHoldingId: string;
    inspectionDate: string;
    inspectedBy: string;
    result: string;
    notes?: string;
    status: 'Pending' | 'Completed' | 'Failed';
}

export interface UpdateInspectionDto {
    inspectionDate?: string;
    inspectedBy?: string;
    result?: string;
    notes?: string;
    status?: 'Pending' | 'Completed' | 'Failed';
}

// API Response types
export type InspectionsResponse = ApiResponse<InspectionItem[]>;
export type InspectionResponse = ApiResponse<InspectionItem>;
export type CreateInspectionResponse = ApiResponse<InspectionItem>;
export type UpdateInspectionResponse = ApiResponse<InspectionItem>;
export type DeleteInspectionResponse = ApiResponse<void>;
export type EmailCertificateResponse = ApiResponse<boolean>;
