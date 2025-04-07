
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getAllEvents, findEventById, findEventBySlug, getUserEvents, createEvent, updateEventStatus, subscribeToEvent } from '../../utils/jsonDb';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = decoded;
    next();
  });
};

// Get all events with optional filters
router.get('/', (req: Request, res: Response) => {
  try {
    const events = getAllEvents(req.query);
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const event = findEventById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by slug
router.get('/slug/:slug', (req: Request, res: Response) => {
  try {
    const event = findEventBySlug(req.params.slug);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get events for authenticated user
router.get('/user/events', authenticateToken, (req: Request, res: Response) => {
  try {
    const events = getUserEvents(req.user!.userId);
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event
router.post('/', authenticateToken, (req: Request, res: Response) => {
  try {
    const event = createEvent(req.body, req.user!.userId);
    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update event status (admin only)
router.patch('/:id/status', authenticateToken, (req: Request, res: Response) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update event status' });
    }
    
    const { status } = req.body;
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Status must be either "approved" or "rejected"' });
    }
    
    const event = updateEventStatus(req.params.id, status);
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribe to an event
router.post('/:id/subscribe', (req: Request, res: Response) => {
  try {
    const { name, whatsapp } = req.body;
    
    if (!name || !whatsapp) {
      return res.status(400).json({ message: 'Name and WhatsApp number are required' });
    }
    
    const event = subscribeToEvent(req.params.id, { name, whatsapp });
    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
