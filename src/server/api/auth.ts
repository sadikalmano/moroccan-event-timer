
import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import { createUser, verifyUser } from '../../utils/jsonDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Custom request type that includes body
interface ExtendedRequest extends IncomingMessage {
  body: any;
  user?: {
    userId: string;
    role: string;
  };
}

// Handle auth routes
export const handleAuthRoutes = async (req: ExtendedRequest, res: ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname.replace('/api/auth', '');
  
  // Register a new user
  if (path === '/register' && req.method === 'POST') {
    try {
      const { name, email, password, organization } = req.body;
      
      if (!name || !email || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Name, email and password are required' }));
        return;
      }
      
      const user = await createUser(name, email, password, organization);
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token, user }));
    } catch (error: any) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }
  
  // Login an existing user
  if (path === '/login' && req.method === 'POST') {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Email and password are required' }));
        return;
      }
      
      const user = await verifyUser(email, password);
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token, user }));
    } catch (error: any) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }
  
  // Route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
};
