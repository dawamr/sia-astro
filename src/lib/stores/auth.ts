import { atom } from 'nanostores';
import type { User, LoginResponse } from '../../types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Initial state (empty, will be hydrated on client)
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authStore = atom<AuthState>(initialState);

// Load state from localStorage (client-side only)
export const initializeAuth = () => {
  if (typeof window === 'undefined') return;

  try {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (user && accessToken) {
      authStore.set({
        user: JSON.parse(user),
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  } catch (error) {
    console.error('Failed to load auth state:', error);
  }
};

// Actions
export const authActions = {
  login: (loginData: LoginResponse) => {
    const user: User = {
      userId: loginData.userId,
      email: loginData.email,
      firstName: loginData.firstName,
      lastName: loginData.lastName,
      roles: loginData.roles,
    };

    const newState: AuthState = {
      user,
      accessToken: loginData.accessToken,
      refreshToken: loginData.refreshToken,
      isAuthenticated: true,
    };

    authStore.set(newState);

    // Persist to localStorage and cookies
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', loginData.accessToken);
      localStorage.setItem('refreshToken', loginData.refreshToken);
      
      // Set cookies for server-side auth check
      document.cookie = `accessToken=${loginData.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=604800; SameSite=Lax`;
    }
  },

  logout: () => {
    authStore.set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    // Clear localStorage and cookies
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Clear cookies
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  updateUser: (user: User) => {
    const currentState = authStore.get();
    authStore.set({
      ...currentState,
      user,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
};
