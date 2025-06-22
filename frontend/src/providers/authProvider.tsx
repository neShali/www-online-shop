/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, type ReactNode } from 'react';
import { getToken, saveToken, clearToken } from '../shared/api/auth';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(!!getToken());

  const login = (token: string) => {
    saveToken(token);
    setLoggedIn(true);
  };
  const logout = () => {
    clearToken();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
