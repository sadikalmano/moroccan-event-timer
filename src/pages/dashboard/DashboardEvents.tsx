
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEvents } from '@/services/eventService';
import { Event } from '@/types';
import { Calendar, MapPin, Users, Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const DashboardEvents: React.FC = () => {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-xl text-white">{t('dashboard.loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.events')}</h1>
          <p className="text-gray-400 mt-1">{t('dashboard.manageYourEvents')}</p>
        </div>
        <Button onClick={() => navigate('/dashboard/events/create')} className="bg-dashboard-highlight text-dashboard-darker hover:bg-dashboard-highlight/90">
          <Plus className="h-4 w-4 mr-2" />
          {t('dashboard.createEvent')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-dashboard-card border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">{t('dashboard.filters')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder={t('dashboard.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-dashboard-darker border-gray-700 text-white"
              />
            </div>

            <select
              className="rounded-md border bg-dashboard-darker border-gray-700 appearance-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-highlight text-white"
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
              className="rounded-md border bg-dashboard-darker border-gray-700 appearance-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-highlight text-white"
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
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="bg-dashboard-card border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">{t('event.title')}</TableHead>
                <TableHead className="text-gray-400">{t('event.category')}</TableHead>
                <TableHead className="text-gray-400">{t('event.city')}</TableHead>
                <TableHead className="text-gray-400">
                  {t('dashboard.createdAt')}
                  <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? '↓' : '↑'}
                  </Button>
                </TableHead>
                <TableHead className="text-right text-gray-400">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <TableRow key={event.id} className="border-gray-700 hover:bg-dashboard-darker/50">
                    <TableCell className="font-medium text-white">{event.title}</TableCell>
                    <TableCell className="text-gray-300">{event.category}</TableCell>
                    <TableCell className="text-gray-300">{event.city}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(event.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-300 hover:text-white">
                            <span className="sr-only">Open menu</span>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-dashboard-darker border-gray-700 text-white">
                          <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/events/${event.id}`)} className="hover:bg-dashboard-card focus:bg-dashboard-card">
                            <Eye className="h-4 w-4 mr-2" />
                            {t('common.view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/events/${String(event.id)}/subscribers`)} className="hover:bg-dashboard-card focus:bg-dashboard-card">
                            <Users className="h-4 w-4 mr-2" />
                            {t('event.subscribers')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem onClick={() => navigate(`/events/edit/${event.id}`)} className="hover:bg-dashboard-card focus:bg-dashboard-card">
                            <Edit className="h-4 w-4 mr-2" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEventDelete(event.id)} className="text-dashboard-accent hover:bg-dashboard-card focus:bg-dashboard-card">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-gray-400">
                    {search || categoryFilter !== 'all' || cityFilter !== 'all' 
                      ? t('dashboard.noEventsFound')
                      : t('dashboard.noEventsYet')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="bg-dashboard-darker border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboard.deleteConfirmationTitle')}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {t('dashboard.deleteConfirmationDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-gray-700 text-white hover:bg-dashboard-card">{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-dashboard-accent text-white hover:bg-dashboard-accent/90">
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardEvents;
