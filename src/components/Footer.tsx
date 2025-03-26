
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, locale } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold text-gradient">
              Morocco Events
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your ultimate platform to discover and countdown to the most exciting events and cultural experiences across Morocco.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="font-medium text-lg mb-4">{locale === 'ar' ? 'روابط سريعة' : (locale === 'fr' ? 'Liens Rapides' : 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">{t('common.home')}</Link></li>
              <li><Link to="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors">{t('common.about')}</Link></li>
              <li><Link to="/login" className="text-sm text-foreground/80 hover:text-primary transition-colors">{t('common.login')}</Link></li>
              <li><Link to="/register" className="text-sm text-foreground/80 hover:text-primary transition-colors">{t('common.register')}</Link></li>
            </ul>
          </div>
          
          {/* Cities */}
          <div>
            <h3 className="font-medium text-lg mb-4">{locale === 'ar' ? 'المدن' : (locale === 'fr' ? 'Villes' : 'Cities')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">Rabat</a></li>
              <li><a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">Casablanca</a></li>
              <li><a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">Marrakech</a></li>
              <li><a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">Fes</a></li>
              <li><a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">Tangier</a></li>
            </ul>
          </div>
          
          {/* Contact us */}
          <div>
            <h3 className="font-medium text-lg mb-4">{locale === 'ar' ? 'اتصل بنا' : (locale === 'fr' ? 'Contactez-nous' : 'Contact Us')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-foreground/80">
                <Mail size={16} className="mr-2" />
                <span>info@moroccoevents.com</span>
              </li>
              <li className="text-sm text-foreground/80">
                {locale === 'ar' ? 'الرباط، المغرب' : (locale === 'fr' ? 'Rabat, Maroc' : 'Rabat, Morocco')}
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="text-sm text-primary hover:underline">
                {locale === 'ar' ? 'إرسال رسالة' : (locale === 'fr' ? 'Envoyer un message' : 'Send a Message')}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/60 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Morocco Events Countdown. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : (locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : (locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy')}
            </Link>
            <Link to="/terms-of-service" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              {locale === 'ar' ? 'شروط الخدمة' : (locale === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
