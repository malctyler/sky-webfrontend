export interface InspectionItem {
    uniqueRef: number;
    holdingID?: number;
    inspectionDate?: Date;
    location?: string;
    recentCheck?: string;
    previousCheck?: string;
    safeWorking?: string;
    defects?: string;
    rectified?: string;
    latestDate?: Date;
    testDetails?: string;
    miscNotes?: string;
    plantDescription?: string;
    categoryDescription?: string;
    serialNumber?: string;
    inspectorID?: number;
    inspectorsName?: string;
    // Customer fields
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