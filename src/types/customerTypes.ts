export interface Customer {
  custID: number;
  companyName: string;
  contactTitle?: string;
  contactFirstNames?: string;
  contactSurname?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  postcode?: string;
  telephone?: string;
  fax?: string;
  email?: string;
}

export interface CustomerFormData {
  companyName: string;
  contactTitle: string;
  contactFirstNames: string;
  contactSurname: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postcode: string;
  telephone: string;
  fax: string;
  email: string;
}

export interface Note {
  noteID: number;
  custID: number;
  date: string;
  notes: string;
}

export interface CustomerNotes {
  [custID: number]: number;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}
