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
  hero: {
    station: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    exploreApps: string;
    requestApp: string;
    featuredAppsTitle: string;
    featuredAppsSub: string;
    allAppsDirectory: string;
    recentUpdatesTitle: string;
    recentUpdatesSub: string;
  };
  apps: {
    catalogHeader: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    statusLabel: string;
    platformLabel: string;
    allStatuses: string;
    allPlatforms: string;
    modeGrid: string;
    modeRows: string;
    tagsLabel: string;
    showingResults: string;
    ofRepositories: string;
    resetFilters: string;
    noMatchingApps: string;
    noMatchingSub: string;
    viewApp: string;
    download: string;
  };
  appDetail: {
    backToApps: string;
    status: string;
    updated: string;
    problemSolved: string;
    platformsAndTech: string;
    keyFeatures: string;
    screenshots: string;
    changelog: string;
    feedbackHeader: string;
    feedbackSub: string;
  };
  feedback: {
    title: string;
    sub: string;
    nameLabel: string;
    emailLabel: string;
    topicLabel: string;
    messageLabel: string;
    sendButton: string;
    sendingButton: string;
    successTitle: string;
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
      home: '/home',
      apps: '/apps',
      projects: '/projects',
      blogs: '/blog',
      about: '/about',
      staticExport: 'static_export',
    },
    hero: {
      station: 'mzilab@developer-station:~$ ./welcome.sh',
      titleStart: 'Mobile Engineering & ',
      titleHighlight: 'App Showcase',
      subtitle: 'Designed and managed by Farid Oubbati.',
      description:
        'Explore production mobile apps, open-source projects, and technical writeups on Jetpack Compose, Next.js, Rust, and AI-assisted software engineering.',
      exploreApps: 'Explore Apps',
      requestApp: 'Request an App',
      featuredAppsTitle: 'Featured Mobile Apps',
      featuredAppsSub: 'Highlighted applications in active development or beta testing.',
      allAppsDirectory: 'All Apps Directory',
      recentUpdatesTitle: 'Recent Release Notes',
      recentUpdatesSub: 'Latest changelog releases and feature commits.',
    },
    apps: {
      catalogHeader: 'AppForge Catalog',
      title: 'Mobile Applications Directory',
      subtitle:
        'Browse localized apps developed for Algerian merchants, travellers, and everyday users. Filter by platform or release status.',
      searchPlaceholder: 'Search apps by name, description, or keyword...',
      statusLabel: 'Status:',
      platformLabel: 'Platform:',
      allStatuses: 'All Statuses',
      allPlatforms: 'All Platforms',
      modeGrid: 'Grid',
      modeRows: 'Rows',
      tagsLabel: 'Tags:',
      showingResults: 'Showing',
      ofRepositories: 'repositories',
      resetFilters: 'Reset Filters',
      noMatchingApps: 'No apps match the selected filters',
      noMatchingSub: 'Try adjusting your search query or filter selection.',
      viewApp: 'View App',
      download: 'Download',
    },
    appDetail: {
      backToApps: 'Back to all apps',
      status: 'Status:',
      updated: 'Updated',
      problemSolved: 'Real Problem Solved',
      platformsAndTech: 'Platforms & Tech:',
      keyFeatures: 'Key Features',
      screenshots: 'Device Screenshots',
      changelog: 'Release Changelog',
      feedbackHeader: 'Inquiries & Feedback',
      feedbackSub: 'Have a question or feature request? Send a note directly.',
    },
    feedback: {
      title: 'Developer & Visitor Feedback',
      sub: 'Have a question, feature request, or bug report? Send a note straight to our inbox.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      topicLabel: 'Topic / Reference',
      messageLabel: 'Feedback / Inquiry',
      sendButton: 'Send Feedback',
      sendingButton: 'Transmitting...',
      successTitle: 'Message sent successfully!',
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
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'Zero Server / Static Export',
      mdxDriven: 'MDX Driven',
      privacy: '/privacy',
      terms: '/terms',
    },
  },
  fr: {
    nav: {
      home: '/accueil',
      apps: '/applications',
      projects: '/projets',
      blogs: '/blog',
      about: '/a-propos',
      staticExport: 'exportation_statique',
    },
    hero: {
      station: 'mzilab@station-developpeur:~$ ./bienvenue.sh',
      titleStart: 'Ingénierie Mobile & ',
      titleHighlight: 'Vitrine d\'Applications',
      subtitle: 'Conçu et géré par Farid Oubbati.',
      description:
        'Découvrez des applications mobiles, des projets open-source et des articles techniques sur Jetpack Compose, Next.js, Rust et l\'ingénierie assistée par IA.',
      exploreApps: 'Explorer les Apps',
      requestApp: 'Demander une App',
      featuredAppsTitle: 'Applications Mobiles en Vedette',
      featuredAppsSub: 'Applications phares en cours de développement ou en phase de test bêta.',
      allAppsDirectory: 'Toutes les Applications',
      recentUpdatesTitle: 'Notes de Mise à Jour',
      recentUpdatesSub: 'Dernières notes de version et fonctionnalités publiées.',
    },
    apps: {
      catalogHeader: 'Catalogue AppForge',
      title: 'Répertoire des Applications Mobiles',
      subtitle:
        'Consultez des applications conçues pour les commerçants, voyageurs et utilisateurs en Algérie. Filtrez par plateforme ou statut.',
      searchPlaceholder: 'Rechercher une application par nom, description...',
      statusLabel: 'Statut :',
      platformLabel: 'Plateforme :',
      allStatuses: 'Tous les statuts',
      allPlatforms: 'Toutes les plateformes',
      modeGrid: 'Grille',
      modeRows: 'Liste',
      tagsLabel: 'Mots-clés :',
      showingResults: 'Affichage de',
      ofRepositories: 'applications',
      resetFilters: 'Réinitialiser',
      noMatchingApps: 'Aucune application ne correspond à votre recherche',
      noMatchingSub: 'Essayez de modifier votre terme de recherche ou vos filtres.',
      viewApp: 'Voir l\'App',
      download: 'Télécharger',
    },
    appDetail: {
      backToApps: 'Retour aux applications',
      status: 'Statut :',
      updated: 'Mis à jour le',
      problemSolved: 'Problème Concret Résolu',
      platformsAndTech: 'Plateformes & Technologies :',
      keyFeatures: 'Fonctionnalités Clés',
      screenshots: 'Captures d\'Écran',
      changelog: 'Historique des Versions',
      feedbackHeader: 'Questions & Commentaires',
      feedbackSub: 'Une suggestion ou un problème ? Envoyez un message direct.',
    },
    feedback: {
      title: 'Commentaires & Demandes',
      sub: 'Une question ou une suggestion ? Envoyez votre message directement au développeur.',
      nameLabel: 'Nom',
      emailLabel: 'E-mail',
      topicLabel: 'Sujet / Référence',
      messageLabel: 'Message / Commentaire',
      sendButton: 'Envoyer le message',
      sendingButton: 'Transmission...',
      successTitle: 'Message envoyé avec succès !',
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
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'Sans Serveur / Export Statique',
      mdxDriven: 'Alimenté par MDX',
      privacy: '/confidentialite',
      terms: '/conditions',
    },
  },
  ar: {
    nav: {
      home: '/الرئيسية',
      apps: '/التطبيقات',
      projects: '/المشاريع',
      blogs: '/مدونة',
      about: '/عن-الموقع',
      staticExport: 'تصدير_ثابت',
    },
    hero: {
      station: 'mzilab@محطة-المطور:~$ ./مرحبا.sh',
      titleStart: 'هندسة الجوال و ',
      titleHighlight: 'معرض التطبيقات',
      subtitle: 'تصميم وإدارة فريد أوباتي.',
      description:
        'استكشف تطبيقات الجوال والبرمجيات مفتوحة المصدر والمقالات التقنية حول Jetpack Compose و Next.js و Rust والبرمجة المدعومة بالذكاء الاصطناعي.',
      exploreApps: 'تصفح التطبيقات',
      requestApp: 'طلب تطبيق',
      featuredAppsTitle: 'تطبيقات مختارة',
      featuredAppsSub: 'تطبيقات مميزة في مرحلة التطوير النشط أو الاختبار التجريبي.',
      allAppsDirectory: 'دليل جميع التطبيقات',
      recentUpdatesTitle: 'آخر التحديثات والسجلات',
      recentUpdatesSub: 'أحدث ميزات وتحديثات الإصدارات.',
    },
    apps: {
      catalogHeader: 'كتالوج AppForge',
      title: 'دليل تطبيقات الجوال',
      subtitle:
        'تصفح تطبيقات مخصصة للتجار والعائلات والمستخدمين في الجزائر. تصفية حسب المنصة أو حالة الإصدار.',
      searchPlaceholder: 'بحث عن تطبيق بالاسم أو الوصف...',
      statusLabel: 'الحالة:',
      platformLabel: 'المنصة:',
      allStatuses: 'جميع الحالات',
      allPlatforms: 'جميع المنصات',
      modeGrid: 'شبكة',
      modeRows: 'قائمة',
      tagsLabel: 'الوسوم:',
      showingResults: 'عرض',
      ofRepositories: 'تطبيقاً',
      resetFilters: 'إعادة ضبط التصفية',
      noMatchingApps: 'لا توجد تطبيقات تطابق خيارات التصفية',
      noMatchingSub: 'جرب تغيير كلمة البحث أو اختيار منصة أخرى.',
      viewApp: 'عرض التطبيق',
      download: 'تحميل',
    },
    appDetail: {
      backToApps: 'العودة لجميع التطبيقات',
      status: 'الحالة:',
      updated: 'آخر تحديث',
      problemSolved: 'المشكلة الحقيقية المعالجة',
      platformsAndTech: 'المنصات والتقنيات:',
      keyFeatures: 'الميزات الرئيسية',
      screenshots: 'لقطات الشاشة',
      changelog: 'سجل التغييرات والإصدارات',
      feedbackHeader: 'الاستفسارات والملاحظات',
      feedbackSub: 'هل لديك اقتراح أو استفسار؟ أرسل رسالتك مباشرة.',
    },
    feedback: {
      title: 'ملاحظات الزوار والمطورين',
      sub: 'هل لديك سؤال أو فكرة تطبيق؟ أرسل رسالة مباشرة إلى المطور.',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      topicLabel: 'الموضوع / المرجع',
      messageLabel: 'الرسالة / الملاحظات',
      sendButton: 'إرسال الرسالة',
      sendingButton: 'جاري الإرسال...',
      successTitle: 'تم إرسال الرسالة بنجاح!',
    },
    aboutPage: {
      whatIsTitle: 'ما هو mzilab؟',
      whatIsBody:
        'منصة mzilab هي بيئة متخصصة لتطوير البرمجيات والأجهزة الإلكترونية، يصممها ويديرها مطور مستقل. تُعد المنصة مركزًا تفاعليًا لعرض الحلول الرقمية والفيزيائية المخصصة وتنزيلها واختبارها، مع جمع ملاحظات المستخدمين لتطويرها وتحسينها باستمرار.',
      whoAmITitle: 'من أنا؟',
      whoAmIBody:
        'أنا مهندس بشغف عميق بتطوير البرمجيات والهندسة الإلكترونية والتقنيات الناشئة. يركز عملي على تحويل التحديات التقنية والتشغيلية المعقدة إلى تطبيقات ويب وتطبيقات جوال ومشاريع أجهزة مدمجة عالية الأداء والسلاسة.',
      originTitle: 'أصل التسمية "mzi"',
      originBody:
        'يرتبط اسم mzilab ارتباطًا وثيقًا بجذوري؛ حيث أستلهم الاسم من وادي أمزي (Oued M’Zi)، وهو وادٍ نهري شرياني يقع بالقرب من مدينتي الأغواط في الجزائر. ينبع وادي أمزي من جبال الأطلس الصحراوي الخلابة، ويُعد شريان حياة تاريخيًا وبوابة جغرافية تلتقي عندها الهضاب المرتفعة بالصحراء الشاسعة.',
      bridgeTitle: 'الجسر الكبير على وادي أمزي',
      bridgeSub: 'معبر نهري تاريخي • الأغواط، الجزائر',
      cascadeTitle: 'شلالات وادي أمزي الطبيعية',
      cascadeSub: 'جبال الأطلس الصحراوي • الأغواط، الجزائر',
      mapsButton: 'عرض وادي أمزي (الأغواط، الجزائر) على خرائط Google',
    },
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'تصدير ثابت / بدون خادم',
      mdxDriven: 'مدعوم بـ MDX',
      privacy: '/الخصوصية',
      terms: '/الشروط',
    },
  },
};
