import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi } from '../services/api';
import { getToken } from '../services/client';
import type { User, LoginCredentials, RegisterData } from '../types';
import { useAuth } from '../providers/authProvider';

// Query key factories
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  me: () => [...authKeys.user(), 'me'] as const,
};

// Re-export API functions for backward compatibility
export const login = authApi.login;
export const registerUser = authApi.register;
export const getCurrentUser = authApi.getCurrentUser;
export const refreshToken = authApi.refreshToken;

// Hooks that use AuthProvider
export function useLogin(): UseMutationResult<void, Error, LoginCredentials> {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('Login successful');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

export function useRegisterUser(): UseMutationResult<void, Error, RegisterData> {
  const { register } = useAuth();
  
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log('Registration successful');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
}

export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}

export function useLogout() {
  const { logout } = useAuth();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log('Logout successful');
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
}

// Utility hooks
export function useIsAuthenticated(): boolean {
  const { isLoggedIn } = useAuth();
  return isLoggedIn;
}

export function useAuthToken(): Promise<string | null> {
  return getToken();
}