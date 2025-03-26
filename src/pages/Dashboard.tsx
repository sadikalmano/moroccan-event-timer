
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserEvents } from '../services/eventService';
import { Event } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserEvents() {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const userEvents = await getUserEvents(user.id);
        setEvents(userEvents);
      } catch (error) {
        console.error('Error loading user events:', error);
        toast({
          title: "Error",
          description: "Failed to load your events",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadUserEvents();
  }, [user, navigate, toast]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const pendingEvents = events.filter(event => event.status === 'pending');
  const approvedEvents = events.filter(event => event.status === 'approved');
  const rejectedEvents = events.filter(event => event.status === 'rejected');

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your events and see subscriber statistics
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/create-event')}
          >
            Create New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{events.length}</CardTitle>
              <CardDescription>Total Events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">All your events</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {events.reduce((total, event) => total + (event.subscribers?.length || 0), 0)}
              </CardTitle>
              <CardDescription>Total Subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span className="text-sm">Across all events</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{approvedEvents.length}</CardTitle>
              <CardDescription>Active Events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-muted-foreground">
                <Eye className="mr-2 h-4 w-4" />
                <span className="text-sm">Publicly visible</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <EventsTable events={events} />
          </TabsContent>
          
          <TabsContent value="approved">
            <EventsTable events={approvedEvents} />
          </TabsContent>
          
          <TabsContent value="pending">
            <EventsTable events={pendingEvents} />
          </TabsContent>
          
          <TabsContent value="rejected">
            <EventsTable events={rejectedEvents} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

interface EventsTableProps {
  events: Event[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  const navigate = useNavigate();

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No events found</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subscribers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map(event => (
              <tr key={event.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="h-10 w-16 object-cover rounded mr-3"
                    />
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {event.subtitle}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(event.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : event.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {event.subscribers?.length || 0}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/events/${event.id}/subscribers`)}
                    >
                      Subscribers
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
