
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-[#1A1F2C] rounded-lg w-full aspect-square flex items-center justify-center">
            <span className="text-[#ea384c] text-3xl md:text-4xl font-bold">{formatNumber(timeLeft.days)}</span>
          </div>
          <div className="text-sm text-foreground/70 mt-2 uppercase">{t('common.days')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-[#1A1F2C] rounded-lg w-full aspect-square flex items-center justify-center">
            <span className="text-[#ea384c] text-3xl md:text-4xl font-bold">{formatNumber(timeLeft.hours)}</span>
          </div>
          <div className="text-sm text-foreground/70 mt-2 uppercase">{t('common.hours')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-[#1A1F2C] rounded-lg w-full aspect-square flex items-center justify-center">
            <span className="text-[#ea384c] text-3xl md:text-4xl font-bold">{formatNumber(timeLeft.minutes)}</span>
          </div>
          <div className="text-sm text-foreground/70 mt-2 uppercase">{t('common.minutes')}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-[#1A1F2C] rounded-lg w-full aspect-square flex items-center justify-center">
            <span className="text-[#ea384c] text-3xl md:text-4xl font-bold">{formatNumber(timeLeft.seconds)}</span>
          </div>
          <div className="text-sm text-foreground/70 mt-2 uppercase">{t('common.seconds')}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
