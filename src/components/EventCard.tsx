
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CountdownTimer from './CountdownTimer';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const { locale, t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="event-card card-hover overflow-hidden"
    >
      <div className="relative">
        <img 
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 line-clamp-1">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.subtitle}</p>
        
        <div className="flex items-center text-sm text-foreground/70 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(event.startDate).toLocaleDateString(locale === 'fr' ? 'fr-FR' : (locale === 'ar' ? 'ar-MA' : 'en-US'), { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center text-sm text-foreground/70 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.city}, Morocco</span>
        </div>
        
        <div className="flex items-center text-sm text-foreground/70 mb-4">
          <Users className="w-4 h-4 mr-2" />
          <span>{event.subscribers?.length || 0} {t('event.subscribers')}</span>
        </div>
        
        <div className="mb-4">
          <CountdownTimer targetDate={event.startDate} />
        </div>
        
        <Link 
          to={`/events/${event.slug}`} 
          className="block w-full text-center py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
        >
          {t('common.viewMore')}
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
