
import { Event, EventFormData } from '../types';
import { events as mockEvents } from '../data/events';

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate a slug from a string
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')     // Replace spaces with dashes
    .replace(/-+/g, '-')      // Replace multiple dashes with single dash
    .trim();
};

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ensure all events have slugs
      const eventsWithSlugs = mockEvents.map(event => {
        if (!event.slug) {
          return {...event, slug: generateSlug(`${event.title}-${event.id}`)}; 
        }
        return event;
      });
      resolve(eventsWithSlugs);
    }, 500);
  });
};

// Get events for a specific user
export const getUserEvents = async (userId: string): Promise<Event[]> => {
  // In a real app, this would be an API call to fetch user-specific events
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter events by user ID, or return all events for demo users
      const userEvents = userId === 'sample' 
        ? mockEvents 
        : mockEvents.filter(event => event.userId === userId);
      
      // Ensure all events have slugs
      const eventsWithSlugs = userEvents.map(event => {
        if (!event.slug) {
          return {...event, slug: generateSlug(`${event.title}-${event.id}`)};
        }
        return event;
      });
      
      resolve(eventsWithSlugs);
    }, 500);
  });
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === id);
      if (event) {
        // Ensure event has a slug
        if (!event.slug) {
          event.slug = generateSlug(`${event.title}-${event.id}`);
        }
        resolve(event);
      } else {
        reject(new Error('Event not found'));
      }
    }, 500);
  });
};

// Get event by slug
export const getEventBySlug = async (slug: string): Promise<Event> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // First, ensure all events have slugs
      mockEvents.forEach(event => {
        if (!event.slug) {
          event.slug = generateSlug(`${event.title}-${event.id}`);
        }
      });
      
      // Now find the event by slug
      const event = mockEvents.find(e => e.slug === slug);
      if (event) {
        resolve(event);
      } else {
        reject(new Error('Event not found'));
      }
    }, 500);
  });
};

// Create a new event
export const createEvent = async (eventData: Partial<Event>, userId: string): Promise<Event> => {
  // In a real app, this would be an API call to store the event
  return new Promise((resolve) => {
    setTimeout(() => {
      const eventId = generateId();
      const title = eventData.title || '';
      
      const newEvent: Event = {
        id: eventId,
        slug: generateSlug(`${title}-${eventId}`),
        title: title,
        subtitle: eventData.subtitle || '',
        description: eventData.description || '',
        image: eventData.image || '',
        images: eventData.images || [],
        startDate: eventData.startDate || new Date().toISOString(),
        endDate: eventData.endDate || new Date().toISOString(),
        location: eventData.location || '',
        city: eventData.city || '',
        category: eventData.category || 'other',
        status: 'pending',
        organizer: eventData.organizer || '',
        userId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subscribers: [],
        coordinates: eventData.coordinates
      };
      
      // In a real app, we would save this to the database
      // For now, we can just add it to our mock data
      // mockEvents.push(newEvent);
      
      resolve(newEvent);
    }, 1000);
  });
};

// Subscribe to an event
export const subscribeToEvent = async (eventId: string, name: string, whatsapp: string) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the event
      const event = mockEvents.find(e => e.id === eventId);
      
      if (event) {
        // Add subscriber
        const subscriber = {
          id: generateId(),
          name,
          whatsapp,
          createdAt: new Date().toISOString(),
          eventId
        };
        
        if (!event.subscribers) {
          event.subscribers = [];
        }
        
        event.subscribers.push(subscriber);
        resolve(event);
      }
    }, 1000);
  });
};
