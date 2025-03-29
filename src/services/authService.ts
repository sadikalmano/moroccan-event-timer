
import { registerAPI, loginAPI } from '../utils/db';

export interface UserAuth {
  id: number;
  name: string;
  email: string;
  organization?: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: UserAuth;
  token: string;
}

export async function registerUser(name: string, email: string, password: string, organization?: string): Promise<AuthResponse> {
  try {
    const data = await registerAPI(name, email, password, organization);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const data = await loginAPI(email, password);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function setAuthSession(data: AuthResponse): void {
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
}

export function getAuthSession(): { user: UserAuth | null, token: string | null } {
  try {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr) as UserAuth;
      return { user, token };
    }
  } catch (error) {
    console.error('Error parsing auth session:', error);
    clearAuthSession();
  }
  
  return { user: null, token: null };
}

export function clearAuthSession(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}
