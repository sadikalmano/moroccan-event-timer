
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, Mail, Phone, Filter, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Subscriber, Event } from '@/types';
import { getEvents } from '@/services/eventService';

const DashboardSubscribers: React.FC = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
        
        // Extract all subscribers from all events
        const allSubscribers: Subscriber[] = [];
        eventsData.forEach(event => {
          if (event.subscribers) {
            event.subscribers.forEach(sub => {
              allSubscribers.push({
                ...sub,
                eventId: event.id,
              });
            });
          }
        });
        
        setSubscribers(allSubscribers);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesEvent = selectedEvent === 'all' || subscriber.eventId === selectedEvent;
    const matchesSearch = !filter || 
      subscriber.name.toLowerCase().includes(filter.toLowerCase()) || 
      subscriber.whatsapp.includes(filter);
    return matchesEvent && matchesSearch;
  });

  const getEventTitleById = (eventId: string | undefined) => {
    if (!eventId) return '';
    const event = events.find(e => e.id === eventId);
    return event ? event.title : '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t('dashboard.subscribers')}</h1>
        <p className="text-gray-400 mt-1">{t('dashboard.manageSubscribers')}</p>
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
                placeholder={t('dashboard.searchSubscribers')}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 bg-dashboard-darker border-gray-700 text-white"
              />
            </div>

            <select
              className="rounded-md border bg-dashboard-darker border-gray-700 appearance-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-highlight text-white"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="all">{t('dashboard.allEvents')}</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <Button className="bg-dashboard-highlight text-dashboard-darker hover:bg-dashboard-highlight/90">
                <Download className="h-4 w-4 mr-2" />
                {t('dashboard.exportData')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card className="bg-dashboard-card border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">
            {t('dashboard.subscribersList')} ({filteredSubscribers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-white">
              {t('common.loading')}...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="text-gray-400">{t('subscriber.name')}</TableHead>
                  <TableHead className="text-gray-400">{t('subscriber.contact')}</TableHead>
                  <TableHead className="text-gray-400">{t('subscriber.event')}</TableHead>
                  <TableHead className="text-gray-400">{t('subscriber.registeredOn')}</TableHead>
                  <TableHead className="text-right text-gray-400">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.length > 0 ? (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id} className="border-gray-700 hover:bg-dashboard-darker/50">
                      <TableCell className="font-medium text-white">
                        {subscriber.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-300">
                          <Phone className="h-4 w-4 mr-1" />
                          {subscriber.whatsapp}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {getEventTitleById(subscriber.eventId)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(subscriber.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-300 hover:text-white">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-dashboard-darker border-gray-700 text-white">
                            <DropdownMenuItem className="hover:bg-dashboard-card focus:bg-dashboard-card">
                              <Mail className="mr-2 h-4 w-4" />
                              <span>{t('subscriber.sendEmail')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-dashboard-card focus:bg-dashboard-card">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              <span>{t('subscriber.openEvent')}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-gray-700">
                    <TableCell colSpan={5} className="h-32 text-center text-gray-400">
                      {filter || selectedEvent !== 'all'
                        ? t('dashboard.noMatchingSubscribers')
                        : t('dashboard.noSubscribersYet')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSubscribers;
