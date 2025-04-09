
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Mail, User, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DashboardProfile: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('profile.updateSuccess'),
      description: t('profile.profileUpdated'),
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: t('profile.passwordMismatch'),
        description: t('profile.passwordMismatchDesc'),
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t('profile.passwordUpdateSuccess'),
      description: t('profile.passwordUpdated'),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t('dashboard.profile')}</h1>
        <p className="text-gray-400 mt-1">{t('profile.manageYourProfile')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1 bg-dashboard-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t('profile.yourProfile')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-dashboard-highlight text-dashboard-darker text-4xl">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-dashboard-highlight text-dashboard-darker hover:bg-dashboard-highlight/90"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
              <p className="text-gray-400">{user?.email}</p>
              <div className="mt-2 text-sm text-gray-500">
                {t('profile.memberSince')}: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="col-span-2 bg-dashboard-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t('profile.editYourProfile')}</CardTitle>
            <CardDescription className="text-gray-400">{t('profile.updateYourPersonalInfo')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">{t('profile.fullName')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 bg-dashboard-darker border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">{t('profile.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-dashboard-darker border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-white">{t('profile.organization')}</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="bg-dashboard-darker border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-dashboard-highlight text-dashboard-darker hover:bg-dashboard-highlight/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {t('profile.saveChanges')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Update */}
        <Card className="col-span-3 bg-dashboard-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t('profile.changePassword')}</CardTitle>
            <CardDescription className="text-gray-400">{t('profile.passwordRequirements')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white">{t('profile.currentPassword')}</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="bg-dashboard-darker border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">{t('profile.newPassword')}</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="bg-dashboard-darker border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">{t('profile.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-dashboard-darker border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-dashboard-highlight text-dashboard-darker hover:bg-dashboard-highlight/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {t('profile.updatePassword')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardProfile;
