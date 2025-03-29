
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface CountdownTimerProps {
  targetDate: string | number | Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        // Event has already passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    // Calculate initial time difference
    calculateTimeLeft();

    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const isDark = theme === 'dark';

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="flex flex-col items-center">
          <div className={`${isDark ? 'bg-[#1A1F2C]' : 'bg-[#242C4C]'} rounded-lg w-full aspect-square flex items-center justify-center shadow-md relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <span className={`${isDark ? 'text-primary' : 'text-white'} text-2xl md:text-3xl font-bold z-10`}>{formatNumber(timeLeft.days)}</span>
          </div>
          <div className="text-xs md:text-sm text-foreground/70 mt-2 uppercase font-medium">{t('common.days')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`${isDark ? 'bg-[#1A1F2C]' : 'bg-[#242C4C]'} rounded-lg w-full aspect-square flex items-center justify-center shadow-md relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <span className={`${isDark ? 'text-primary' : 'text-white'} text-2xl md:text-3xl font-bold z-10`}>{formatNumber(timeLeft.hours)}</span>
          </div>
          <div className="text-xs md:text-sm text-foreground/70 mt-2 uppercase font-medium">{t('common.hours')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`${isDark ? 'bg-[#1A1F2C]' : 'bg-[#242C4C]'} rounded-lg w-full aspect-square flex items-center justify-center shadow-md relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <span className={`${isDark ? 'text-primary' : 'text-white'} text-2xl md:text-3xl font-bold z-10`}>{formatNumber(timeLeft.minutes)}</span>
          </div>
          <div className="text-xs md:text-sm text-foreground/70 mt-2 uppercase font-medium">{t('common.minutes')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`${isDark ? 'bg-[#1A1F2C]' : 'bg-[#242C4C]'} rounded-lg w-full aspect-square flex items-center justify-center shadow-md relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <span className={`${isDark ? 'text-primary' : 'text-white'} text-2xl md:text-3xl font-bold z-10`}>{formatNumber(timeLeft.seconds)}</span>
          </div>
          <div className="text-xs md:text-sm text-foreground/70 mt-2 uppercase font-medium">{t('common.seconds')}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
