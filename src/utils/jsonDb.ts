
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserAuth, Event } from '../types';

const USERS_DB_PATH = path.join(process.cwd(), 'databases', 'users.json');
const EVENTS_DB_PATH = path.join(process.cwd(), 'databases', 'events.json');

// User database operations
export const readUsers = (): { users: Array<UserAuth & { password: string }> } => {
  try {
    if (!fs.existsSync(USERS_DB_PATH)) {
      return { users: [] };
    }
    const data = fs.readFileSync(USERS_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users database:', error);
    return { users: [] };
  }
};

export const writeUsers = (users: Array<UserAuth & { password: string }>): void => {
  try {
    const dir = path.dirname(USERS_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_DB_PATH, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error('Error writing to users database:', error);
  }
};

export const findUserByEmail = (email: string): (UserAuth & { password: string }) | undefined => {
  const { users } = readUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const createUser = async (name: string, email: string, password: string, organization?: string): Promise<UserAuth> => {
  const { users } = readUsers();
  
  // Check if user already exists
  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser: UserAuth & { password: string } = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    role: 'user',
    createdAt: new Date().toISOString(),
    ...(organization && { organization })
  };
  
  // Save user to database
  users.push(newUser);
  writeUsers(users);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const verifyUser = async (email: string, password: string): Promise<UserAuth> => {
  const user = findUserByEmail(email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid email or password');
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Events database operations
export const readEvents = (): { events: Array<Event> } => {
  try {
    if (!fs.existsSync(EVENTS_DB_PATH)) {
      return { events: [] };
    }
    const data = fs.readFileSync(EVENTS_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events database:', error);
    return { events: [] };
  }
};

export const writeEvents = (events: Array<Event>): void => {
  try {
    const dir = path.dirname(EVENTS_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(EVENTS_DB_PATH, JSON.stringify({ events }, null, 2));
  } catch (error) {
    console.error('Error writing to events database:', error);
  }
};

export const findEventById = (id: string): Event | undefined => {
  const { events } = readEvents();
  return events.find(event => event.id === id);
};

export const findEventBySlug = (slug: string): Event | undefined => {
  const { events } = readEvents();
  return events.find(event => event.slug === slug);
};

export const getAllEvents = (filters: any = {}): Event[] => {
  const { events } = readEvents();
  
  // Apply filters if any
  let filteredEvents = [...events];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(searchLower) || 
      event.subtitle.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.city) {
    filteredEvents = filteredEvents.filter(event => event.city === filters.city);
  }
  
  if (filters.category) {
    filteredEvents = filteredEvents.filter(event => event.category === filters.category);
  }
  
  // Only return approved events
  return filteredEvents.filter(event => event.status === 'approved');
};

export const getUserEvents = (userId: string): Event[] => {
  const { events } = readEvents();
  return events.filter(event => event.userId === userId);
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const createEvent = (eventData: any, userId: string): Event => {
  const { events } = readEvents();
  
  const eventId = uuidv4();
  const slug = generateSlug(`${eventData.title}-${eventId.substring(0, 8)}`);
  
  const newEvent: Event = {
    id: eventId,
    slug,
    title: eventData.title,
    subtitle: eventData.subtitle || '',
    description: eventData.description || '',
    image: eventData.image || '',
    images: eventData.images || [],
    startDate: eventData.startDate || new Date().toISOString(),
    endDate: eventData.endDate || new Date().toISOString(),
    location: eventData.location || '',
    city: eventData.city || '',
    category: eventData.category || 'Other',
    status: 'pending',
    organizer: eventData.organizer || '',
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coordinates: eventData.coordinates,
    subscribers: []
  };
  
  events.push(newEvent);
  writeEvents(events);
  
  return newEvent;
};

export const updateEventStatus = (eventId: string, status: 'approved' | 'rejected'): Event => {
  const { events } = readEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }
  
  events[eventIndex].status = status;
  events[eventIndex].updatedAt = new Date().toISOString();
  
  writeEvents(events);
  return events[eventIndex];
};

export const subscribeToEvent = (eventId: string, subscriberData: { name: string, whatsapp: string }): Event => {
  const { events } = readEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }
  
  if (!events[eventIndex].subscribers) {
    events[eventIndex].subscribers = [];
  }
  
  const subscriberId = uuidv4();
  
  events[eventIndex].subscribers.push({
    id: subscriberId,
    name: subscriberData.name,
    whatsapp: subscriberData.whatsapp,
    createdAt: new Date().toISOString(),
    eventId
  });
  
  writeEvents(events);
  return events[eventIndex];
};
