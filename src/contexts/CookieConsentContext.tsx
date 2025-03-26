
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookieConsentContextType {
  consentGiven: boolean | null;
  acceptCookies: () => void;
  declineCookies: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent !== null) {
      setConsentGiven(savedConsent === 'true');
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setConsentGiven(true);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setConsentGiven(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consentGiven, acceptCookies, declineCookies }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
