export interface Plant {
  plantNameID: number;
  plantDescription: string;
  plantCategory: number;
  normalPrice: number;
}

export interface PlantCategory {
  categoryID: number;
  categoryDescription: string;
}

export interface PlantFormData {
  plantDescription: string;
  plantCategory: string;
  normalPrice: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}
