
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Clock, ArrowUpRight } from 'lucide-react';

const DashboardActivity: React.FC = () => {
  const { t } = useLanguage();
  
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'event_created',
      title: 'Created new event',
      event: 'Summer Music Festival',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'subscriber_joined',
      title: 'New subscriber',
      event: 'Tech Conference 2025',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'event_updated',
      title: 'Updated event',
      event: 'Art Exhibition Opening',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'subscriber_joined',
      title: 'New subscriber',
      event: 'Summer Music Festival',
      time: '1 day ago'
    },
    {
      id: 5,
      type: 'event_created',
      title: 'Created new event',
      event: 'Tech Conference 2025',
      time: '2 days ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event_created':
        return <Calendar className="h-5 w-5 text-dashboard-highlight" />;
      case 'event_updated':
        return <Activity className="h-5 w-5 text-yellow-400" />;
      case 'subscriber_joined':
        return <ArrowUpRight className="h-5 w-5 text-green-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t('dashboard.activity')}</h1>
        <p className="text-gray-400 mt-1">{t('dashboard.recentActivities')}</p>
      </div>

      {/* Activity Feed */}
      <Card className="bg-dashboard-card border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">{t('dashboard.activityFeed')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1 p-2 rounded-full bg-dashboard-darker">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{activity.title}</h4>
                  <p className="text-dashboard-highlight">{activity.event}</p>
                  <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardActivity;
