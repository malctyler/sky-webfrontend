import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export interface LedgerFilters {
    startDate?: string;
    endDate?: string;
    customerName?: string;
}

export interface LedgerDto {
    id: number;
    invoiceDate: string;
    customerName: string;
    invoiceRef: string;
    subTotal: number;
    vat: number;
    total: number;
    settled: boolean;
}

export interface CreateUpdateLedgerDto {
    invoiceDate: string;
    customerName: string;
    invoiceRef: string;
    subTotal: number;
    vat: number;
    total: number;
    settled: boolean;
}

class LedgerService {
    async getLedgerEntries(filters?: LedgerFilters): Promise<LedgerDto[]> {
        const params = new URLSearchParams();
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.customerName) params.append('customerName', filters.customerName);

        const response: AxiosResponse<LedgerDto[]> = await apiClient.get('/ledger', { params });
        return response.data;
    }

    async getLedgerEntry(id: number): Promise<LedgerDto> {
        const response: AxiosResponse<LedgerDto> = await apiClient.get(`/ledger/${id}`);
        return response.data;
    }

    async createLedgerEntry(entry: CreateUpdateLedgerDto): Promise<LedgerDto> {
        const response: AxiosResponse<LedgerDto> = await apiClient.post('/ledger', entry);
        return response.data;
    }

    async updateLedgerEntry(id: number, entry: CreateUpdateLedgerDto): Promise<LedgerDto> {
        const response: AxiosResponse<LedgerDto> = await apiClient.put(`/ledger/${id}`, entry);
        return response.data;
    }

    async deleteLedgerEntry(id: number): Promise<void> {
        await apiClient.delete(`/ledger/${id}`);
    }

    async settleLedgerEntry(id: number): Promise<LedgerDto> {
        const response: AxiosResponse<LedgerDto> = await apiClient.put(`/ledger/${id}/settle`);
        return response.data;
    }

    async unsettleLedgerEntry(id: number): Promise<LedgerDto> {
        const response: AxiosResponse<LedgerDto> = await apiClient.put(`/ledger/${id}/unsettle`);
        return response.data;
    }
}

export default new LedgerService();
