
import { executeQuery } from '../utils/db';
import { Event } from '../types';

export async function getEvents(filters?: {
  search?: string, 
  city?: string, 
  category?: string, 
  sortBy?: 'newest' | 'closest' | 'popular'
}) {
  let query = `
    SELECT e.*, u.name as organizer_name
    FROM events e
    JOIN users u ON e.user_id = u.id
    WHERE e.status = 'approved'
  `;
  
  const queryParams: any[] = [];
  
  // Apply filters
  if (filters) {
    if (filters.search) {
      query += " AND (e.title LIKE ? OR e.description LIKE ?)";
      queryParams.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    
    if (filters.city) {
      query += " AND e.city = ?";
      queryParams.push(filters.city);
    }
    
    if (filters.category) {
      query += " AND e.category = ?";
      queryParams.push(filters.category);
    }
    
    // Apply sorting
    if (filters.sortBy === 'newest') {
      query += " ORDER BY e.created_at DESC";
    } else if (filters.sortBy === 'closest') {
      query += " ORDER BY e.start_date ASC";
    } else {
      // Default to newest
      query += " ORDER BY e.created_at DESC";
    }
  } else {
    // Default sorting
    query += " ORDER BY e.created_at DESC";
  }
  
  const events = await executeQuery(query, queryParams);
  return events;
}

export async function getEventById(id: string | number) {
  const events = await executeQuery(
    `SELECT e.*, u.name as organizer_name
     FROM events e
     JOIN users u ON e.user_id = u.id
     WHERE e.id = ? AND e.status = 'approved'`,
    [id]
  );
  
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error('Event not found');
  }
  
  return events[0];
}

export async function createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'status'>, userId: number) {
  const result = await executeQuery(
    `INSERT INTO events (
      title, subtitle, description, image, start_date, end_date,
      city, location, category, organizer, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      eventData.title,
      eventData.subtitle,
      eventData.description,
      eventData.image,
      eventData.startDate,
      eventData.endDate,
      eventData.city,
      eventData.location,
      eventData.category,
      eventData.organizer,
      userId
    ]
  );
  
  const eventId = (result as any).insertId;
  return getEventById(eventId);
}

export async function updateEventStatus(eventId: number, status: 'approved' | 'rejected', adminId: number) {
  // Verify admin status
  const admins = await executeQuery(
    'SELECT * FROM users WHERE id = ? AND is_admin = 1',
    [adminId]
  );
  
  if (!Array.isArray(admins) || admins.length === 0) {
    throw new Error('Unauthorized: Admin privileges required');
  }
  
  await executeQuery(
    'UPDATE events SET status = ? WHERE id = ?',
    [status, eventId]
  );
  
  return { success: true, message: `Event ${status} successfully` };
}

export async function getUserEvents(userId: number) {
  return executeQuery(
    'SELECT * FROM events WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
}

export async function getPendingEvents() {
  return executeQuery(
    'SELECT e.*, u.name as organizer_name FROM events e JOIN users u ON e.user_id = u.id WHERE e.status = "pending" ORDER BY e.created_at DESC',
    []
  );
}
