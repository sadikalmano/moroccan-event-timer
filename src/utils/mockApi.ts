// This file is now a client-side utility for making API requests
// instead of direct database connections

import { events } from '../data/events';
import { Event, EventSubscriber } from '../types';

// Mock database for users
let users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // In a real app, this would be hashed
    organization: 'Moroccan Tourism Board',
    isAdmin: true
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    organization: 'Local Event Planner',
    isAdmin: false
  }
];

// Add subscribers data to events
let mockEvents = events.map(event => ({
  ...event,
  subscribers: []
}));

export function setupMockAPI() {
  if (typeof window === 'undefined') return;

  const mockApiHandlers = [
    // Auth endpoints
    {
      url: '/api/auth/login',
      method: 'POST',
      handler: (request: Request) => {
        return request.json().then(data => {
          const { email, password } = data;
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            const { password, ...userWithoutPassword } = user;
            return new Response(JSON.stringify({
              user: userWithoutPassword,
              token: 'mock-jwt-token'
            }), { status: 200 });
          } else {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
          }
        });
      }
    },
    {
      url: '/api/auth/register',
      method: 'POST',
      handler: (request: Request) => {
        return request.json().then(data => {
          const { name, email, password, organization } = data;
          
          if (users.some(u => u.email === email)) {
            return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 400 });
          }
          
          const newUser = {
            id: (users.length + 1).toString(),
            name,
            email,
            password,
            organization,
            isAdmin: false
          };
          
          users.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          
          return new Response(JSON.stringify({
            user: userWithoutPassword,
            token: 'mock-jwt-token'
          }), { status: 201 });
        });
      }
    },
    
    // Events endpoints
    {
      url: '/api/events',
      method: 'GET',
      handler: (request: Request) => {
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const city = url.searchParams.get('city') || '';
        const category = url.searchParams.get('category') || '';
        const sortBy = url.searchParams.get('sortBy') || 'newest';
        
        let filteredEvents = [...mockEvents].filter(event => event.status === 'approved');
        
        if (search) {
          filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(search) || 
            event.subtitle.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search)
          );
        }
        
        if (city) {
          filteredEvents = filteredEvents.filter(event => event.city === city);
        }
        
        if (category) {
          filteredEvents = filteredEvents.filter(event => event.category === category);
        }
        
        if (sortBy === 'newest') {
          filteredEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'closest') {
          const now = new Date().getTime();
          filteredEvents.sort((a, b) => {
            const timeToA = new Date(a.startDate).getTime() - now;
            const timeToB = new Date(b.startDate).getTime() - now;
            return timeToA - timeToB;
          });
          filteredEvents = filteredEvents.filter(event => new Date(event.startDate) > new Date());
        } else if (sortBy === 'popular') {
          filteredEvents.sort((a, b) => (b.subscribers?.length || 0) - (a.subscribers?.length || 0));
        }
        
        return new Response(JSON.stringify(filteredEvents), { status: 200 });
      }
    },
    {
      url: '/api/events/user',
      method: 'GET',
      handler: (request: Request) => {
        // In a real app, this would filter by the authenticated user's ID
        // For mock purposes, we'll just return all events for the second user
        const userEvents = mockEvents.filter(event => event.organizer === users[1].organization);
        return new Response(JSON.stringify(userEvents), { status: 200 });
      }
    },
    {
      url: new RegExp('/api/events/\\d+$'),
      method: 'GET',
      handler: (request: Request) => {
        const eventId = request.url.split('/').pop();
        const event = mockEvents.find(e => e.id === eventId);
        
        if (event) {
          return new Response(JSON.stringify(event), { status: 200 });
        } else {
          return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
        }
      }
    },
    {
      url: new RegExp('/api/events/\\d+/subscribe$'),
      method: 'POST',
      handler: (request: Request) => {
        const eventId = request.url.split('/')[3];
        
        return request.json().then(data => {
          const { name, whatsapp } = data;
          
          if (!name || !whatsapp) {
            return new Response(JSON.stringify({ message: 'Name and WhatsApp number are required' }), { status: 400 });
          }
          
          const eventIndex = mockEvents.findIndex(e => e.id === eventId);
          
          if (eventIndex === -1) {
            return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
          }
          
          const newSubscriber: EventSubscriber = {
            id: Date.now().toString(),
            name,
            whatsapp,
            eventId,
            createdAt: new Date().toISOString()
          };
          
          // Add subscriber to the event
          mockEvents[eventIndex] = {
            ...mockEvents[eventIndex],
            subscribers: [...(mockEvents[eventIndex].subscribers || []), newSubscriber]
          };
          
          return new Response(JSON.stringify(mockEvents[eventIndex]), { status: 200 });
        });
      }
    },
    // Migrations endpoint
    {
      url: '/api/migrations/run',
      method: 'POST',
      handler: () => {
        // Simulate migrations
        const success = Math.random() > 0.2; // 80% chance of success
        
        if (success) {
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'Database migrations completed successfully!',
            details: 'Created tables: users, events, event_subscribers'
          }), { status: 200 });
        } else {
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'Failed to complete migrations.',
            error: 'Database connection error'
          }), { status: 500 });
        }
      }
    }
  ];

  // Create a mock fetch implementation that intercepts requests to our API
  const originalFetch = window.fetch;
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    const request = new Request(typeof input === 'string' ? input : input.url, init);
    const url = new URL(request.url, window.location.origin);
    
    // Only intercept requests to our mock API
    if (url.pathname.startsWith('/api')) {
      console.log(`[Mock API] ${request.method} ${url.pathname}`);
      
      // Find a matching handler
      const handler = mockApiHandlers.find(h => {
        if (typeof h.url === 'string') {
          return h.url === url.pathname && h.method === request.method;
        } else if (h.url instanceof RegExp) {
          return h.url.test(url.pathname) && h.method === request.method;
        }
        return false;
      });
      
      if (handler) {
        try {
          const response = await handler.handler(request);
          console.log(`[Mock API] Response:`, response);
          return response;
        } catch (error) {
          console.error('[Mock API] Error:', error);
          return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
        }
      }
      
      console.warn(`[Mock API] No handler for ${request.method} ${url.pathname}`);
      return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 });
    }
    
    // Pass through all other requests
    return originalFetch(input, init);
  };
}
