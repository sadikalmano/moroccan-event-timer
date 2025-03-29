
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
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
