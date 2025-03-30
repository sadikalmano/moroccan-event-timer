import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { getEvents, getUserEvents } from '../services/eventService';
import { Event } from '../types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Dashboard: React.FC = () => {
  const { t, locale } = useLanguage();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        if (!user) {
          setError('User not authenticated');
          return;
        }
        const eventsData = await getUserEvents(String(user.id));
        setEvents(eventsData);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredEvents = events.filter(event => {
    const searchRegex = new RegExp(search, 'i');
    const searchMatch = searchRegex.test(event.title) || searchRegex.test(event.subtitle) || searchRegex.test(event.description);
    const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
    const cityMatch = cityFilter === 'all' || event.city === cityFilter;
    return searchMatch && categoryMatch && cityMatch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === 'fr' ? 'fr-FR' : (locale === 'ar' ? 'ar-MA' : 'en-US'),
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
  };

  const handleEventDelete = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEventId) {
      setEvents(events.filter(event => event.id !== selectedEventId));
      setIsDeleteModalOpen(false);
      setSelectedEventId(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedEventId(null);
  };

  if (loading) {
    return (
      <div className="section-container">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-xl">{t('dashboard.loading')}</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="section-container">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">
            {error || t('dashboard.notAuthenticated')}
          </h2>
          <Button onClick={() => navigate('/login')}>
            {t('common.backToLogin')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.subtitle')}, {user.name} 👋
            </p>
          </div>
          <div>
            <Button variant="destructive" onClick={handleLogout}>
              {t('common.logout')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="search"
            placeholder={t('dashboard.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="md:col-span-2 flex gap-4">
            <select
              className="flex-1 rounded-md border appearance-none bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">{t('dashboard.allCategories')}</option>
              <option value="music">{t('category.music')}</option>
              <option value="sports">{t('category.sports')}</option>
              <option value="theater">{t('category.theater')}</option>
              <option value="conference">{t('category.conference')}</option>
              <option value="expo">{t('category.expo')}</option>
              <option value="other">{t('category.other')}</option>
            </select>

            <select
              className="flex-1 rounded-md border appearance-none bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="all">{t('dashboard.allCities')}</option>
              <option value="casablanca">Casablanca</option>
              <option value="rabat">Rabat</option>
              <option value="marrakech">Marrakech</option>
              <option value="fes">Fès</option>
              <option value="tangier">Tangier</option>
            </select>
          </div>
        </div>

        <Table>
          <TableCaption>{t('dashboard.eventListCaption')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{t('event.title')}</TableHead>
              <TableHead>{t('event.category')}</TableHead>
              <TableHead>{t('event.city')}</TableHead>
              <TableHead>{t('dashboard.createdAt')}
                <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  {sortOrder === 'asc' ? '↓' : '↑'}
                </Button>
              </TableHead>
              <TableHead className="text-right">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.city}</TableCell>
                <TableCell>{formatDate(event.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigate(`/events/${event.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('common.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/events/${String(event.id)}/subscribers`)}>
                        <Users className="h-4 w-4 mr-2" />
                        {t('event.subscribers')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/events/edit/${event.id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEventDelete(event.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('dashboard.deleteConfirmationTitle')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('dashboard.deleteConfirmationDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {t('common.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="mt-6">
          <Button onClick={() => navigate('/events/create')}>
            {t('dashboard.createEvent')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
