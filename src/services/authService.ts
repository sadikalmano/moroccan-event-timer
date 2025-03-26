
import { executeQuery } from '../utils/db';
import bcrypt from 'bcryptjs';
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
  // Check if user already exists
  const existingUser = await executeQuery(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  
  if (Array.isArray(existingUser) && existingUser.length > 0) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Insert new user
  const result = await executeQuery(
    'INSERT INTO users (name, email, password, organization) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, organization || null]
  );
  
  // Get user id from insert result
  const userId = (result as any).insertId;
  
  // Generate token
  const token = jwt.sign({ id: userId, email, name, isAdmin: false }, JWT_SECRET, {
    expiresIn: '7d'
  });
  
  return {
    user: {
      id: userId,
      name,
      email,
      organization,
      isAdmin: false
    },
    token
  };
}

export async function loginUser(email: string, password: string) {
  // Find user
  const users = await executeQuery(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('Invalid email or password');
  }
  
  const user = users[0] as any;
  
  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  
  // Generate token
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      isAdmin: user.is_admin 
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.organization,
      isAdmin: user.is_admin === 1
    },
    token
  };
}

export function verifyToken(token: string): UserAuth {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserAuth;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
