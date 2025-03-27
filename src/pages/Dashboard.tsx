
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  FileText, 
  HelpCircle,
  MessageSquare, 
  Plus, 
  Search, 
  Settings, 
  User as UserIcon,
  ArrowUpRight,
  BarChart as BarChartIcon,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getUserEvents } from '../services/eventService';
import { Event } from '../types';
import { analyticsData } from '../utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart } from '@/components/ui/bar-chart';

// Dashboard section components
const DashboardHome = ({ events }: { events: Event[] }) => {
  const pendingEvents = events.filter(event => event.status === 'pending').length;
  const approvedEvents = events.filter(event => event.status === 'approved').length;
  const totalSubscribers = events.reduce((total, event) => total + (event.subscribers?.length || 0), 0);
  
  // Update analytics data with real event stats
  analyticsData.eventStats = {
    total: events.length,
    active: approvedEvents,
    pending: pendingEvents,
    subscribers: totalSubscribers
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search something..." 
              className="pl-10 bg-background/50 border-muted w-64"
            />
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get the extension
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Website Traffic Card */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-lg font-medium">Website traffic</CardTitle>
            <span className="text-sm">Today</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-5xl font-bold">{analyticsData.websiteTraffic.value}</h3>
                <p className="text-sm text-muted-foreground">Compared to {analyticsData.websiteTraffic.comparedTo}</p>
              </div>
              <div className="space-y-2">
                {analyticsData.websiteTraffic.sources.map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}</span>
                  </div>
                ))}
              </div>
              <div className="h-16 mt-2">
                <svg viewBox="0 0 200 50" className="w-full h-full">
                  <path 
                    d="M0,50 L20,45 L40,48 L60,42 L80,40 L100,35 L120,30 L140,25 L160,15 L180,10 L200,0" 
                    fill="none" 
                    stroke="#F76AD2" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Card - Placeholder for Image */}
        <Card className="bg-gradient-to-br from-[#7E69AB] to-[#6E59A5] text-white overflow-hidden relative">
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F76AD2]/30 to-primary/30 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-[url('/lovable-uploads/8f020028-dc1b-4e5e-b17d-93a2d60f787a.png')] bg-center bg-cover opacity-40"></div>
            </div>
            <div className="relative z-10 mt-auto">
              <Button variant="outline" className="backdrop-blur-sm text-white border-white/20 hover:bg-secondary/80">
                Webscore with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Card - Fixed width issue */}
        <Card className="bg-card dark:bg-[#1A1F2C] dark:text-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Avg. Order Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              18.3%
            </div>
            <div className="h-full w-full">
              <BarChart 
                categories={['10-50', '50-100', '100-150', '150-200', '200-250']}
                series={[
                  {
                    name: "Revenue",
                    data: [15, 25, 10, 18, 29]
                  }
                ]}
                colors={["#36DFBF"]}
                className="h-full w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* ROI Card */}
        <Card className="bg-card dark:bg-[#1A1F2C] dark:text-white col-span-1">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium">ROI</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-primary">{analyticsData.roi.value}</h3>
              <p className="text-sm text-muted-foreground">{analyticsData.roi.label}</p>
              <div className="h-20 mt-4">
                <svg viewBox="0 0 200 50" className="w-full h-full">
                  <path 
                    d="M0,40 L20,42 L40,38 L60,35 L80,30 L100,28 L120,20 L140,15 L160,10 L180,5 L200,10" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-primary"
                    strokeWidth="2"
                  />
                  <path 
                    d="M0,40 L20,42 L40,38 L60,35 L80,30 L100,28 L120,20 L140,15 L160,10 L180,5 L200,10" 
                    fill="url(#gradient)" 
                    fillOpacity="0.2" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" className="text-primary" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bounce Rate Card */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-medium">Bounce Rate</CardTitle>
            <Button variant="ghost" size="sm" className="p-0">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              {analyticsData.bounceRate.days.map((day, index) => (
                <div 
                  key={index} 
                  className={`flex-1 text-center p-2 rounded-lg ${
                    index === 1 ? 'bg-secondary dark:bg-[#1A1F2C] dark:text-white' : 'bg-muted/50'
                  }`}
                >
                  <div className="text-xs">{day.day}</div>
                  <div className="text-xl font-bold">{day.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-secondary dark:bg-[#1A1F2C] dark:text-white p-4 rounded-lg">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold">{analyticsData.bounceRate.value}</span>
                <span className="text-primary text-sm">{analyticsData.bounceRate.increase}</span>
              </div>
              <p className="text-sm text-muted-foreground">{analyticsData.bounceRate.since}</p>
            </div>
          </CardContent>
        </Card>

        {/* Report Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0 h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Person working" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Button className="w-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary dark:bg-[#1A1F2C]/80 dark:hover:bg-[#1A1F2C]">
                <Download className="mr-2 h-4 w-4" />
                Download Weekly Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Events list component
const EventsList = ({ events }: { events: Event[] }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Events List</h2>
        <Button 
          onClick={() => navigate('/create-event')}
          className="bg-[#36DFBF] hover:bg-[#2bc9ab] text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Event
        </Button>
      </div>
      
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
                        className="bg-[#1A1F2C] hover:bg-[#2d3546]"
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
    </div>
  );
};

// Create Event component
const CreateEvent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Create New Event</h2>
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subtitle</label>
                <Input placeholder="Enter event subtitle" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Enter location" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Event Image</label>
                <Input type="file" />
              </div>
            </div>
            <Button className="w-full md:w-auto bg-[#36DFBF] hover:bg-[#2bc9ab] text-black">
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Subscribers component
const Subscribers = ({ events }: { events: Event[] }) => {
  // Get all subscribers from all events
  const allSubscribers = events.flatMap(event => 
    (event.subscribers || []).map(sub => ({
      ...sub,
      eventTitle: event.title,
      eventId: event.id,
      eventDate: new Date(event.startDate).toLocaleDateString()
    }))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Registered Clients</h2>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">WhatsApp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allSubscribers.map((subscriber, index) => (
                  <tr key={index} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">{subscriber.name}</td>
                    <td className="px-6 py-4">{subscriber.whatsapp}</td>
                    <td className="px-6 py-4">{subscriber.eventTitle}</td>
                    <td className="px-6 py-4">{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{subscriber.eventDate}</td>
                  </tr>
                ))}
                {allSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile component
const Profile = ({ user }: { user: any }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-2xl bg-[#7E69AB] text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Member since: {new Date(user?.createdAt).toLocaleDateString()}
            </p>
            <Button className="mt-4 bg-[#1A1F2C] hover:bg-[#2d3546]">
              Change Avatar
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Your email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  placeholder="Leave empty to keep current password"
                />
              </div>
              <Button className="bg-[#36DFBF] hover:bg-[#2bc9ab] text-black">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Dashboard component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="border-r border-border">
          <SidebarHeader className="py-6 flex flex-col items-center justify-center">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarFallback className="text-xl bg-[#7E69AB] text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium">{user.name}</h3>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground mt-1">
                Edit profile
              </Button>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab("home")}
                  isActive={activeTab === "home"}
                >
                  <Activity className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab("events")}
                  isActive={activeTab === "events"}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab("create")}
                  isActive={activeTab === "create"}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Event</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab("subscribers")}
                  isActive={activeTab === "subscribers"}
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Clients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab("profile")}
                  isActive={activeTab === "profile"}
                >
                  <Settings className="h-5 w-5" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="flex justify-center p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "home" && <DashboardHome events={events} />}
          {activeTab === "events" && <EventsList events={events} />}
          {activeTab === "create" && <CreateEvent />}
          {activeTab === "subscribers" && <Subscribers events={events} />}
          {activeTab === "profile" && <Profile user={user} />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
