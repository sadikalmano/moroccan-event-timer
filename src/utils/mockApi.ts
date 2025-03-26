// This file provides mock API responses for development
// In a real application, you would replace this with actual API calls

import { UserAuth } from '../services/authService';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'hashed_password_123',
    organization: 'Admin Org',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Regular User',
    email: 'user@example.com',
    password: 'hashed_password_456',
    organization: 'User Org',
    isAdmin: false
  }
];

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Morocco Music Festival',
    subtitle: 'Annual celebration of music',
    description: 'Join us for the biggest music festival in Morocco featuring local and international artists.',
    image: '/placeholder.svg',
    startDate: '2023-07-15T18:00:00',
    endDate: '2023-07-17T23:00:00',
    city: 'Marrakech',
    location: 'Jemaa el-Fnaa Square',
    category: 'Music',
    organizer: 'Morocco Events Co.',
    status: 'approved',
    userId: 2,
    createdAt: '2023-06-01T10:00:00'
  },
  {
    id: 2,
    title: 'Casablanca Food Fair',
    subtitle: 'Taste the flavors of Morocco',
    description: 'Experience the rich culinary traditions of Morocco with top chefs and food artisans.',
    image: '/placeholder.svg',
    startDate: '2023-08-10T12:00:00',
    endDate: '2023-08-12T20:00:00',
    city: 'Casablanca',
    location: 'Mohammed V Square',
    category: 'Food',
    organizer: 'Moroccan Culinary Association',
    status: 'approved',
    userId: 2,
    createdAt: '2023-06-15T14:30:00'
  },
  {
    id: 3,
    title: 'Fez Cultural Exhibition',
    subtitle: 'Celebrating Moroccan heritage',
    description: 'An exhibition showcasing the rich cultural heritage and craftsmanship of Morocco.',
    image: '/placeholder.svg',
    startDate: '2023-09-05T10:00:00',
    endDate: '2023-09-10T18:00:00',
    city: 'Fez',
    location: 'Bab Boujloud',
    category: 'Culture',
    organizer: 'Fez Cultural Foundation',
    status: 'pending',
    userId: 2,
    createdAt: '2023-07-01T09:15:00'
  }
];

// Mock JWT token generation
function generateMockToken(user: any): string {
  return `mock-jwt-token-${user.id}-${Date.now()}`;
}

// Mock API endpoints
export const mockAPI = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, you'd verify the password hash here
    // For demo purposes, we'll just pretend it matches
    
    const { password: _, ...userWithoutPassword } = user;
    const token = generateMockToken(user);
    
    return {
      user: userWithoutPassword as UserAuth,
      token
    };
  },
  
  register: async (name: string, email: string, password: string, organization?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password, // In a real app, this would be hashed
      organization,
      isAdmin: false
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateMockToken(newUser);
    
    return {
      user: userWithoutPassword as UserAuth,
      token
    };
  },
  
  // Events endpoints
  getEvents: async (filters: any = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredEvents = [...mockEvents].filter(event => event.status === 'approved');
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) || 
        event.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.city) {
      filteredEvents = filteredEvents.filter(event => 
        event.city.toLowerCase() === filters.city.toLowerCase()
      );
    }
    
    if (filters.category) {
      filteredEvents = filteredEvents.filter(event => 
        event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply sorting
    if (filters.sortBy === 'newest') {
      filteredEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'closest') {
      filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
    
    return filteredEvents;
  },
  
  getEventById: async (id: number | string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const numericId = Number(id);
    const event = mockEvents.find(e => e.id === numericId && e.status === 'approved');
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    return event;
  },
  
  createEvent: async (eventData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newEvent = {
      id: mockEvents.length + 1,
      ...eventData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    mockEvents.push(newEvent);
    return newEvent;
  },
  
  updateEventStatus: async (eventId: number, status: 'approved' | 'rejected') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const event = mockEvents.find(e => e.id === eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    event.status = status;
    return { success: true, message: `Event ${status} successfully` };
  },
  
  getUserEvents: async (userId: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return mockEvents.filter(e => e.userId === userId);
  },
  
  getPendingEvents: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockEvents.filter(e => e.status === 'pending');
  }
};

// Helper function to intercept and mock fetch requests
export function setupMockAPI() {
  const originalFetch = window.fetch;
  
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : 
               input instanceof Request ? input.url : input.toString();
    
    // Process only API requests, pass through others
    if (!url.startsWith('/api/')) {
      return originalFetch(input, init);
    }
    
    console.log(`[Mock API] ${init?.method || 'GET'} ${url}`);
    
    try {
      // Extract the API path without the /api prefix
      const apiPath = url.replace(/^\/api/, '');
      const method = init?.method || 'GET';
      let body = init?.body ? JSON.parse(init.body.toString()) : {};
      
      // Handle different API endpoints
      if (apiPath === '/auth/login' && method === 'POST') {
        const result = mockAPI.login(body.email, body.password);
        return createMockResponse(200, result);
      }
      
      if (apiPath === '/auth/register' && method === 'POST') {
        const result = mockAPI.register(body.name, body.email, body.password, body.organization);
        return createMockResponse(201, result);
      }
      
      if (apiPath.match(/^\/events$/) && method === 'GET') {
        const urlObj = new URL(url, window.location.origin);
        const filters = Object.fromEntries(urlObj.searchParams.entries());
        const result = mockAPI.getEvents(filters);
        return createMockResponse(200, result);
      }
      
      if (apiPath.match(/^\/events\/\d+$/) && method === 'GET') {
        const id = apiPath.split('/')[2];
        const result = mockAPI.getEventById(Number(id));
        return createMockResponse(200, result);
      }
      
      if (apiPath === '/events' && method === 'POST') {
        const result = mockAPI.createEvent(body);
        return createMockResponse(201, result);
      }
      
      if (apiPath.match(/^\/events\/\d+\/status$/) && method === 'PATCH') {
        const id = apiPath.split('/')[2];
        const result = mockAPI.updateEventStatus(Number(id), body.status);
        return createMockResponse(200, result);
      }
      
      if (apiPath === '/events/user' && method === 'GET') {
        // Extract user ID from auth header in a real app
        // Here we'll just use a default user ID
        const result = mockAPI.getUserEvents(2);
        return createMockResponse(200, result);
      }
      
      if (apiPath === '/events/pending' && method === 'GET') {
        const result = mockAPI.getPendingEvents();
        return createMockResponse(200, result);
      }
      
      // If we get here, the API endpoint is not mocked
      console.warn(`[Mock API] Unhandled endpoint: ${method} ${apiPath}`);
      return createMockResponse(404, { message: 'API endpoint not found' }, false);
    } catch (error: any) {
      console.error('[Mock API] Error:', error);
      return createMockResponse(400, { message: error.message }, false);
    }
  } as typeof fetch;
  
  function createMockResponse(status: number, data: any, ok = true): Response {
    return {
      status,
      ok,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      // Add the rest of the Response properties with default values
      redirected: false,
      statusText: ok ? 'OK' : 'Error',
      type: 'basic',
      url: '',
      clone: function() { return this; },
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob([])),
      formData: () => Promise.resolve(new FormData())
    } as Response;
  }
  
  console.log('[Mock API] Mock API setup complete');
}
