import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface User {
    token: string;
    [key: string]: any; // Allow for additional user properties
}

export type ApiClientConfig = InternalAxiosRequestConfig;

export type ApiClientError = AxiosError;

export type ApiResponse<T = any> = AxiosResponse<T>;

export interface BaseResponse<T = any> {
    data: T;
    success: boolean;
    message?: string;
}
