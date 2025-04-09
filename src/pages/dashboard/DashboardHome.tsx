
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bell, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { analyticsData } from '@/utils/data';
import { BarChart } from '@/components/ui/bar-chart';

const DashboardHome: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('dashboard.analytics')}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={t('dashboard.searchPlaceholder')} 
              className="pl-10 bg-dashboard-card border-gray-700 text-white w-64" 
            />
          </div>
          
          <Button variant="outline" className="border-gray-700 bg-dashboard-card text-white">
            {t('dashboard.getExtension')}
          </Button>
          
          <Button size="icon" variant="outline" className="border-gray-700 bg-dashboard-card text-white relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-dashboard-accent rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Website Traffic Card */}
        <Card className="bg-dashboard-card border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.websiteTraffic')}</CardTitle>
            <Tabs defaultValue="today" className="w-auto">
              <TabsList className="bg-dashboard-darker">
                <TabsTrigger value="today" className="text-xs">{t('dashboard.today')}</TabsTrigger>
                <TabsTrigger value="week" className="text-xs">{t('dashboard.week')}</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">{t('dashboard.month')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-5xl font-bold mb-1">{analyticsData.websiteTraffic.value}</h3>
              <p className="text-sm text-gray-400">
                {t('dashboard.comparedTo', { period: analyticsData.websiteTraffic.comparedTo })}
              </p>
              
              <div className="mt-8 space-y-4">
                {analyticsData.websiteTraffic.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="font-semibold">{source.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Stylized line chart */}
              <div className="relative h-12 mt-6">
                <div className="absolute bottom-0 left-0 right-0 h-12">
                  <div className="absolute bottom-0 right-0 left-0 h-12 bg-dashboard-highlight/10 rounded-lg"></div>
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-dashboard-highlight/50 to-dashboard-highlight/5"
                    style={{ clipPath: 'polygon(0 100%, 5% 80%, 10% 90%, 20% 70%, 30% 80%, 40% 60%, 50% 70%, 60% 50%, 70% 60%, 80% 40%, 90% 20%, 100% 0, 100% 100%)' }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-gray-700 text-white overflow-hidden">
          <CardContent className="p-0 h-full">
            <div className="relative h-full flex flex-col justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <div className="relative z-10">
                <Button className="mb-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  {t('dashboard.webscoreWithAI')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-dashboard-card border-gray-700 text-white">
          <CardHeader>
            <CardTitle>{t('dashboard.avgOrderRevenue')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <div className="absolute top-2 right-4 bg-white text-dashboard-darker text-xs px-2 py-1 rounded-full">
                18.3%
              </div>
              <BarChart 
                data={[
                  { label: "10-50", value: 12 },
                  { label: "50-100", value: 18 },
                  { label: "100-150", value: 15 },
                  { label: "150-200", value: 22 },
                  { label: "200-250", value: 30 },
                ]}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* ROI */}
        <Card className="bg-dashboard-card border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{t('dashboard.roi')}</CardTitle>
            <Button variant="ghost" className="text-xs h-8 px-2 text-gray-400">
              {t('dashboard.details')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-5xl font-bold text-dashboard-highlight">{analyticsData.roi.value}</h3>
              <p className="text-sm text-gray-400">{analyticsData.roi.label}</p>
              
              {/* Stylized area chart */}
              <div className="relative h-28 mt-6">
                <div className="flex items-end justify-between h-full gap-2">
                  {[20, 35, 28, 45, 35, 55, 40, 60, 55, 70, 65, 90].map((h, i) => (
                    <div key={i} className="h-full flex-1 flex flex-col justify-end">
                      <div 
                        className="bg-gray-600 rounded-t-sm w-full" 
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(116,244,242,0.2) 0%, rgba(116,244,242,0) 100%)',
                    clipPath: 'polygon(0 80%, 8% 70%, 16% 80%, 25% 60%, 33% 70%, 41% 50%, 50% 60%, 58% 40%, 66% 50%, 75% 25%, 83% 35%, 91% 20%, 100% 10%, 100% 100%, 0 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 border-t-2 border-dashboard-highlight pointer-events-none"
                  style={{ 
                    clipPath: 'polygon(0 0, 8% 40%, 16% 20%, 25% 60%, 33% 40%, 41% 80%, 50% 60%, 58% 100%, 66% 60%, 75% 100%, 83% 80%, 91% 100%, 100% 0)'
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bounce Rate */}
        <Card className="bg-dashboard-card border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {t('dashboard.bounceRate')}
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="grid grid-cols-4 gap-2 text-center mb-6">
              {['Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                <div key={i} className={`p-3 rounded-lg ${day === 'Tue' ? 'bg-dashboard-dark text-dashboard-highlight' : 'bg-transparent text-gray-300'}`}>
                  <div className="text-xs mb-1">{day}</div>
                  <div className="font-semibold">{i + 6}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-dashboard-dark rounded-lg p-4">
              <div className="text-5xl font-bold">{analyticsData.bounceRate.value}</div>
              <div className="flex items-center text-sm mt-1">
                <span className="text-green-400">{analyticsData.bounceRate.increase}</span>
                <span className="text-gray-400 ml-1.5">{analyticsData.bounceRate.since}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Report */}
        <Card className="bg-dashboard-card border-gray-700 text-white overflow-hidden">
          <CardContent className="p-0 h-full">
            <div className="h-full relative">
              <img 
                src="/lovable-uploads/2480aa38-4617-4533-b1b8-fed0c785c863.png" 
                alt="Weekly Report" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dashboard-darker to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Button className="w-full flex items-center justify-center gap-2 bg-dashboard-dark text-white hover:bg-dashboard-dark/80">
                  <Download className="h-4 w-4" />
                  {t('dashboard.downloadWeeklyReport')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
