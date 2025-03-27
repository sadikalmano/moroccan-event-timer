
import { Event, User } from '../types';
import { events } from '../data/events';

// Export events data from the events.ts file
export const eventsData: Event[] = events;

// Mock users data
export const usersData: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    createdAt: '2023-01-02T00:00:00.000Z'
  }
];
