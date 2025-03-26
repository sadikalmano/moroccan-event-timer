
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('common.english') },
    { code: 'fr', name: t('common.french') },
    { code: 'ar', name: t('common.arabic') },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const changeLanguage = (code: string) => {
    setLocale(code as 'en' | 'fr' | 'ar');
    setIsLanguageMenuOpen(false);
    
    // Change the URL to reflect the language
    const currentPath = location.pathname;
    let newPath = '';
    
    // Remove existing language prefix if any
    if (currentPath.startsWith('/en/') || currentPath.startsWith('/fr/') || currentPath.startsWith('/ar/')) {
      newPath = currentPath.substring(3);
    } else if (currentPath === '/en' || currentPath === '/fr' || currentPath === '/ar') {
      newPath = '/';
    } else {
      newPath = currentPath;
    }
    
    // Add new language prefix
    if (code !== 'en' && newPath === '/') {
      newPath = `/${code}`;
    } else if (code !== 'en') {
      newPath = `/${code}${newPath}`;
    }
    
    window.history.pushState({}, '', newPath);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || 
             location.pathname === '/en' || 
             location.pathname === '/fr' || 
             location.pathname === '/ar';
    }
    return location.pathname.includes(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gradient">
              Morocco Events
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
              {t('common.home')}
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>
              {t('common.about')}
            </Link>
            <Link to="/login" className={`nav-link ${isActive('/login') ? 'nav-link-active' : ''}`}>
              {t('common.login')}
            </Link>
            <Link to="/register" className={`nav-link ${isActive('/register') ? 'nav-link-active' : ''}`}>
              {t('common.register')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu} 
                className="flex items-center text-foreground/80 hover:text-foreground transition-colors"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">{t('common.language')}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg py-2 z-50 border border-border"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-accent transition-colors ${
                        locale === lang.code ? 'bg-primary/10 font-medium' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/40"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg ${isActive('/') ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg ${isActive('/about') ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.about')}
            </Link>
            <Link 
              to="/login" 
              className={`px-3 py-2 rounded-lg ${isActive('/login') ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.login')}
            </Link>
            <Link 
              to="/register" 
              className={`px-3 py-2 rounded-lg ${isActive('/register') ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.register')}
            </Link>
            
            {/* Language Options */}
            <div className="border-t border-border/40 pt-4">
              <p className="px-3 text-sm text-muted-foreground mb-2">{t('common.language')}</p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    locale === lang.code ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
