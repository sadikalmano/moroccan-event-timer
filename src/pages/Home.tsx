
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { useLanguage } from '../contexts/LanguageContext';
import { events } from '../data/events';
import type { Event, FilterOptions } from '../types';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    city: '',
    category: '',
    sortBy: 'newest'
  });
  
  // Available filter options
  const cities = [...new Set(events.map(event => event.city))];
  const categories = [...new Set(events.map(event => event.category))];
  
  useEffect(() => {
    // Apply filters
    let result = [...events];
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchLower) || 
        event.subtitle.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }
    
    // City filter
    if (filters.city) {
      result = result.filter(event => event.city === filters.city);
    }
    
    // Category filter
    if (filters.category) {
      result = result.filter(event => event.category === filters.category);
    }
    
    // Sort
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'closest') {
      const now = new Date().getTime();
      result.sort((a, b) => {
        const timeToA = new Date(a.startDate).getTime() - now;
        const timeToB = new Date(b.startDate).getTime() - now;
        return timeToA - timeToB;
      });
      // Only include upcoming events
      result = result.filter(event => new Date(event.startDate) > new Date());
    }
    
    setFilteredEvents(result);
  }, [filters]);
  
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
          
          {/* Events grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">{t('home.noEvents')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
