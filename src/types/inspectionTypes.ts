interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface InspectionFormData {
    holdingID: number;
    inspectionDate: Date | null;
    location?: string;
    recentCheck?: string;
    previousCheck?: string;
    safeWorking?: string;
    defects?: string;
    rectified?: string;
    latestDate: Date | null;
    testDetails?: string;
    miscNotes?: string;
    inspectorID: number | null;
}

export interface InspectionItem {
    uniqueRef: number;
    holdingID?: number;
    inspectionDate?: string;
    location?: string;
    inspectorID?: number;
    inspectorName?: string;
    inspectorSignature?: string;
    status?: 'Pending' | 'Completed' | 'Failed';
    emailSent?: boolean;
    emailSentDate?: string;

    // Additional fields for certificate
    recentCheck?: string;
    previousCheck?: string;
    safeWorking?: string;
    defects?: string;
    rectified?: string;
    latestDate?: string;
    testDetails?: string;
    plantDescription?: string;
    categoryDescription?: string;
    serialNumber?: string;
    miscNotes?: string;
    
    // Customer details
    custID?: number;
    companyName?: string;
    contactTitle?: string;
    contactFirstNames?: string;
    contactSurname?: string;
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    postcode?: string;
    telephone?: string;
    email?: string;
}

export interface CreateInspectionDto {
    holdingID: number;
    inspectionDate: string;
    location?: string;
    recentCheck?: string;
    previousCheck?: string;
    safeWorking?: string;
    defects?: string;
    rectified?: string;
    latestDate: string;
    testDetails?: string;
    miscNotes?: string;
    inspectorID: number | null;
}

export interface UpdateInspectionDto extends Partial<CreateInspectionDto> {
    holdingID: number;  // These fields are always required in updates
    inspectionDate: string;
    latestDate: string;
}

export interface InspectionCertificate {
    uniqueRef: number;
    holdingID?: number;
    inspectionDate?: string;
    location?: string;
    recentCheck?: string;
    previousCheck?: string;
    safeWorking?: string;
    defects?: string;
    rectified?: string;
    latestDate?: string;
    testDetails?: string;
    miscNotes?: string;
    
    // Plant details
    plantDescription?: string;
    categoryDescription?: string;
    serialNumber?: string;
    
    // Inspector details
    inspectorID?: number;
    inspectorsName?: string;
    
    // Customer details
    custID?: number;
    companyName?: string;
    contactTitle?: string;
    contactFirstNames?: string;
    contactSurname?: string;
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    postcode?: string;
    telephone?: string;
    email?: string;
}

// API Response types
export type InspectionsResponse = ApiResponse<InspectionItem[]>;
export type InspectionResponse = ApiResponse<InspectionItem>;
export type CreateInspectionResponse = ApiResponse<InspectionItem>;
export type UpdateInspectionResponse = ApiResponse<InspectionItem>;
export type DeleteInspectionResponse = ApiResponse<void>;
export type EmailCertificateResponse = ApiResponse<boolean>;
