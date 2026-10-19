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
      blogs: 'blog',
      about: 'about',
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
    privacyPage: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: October 2026',
      intro:
        'At mzilab, privacy is a core principle. This platform is built as a zero-server, static website that respects your digital privacy.',
      zeroServerTitle: '1. Zero Tracking & No Server Logging',
      zeroServerBody:
        'We do not run tracking cookies, third-party analytics scripts, or backend user logging. Pages are compiled statically and served directly via CDN.',
      localStorageTitle: '2. Local Storage on Your Device',
      localStorageBody:
        'Your interface choices (theme mode, language selection, and on-page discussion comments) are saved locally in your browser storage (localStorage) and never sold or uploaded to third parties.',
      feedbackTitle: '3. Reviews & Feedback Notifications',
      feedbackBody:
        'When you submit a review or comment on an app, project, or blog post, the feedback is transmitted to our notification endpoint (Web3Forms API) to alert the maintainer (mzilab03dz@gmail.com).',
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
      commentsTitle: '3. Respectful Community Conduct',
      commentsBody:
        'Visitors posting comments, answers, or reviews in the discussion threads agree to maintain respectful, constructive, and relevant communication.',
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
      blogs: 'blog',
      about: 'a-propos',
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
    privacyPage: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Octobre 2026',
      intro:
        'Chez mzilab, la confidentialité est un principe fondamental. Cette plateforme est conçue comme un site statique sans serveur qui respecte votre vie privée numérique.',
      zeroServerTitle: '1. Aucun Suivi & Aucun Journal Serveur',
      zeroServerBody:
        'Nous n\'utilisons aucun cookie de suivi ni outil d\'analyse tiers. Les pages sont compilées de manière statique et servies via CDN.',
      localStorageTitle: '2. Stockage Local sur Votre Appareil',
      localStorageBody:
        'Vos préférences (thème, langue et commentaires) sont enregistrées localement dans votre navigateur (localStorage) et ne sont jamais vendues ni transmises à des tiers.',
      feedbackTitle: '3. Avis & Notifications',
      feedbackBody:
        'Lorsque vous soumettez un avis ou un commentaire, les données sont transmises via l\'API Web3Forms pour alerter le développeur (mzilab03dz@gmail.com).',
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
        'Les utilisateurs publiant des commentaires s\'engagent à maintenir des échanges respectueux, constructifs et pertinents.',
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
      apps: 'تطبيقات',
      projects: 'مشاريع',
      blogs: 'مدونة',
      about: 'عن الموقع',
      staticExport: 'تصدير_ثابت',
    },
    hero: {
      station: 'mzilab@محطة-المطور:~$ ./مرحبا.sh',
      titleStart: 'هندسة الجوال و ',
      titleHighlight: 'معرض التطبيقات',
      subtitle: 'تصميم وإدارة فريد أوباتي.',
      description:
        'استكشف تطبيقات الجوال والمشاريع مفتوحة المصدر والمقالات التقنية حول Jetpack Compose و Next.js و Rust والذكاء الاصطناعي.',
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
      searchPlaceholder: 'البحث عن تطبيق بالاسم أو الوصف...',
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
      problemSolved: 'المشكلة المعالجة',
      platformsAndTech: 'المنصات والتقنيات:',
      keyFeatures: 'الميزات الرئيسية',
      screenshots: 'لقطات الشاشة',
      changelog: 'سجل الإصدارات',
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
      whatIsTitle: 'ما هو موقع mzilab؟',
      whatIsBody:
        'منصة mzilab هي بيئة متخصصة لتطوير البرمجيات والأجهزة الإلكترونية، يصممها ويديرها مطور مستقل. تُعد المنصة مركزًا تفاعليًا لعرض الحلول الرقمية والفيزيائية المخصصة وتنزيلها واختبارها، مع جمع ملاحظات المستخدمين لتطويرها وتحسينها باستمرار.',
      whoAmITitle: 'من أنا؟',
      whoAmIBody:
        'أنا مهندس بشغف عميق بتطوير البرمجيات والهندسة الإلكترونية والتقنيات الناشئة. يركز عملي على تحويل التحديات التقنية والتشغيلية المعقدة إلى تطبيقات ويب وتطبيقات جوال ومشاريع أجهزة مدمجة عالية الأداء والسلاسة.',
      originTitle: 'أصل التسمية "أمزي"',
      originBody:
        'يرتبط اسم mzilab ارتباطًا وثيقًا بجذوري؛ حيث أستلهم الاسم من وادي أمزي (Oued M’Zi)، وهو وادٍ نهري حيوي يقع بالقرب من مدينتي الأغواط في الجزائر. ينبع وادي أمزي من جبال الأطلس الصحراوي الخلابة، ويُعد شريان حياة تاريخيًا وبوابة جغرافية تلتقي عندها الهضاب المرتفعة بالصحراء الشاسعة.',
      bridgeTitle: 'الجسر الكبير على وادي أمزي',
      bridgeSub: 'معبر نهري تاريخي • الأغواط، الجزائر',
      cascadeTitle: 'شلالات وادي أمزي الطبيعية',
      cascadeSub: 'جبال الأطلس الصحراوي • الأغواط، الجزائر',
      mapsButton: 'عرض وادي أمزي (الأغواط، الجزائر) على خرائط Google',
    },
    privacyPage: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: أكتوبر 2026',
      intro:
        'في منصة mzilab، تُعد الخصوصية مبدأً أساسياً. تم تصميم هذه المنصة كموقع ثابت بدون خادم يحترم خصوصيتك الرقمية.',
      zeroServerTitle: '1. عدم التتبع وعدم تسجيل البيانات على الخادم',
      zeroServerBody:
        'نحن لا نستخدم ملفات تعريف الارتباط للتتبع ولا أدوات التحليل الخاصة بجهات خارجية. يتم تجميع الصفحات بشكل ثابت وتوزيعها عبر شبكات CDN.',
      localStorageTitle: '2. التخزين المحلي على جهازك',
      localStorageBody:
        'يتم حفظ خياراتك (المظهر، اللغة، والملاحظات) محلياً في متصفحك (localStorage)، ولا يتم بيعها أو مشاركتها مع أي طرف ثالث.',
      feedbackTitle: '3. التقييمات وإشعارات الملاحظات',
      feedbackBody:
        'عند إرسال تقييم أو تعليق، يتم إرسال البيانات عبر خدمة Web3Forms لإخطار المطور (mzilab03dz@gmail.com).',
      mobileAppsTitle: '4. تطبيقات الجوال',
      mobileAppsBody:
        'تعمل تطبيقات الجوال الخاصة بنا (Android و iOS) وفق نموذج يركز على الخصوصية. تبقى جميع البيانات المحلية مخزنة على جهازك فقط.',
      contactTitle: '5. التواصل والاستفسارات',
      contactBody:
        'إذا كانت لديك أي استفسارات بخصوص الخصوصية، يمكنك التواصل معنا مباشرة عبر mzilab03dz@gmail.com.',
    },
    termsPage: {
      title: 'شروط الخدمة',
      lastUpdated: 'آخر تحديث: أكتوبر 2026',
      intro:
        'مرحباً بك في منصة mzilab. عند وصولك إلى هذا الموقع أو تنزيل التطبيقات والتوثيق التقني، فإنك توافق على شروط الخدمة هذه.',
      licenseTitle: '1. ترخيص عرض البرمجيات والمحتوى',
      licenseBody:
        'جميع التطبيقات والبرمجيات والمقالات التقنية المعروضة على mzilab مقدمة لأغراض العرض الشخصي والاختبار والتعليم.',
      asIsTitle: '2. تقديم الخدمة "كما هي" دون ضمانات',
      asIsBody:
        'تُقدم البرمجيات والأكواد "كما هي" دون أي ضمانات صريحة أو ضمنية. ويكون الاستخدام والاختبار وفقاً لتقديرك الخاص.',
      commentsTitle: '3. السلوك المحترم في النقاشات',
      commentsBody:
        'يتعهد الزوار الذين ينشرون التعليقات بالحفاظ على نقاشات محترمة وبناءة وذات صلة بالمواضيع المعروضة.',
      ipTitle: '4. الملكية الفكرية',
      ipBody:
        'تظل العلامة التجارية mzilab والتوثيق والتصاميم الأصلية ملكاً لـ فريد أوباتي / mzilab.',
      contactTitle: '5. التواصل والدعم',
      contactBody:
        'للاستفسارات أو طلبات الميزات والدعم التقني، يمكنك مراسلتنا عبر mzilab03dz@gmail.com.',
    },
    footer: {
      copy: 'mzilab © 2026',
      zeroServer: 'تصدير ثابت / بدون خادم',
      mdxDriven: 'مدعوم بـ MDX',
      privacy: 'الخصوصية',
      terms: 'الشروط',
    },
  },
};
