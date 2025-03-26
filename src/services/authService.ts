
import { loginAPI, registerAPI } from '../utils/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'morocco-events-secret-key';

export interface UserAuth {
  id: number;
  name: string;
  email: string;
  organization?: string;
  isAdmin: boolean;
}

export async function registerUser(name: string, email: string, password: string, organization?: string) {
  try {
    const data = await registerAPI(name, email, password, organization);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const data = await loginAPI(email, password);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function verifyToken(token: string): UserAuth {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserAuth;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
