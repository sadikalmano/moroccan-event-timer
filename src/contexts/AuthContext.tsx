
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth, getAuthSession, clearAuthSession, loginUser, setAuthSession, registerUser } from '../services/authService';
import { useToast } from '../hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

interface AuthContextType {
  user: UserAuth | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get session from localStorage
  const { user: initialUser, token: initialToken } = getAuthSession();
  const [user, setUser] = useState<UserAuth | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string }) => 
      registerUser(userData.name, userData.email, userData.password),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      setAuthSession(data);
      
      toast({
        title: 'Registration successful',
        description: `Welcome, ${data.user.name}!`,
      });
      
      navigate('/dashboard');
    },
    onError: (error: any) => {
      setError(error.message || 'Registration failed');
      toast({
        title: 'Registration failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  });

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await loginUser(email, password);
      
      // Save the user data and token
      setUser(response.user);
      setToken(response.token);
      
      // Store in localStorage
      setAuthSession(response);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${response.user.name}!`,
      });
    } catch (err: any) {
      setError(err.message || 'Login failed');
      toast({
        title: 'Login failed',
        description: err.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    registerMutation.mutate({ name, email, password });
  };

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
        isLoading: isLoading || registerMutation.isPending,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
