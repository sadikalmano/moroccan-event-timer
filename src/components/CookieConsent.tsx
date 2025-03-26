
import React from 'react';
import { motion } from 'framer-motion';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { useLanguage } from '../contexts/LanguageContext';

const CookieConsent: React.FC = () => {
  const { consentGiven, acceptCookies, declineCookies } = useCookieConsent();
  const { t } = useLanguage();

  // If user has already made a choice, don't show the banner
  if (consentGiven !== null) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="glass max-w-4xl mx-auto p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-foreground text-sm sm:text-base">
          {t('common.cookieConsent')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="text-sm px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/10 transition-colors"
          >
            {t('common.decline')}
          </button>
          <button
            onClick={acceptCookies}
            className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('common.accept')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsent;
