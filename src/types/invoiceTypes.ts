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
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    postCode: string;
    invoiceReference: string;
    startDate: string;
    endDate: string;
    lineItems: InvoiceLineItemDto[];
    totalAmount: number;
}
