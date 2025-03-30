
export interface UserAuth {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface AuthSession {
  user: UserAuth;
  token: string;
}

export interface FilterOptions {
  search: string;
  city: string;
  category: string;
  sortBy: 'newest' | 'closest' | 'popular';
}

export interface Subscriber {
  id: string;
  name: string;
  whatsapp: string;
  createdAt: string;
  eventId?: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[]; // Additional images
  startDate: string;
  endDate: string;
  location: string;
  city: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  organizer: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  subscribers?: Subscriber[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Add User interface for data.ts and mockApi.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin?: boolean;
}

// Define step interface for the event creation stepper
export interface EventFormStep {
  title: string;
  description: string;
}

// Define event form data interface
export interface EventFormData {
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  city: string;
  location: string;
  category: string;
  organizer: string;
  images: File[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}
