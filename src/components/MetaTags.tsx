
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  type: string;
}

const MetaTags: React.FC = () => {
  const location = useLocation();
  const { locale } = useLanguage();
  
  // Base URL
  const baseUrl = 'https://moroccoevents.com';
  
  // Default metadata
  const defaultMetaData: MetaData = {
    title: 'Morocco Events Countdown | Discover Moroccan Cultural Experiences',
    description: 'Track and discover upcoming events across Morocco with our real-time countdown platform. From traditional festivals to modern celebrations, explore Morocco\'s vibrant culture.',
    keywords: ['Morocco events', 'Morocco countdown', 'Moroccan festivals', 'Morocco cultural events', 'Morocco tourism', 'Morocco experiences'],
    ogImage: `${baseUrl}/images/morocco-events-og.jpg`,
    type: 'website'
  };
  
  // Page-specific metadata
  const getMetaData = (): MetaData => {
    let metaData = { ...defaultMetaData };
    const path = location.pathname;
    
    // Adjust for language
    if (locale === 'fr') {
      metaData.title = 'Compte à Rebours des Événements au Maroc | Découvrez les Expériences Culturelles Marocaines';
      metaData.description = 'Suivez et découvrez les événements à venir à travers le Maroc avec notre plateforme de compte à rebours en temps réel. Des festivals traditionnels aux célébrations modernes, explorez la culture vibrante du Maroc.';
      metaData.keywords = ['événements au Maroc', 'compte à rebours Maroc', 'festivals marocains', 'événements culturels au Maroc', 'tourisme au Maroc', 'expériences au Maroc'];
    } else if (locale === 'ar') {
      metaData.title = 'العد التنازلي للفعاليات المغربية | اكتشف التجارب الثقافية المغربية';
      metaData.description = 'تتبع واكتشف الفعاليات القادمة في جميع أنحاء المغرب مع منصة العد التنازلي في الوقت الحقيقي. من المهرجانات التقليدية إلى الاحتفالات الحديثة، استكشف ثقافة المغرب النابضة بالحياة.';
      metaData.keywords = ['فعاليات المغرب', 'العد التنازلي المغرب', 'مهرجانات مغربية', 'فعاليات ثقافية مغربية', 'سياحة المغرب', 'تجارب المغرب'];
    }
    
    // Page-specific metadata
    if (path.includes('/about')) {
      if (locale === 'en') {
        metaData.title = 'About Us | Morocco Events Countdown';
        metaData.description = 'Learn about our mission to showcase Morocco\'s rich cultural events and provide a seamless countdown experience for local and international audiences.';
      } else if (locale === 'fr') {
        metaData.title = 'À Propos | Compte à Rebours des Événements au Maroc';
        metaData.description = 'Découvrez notre mission pour mettre en valeur les riches événements culturels du Maroc et offrir une expérience de compte à rebours fluide pour les publics locaux et internationaux.';
      } else if (locale === 'ar') {
        metaData.title = 'من نحن | العد التنازلي للفعاليات المغربية';
        metaData.description = 'تعرف على مهمتنا في عرض الفعاليات الثقافية الغنية في المغرب وتقديم تجربة عد تنازلي سلسة للجماهير المحلية والدولية.';
      }
    } else if (path.includes('/login')) {
      if (locale === 'en') {
        metaData.title = 'Login | Morocco Events Countdown';
        metaData.description = 'Sign in to your account to manage events, set reminders, and customize your Morocco Events experience.';
      } else if (locale === 'fr') {
        metaData.title = 'Connexion | Compte à Rebours des Événements au Maroc';
        metaData.description = 'Connectez-vous à votre compte pour gérer les événements, définir des rappels et personnaliser votre expérience des événements au Maroc.';
      } else if (locale === 'ar') {
        metaData.title = 'تسجيل الدخول | العد التنازلي للفعاليات المغربية';
        metaData.description = 'قم بتسجيل الدخول إلى حسابك لإدارة الفعاليات وضبط التذكيرات وتخصيص تجربتك مع فعاليات المغرب.';
      }
    } else if (path.includes('/register')) {
      if (locale === 'en') {
        metaData.title = 'Register | Morocco Events Countdown';
        metaData.description = 'Create an account to publish your Moroccan events, connect with attendees, and grow your audience.';
      } else if (locale === 'fr') {
        metaData.title = 'Inscription | Compte à Rebours des Événements au Maroc';
        metaData.description = 'Créez un compte pour publier vos événements marocains, vous connecter avec les participants et développer votre audience.';
      } else if (locale === 'ar') {
        metaData.title = 'التسجيل | العد التنازلي للفعاليات المغربية';
        metaData.description = 'أنشئ حسابًا لنشر فعالياتك المغربية والتواصل مع الحاضرين وتنمية جمهورك.';
      }
    }
    
    return metaData;
  };
  
  const metaData = getMetaData();
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  
  // Generate structured data
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebApplication",
    "name": metaData.title,
    "url": canonicalUrl,
    "description": metaData.description,
    "author": {
      "@type": "Organization",
      "name": "Morocco Events Countdown"
    },
    "applicationCategory": "EventApplication",
    "keywords": metaData.keywords.join(", ")
  };
  
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />
      <meta name="keywords" content={metaData.keywords.join(', ')} />
      <meta name="language" content={locale} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaData.type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaData.description} />
      <meta property="og:image" content={metaData.ogImage} />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : (locale === 'fr' ? 'fr_FR' : 'ar_MA')} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metaData.title} />
      <meta name="twitter:description" content={metaData.description} />
      <meta name="twitter:image" content={metaData.ogImage} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
};

export default MetaTags;
