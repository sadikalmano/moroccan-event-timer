
import { 
  getEventsAPI, 
  getEventByIdAPI, 
  createEventAPI, 
  updateEventStatusAPI,
  getUserEventsAPI,
  getPendingEventsAPI
} from '../utils/db';
import { Event } from '../types';

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

export async function createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'status'>, userId: number) {
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

export async function getUserEvents(userId: number) {
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
