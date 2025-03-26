
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Building, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const { register, error, isLoading, user, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    terms: false
  });
  
  const [passwordError, setPasswordError] = useState('');
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    // Show error toast if there's an authentication error
    if (error) {
      toast({
        title: t('auth.registerFailed'),
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
    
    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t('auth.passwordsNotMatch'));
      return;
    }
    
    // Validate password strength (at least 8 characters)
    if (formData.password.length < 8) {
      setPasswordError(t('auth.passwordTooShort'));
      return;
    }
    
    try {
      await register(
        formData.name, 
        formData.email, 
        formData.password, 
        formData.organization || undefined
      );
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
        className="w-full max-w-lg"
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
                <UserPlus size={32} className="text-primary" />
              </div>
            </motion.div>
            
            <h2 className="text-2xl font-bold">{t('auth.registerTitle')}</h2>
            <p className="text-muted-foreground mt-2">{t('auth.registerSubtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('auth.name')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field w-full pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    required
                    className={`input-field w-full pl-10 ${passwordError ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-muted-foreground" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className={`input-field w-full pl-10 ${passwordError ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            {passwordError && (
              <div className="text-red-500 text-sm flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {passwordError}
              </div>
            )}
            
            <div>
              <label htmlFor="organization" className="block text-sm font-medium mb-2">
                {t('auth.organization')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className="input-field w-full pl-10"
                  placeholder="Your Organization (Optional)"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                {t('auth.agreeTerms')} <a href="#" className="text-primary hover:underline">{t('auth.termsService')}</a> {t('auth.and')} <a href="#" className="text-primary hover:underline">{t('auth.privacyPolicy')}</a>
              </label>
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
                {t('auth.signUp')}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              {t('auth.hasAccount')} {' '}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
