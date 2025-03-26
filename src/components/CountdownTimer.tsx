
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
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs text-muted-foreground">{t('common.days')}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-muted-foreground">{t('common.hours')}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-muted-foreground">{t('common.minutes')}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-muted-foreground">{t('common.seconds')}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
