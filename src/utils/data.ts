
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
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    createdAt: '2023-01-02T00:00:00.000Z'
  }
];

// Analytics data
export const analyticsData = {
  websiteTraffic: {
    value: '56k',
    increase: '18.3%',
    comparedTo: 'last week',
    sources: [
      { name: 'Social Media', value: '71%', color: '#36DFBF' },
      { name: 'Organic Search', value: '26%', color: '#F76AD2' }
    ]
  },
  roi: {
    value: '291%',
    label: 'Return Of Investment'
  },
  bounceRate: {
    value: '37%',
    increase: '+14%',
    since: 'Since Yesterday',
    days: [
      { day: 'Mon', value: 6 },
      { day: 'Tue', value: 7 },
      { day: 'Wed', value: 8 },
      { day: 'Thu', value: 9 }
    ]
  },
  eventStats: {
    total: 0,
    active: 0,
    pending: 0,
    subscribers: 0
  }
};
