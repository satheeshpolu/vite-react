import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '@/app/config';

const createHttpClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const httpClient = createHttpClient();

// Type-safe request methods
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => httpClient.get<T, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.post<T, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.put<T, T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.patch<T, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => httpClient.delete<T, T>(url, config),
};
