
import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import { 
  getAllEvents, 
  getUserEvents, 
  createEvent, 
  findEventById,
  findEventBySlug,
  updateEventStatus,
  subscribeToEvent
} from '../../utils/jsonDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Custom request type that includes body
interface ExtendedRequest extends IncomingMessage {
  body: any;
  user?: {
    userId: string;
    role: string;
  };
}

// Middleware to check if user is authenticated
const authenticateToken = (req: ExtendedRequest, res: ServerResponse): boolean => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Authentication required' }));
    return false;
  }
  
  try {
    const user = jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
    req.user = user;
    return true;
  } catch (err) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid or expired token' }));
    return false;
  }
};

// Handle events routes
export const handleEventRoutes = async (req: ExtendedRequest, res: ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname.replace('/api/events', '');
  const query = Object.fromEntries(url.searchParams.entries());
  
  // Get all events (with optional filters)
  if (path === '/' && req.method === 'GET') {
    const events = getAllEvents(query);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ events }));
    return;
  }
  
  // Get event by slug
  if (path.startsWith('/slug/') && req.method === 'GET') {
    const slug = path.replace('/slug/', '');
    const event = findEventBySlug(slug);
    
    if (!event) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Event not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ event }));
    return;
  }
  
  // Get user's events (requires authentication)
  if (path === '/user' && req.method === 'GET') {
    if (!authenticateToken(req, res)) {
      return;
    }
    
    const events = getUserEvents(req.user!.userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ events }));
    return;
  }
  
  // Get pending events (admin only)
  if (path === '/pending' && req.method === 'GET') {
    if (!authenticateToken(req, res)) {
      return;
    }
    
    if (req.user!.role !== 'admin') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Admin access required' }));
      return;
    }
    
    const events = getAllEvents();
    const pendingEvents = events.filter(e => e.status === 'pending');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ events: pendingEvents }));
    return;
  }
  
  // Approve or reject an event (admin only)
  if (path.match(/^\/[^\/]+\/status$/) && req.method === 'PATCH') {
    if (!authenticateToken(req, res)) {
      return;
    }
    
    if (req.user!.role !== 'admin') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Admin access required' }));
      return;
    }
    
    try {
      const id = path.split('/')[1];
      const { status } = req.body;
      
      if (status !== 'approved' && status !== 'rejected') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Status must be either approved or rejected' }));
        return;
      }
      
      const event = updateEventStatus(id, status);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ event }));
    } catch (error: any) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }
  
  // Create a new event (requires authentication)
  if (path === '/' && req.method === 'POST') {
    if (!authenticateToken(req, res)) {
      return;
    }
    
    try {
      const eventData = req.body;
      const newEvent = createEvent(eventData, req.user!.userId);
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ event: newEvent }));
    } catch (error: any) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }
  
  // Subscribe to an event
  if (path.match(/^\/[^\/]+\/subscribe$/) && req.method === 'POST') {
    try {
      const id = path.split('/')[1];
      const subscriberData = req.body;
      
      if (!subscriberData.name || !subscriberData.whatsapp) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Name and WhatsApp number are required' }));
        return;
      }
      
      const event = subscribeToEvent(id, subscriberData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ event }));
    } catch (error: any) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
    return;
  }
  
  // Route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
};
