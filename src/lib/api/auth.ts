import { apiClient } from './client';
import type { LoginResponse, ApiResponse } from '../../types/auth';
import type { LoginInput } from '../validators/auth';

export const authApi = {
  login: async (credentials: LoginInput): Promise<ApiResponse<LoginResponse>> => {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.error || {
          code: 'REQUEST_FAILED',
          message: data.error?.message || 'Login failed',
        },
      };
    }

    return data;
  },

  register: async (data: { email: string; password: string; name: string; phone?: string }) => {
    return apiClient.post('/auth/register', data);
  },

  logout: async (token: string) => {
    return apiClient.post('/auth/logout', {}, token);
  },

  refreshToken: async (refreshToken: string) => {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  getCurrentUser: async (token: string) => {
    return apiClient.get('/auth/me', token);
  },
};
