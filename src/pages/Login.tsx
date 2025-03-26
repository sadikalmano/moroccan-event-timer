
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login, error, isLoading, user, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    // Show error toast if there's an authentication error
    if (error) {
      toast({
        title: t('auth.loginFailed'),
        description: error,
        variant: 'destructive'
      });
      clearError();
    }
  }, [error, toast, clearError, t]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      // Error is handled in the auth context
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card shadow-lg rounded-2xl px-8 pt-8 pb-10 border border-border">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn size={32} className="text-primary" />
              </div>
            </motion.div>
            
            <h2 className="text-2xl font-bold">{t('auth.loginTitle')}</h2>
            <p className="text-muted-foreground mt-2">{t('auth.loginSubtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field w-full pl-10"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  {t('auth.rememberMe')}
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-primary hover:text-primary/80">
                  {t('auth.forgotPassword')}
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                {t('auth.signIn')}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              {t('auth.noAccount')} {' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
