export interface PlantHolding {
  holdingID: number;
  plantDescription: string;
  serialNumber: string;
  statusDescription: string;
  swl: string;
}

export interface NewPlantHolding {
  custID: number | null;
  plantNameID: string;
  serialNumber: string;
  statusID: string;
  swl: string;
}

export interface Plant {
  plantNameID: number;
  plantDescription: string;
}

export interface Status {
  statusID: number;
  statusDescription: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}
