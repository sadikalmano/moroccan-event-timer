
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth, getAuthSession, clearAuthSession } from '../services/authService';
import { useToast } from '../hooks/use-toast';

interface AuthContextType {
  user: UserAuth | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get session from localStorage
  const { user: initialUser, token: initialToken } = getAuthSession();
  const [user, setUser] = useState<UserAuth | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);

  useEffect(() => {
    // Once we've checked for the session, set loading to false
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    clearAuthSession();
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
