import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { getToken, saveToken, clearToken } from '../services/client';
import type { User, Token } from '../types';
import { authApi } from '../services/api';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshUserData: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        // Try to get current user data
        const userData = await authApi.getCurrentUser();
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (_error) {
      // Token might be invalid, clear it
      await clearToken();
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    const tokenData: Token = await authApi.login(credentials);
    
    // Save token
    await saveToken(tokenData.access_token);

    // Get user data
    const userData = await authApi.getCurrentUser();
    
    setUser(userData);
    setIsLoggedIn(true);
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    await authApi.register(userData);
    
    // Auto-login after registration
    await login({
      username: userData.username,
      password: userData.password,
    });
  };

  const logout = async () => {
    try {
      await clearToken();
      setIsLoggedIn(false);
      setUser(null);
    } catch (_error) {
      // Still clear local state even if API call fails
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const refreshUserData = async () => {
    try {
      if (isLoggedIn) {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}