
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Globe, Bell, ShieldCheck, Lock, Moon, Sun, PanelLeft } from 'lucide-react';

const DashboardSettings: React.FC = () => {
  const { t, locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t('dashboard.settings')}</h1>
        <p className="text-gray-400 mt-1">{t('dashboard.manageSettings')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appearance Settings */}
        <Card className="bg-dashboard-card border-gray-700 col-span-3 md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <PanelLeft className="h-5 w-5 mr-2" />
              {t('settings.appearance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.darkMode')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.darkModeDesc')}</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-white">{t('settings.language')}</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={locale === 'en' ? 'default' : 'outline'}
                  onClick={() => setLocale('en')}
                  className={locale === 'en' ? 'bg-dashboard-highlight text-dashboard-darker' : 'border-gray-700 text-white'}
                >
                  English
                </Button>
                <Button
                  variant={locale === 'fr' ? 'default' : 'outline'}
                  onClick={() => setLocale('fr')}
                  className={locale === 'fr' ? 'bg-dashboard-highlight text-dashboard-darker' : 'border-gray-700 text-white'}
                >
                  Français
                </Button>
                <Button
                  variant={locale === 'ar' ? 'default' : 'outline'}
                  onClick={() => setLocale('ar')}
                  className={locale === 'ar' ? 'bg-dashboard-highlight text-dashboard-darker' : 'border-gray-700 text-white'}
                >
                  العربية
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-dashboard-card border-gray-700 col-span-3 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              {t('settings.notifications')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.emailNotifications')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.emailNotificationsDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.newSubscribers')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.newSubscribersDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.marketingEmails')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.marketingEmailsDesc')}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-dashboard-card border-gray-700 col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              {t('settings.security')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.twoFactorAuth')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.twoFactorAuthDesc')}</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">{t('settings.sessionTimeout')}</Label>
                <p className="text-gray-400 text-sm">{t('settings.sessionTimeoutDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="bg-dashboard-accent text-white hover:bg-dashboard-accent/90 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                {t('settings.securityCheckup')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
