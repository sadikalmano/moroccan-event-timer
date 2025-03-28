
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import MetaTags from './MetaTags';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't show navbar/footer on dashboard
  const isDashboard = location.pathname.includes('/dashboard');
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <>
      <MetaTags />
      <div className="flex flex-col min-h-screen">
        {!isDashboard && <Navbar />}
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        {!isDashboard && <Footer />}
        <CookieConsent />
      </div>
    </>
  );
};

export default Layout;
