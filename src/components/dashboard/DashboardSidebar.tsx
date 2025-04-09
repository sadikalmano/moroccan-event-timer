
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Calendar, Users, UserCircle, Plus, Settings, ActivityIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();
  
  const menuItems = [
    { 
      path: '/dashboard', 
      icon: <BarChart2 className="w-5 h-5" />, 
      label: t('dashboard.analytics')
    },
    { 
      path: '/dashboard/activity', 
      icon: <ActivityIcon className="w-5 h-5" />, 
      label: t('dashboard.activity')
    },
    { 
      path: '/dashboard/events', 
      icon: <Calendar className="w-5 h-5" />, 
      label: t('dashboard.events')
    },
    { 
      path: '/dashboard/subscribers', 
      icon: <Users className="w-5 h-5" />, 
      label: t('dashboard.registeredClients')
    },
    { 
      path: '/dashboard/events/create', 
      icon: <Plus className="w-5 h-5" />, 
      label: t('dashboard.createEvent')
    },
    { 
      path: '/dashboard/profile', 
      icon: <UserCircle className="w-5 h-5" />, 
      label: t('dashboard.profile')
    },
    { 
      path: '/dashboard/settings', 
      icon: <Settings className="w-5 h-5" />, 
      label: t('dashboard.settings')
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen flex flex-col bg-dashboard-dark text-white w-64 p-4">
      {/* User profile section */}
      <div className="flex flex-col items-center py-8 border-b border-gray-700">
        <Avatar className="w-20 h-20 mb-3">
          <AvatarFallback className="bg-dashboard-highlight text-dashboard-darker text-xl">
            {user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-medium mt-2">{user?.name || t('common.user')}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 text-xs border-gray-600 hover:bg-gray-700"
          asChild
        >
          <Link to="/dashboard/profile">
            {t('dashboard.editProfile')}
          </Link>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-dashboard-highlight/10 text-dashboard-highlight'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Theme switcher */}
      <div className="mt-auto pb-4 flex justify-between items-center px-4 border-t border-gray-700 pt-4">
        <span className="text-sm text-gray-400">{t('common.darkMode')}</span>
        <div className="rounded-full bg-dashboard-card p-1">
          <div className="h-5 w-10 rounded-full bg-dashboard-highlight"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
