
// This file is now a client-side utility for making API requests
// instead of direct database connections

const API_URL = '/api';

// Generic fetch function with error handling
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned an invalid response. Please try again later.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Auth API requests
export async function loginAPI(email: string, password: string) {
  return fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function registerAPI(name: string, email: string, password: string, organization?: string) {
  return fetchWithAuth('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, organization })
  });
}

// Events API requests
export async function getEventsAPI(filters: any = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value as string);
  });
  
  return fetchWithAuth(`/events?${queryParams.toString()}`);
}

export async function getEventByIdAPI(id: string | number) {
  return fetchWithAuth(`/events/${id}`);
}

export async function createEventAPI(eventData: any) {
  return fetchWithAuth('/events', {
    method: 'POST',
    body: JSON.stringify(eventData)
  });
}

export async function updateEventStatusAPI(eventId: number, status: 'approved' | 'rejected') {
  return fetchWithAuth(`/events/${eventId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function getUserEventsAPI() {
  return fetchWithAuth('/events/user');
}

export async function getPendingEventsAPI() {
  return fetchWithAuth('/events/pending');
}

export async function subscribeToEventAPI(eventId: string | number, subscriberData: { name: string, whatsapp: string }) {
  return fetchWithAuth(`/events/${eventId}/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscriberData)
  });
}
