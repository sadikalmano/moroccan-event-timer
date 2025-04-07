
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { useLanguage } from '../contexts/LanguageContext';
import { getEventsAPI } from '../utils/db';
import { useToast } from '../hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import type { Event, FilterOptions } from '../types';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    city: '',
    category: '',
    sortBy: 'newest'
  });
  
  // Fetch events using React Query
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => getEventsAPI(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Available filter options with proper type casting
  const cities = [...new Set(events.map(event => event.city))] as string[];
  const categories = [...new Set(events.map(event => event.category))] as string[];
  
  // Show error toast if fetching fails
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load events. Please try again later.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);
  
  return (
    <div>
      <Hero />
      
      <div className="section-container" id="events">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            {t('home.upcomingEvents')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"
          />
          
          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder={t('home.searchPlaceholder')}
                className="input-field w-full pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City filter */}
              <div className="relative">
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="input-field w-full appearance-none pr-10"
                >
                  <option value="">{t('home.filterByCity')}</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
              </div>
              
              {/* Category filter */}
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input-field w-full appearance-none pr-10"
                >
                  <option value="">{t('common.filter')} {t('event.category')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
              </div>
              
              {/* Sort filter */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as 'newest' | 'closest' | 'popular' })}
                  className="input-field w-full appearance-none pr-10"
                >
                  <option value="newest">{t('common.sortBy')}: {t('common.newest')}</option>
                  <option value="closest">{t('common.sortBy')}: {t('common.upcoming')}</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
              </div>
            </div>
          </div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Events grid */}
          {!isLoading && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">{t('home.noEvents')}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
