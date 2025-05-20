export interface Note {
  noteID: number;
  custID: number;
  date: string;
  notes: string;
}

export interface Customer {
  id: number;
  companyName: string;
  // Add other customer fields as needed
}
