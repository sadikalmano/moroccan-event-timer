
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const location = useLocation();
  const { locale } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
        <p className="text-xl text-foreground/80 mb-8">
          {locale === 'ar' ? 'عذراً! الصفحة غير موجودة' : (locale === 'fr' ? 'Oops! Page non trouvée' : 'Oops! Page not found')}
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          {locale === 'ar' ? 'العودة إلى الرئيسية' : (locale === 'fr' ? 'Retour à l\'accueil' : 'Return to Home')}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
