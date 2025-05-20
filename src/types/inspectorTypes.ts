import { BaseResponse } from './apiTypes';

export interface Inspector {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateInspectorDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateInspectorDto {
  firstName: string;
  lastName: string;
  email: string;
}

export type InspectorResponse = BaseResponse<Inspector>;
export type InspectorsResponse = BaseResponse<Inspector[]>;
