import { BaseResponse } from './apiTypes';

export interface Inspector {
  inspectorID: number;
  inspectorsName: string;
  signature?: string;
}

export interface CreateInspectorDto {
  firstName: string;
  lastName: string;
  email: string;
  inspectorsName: string;
  signature?: string;
}

export interface UpdateInspectorDto {
  firstName: string;
  lastName: string;
  email: string;
  inspectorsName?: string;
  signature?: string;
}

export type InspectorResponse = BaseResponse<Inspector> & { message?: string };
export type InspectorsResponse = BaseResponse<Inspector[]> & { message?: string };
