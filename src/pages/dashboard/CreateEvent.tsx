
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreateEventForm } from '@/components/CreateEventForm';

const CreateEvent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t('dashboard.createEvent')}</h1>
        <p className="text-gray-400 mt-1">{t('dashboard.createEventDescription')}</p>
      </div>
      
      {/* Create Event Form */}
      <div className="bg-dashboard-card border-gray-700 rounded-lg p-6">
        <CreateEventForm />
      </div>
    </div>
  );
};

export default CreateEvent;
