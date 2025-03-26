
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
