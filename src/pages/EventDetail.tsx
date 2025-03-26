
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, User, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getEventById } from '../services/eventService';
import { Event } from '../types';
import CountdownTimer from '../components/CountdownTimer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberWhatsapp, setSubscriberWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        if (!id) {
          setError('Event ID is missing');
          return;
        }
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (err) {
        console.error('Error loading event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriberName.trim() || !subscriberWhatsapp.trim()) {
      toast({
        title: t('common.error'),
        description: t('event.fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Call API to subscribe to event
      const response = await fetch(`/api/events/${id}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: subscriberName,
          whatsapp: subscriberWhatsapp,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe to event');
      }

      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      
      toast({
        title: t('common.success'),
        description: t('event.subscriptionSuccess'),
      });
      
      // Reset form
      setSubscriberName('');
      setSubscriberWhatsapp('');
      
    } catch (err) {
      console.error('Error subscribing to event:', err);
      toast({
        title: t('common.error'),
        description: t('event.subscriptionError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="section-container">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-xl">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="section-container">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">
            {error || t('event.notFound')}
          </h2>
          <Button onClick={() => navigate('/')}>
            {t('common.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === 'fr' ? 'fr-FR' : (locale === 'ar' ? 'ar-MA' : 'en-US'),
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(
      locale === 'fr' ? 'fr-FR' : (locale === 'ar' ? 'ar-MA' : 'en-US'),
      { hour: '2-digit', minute: '2-digit' }
    );
  };

  return (
    <div className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Event details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="mb-4"
              >
                ← {t('common.backToEvents')}
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{event.subtitle}</p>
            </div>

            <div className="relative rounded-xl overflow-hidden mb-8">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('event.date')}</p>
                  <p className="font-medium">{formatDate(event.startDate)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('event.time')}</p>
                  <p className="font-medium">{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('event.location')}</p>
                  <p className="font-medium">{event.location}, {event.city}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('event.organizer')}</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{t('event.about')}</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{event.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">{t('event.subscribers')}</h2>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-lg font-medium">
                  {event.subscribers?.length || 0} {t('event.peopleJoined')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subscribe sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('event.joinEvent')}</CardTitle>
                <CardDescription>{t('event.fillToJoin')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">{t('common.name')}</Label>
                      <Input 
                        id="name" 
                        value={subscriberName}
                        onChange={(e) => setSubscriberName(e.target.value)}
                        placeholder={t('event.yourName')} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="whatsapp">{t('event.whatsapp')}</Label>
                      <Input 
                        id="whatsapp" 
                        value={subscriberWhatsapp}
                        onChange={(e) => setSubscriberWhatsapp(e.target.value)}
                        placeholder={t('event.yourWhatsapp')} 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('common.submitting') : t('event.subscribe')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('event.countdown')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CountdownTimer targetDate={event.startDate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
