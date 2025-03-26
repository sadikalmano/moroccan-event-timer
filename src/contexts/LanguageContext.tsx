
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Locale } from '../i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Check URL for language preference
    const path = window.location.pathname;
    if (path.startsWith('/fr')) {
      setLocale('fr');
    } else if (path.startsWith('/ar')) {
      setLocale('ar');
    } else {
      // Default to English or check localStorage
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && ['en', 'fr', 'ar'].includes(savedLocale)) {
        setLocale(savedLocale);
      }
    }
  }, []);

  useEffect(() => {
    // Save locale preference
    localStorage.setItem('locale', locale);
    
    // Update HTML lang attribute
    document.documentElement.lang = locale;
    
    // Add RTL direction for Arabic
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[locale];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      current = current[k];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
