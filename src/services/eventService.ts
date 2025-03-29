
import { 
  getEventsAPI, 
  getEventByIdAPI, 
  createEventAPI, 
  updateEventStatusAPI,
  getUserEventsAPI,
  getPendingEventsAPI,
  subscribeToEventAPI
} from '../utils/db';
import { Event, Subscriber } from '../types';

export async function getEvents(filters?: {
  search?: string, 
  city?: string, 
  category?: string, 
  sortBy?: 'newest' | 'closest' | 'popular'
}) {
  try {
    return await getEventsAPI(filters);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEventById(id: string | number) {
  try {
    return await getEventByIdAPI(id);
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

export async function createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'status'> | any, userId: string | number) {
  try {
    return await createEventAPI({ ...eventData, userId });
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function updateEventStatus(eventId: number, status: 'approved' | 'rejected', adminId: number) {
  try {
    return await updateEventStatusAPI(eventId, status);
  } catch (error) {
    console.error('Error updating event status:', error);
    throw error;
  }
}

export async function getUserEvents(userId: number | string) {
  try {
    return await getUserEventsAPI();
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
}

export async function getPendingEvents() {
  try {
    return await getPendingEventsAPI();
  } catch (error) {
    console.error('Error fetching pending events:', error);
    throw error;
  }
}

export async function subscribeToEvent(eventId: string | number, subscriberData: { name: string, whatsapp: string }) {
  try {
    return await subscribeToEventAPI(eventId, subscriberData);
  } catch (error) {
    console.error('Error subscribing to event:', error);
    throw error;
  }
}
