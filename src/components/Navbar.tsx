
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t, setLocale, locale } = useLanguage();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold text-gradient">
            Lovabl Events
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {t('nav.about')}
              </NavLink>
              {user && (
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {t('nav.dashboard')}
                </NavLink>
              )}
            </div>
          )}

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('common.language')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocale('en')} className={locale === 'en' ? 'bg-muted' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('fr')} className={locale === 'fr' ? 'bg-muted' : ''}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('ar')} className={locale === 'ar' ? 'bg-muted' : ''}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('auth.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t('auth.login')}
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t('auth.register')}
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="flex flex-col p-4 space-y-3 bg-background/95 backdrop-blur-lg">
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink 
                to="/about"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
                }
              >
                {t('nav.about')}
              </NavLink>
              {user && (
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
                  }
                >
                  {t('nav.dashboard')}
                </NavLink>
              )}

              {!user && (
                <>
                  <NavLink 
                    to="/login"
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
                    }
                  >
                    {t('auth.login')}
                  </NavLink>
                  <NavLink 
                    to="/register"
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
                    }
                  >
                    {t('auth.register')}
                  </NavLink>
                </>
              )}

              {user && (
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('auth.logout')}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
