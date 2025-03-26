
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Compass, Users, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-accent/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('about.title')}
            </h1>
            <p className="text-xl text-foreground/80">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-lg leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>
          
          {/* Features */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">{t('about.featuresTitle')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
                <Calendar size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {t('about.feature1Title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.feature1Desc')}
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
                <Compass size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {t('about.feature2Title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.feature2Desc')}
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
                <Globe size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {t('about.feature3Title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.feature3Desc')}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Mission */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-3xl font-bold mb-4">{t('about.missionTitle')}</h2>
              <p className="text-lg leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </div>
          </motion.div>
          
          {/* Team */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold">{t('about.teamTitle')}</h2>
              <div className="ml-4 flex-grow h-px bg-border"></div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-8">
                <Users size={64} className="text-primary" />
              </div>
              <div>
                <p className="text-lg leading-relaxed">
                  {t('about.teamDesc')}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Mail size={28} className="mr-3 text-primary" />
                {t('about.contactTitle')}
              </h2>
              <p className="text-lg mb-6">
                {t('about.contactDesc')}
              </p>
              <a 
                href="mailto:info@moroccoevents.com" 
                className="btn-primary inline-flex items-center"
              >
                <Mail size={18} className="mr-2" />
                info@moroccoevents.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
