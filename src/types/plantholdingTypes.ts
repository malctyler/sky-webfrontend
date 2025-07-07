export interface PlantHolding {
  holdingID: number;
  custID?: number;
  plantNameID?: number;
  plantDescription?: string;
  serialNumber?: string;
  statusID?: number;
  statusDescription?: string;
  swl?: string;
  inspectionFrequency?: number;
  inspectionFee?: number;
}

export interface NewPlantHolding {
  custID: number | null;
  plantNameID: number | null;
  serialNumber: string;
  statusID: number | null;
  swl: string;
  inspectionFrequency: number;
  inspectionFee: number;
}

export interface NewPlantHoldingForm {
  custID: number | null;
  plantNameID: string; // String for form handling
  serialNumber: string;
  statusID: string; // String for form handling
  swl: string;
  inspectionFrequency: string; // String for form handling
  inspectionFee: string; // String for form handling
}

export interface Plant {
  plantNameID: number;
  plantDescription: string;
  plantCategory?: number;
}

export interface PlantCategory {
  categoryID: number;
  categoryDescription: string;
  multiInspect: boolean;
}

export interface Status {
  statusID: number;
  id?: number;
  statusDescription: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}
