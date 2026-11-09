export type Locale = 'en' | 'fr' | 'ar';

export interface TranslationDictionary {
  nav: {
    home: string;
    apps: string;
    projects: string;
    blogs: string;
    about: string;
    staticExport: string;
  };
  home: {
    latestArticles: string;
    viewAllArticles: string;
    latestApps: string;
    viewAllApps: string;
    latestProjects: string;
    viewAllProjects: string;
  };
  collections: {
    apps: { catalogHeader: string; title: string; subtitle: string };
    projects: { catalogHeader: string; title: string; subtitle: string };
    blogs: { catalogHeader: string; title: string; subtitle: string };
  };
  cards: {
    details: string;
    githubTitle: string;
    article: string;
    by: string;
    readArticle: string;
  };
  apps: {
    catalogHeader: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    modeLabel: string;
    modeGrid: string;
    modeRows: string;
    gridViewTitle: string;
    rowsViewTitle: string;
    tagsLabel: string;
    showingResults: string;
    ofRepositories: string;
    resetFilters: string;
    clearFilter: string;
    noMatchingApps: string;
    noMatchingSub: string;
    viewApp: string;
    download: string;
    platformLabel: string;
    statusLabel: string;
    categoryLabel: string;
    allPlatforms: string;
    allStatuses: string;
    allCategories: string;
  };
  appDetail: {
    backToApps: string;
    status: string;
    updated: string;
    problemSolved: string;
    platformsAndTech: string;
    keyFeatures: string;
    changelog: string;
    overviewTitle: string;
    downloadAppStore: string;
    downloadPlayStore: string;
    downloadGithub: string;
    feedbackHeader: string;
    feedbackSub: string;
  };
  projectDetail: {
    backToProjects: string;
    status: string;
    techStack: string;
    overviewTitle: string;
    githubRepo: string;
  };
  blogDetail: {
    backToBlogs: string;
    by: string;
  };
  feedback: {
    title: string;
    sub: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    ratingLabel: string;
    starAria: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    honeypotLabel: string;
    sendButton: string;
    sendingButton: string;
    statusSuccess: string;
    statusError: string;
    notConfiguredTitle: string;
    notConfiguredBody: string;
  };
  aboutPage: {
    whatIsTitle: string;
    whatIsBody: string;
    whoAmITitle: string;
    whoAmIBody: string;
    originTitle: string;
    originBody: string;
    bridgeTitle: string;
    bridgeSub: string;
    cascadeTitle: string;
    cascadeSub: string;
    mapsButton: string;
  };
  privacyPage: {
    title: string;
    lastUpdated: string;
    intro: string;
    zeroServerTitle: string;
    zeroServerBody: string;
    localStorageTitle: string;
    localStorageBody: string;
    feedbackTitle: string;
    feedbackBody: string;
    mobileAppsTitle: string;
    mobileAppsBody: string;
    contactTitle: string;
    contactBody: string;
  };
  termsPage: {
    title: string;
    lastUpdated: string;
    intro: string;
    licenseTitle: string;
    licenseBody: string;
    asIsTitle: string;
    asIsBody: string;
    commentsTitle: string;
    commentsBody: string;
    ipTitle: string;
    ipBody: string;
    contactTitle: string;
    contactBody: string;
  };
  footer: {
    copy: string;
    zeroServer: string;
    mdxDriven: string;
    privacy: string;
    terms: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    nav: {
      home: 'home',
      apps: 'apps',
      projects: 'projects',
      blogs: 'blogs',
      about: 'about',
      staticExport: 'static_export',
    },
    home: {
      latestArticles: 'Latest Articles',
      viewAllArticles: 'View all articles',
      latestApps: 'Latest Apps',
      viewAllApps: 'View all apps',
      latestProjects: 'Latest Projects',
      viewAllProjects: 'View all projects',
    },
    collections: {
      apps: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-apps --all',
        title: 'Mobile Applications',
        subtitle:
          'Browse production builds, beta releases, and mobile apps built for iOS, Android, and macOS. Filter by platform or search by tech stack.',
      },
      projects: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-projects --all',
        title: 'Software & Developer Projects',
        subtitle:
          'A collection of open-source libraries, CLI diagnostic tools, web applications, and developer utilities.',
      },
      blogs: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-blogs --all',
        title: 'Blog & Technical Writeups',
        subtitle:
          'Deep dives into mobile performance profiling, Jetpack Compose internals, static web architecture, and AI-assisted software engineering.',
      },
    },
    cards: {
      details: 'Details',
      githubTitle: 'GitHub Repository',
      article: 'Article',
      by: 'By',
      readArticle: 'Read Article',
    },
    apps: {
      catalogHeader: 'App Catalog',
      title: 'Mobile Applications',
      subtitle:
        'Browse production builds, beta releases, and mobile apps built for iOS, Android, and macOS. Filter by platform or search by tech stack.',
      searchPlaceholder: 'Search apps by name, tech stack, or platform...',
      modeLabel: 'Mode:',
      modeGrid: 'Grid',
      modeRows: 'Rows',
      gridViewTitle: 'Grid view',
      rowsViewTitle: 'Rows view',
      tagsLabel: 'Tags:',
      showingResults: 'Showing',
      ofRepositories: 'repositories',
      resetFilters: 'Reset Filters',
      clearFilter: 'Clear filter',
      noMatchingApps: 'No apps match the selected filters',
      noMatchingSub: 'Try adjusting your search query or filter selection.',
      viewApp: 'View App',
      download: 'Download',
      platformLabel: 'Platform:',
      statusLabel: 'Status:',
      categoryLabel: 'Category:',
      allPlatforms: 'All Platforms',
      allStatuses: 'All Statuses',
      allCategories: 'All Categories',
    },
    appDetail: {
      backToApps: 'Back to all apps',
      status: 'Status:',
      updated: 'Updated',
      problemSolved: 'Real Problem Solved',
      platformsAndTech: 'Platforms & Tech:',
      keyFeatures: 'Key Features',
      changelog: 'Release Changelog',
      overviewTitle: 'Architecture & Overview',
      downloadAppStore: 'App Store',
      downloadPlayStore: 'Google Play',
      downloadGithub: 'GitHub Repository',
      feedbackHeader: 'Inquiries & Feedback',
      feedbackSub: 'Have a question or feature request? Send a note directly.',
    },
    projectDetail: {
      backToProjects: 'Back to all projects',
      status: 'Status:',
      techStack: 'Tech Stack:',
      overviewTitle: 'Project Overview',
      githubRepo: 'GitHub Repository',
    },
    blogDetail: {
      backToBlogs: 'Back to all blogs',
      by: 'By {author}',
    },
    feedback: {
      title: 'Developer & Visitor Feedback',
      sub: 'Have a question, feature request, or bug report? Send a note straight to our inbox.',
      nameLabel: 'Name',
      namePlaceholder: 'e.g. Salim B. or Dev Visitor',
      nameError: 'Please enter a name between 2 and 60 characters.',
      ratingLabel: 'Rating (1 - 5 Stars)',
      starAria: 'Rate {star} out of 5 stars',
      messageLabel: 'Feedback / Inquiry',
      messagePlaceholder: 'Share your experience, feature request, or question about {title}...',
      messageError: 'Please enter a message between 10 and 2000 characters.',
      honeypotLabel: 'Leave this field empty',
      sendButton: 'Send Feedback',
      sendingButton: 'Transmitting...',
      statusSuccess: 'Message sent successfully!',
      statusError: 'Something went wrong. Please try again later.',
      notConfiguredTitle: 'Feedback is not configured',
      notConfiguredBody:
        'The site owner must set NEXT_PUBLIC_WEB3FORMS_KEY before messages can be sent.',
    },
    aboutPage: {
      whatIsTitle: 'What is mzilab?',
      whatIsBody:
        'mzilab is a dedicated software and hardware development platform engineered and operated by a solo developer. The platform serves as an interactive hub to showcase, download, and test custom digital and physical solutions while actively gathering user feedback for continuous refinement and growth.',
      whoAmITitle: 'Who am I?',
      whoAmIBody:
        'I am an engineer with a deep passion for software development, hardware engineering, and emerging technologies. My focus is on transforming complex technical and operational challenges into seamless, high-performance web applications, mobile apps, and integrated hardware projects.',
      originTitle: 'The Origin of "mzi"',
      originBody:
        'The name mzilab is deeply tied to my roots. It is inspired by Oued M’Zi, a vital river valley located near my home city of Laghouat, Algeria. Originating in the breathtaking Saharan Atlas mountains, Oued M’Zi serves as a historic life source and a geographic gateway where rugged highlands transition into the expansive desert.',
      bridgeTitle: 'Grand Bridge over Oued M\'Zi',
      bridgeSub: 'Historic River Crossing • Laghouat, Algeria',
      cascadeTitle: 'Oued M\'Zi Natural Cascade',
      cascadeSub: 'Saharan Atlas Mountains • Laghouat, Algeria',
      mapsButton: 'View Oued M\'Zi (Laghouat, Algeria) on Google Maps',
    },
    privacyPage: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: October 2026',
      intro:
        'At mzilab, privacy is a core principle. This platform is built as a zero-server, static website that respects your digital privacy.',
      zeroServerTitle: '1. Zero Tracking & No Server Logging',
      zeroServerBody:
        'We do not run tracking cookies, third-party analytics scripts, or backend user logging. Pages are compiled statically and served directly via CDN, and the fonts are served from this site itself.',
      localStorageTitle: '2. Local Storage on Your Device',
      localStorageBody:
        'Your interface choices (theme mode and language selection) are saved locally in your browser storage (localStorage) and never sold or uploaded to third parties.',
      feedbackTitle: '3. Feedback & Private Messages',
      feedbackBody:
        'App, project, and blog pages include a private feedback form. When you submit it, your name, rating, and message are transmitted via the Web3Forms service to alert the maintainer (mzilab03dz@gmail.com). Nothing is published publicly on the site.',
      mobileAppsTitle: '4. Mobile Applications',
      mobileAppsBody:
        'Our native mobile applications (Android & iOS) operate under a privacy-first model. Any local storage or permissions (such as offline data caching) remain strictly on your device.',
      contactTitle: '5. Contact & Questions',
      contactBody:
        'If you have any questions regarding privacy or data handling, reach out directly at mzilab03dz@gmail.com.',
    },
    termsPage: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: October 2026',
      intro:
        'Welcome to mzilab. By accessing this website or downloading software, applications, or hardware documentation, you agree to these Terms of Service.',
      licenseTitle: '1. Software & Content Showcase',
      licenseBody:
        'All applications, open-source repositories, and technical articles showcased on mzilab are provided for personal, testing, demonstration, and educational purposes.',
      asIsTitle: '2. Provided "As-Is" Without Warranty',
      asIsBody:
        'Software builds, demonstration applications, and code writeups are provided "As-Is" without express or implied warranties. Use and testing are at your own discretion.',
      commentsTitle: '3. Respectful Conduct',
      commentsBody:
        'Visitors using the private feedback form agree to maintain respectful, constructive, and relevant communication. Submissions are transmitted to the maintainer and are not published on the site.',
      ipTitle: '4. Intellectual Property',
      ipBody:
        'The brand name mzilab, documentation, and original software design belong to Farid Oubbati / mzilab. Open-source projects remain licensed under their respective repository licenses.',
      contactTitle: '5. Contact & Support',
      contactBody:
        'For inquiries, feature requests, or software support, email mzilab03dz@gmail.com.',
    },
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'Zero Server / Static Export',
      mdxDriven: 'MDX Driven',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  fr: {
    nav: {
      home: 'accueil',
      apps: 'applications',
      projects: 'projets',
      blogs: 'blogs',
      about: 'a-propos',
      staticExport: 'exportation_statique',
    },
    home: {
      latestArticles: 'Derniers Articles',
      viewAllArticles: 'Voir tous les articles',
      latestApps: 'Dernières Applications',
      viewAllApps: 'Voir toutes les applications',
      latestProjects: 'Derniers Projets',
      viewAllProjects: 'Voir tous les projets',
    },
    collections: {
      apps: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-apps --all',
        title: 'Applications Mobiles',
        subtitle:
          'Parcourez les versions de production, les bêtas et les applications mobiles pour iOS, Android et macOS. Filtrez par plateforme ou recherchez par technologie.',
      },
      projects: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-projects --all',
        title: 'Projets Logiciels & Outils',
        subtitle:
          'Une collection de bibliothèques open source, d\'outils CLI de diagnostic, d\'applications web et d\'utilitaires développeur.',
      },
      blogs: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-blogs --all',
        title: 'Blog & Articles Techniques',
        subtitle:
          'Plongées dans le profilage des performances mobiles, les rouages de Jetpack Compose, l\'architecture web statique et l\'ingénierie logicielle assistée par IA.',
      },
    },
    cards: {
      details: 'Détails',
      githubTitle: 'Dépôt GitHub',
      article: 'Article',
      by: 'Par',
      readArticle: 'Lire l\'article',
    },
    apps: {
      catalogHeader: 'Catalogue d\'Applications',
      title: 'Applications Mobiles',
      subtitle:
        'Parcourez les versions de production, les bêtas et les applications mobiles pour iOS, Android et macOS. Filtrez par plateforme ou recherchez par technologie.',
      searchPlaceholder: 'Rechercher une application par nom, technologie ou plateforme...',
      modeLabel: 'Mode :',
      modeGrid: 'Grille',
      modeRows: 'Liste',
      gridViewTitle: 'Affichage grille',
      rowsViewTitle: 'Affichage liste',
      tagsLabel: 'Mots-clés :',
      showingResults: 'Affichage de',
      ofRepositories: 'applications',
      resetFilters: 'Réinitialiser',
      clearFilter: 'Effacer le filtre',
      noMatchingApps: 'Aucune application ne correspond à votre recherche',
      noMatchingSub: 'Essayez de modifier votre terme de recherche ou vos filtres.',
      viewApp: 'Voir l\'application',
      download: 'Télécharger',
      platformLabel: 'Plateforme :',
      statusLabel: 'Statut :',
      categoryLabel: 'Catégorie :',
      allPlatforms: 'Toutes les plateformes',
      allStatuses: 'Tous les statuts',
      allCategories: 'Toutes les catégories',
    },
    appDetail: {
      backToApps: 'Retour aux applications',
      status: 'Statut :',
      updated: 'Mis à jour le',
      problemSolved: 'Problème Concret Résolu',
      platformsAndTech: 'Plateformes & Technologies :',
      keyFeatures: 'Fonctionnalités Clés',
      changelog: 'Historique des Versions',
      overviewTitle: 'Architecture & Aperçu',
      downloadAppStore: 'App Store',
      downloadPlayStore: 'Google Play',
      downloadGithub: 'Dépôt GitHub',
      feedbackHeader: 'Questions & Commentaires',
      feedbackSub: 'Une suggestion ou un problème ? Envoyez un message direct.',
    },
    projectDetail: {
      backToProjects: 'Retour aux projets',
      status: 'Statut :',
      techStack: 'Pile technique :',
      overviewTitle: 'Aperçu du projet',
      githubRepo: 'Dépôt GitHub',
    },
    blogDetail: {
      backToBlogs: 'Retour aux articles',
      by: 'Par {author}',
    },
    feedback: {
      title: 'Commentaires & Demandes',
      sub: 'Une question ou une suggestion ? Envoyez votre message directement au développeur.',
      nameLabel: 'Nom',
      namePlaceholder: 'ex. Salim B. ou Visiteur',
      nameError: 'Veuillez saisir un nom entre 2 et 60 caractères.',
      ratingLabel: 'Note (1 à 5 étoiles)',
      starAria: 'Noter {star} sur 5 étoiles',
      messageLabel: 'Message / Commentaire',
      messagePlaceholder: 'Partagez votre expérience, votre demande ou votre question au sujet de {title}...',
      messageError: 'Veuillez saisir un message entre 10 et 2000 caractères.',
      honeypotLabel: 'Laissez ce champ vide',
      sendButton: 'Envoyer le message',
      sendingButton: 'Transmission...',
      statusSuccess: 'Message envoyé avec succès !',
      statusError: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      notConfiguredTitle: 'Les retours ne sont pas configurés',
      notConfiguredBody:
        "Le propriétaire du site doit configurer NEXT_PUBLIC_WEB3FORMS_KEY pour permettre l'envoi de messages.",
    },
    aboutPage: {
      whatIsTitle: 'Qu\'est-ce que mzilab ?',
      whatIsBody:
        'mzilab est une plateforme dédiée au développement logiciel et matériel conçue et gérée par un développeur indépendant. La plateforme sert de centre interactif pour présenter, télécharger et tester des solutions numériques et physiques sur mesure, tout en recueillant activement les retours des utilisateurs pour une amélioration continue.',
      whoAmITitle: 'Qui suis-je ?',
      whoAmIBody:
        'Je suis un ingénieur passionné par le développement logiciel, l\'ingénierie matérielle et les technologies émergentes. Mon objectif est de transformer des défis techniques et opérationnels complexes en applications web, applications mobiles et projets matériels intégrés performants et fluides.',
      originTitle: 'L\'Origine de « mzi »',
      originBody:
        'Le nom mzilab est profondément lié à mes racines. Il s\'inspire de l\'Oued M\'Zi, une vallée fluviale essentielle située près de ma ville natale de Laghouat, en Algérie. Prenant sa source dans les magnifiques montagnes de l\'Atlas saharien, l\'Oued M\'Zi constitue une source de vie historique et une porte géographique où les hauts plateaux rencontrent le vaste désert.',
      bridgeTitle: 'Le Grand Pont sur l\'Oued M\'Zi',
      bridgeSub: 'Traversée historique • Laghouat, Algérie',
      cascadeTitle: 'Cascade Naturelle de l\'Oued M\'Zi',
      cascadeSub: 'Montagnes de l\'Atlas saharien • Laghouat, Algérie',
      mapsButton: 'Voir l\'Oued M\'Zi (Laghouat, Algérie) sur Google Maps',
    },
    privacyPage: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Octobre 2026',
      intro:
        'Chez mzilab, la confidentialité est un principe fondamental. Cette plateforme est conçue comme un site statique sans serveur qui respecte votre vie privée numérique.',
      zeroServerTitle: '1. Aucun Suivi & Aucun Journal Serveur',
      zeroServerBody:
        'Nous n\'utilisons aucun cookie de suivi ni outil d\'analyse tiers. Les pages sont compilées de manière statique et servies via CDN, et les polices sont servies depuis ce site lui-même.',
      localStorageTitle: '2. Stockage Local sur Votre Appareil',
      localStorageBody:
        'Vos préférences d\'interface (mode d\'affichage et langue) sont enregistrées localement dans votre navigateur (localStorage) et ne sont jamais vendues ni transmises à des tiers.',
      feedbackTitle: '3. Retours & Messages Privés',
      feedbackBody:
        'Les pages des applications, projets et articles comportent un formulaire de retour privé. Lorsque vous l\'envoyez, votre nom, votre note et votre message sont transmis via le service Web3Forms pour alerter le responsable (mzilab03dz@gmail.com). Rien n\'est publié publiquement sur le site.',
      mobileAppsTitle: '4. Applications Mobiles',
      mobileAppsBody:
        'Nos applications mobiles (Android & iOS) fonctionnent selon un modèle axé sur la confidentialité. Toutes les données locales restent sur votre appareil.',
      contactTitle: '5. Contact & Questions',
      contactBody:
        'Pour toute question concernant la confidentialité, contactez-nous à mzilab03dz@gmail.com.',
    },
    termsPage: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Dernière mise à jour : Octobre 2026',
      intro:
        'Bienvenue sur mzilab. En accédant à ce site ou en téléchargeant nos applications et documentation, vous acceptez ces conditions d\'utilisation.',
      licenseTitle: '1. Vitrine de Logiciels & Contenus',
      licenseBody:
        'Toutes les applications et articles présentés sur mzilab sont fournis à des fins démonstratives, d\'évaluation et éducatives.',
      asIsTitle: '2. Fourni « En l\'État » sans Garantie',
      asIsBody:
        'Les applications et codes de démonstration sont fournis « en l\'état », sans garantie expresse ou implicite. L\'utilisation se fait à votre entière discrétion.',
      commentsTitle: '3. Conduite Respectueuse',
      commentsBody:
        "Les utilisateurs du formulaire de retour privé s'engagent à maintenir une communication respectueuse, constructive et pertinente. Les envois sont transmis au responsable et ne sont pas publiés sur le site.",
      ipTitle: '4. Propriété Intellectuelle',
      ipBody:
        'La marque mzilab et la documentation originale restent la propriété de Farid Oubbati / mzilab.',
      contactTitle: '5. Contact & Support',
      contactBody:
        'Pour toute question ou demande de support, écrivez à mzilab03dz@gmail.com.',
    },
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'Sans Serveur / Export Statique',
      mdxDriven: 'Alimenté par MDX',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      apps: 'التطبيقات',
      projects: 'المشاريع',
      blogs: 'المدونات',
      about: 'نبذة عني',
      staticExport: 'تصدير_ثابت',
    },
    home: {
      latestArticles: 'أحدث المقالات',
      viewAllArticles: 'عرض كل المقالات',
      latestApps: 'أحدث التطبيقات',
      viewAllApps: 'عرض كل التطبيقات',
      latestProjects: 'أحدث المشاريع',
      viewAllProjects: 'عرض كل المشاريع',
    },
    collections: {
      apps: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-apps --all',
        title: 'تطبيقات الجوال',
        subtitle:
          'تصفح إصدارات الإنتاج والإصدارات التجريبية لتطبيقات الجوال على iOS وAndroid وmacOS. اعثر حسب المنصة أو ابحث حسب التقنية.',
      },
      projects: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-projects --all',
        title: 'مشاريع وأدوات البرمجيات',
        subtitle:
          'مجموعة من المكتبات مفتوحة المصدر وأدوات سطر الأوامر للتشخيص وتطبيقات الويب والأدوات المساعدة للمطورين.',
      },
      blogs: {
        catalogHeader: 'mzilab@developer-station:~$ ./list-blogs --all',
        title: 'المدونة والمقالات التقنية',
        subtitle:
          'تحليلات معمقة في قياس أداء الأجهزة المحمولة وآليات Jetpack Compose ومعمارية الويب الثابتة وهندسة البرمجيات بمساعدة الذكاء الاصطناعي.',
      },
    },
    cards: {
      details: 'التفاصيل',
      githubTitle: 'مستودع GitHub',
      article: 'مقال',
      by: 'بقلم',
      readArticle: 'قراءة المقال',
    },
    apps: {
      catalogHeader: 'كتالوج التطبيقات',
      title: 'تطبيقات الجوال',
      subtitle:
        'تصفح إصدارات الإنتاج والإصدارات التجريبية لتطبيقات الجوال على iOS وAndroid وmacOS. اعثر حسب المنصة أو ابحث حسب التقنية.',
      searchPlaceholder: 'ابحث عن التطبيقات بالاسم أو التقنية أو المنصة...',
      modeLabel: 'الوضع:',
      modeGrid: 'شبكي',
      modeRows: 'قائمة',
      gridViewTitle: 'عرض شبكي',
      rowsViewTitle: 'عرض صفوف',
      tagsLabel: 'الوسوم:',
      showingResults: 'عدد التطبيقات المعروضة:',
      ofRepositories: 'إجمالي التطبيقات:',
      resetFilters: 'إعادة ضبط التصفية',
      clearFilter: 'مسح التصفية',
      noMatchingApps: 'لا توجد تطبيقات تطابق خيارات التصفية',
      noMatchingSub: 'جرّب تعديل عبارة البحث أو خيارات التصفية.',
      viewApp: 'عرض التطبيق',
      download: 'تنزيل',
      platformLabel: 'المنصة:',
      statusLabel: 'الحالة:',
      categoryLabel: 'الفئة:',
      allPlatforms: 'جميع المنصات',
      allStatuses: 'جميع الحالات',
      allCategories: 'كل الفئات',
    },
    appDetail: {
      backToApps: 'العودة إلى جميع التطبيقات',
      status: 'الحالة:',
      updated: 'آخر تحديث',
      problemSolved: 'المشكلة التي يحلها التطبيق',
      platformsAndTech: 'المنصات والتقنيات:',
      keyFeatures: 'الميزات الأساسية',
      changelog: 'سجل الإصدارات',
      overviewTitle: 'البنية والنظرة العامة',
      downloadAppStore: 'App Store',
      downloadPlayStore: 'Google Play',
      downloadGithub: 'مستودع GitHub',
      feedbackHeader: 'الاستفسارات والملاحظات',
      feedbackSub: 'هل لديك سؤال أو اقتراح لميزة جديدة؟ أرسل رسالتك مباشرة.',
    },
    projectDetail: {
      backToProjects: 'العودة إلى جميع المشاريع',
      status: 'الحالة:',
      techStack: 'التقنيات المستخدمة:',
      overviewTitle: 'نظرة عامة على المشروع',
      githubRepo: 'مستودع GitHub',
    },
    blogDetail: {
      backToBlogs: 'العودة إلى جميع المقالات',
      by: 'بقلم {author}',
    },
    feedback: {
      title: 'ملاحظات المطورين والزوار',
      sub: 'هل لديك سؤال أو طلب ميزة أو بلاغ عن خلل؟ أرسل رسالتك مباشرة إلى المطور.',
      nameLabel: 'الاسم',
      namePlaceholder: 'مثال: سليم ب. أو زائر',
      nameError: 'يرجى إدخال اسم يتكون من حرفين إلى 60 حرفًا.',
      ratingLabel: 'التقييم (1 - 5 نجوم)',
      starAria: 'تقييم {star} من 5 نجوم',
      messageLabel: 'الملاحظات / الاستفسار',
      messagePlaceholder: 'شارك تجربتك أو طلبك لميزة أو سؤالك حول {title}...',
      messageError: 'يرجى إدخال رسالة تتكون من 10 إلى 2000 حرف.',
      honeypotLabel: 'اترك هذا الحقل فارغًا',
      sendButton: 'إرسال الملاحظات',
      sendingButton: 'جارٍ الإرسال...',
      statusSuccess: 'تم إرسال الرسالة بنجاح!',
      statusError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.',
      notConfiguredTitle: 'الملاحظات غير مُفعّلة',
      notConfiguredBody:
        'يجب على مالك الموقع ضبط NEXT_PUBLIC_WEB3FORMS_KEY قبل أن يصبح إرسال الرسائل ممكنًا.',
    },
    aboutPage: {
      whatIsTitle: 'ما هو موقع mzilab؟',
      whatIsBody:
        'mzilab منصة مخصصة لتطوير البرمجيات والأجهزة، يطوّرها ويديرها مطور مستقل. وهي مساحة تفاعلية لعرض الحلول الرقمية والمادية المخصصة وتنزيلها واختبارها، مع جمع ملاحظات المستخدمين لتحسينها وتطويرها باستمرار.',
      whoAmITitle: 'من أنا؟',
      whoAmIBody:
        'أنا مهندس شغوف بتطوير البرمجيات وهندسة الأجهزة والتقنيات الناشئة. أركز على تحويل التحديات التقنية والتشغيلية المعقدة إلى تطبيقات ويب وجوال عالية الأداء وسهلة الاستخدام، ومشاريع متكاملة تجمع بين البرمجيات والأجهزة.',
      originTitle: 'أصل التسمية "أمزي"',
      originBody:
        'يرتبط اسم mzilab ارتباطاً وثيقاً بجذوري، فهو مستوحى من وادي مِزي (Oued M’Zi)، الواقع قرب مدينتي الأغواط في الجزائر. ينبع الوادي من جبال الأطلس الصحراوي، وقد شكّل عبر التاريخ مصدراً للحياة ومعبراً جغرافياً بين المرتفعات والصحراء الشاسعة.',
      bridgeTitle: 'الجسر الكبير على وادي أمزي',
      bridgeSub: 'معبر تاريخي فوق النهر • الأغواط، الجزائر',
      cascadeTitle: 'شلالات وادي أمزي الطبيعية',
      cascadeSub: 'جبال الأطلس الصحراوي • الأغواط، الجزائر',
      mapsButton: 'عرض وادي مِزي (الأغواط، الجزائر) على خرائط Google',
    },
    privacyPage: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: أكتوبر 2026',
      intro:
        'في mzilab، الخصوصية مبدأ أساسي. صُممت هذه المنصة كموقع ثابت لا يعتمد على خادم، احتراماً لخصوصيتك الرقمية.',
      zeroServerTitle: '1. لا تتبع ولا تسجيل للبيانات على الخادم',
      zeroServerBody:
        'لا نستخدم ملفات تعريف ارتباط للتتبع أو نصوص تحليلات تابعة لجهات خارجية، ولا نسجل بيانات المستخدمين على خادم. تُنشأ الصفحات مسبقاً وتُقدّم مباشرة عبر شبكة توصيل المحتوى (CDN)، وتُقدَّم الخطوط من هذا الموقع نفسه.',
      localStorageTitle: '2. التخزين المحلي على جهازك',
      localStorageBody:
        'تُحفظ تفضيلات واجهة الموقع (المظهر واللغة) محلياً في متصفحك (localStorage)، ولا تُباع أو تُرفع إلى جهات خارجية.',
      feedbackTitle: '3. الملاحظات والرسائل الخاصة',
      feedbackBody:
        'تحتوي صفحات التطبيقات والمشاريع والمقالات على نموذج ملاحظات خاص. عند إرساله، يُنقل اسمك وتقييمك ورسالتك عبر خدمة Web3Forms لإخطار المسؤول (mzilab03dz@gmail.com)، ولا يُنشَر أي شيء علناً على الموقع.',
      mobileAppsTitle: '4. تطبيقات الجوال',
      mobileAppsBody:
        'تعمل تطبيقاتنا الأصلية للهواتف (Android وiOS) وفق نهج يضع الخصوصية أولاً. وتبقى أي بيانات مخزنة محلياً أو أذونات مستخدمة، مثل التخزين المؤقت للبيانات دون اتصال، ضمن نطاق جهازك.',
      contactTitle: '5. التواصل والاستفسارات',
      contactBody:
        'إذا كانت لديك أسئلة حول الخصوصية أو كيفية التعامل مع البيانات، فتواصل معنا عبر mzilab03dz@gmail.com.',
    },
    termsPage: {
      title: 'شروط الخدمة',
      lastUpdated: 'آخر تحديث: أكتوبر 2026',
      intro:
        'مرحباً بك في mzilab. باستخدام هذا الموقع أو تنزيل برمجياته أو تطبيقاته أو وثائقه، فإنك توافق على شروط الخدمة هذه.',
      licenseTitle: '1. عرض البرمجيات والمحتوى',
      licenseBody:
        'تُعرض التطبيقات ومستودعات المشاريع مفتوحة المصدر والمقالات التقنية على mzilab للاستخدام الشخصي والاختبار والعرض والتعلم.',
      asIsTitle: '2. تقديم البرمجيات «كما هي» دون ضمان',
      asIsBody:
        'تُقدّم إصدارات البرمجيات والتطبيقات التجريبية والشروحات البرمجية «كما هي»، دون أي ضمان صريح أو ضمني. ويكون استخدامها واختبارها على مسؤوليتك.',
      commentsTitle: '3. سلوك محترم',
      commentsBody:
        'يلتزم الزوار الذين يستخدمون نموذج الملاحظات الخاصة بأن تكون مساهماتهم محترمة وبنّاءة وذات صلة. تُرسل الرسائل إلى المسؤول ولا تُنشر على الموقع.',
      ipTitle: '4. الملكية الفكرية',
      ipBody:
        'علامة mzilab التجارية والوثائق والتصاميم البرمجية الأصلية مملوكة لفريد أوباتي / mzilab. وتظل المشاريع مفتوحة المصدر خاضعة للتراخيص المحددة في مستودعاتها.',
      contactTitle: '5. التواصل والدعم',
      contactBody:
        'للاستفسارات أو طلب ميزات أو الحصول على دعم للبرمجيات، راسلنا عبر mzilab03dz@gmail.com.',
    },
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'موقع ثابت بلا خادم',
      mdxDriven: 'مبني باستخدام MDX',
      privacy: 'الخصوصية',
      terms: 'الشروط',
    },
  },
};
