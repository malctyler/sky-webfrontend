export interface InvoiceLineItemDto {
    inspectionId: string;
    inspectionDate: string;
    location: string;
    plantDescription: string;
    serialNumber: string;
    inspectionFee: number;
}

export interface CustomerInvoiceDto {
    customerId: number;
    customerName: string;
    address: string;
    city: string;
    postCode: string;
    startDate: string;
    endDate: string;
    lineItems: InvoiceLineItemDto[];
    totalAmount: number;
}
