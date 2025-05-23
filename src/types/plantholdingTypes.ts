export interface PlantHolding {
  holdingID: number;
  custID?: number;
  plantNameID?: number;
  plantDescription?: string;
  serialNumber?: string;
  statusID?: number;
  statusDescription?: string;
  swl?: string;
  inspectionFrequency?: string;
  inspectionFee?: number;
}

export interface NewPlantHolding {
  custID: number | null;
  plantNameID: number | null;
  serialNumber: string;
  statusID: number | null;
  swl: string;
}

export interface NewPlantHoldingForm {
  custID: number | null;
  plantNameID: string; // String for form handling
  serialNumber: string;
  statusID: string; // String for form handling
  swl: string;
}

export interface Plant {
  plantNameID: number;
  plantDescription: string;
}

export interface Status {
  statusID: number;
  statusDescription: string;
  id?: number; // Backend sometimes returns id instead of statusID
  description?: string; // Backend sometimes returns description instead of statusDescription
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}
