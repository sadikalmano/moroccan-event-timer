
export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  city: string;
  location: string;
  category: string;
  organizer: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization?: string;
  isAdmin: boolean;
}

export interface FilterOptions {
  search: string;
  city: string;
  category: string;
  sortBy: 'newest' | 'closest' | 'popular';
}
