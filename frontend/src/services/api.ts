import axios, { AxiosError } from 'axios';
import type { EchoRequest, EchoResponse, ApiError } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    console.log(
      `Received ${response.status} response from ${response.config.url}`
    );
    return response;
  },
  (error: AxiosError) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const echoService = {
  async echoMessage(message: string): Promise<EchoResponse> {
    try {
      const request: EchoRequest = { message };
      const response = await apiClient.post<EchoResponse>('/api/echo', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          error: error.response?.data?.error || 'Network Error',
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 0,
          timestamp:
            error.response?.data?.timestamp || new Date().toISOString(),
        };
        throw apiError;
      }
      throw error;
    }
  },

  async checkHealth(): Promise<string> {
    try {
      const response = await apiClient.get<string>('/api/health');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Health check failed: ${error.message}`);
      }
      throw error;
    }
  },
};

export default apiClient;
