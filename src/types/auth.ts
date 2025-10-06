export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  traceId?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
