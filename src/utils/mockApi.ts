import { eventsData, usersData } from './data';
import { Event, User, EventSubscriber } from '../types';

// Utility function to match a route
const matchRoute = (url: string, routePattern: RegExp) => {
  const match = url.match(routePattern);
  return match ? match : null;
};

// Utility function to generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Define mock API functions
export const setupMockAPI = () => {
  // Mock the fetch API
  const originalFetch = window.fetch;
  window.fetch = async (resource: RequestInfo | URL, init?: RequestInit) => {
    try {
      const url = typeof resource === 'string' 
        ? resource 
        : resource instanceof Request 
          ? resource.url 
          : resource.toString();

      if (url.includes('/api/events') && !url.includes('/api/events/') && !init?.method) {
        // Handle GET /api/events endpoint
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const search = urlParams.get('search') || '';
        const city = urlParams.get('city') || '';
        const category = urlParams.get('category') || '';
        const sortBy = urlParams.get('sortBy') || 'newest';

        let filteredEvents = eventsData.filter(event =>
          event.title.toLowerCase().includes(search.toLowerCase()) &&
          (city === '' || event.city === city) &&
          (category === '' || event.category === category)
        );

        if (sortBy === 'closest') {
          filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        } else if (sortBy === 'popular') {
          filteredEvents.sort((a, b) => (b.subscribers?.length || 0) - (a.subscribers?.length || 0));
        } else {
          filteredEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return new Response(JSON.stringify(filteredEvents), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.match(/\/api\/events\/\w+$/) && !init?.method) {
        // Handle GET /api/events/:id endpoint
        const eventId = url.split('/').pop();
        const event = eventsData.find(event => event.id === eventId);

        if (event) {
          return new Response(JSON.stringify(event), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
          return new Response(JSON.stringify({ message: 'Event not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else if (url.includes('/api/events/') && url.includes('/subscribe') && init?.method === 'POST') {
        // Handle POST /api/events/:id/subscribe endpoint
        const eventId = url.split('/')[3];
        const eventIndex = eventsData.findIndex(event => event.id === eventId);

        if (eventIndex === -1) {
          return new Response(JSON.stringify({ error: 'Event not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const event = eventsData[eventIndex];
        const subscriberData = JSON.parse(init?.body as string);

        if (!subscriberData.name || !subscriberData.whatsapp) {
          return new Response(JSON.stringify({ error: 'Name and WhatsApp are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const newSubscriber: EventSubscriber = {
          id: generateId(),
          name: subscriberData.name,
          whatsapp: subscriberData.whatsapp,
          eventId: eventId,
          createdAt: new Date().toISOString(),
        };

        if (!event.subscribers) {
          event.subscribers = [];
        }
        event.subscribers.push(newSubscriber);
        eventsData[eventIndex] = event;

        return new Response(JSON.stringify(event), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.includes('/api/events') && init?.method === 'POST') {
        // Handle POST /api/events endpoint
        const eventData = JSON.parse(init?.body as string);
        const newEvent: Event = {
          id: generateId(),
          ...eventData,
          createdAt: new Date().toISOString(),
          status: 'pending',
          subscribers: [],
        };
        eventsData.push(newEvent);
        return new Response(JSON.stringify(newEvent), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.includes('/api/user/events') && !init?.method) {
        // Handle GET /api/user/events endpoint
        // Assuming you want to fetch all events for a specific user
        const userId = '1'; // Replace with actual user ID if needed
        const userEvents = eventsData.filter(event => event.organizer === userId);
        return new Response(JSON.stringify(userEvents), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.includes('/api/pending-events') && !init?.method) {
        // Handle GET /api/pending-events endpoint
        const pendingEvents = eventsData.filter(event => event.status === 'pending');
        return new Response(JSON.stringify(pendingEvents), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.includes('/api/events/') && url.includes('/status') && init?.method === 'PATCH') {
        // Handle PATCH /api/events/:id/status endpoint
        const eventId = url.split('/')[3];
        const eventIndex = eventsData.findIndex(event => event.id === eventId);

        if (eventIndex === -1) {
          return new Response(JSON.stringify({ error: 'Event not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const event = eventsData[eventIndex];
        const statusData = JSON.parse(init?.body as string);
        event.status = statusData.status;
        eventsData[eventIndex] = event;

        return new Response(JSON.stringify(event), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (url.includes('/api/migrations') && init?.method === 'POST') {
         // Simulate a successful migration
         return new Response(JSON.stringify({ success: true, message: 'Migration completed successfully' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        // If we don't have a mock for this endpoint, pass through to the original fetch
        return originalFetch(resource, init);
      }
    } catch (error) {
      console.error('Mock API error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
};
