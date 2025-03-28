export type Locale = 'en' | 'fr' | 'ar';

export const translations = {
  en: {
    common: {
      home: 'Home',
      about: 'About',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      english: 'English',
      french: 'French',
      arabic: 'Arabic',
      viewMore: 'View More',
      loading: 'Loading...',
      search: 'Search',
      filter: 'Filter',
      sortBy: 'Sort By',
      city: 'City',
      date: 'Date',
      newest: 'Newest',
      upcoming: 'Upcoming',
      all: 'All',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      cookieConsent: 'We use cookies to enhance your experience. By using this site, you accept our privacy policy.',
      accept: 'Accept',
      decline: 'Decline',
      logout: 'Logout',
    },
    nav: {
      home: 'Home',
      about: 'About',
      dashboard: 'Dashboard',
    },
    home: {
      title: 'Discover Morocco\'s Upcoming Events',
      subtitle: 'Your Ultimate Countdown to Moroccan Cultural Experiences',
      featuredEvents: 'Featured Events',
      upcomingEvents: 'Upcoming Events',
      noEvents: 'No events found',
      filterByCity: 'Filter by city',
      searchPlaceholder: 'Search events...',
    },
    about: {
      title: 'About Morocco Events Countdown',
      subtitle: 'Your Gateway to Authentic Moroccan Experiences',
      description: 'Morocco Events Countdown is your premier platform for discovering and tracking the most exciting cultural, artistic, and traditional events across Morocco. Our mission is to connect locals and travelers with authentic Moroccan experiences, from vibrant festivals and exhibitions to traditional ceremonies and modern gatherings.',
      featuresTitle: 'Our Features',
      feature1Title: 'Comprehensive Event Listings',
      feature1Desc: 'Discover a wide range of events across Morocco, carefully curated to showcase the country\'s rich cultural heritage and contemporary scene.',
      feature2Title: 'Real-time Countdowns',
      feature2Desc: 'Never miss an event with our precise countdown timers, helping you plan your schedule and make the most of Morocco\'s vibrant event calendar.',
      feature3Title: 'Multi-language Support',
      feature3Desc: 'Experience our platform in English, French, or Arabic, making event discovery accessible to locals and international visitors alike.',
      missionTitle: 'Our Mission',
      missionDesc: 'We are dedicated to promoting Moroccan culture and traditions by providing a platform that highlights the country\'s diverse events and celebrations. Our goal is to enhance cultural exchange and tourism while preserving and showcasing Morocco\'s unique heritage.',
      teamTitle: 'The Team',
      teamDesc: 'Our passionate team of Moroccan culture enthusiasts and tech experts works tirelessly to bring you the most comprehensive and user-friendly event countdown platform.',
      contactTitle: 'Contact Us',
      contactDesc: 'Have questions or suggestions? We\'d love to hear from you! Reach out to our team and help us improve your experience with Morocco Events Countdown.'
    },
    event: {
      startDate: 'Start Date',
      endDate: 'End Date',
      location: 'Location',
      organizer: 'Organizer',
      category: 'Category',
      description: 'Description',
      register: 'Register for this event',
      share: 'Share this event',
      relatedEvents: 'Related Events',
    },
    auth: {
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to your account',
      registerTitle: 'Create an Account',
      registerSubtitle: 'Join our community of event organizers',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      noAccount: 'Don\'t have an account?',
      hasAccount: 'Already have an account?',
      signUp: 'Sign up',
      signIn: 'Sign in',
      name: 'Full Name',
      organization: 'Organization (optional)',
    },
    dashboard: {
      myEvents: 'My Events',
      createEvent: 'Create Event',
      eventStats: 'Event Statistics',
      accountSettings: 'Account Settings',
      pendingApproval: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected',
      draft: 'Draft',
      viewerCount: 'Viewer Count',
      interestClicks: 'Interest Clicks',
      shareCount: 'Share Count',
    },
  },
  fr: {
    common: {
      home: 'Accueil',
      about: 'À propos',
      login: 'Connexion',
      register: 'Inscription',
      dashboard: 'Tableau de bord',
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
      language: 'Langue',
      english: 'Anglais',
      french: 'Français',
      arabic: 'Arabe',
      viewMore: 'Voir plus',
      loading: 'Chargement...',
      search: 'Rechercher',
      filter: 'Filtrer',
      sortBy: 'Trier par',
      city: 'Ville',
      date: 'Date',
      newest: 'Plus récent',
      upcoming: 'À venir',
      all: 'Tout',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
      cookieConsent: 'Nous utilisons des cookies pour améliorer votre expérience. En utilisant ce site, vous acceptez notre politique de confidentialité.',
      accept: 'Accepter',
      decline: 'Refuser',
      logout: 'Déconnexion',
    },
    nav: {
      home: 'Accueil',
      about: 'À propos',
      dashboard: 'Tableau de bord',
    },
    home: {
      title: 'Découvrez les Prochains Événements au Maroc',
      subtitle: 'Votre Compte à Rebours Ultime pour les Expériences Culturelles Marocaines',
      featuredEvents: 'Événements en Vedette',
      upcomingEvents: 'Événements à Venir',
      noEvents: 'Aucun événement trouvé',
      filterByCity: 'Filtrer par ville',
      searchPlaceholder: 'Rechercher des événements...',
    },
    about: {
      title: 'À Propos de Morocco Events Countdown',
      subtitle: 'Votre Passerelle vers des Expériences Marocaines Authentiques',
      description: 'Morocco Events Countdown est votre plateforme de référence pour découvrir et suivre les événements culturels, artistiques et traditionnels les plus passionnants à travers le Maroc. Notre mission est de connecter les locaux et les voyageurs avec des expériences marocaines authentiques, des festivals vibrants et expositions aux cérémonies traditionnelles et rassemblements modernes.',
      featuresTitle: 'Nos Fonctionnalités',
      feature1Title: 'Listes d\'Événements Complètes',
      feature1Desc: 'Découvrez une large gamme d\'événements à travers le Maroc, soigneusement sélectionnés pour mettre en valeur le riche patrimoine culturel et la scène contemporaine du pays.',
      feature2Title: 'Comptes à Rebours en Temps Réel',
      feature2Desc: 'Ne manquez jamais un événement grâce à nos minuteurs précis, vous aidant à planifier votre emploi du temps et à profiter au maximum du calendrier d\'événements vibrant du Maroc.',
      feature3Title: 'Support Multi-langue',
      feature3Desc: 'Utilisez notre plateforme en anglais, français ou arabe, rendant la découverte d\'événements accessible aux habitants et aux visiteurs internationaux.',
      missionTitle: 'Notre Mission',
      missionDesc: 'Nous nous dédions à promouvoir la culture et les traditions marocaines en fournissant une plateforme qui met en valeur les divers événements et célébrations du pays. Notre objectif est d\'améliorer l\'échange culturel et le tourisme tout en préservant et en mettant en avant le patrimoine unique du Maroc.',
      teamTitle: 'L\'Équipe',
      teamDesc: 'Notre équipe passionnée d\'enthousiastes de la culture marocaine et d\'experts technologiques travaille sans relâche pour vous apporter la plateforme de compte à rebours d\'événements la plus complète et conviviale.',
      contactTitle: 'Contactez-Nous',
      contactDesc: 'Avez-vous des questions ou des suggestions? Nous serions ravis de vous entendre! Contactez notre équipe et aidez-nous à améliorer votre expérience avec Morocco Events Countdown.'
    },
    event: {
      startDate: 'Date de début',
      endDate: 'Date de fin',
      location: 'Emplacement',
      organizer: 'Organisateur',
      category: 'Catégorie',
      description: 'Description',
      register: 'S\'inscrire à cet événement',
      share: 'Partager cet événement',
      relatedEvents: 'Événements associés',
    },
    auth: {
      loginTitle: 'Bienvenue à nouveau',
      loginSubtitle: 'Connectez-vous à votre compte',
      registerTitle: 'Créer un Compte',
      registerSubtitle: 'Rejoignez notre communauté d\'organisateurs d\'événements',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      noAccount: 'Vous n\'avez pas de compte?',
      hasAccount: 'Vous avez déjà un compte?',
      signUp: 'S\'inscrire',
      signIn: 'Se connecter',
      name: 'Nom complet',
      organization: 'Organisation (optionnel)',
    },
    dashboard: {
      myEvents: 'Mes Événements',
      createEvent: 'Créer un Événement',
      eventStats: 'Statistiques d\'Événements',
      accountSettings: 'Paramètres du Compte',
      pendingApproval: 'En Attente d\'Approbation',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      draft: 'Brouillon',
      viewerCount: 'Nombre de Vues',
      interestClicks: 'Clics d\'Intérêt',
      shareCount: 'Nombre de Partages',
    },
  },
  ar: {
    common: {
      home: 'الرئيسية',
      about: 'حول',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      dashboard: 'لوحة التحكم',
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
      language: 'اللغة',
      english: 'الإنجليزية',
      french: 'الفرنسية',
      arabic: 'العربية',
      viewMore: 'عرض المزيد',
      loading: 'جاري التحميل...',
      search: 'بحث',
      filter: 'تصفية',
      sortBy: 'ترتيب حسب',
      city: 'المدينة',
      date: 'التاريخ',
      newest: 'الأحدث',
      upcoming: 'القادمة',
      all: 'الكل',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني',
      cookieConsent: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستخدام هذا الموقع، فإنك تقبل سياسة الخصوصية الخاصة بنا.',
      accept: 'قبول',
      decline: 'رفض',
      logout: 'تسجيل الخروج',
    },
    nav: {
      home: 'الرئيسية',
      about: 'حول',
      dashboard: 'لوحة التحكم',
    },
    home: {
      title: 'اكتشف الفعاليات القادمة في المغرب',
      subtitle: 'العد التنازلي المميز للتجارب الثقافية المغربية',
      featuredEvents: 'الفعاليات المميزة',
      upcomingEvents: 'الفعاليات القادمة',
      noEvents: 'لم يتم العثور على فعاليات',
      filterByCity: 'تصفية حسب المدينة',
      searchPlaceholder: 'البحث عن الفعاليات...',
    },
    about: {
      title: 'حول العد التنازلي للفعاليات المغربية',
      subtitle: 'بوابتك إلى تجارب مغربية أصيلة',
      description: 'العد التنازلي للفعاليات المغربية هي منصتك الرئيسية لاكتشاف وتتبع أكثر الفعاليات الثقافية والفنية والتقليدية إثارة في جميع أنحاء المغرب. مهمتنا هي ربط السكان المحليين والمسافرين بتجارب مغربية أصيلة، من المهرجانات النابضة بالحياة والمعارض إلى الاحتفالات التقليدية والتجمعات الحديثة.',
      featuresTitle: 'ميزاتنا',
      feature1Title: 'قوائم شاملة للفعاليات',
      feature1Desc: 'اكتشف مجموعة واسعة من الفعاليات في المغرب، تم اختيارها بعناية لإظهار التراث الث��افي الغني والمشهد المعاصر للبلاد.',
      feature2Title: 'عد تنازلي في الوقت الحقيقي',
      feature2Desc: 'لا تفوت أي فعالية مع موقتات العد التنازلي الدقيقة، مما يساعدك على تخطيط جدولك والاستفادة القصوى من تقويم الفعاليات النابض بالحياة في المغرب.',
      feature3Title: 'دعم متعدد اللغات',
      feature3Desc: 'استخدم منصتنا باللغة الإنجليزية أو الفرنسية أو العربية، مما يجعل اكتشاف الفعاليات متاحًا للسكان المحليين والزوار الدوليين على حد سواء.',
      missionTitle: 'مهمتنا',
      missionDesc: 'نحن ملتزمون بتعزيز الثقافة والتقاليد المغربية من خلال توفير منصة تسلط الضوء على فعاليات واحتفالات البلاد المتنوعة. هدفنا هو تعزيز التبادل الثقافي والسياحة مع الحفاظ على التراث الفريد للمغرب وعرضه.',
      teamTitle: 'الفريق',
      teamDesc: 'يعمل فريقنا المتحمس من عشاق الثقافة المغربية وخبراء التكنولوجيا بلا كلل لتقديم منصة العد التنازلي للفعاليات الأكثر شمولاً وسهولة في الاستخدام.',
      contactTitle: 'اتصل بنا',
      contactDesc: 'هل لديك أسئلة أو اقتراحات؟ نحن نحب أن نسمع منك! تواصل مع فريقنا وساعدنا على تحسين تجربتك مع العد التنازلي للفعاليات المغربية.'
    },
    event: {
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      location: 'الموقع',
      organizer: 'المنظم',
      category: 'الفئة',
      description: 'الوصف',
      register: 'التسجيل في هذه الفعالية',
      share: 'مشاركة هذه الفعالية',
      relatedEvents: 'فعاليات ذات صلة',
    },
    auth: {
      loginTitle: 'مرحبًا بعودتك',
      loginSubtitle: 'تسجيل الدخول إلى حسابك',
      registerTitle: 'إنشاء حساب',
      registerSubtitle: 'انضم إلى مجتمعنا من منظمي الفعاليات',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور?',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      signUp: 'التسجيل',
      signIn: 'تسجيل الدخول',
      name: 'الاسم الكامل',
      organization: 'المنظمة (اختياري)',
    },
    dashboard: {
      myEvents: 'فعالياتي',
      createEvent: 'إنشاء فعالية',
      eventStats: 'إحصائيات الفعاليات',
      accountSettings: 'إعدادات الحساب',
      pendingApproval: 'في انتظار الموافقة',
      approved: 'معتمد',
      rejected: 'مرفوض',
      draft: 'مسودة',
      viewerCount: 'عدد المشاهدات',
      interestClicks: 'نقرات الاهتمام',
      shareCount: 'عدد المشاركات',
    },
  },
};
