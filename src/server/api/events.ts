
import express, { Request, Response, NextFunction } from 'express';
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

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to check if user is authenticated
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
};

// Get all events (with optional filters)
router.get('/', (req: Request, res: Response) => {
  const filters = req.query;
  const events = getAllEvents(filters);
  
  return res.json({ events });
});

// Get event by slug
router.get('/slug/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const event = findEventBySlug(slug);
  
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  return res.json({ event });
});

// Get user's events (requires authentication)
router.get('/user', authenticateToken, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const events = getUserEvents(req.user.userId);
  return res.json({ events });
});

// Get pending events (admin only)
router.get('/pending', authenticateToken, (req: Request, res: Response) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  const { events } = getAllEvents();
  const pendingEvents = events.filter((e: any) => e.status === 'pending');
  return res.json({ events: pendingEvents });
});

// Approve or reject an event (admin only)
router.patch('/:id/status', authenticateToken, (req: Request, res: Response) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Status must be either approved or rejected' });
    }
    
    const event = updateEventStatus(id, status);
    return res.json({ event });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Create a new event (requires authentication)
router.post('/', authenticateToken, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const eventData = req.body;
    const newEvent = createEvent(eventData, req.user.userId);
    
    return res.status(201).json({ event: newEvent });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Subscribe to an event
router.post('/:id/subscribe', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscriberData = req.body;
    
    if (!subscriberData.name || !subscriberData.whatsapp) {
      return res.status(400).json({ message: 'Name and WhatsApp number are required' });
    }
    
    const event = subscribeToEvent(id, subscriberData);
    return res.json({ event });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
