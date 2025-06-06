export interface ScheduledInspection {
    id: number;
    holdingID: number;
    scheduledDate: string;
    location?: string;
    notes?: string;
    inspectorID?: number;
    isCompleted: boolean;
    plantDescription?: string;
    serialNumber?: string;
    customerCompanyName?: string;
    customerContactName?: string;
    inspectorName?: string;
}

export interface CreateUpdateScheduledInspectionDto {
    holdingID: number;
    scheduledDate: string;
    location?: string;
    notes?: string;
    inspectorID?: number;
    isCompleted: boolean;
    force?: boolean;
}
