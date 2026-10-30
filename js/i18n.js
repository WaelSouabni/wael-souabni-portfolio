(() => {
  const select = document.getElementById('languageSelect');
  if (!select) return;
  const original = new Map();
  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
    twitterTitle: document.querySelector('meta[name="twitter:title"]')?.content || '',
    twitterDescription: document.querySelector('meta[name="twitter:description"]')?.content || ''
  };
  const dict = {
    en: {
      title: 'Wael Souabni | Full Stack TypeScript & Next.js Developer in Tunisia',
      description: 'Wael Souabni, Tunisia-based Full Stack developer specializing in TypeScript, Next.js, React and NestJS. Explore my web projects, experience and skills.',
      '.nav-links a': ['About','Skills','Projects','Experience','Playground','Contact'],
      '.hero .badge': 'Open to new opportunities',
      '.hero h1': 'Wael <span class="gradient-text">Souabni</span> — Full Stack TypeScript Developer',
      '.hero-role': '// TypeScript · Next.js · React · NestJS · Tunisia',
      '.hero-tagline': 'I build <strong>modern, robust, multi-brand web platforms</strong>, from APIs to user interfaces, using Next.js, NestJS and MongoDB.',
      '.hero-cta a': ['View my projects','Download my CV','Contact me'],
      '#apropos .section-tag': '01. About',
      '#apropos .section-title': 'Full Stack TypeScript & Next.js Developer in Tunisia.',
      '#apropos .about-text p': [
        'I am <strong>Wael Souabni</strong>, a <strong>Full Stack developer</strong> based in <strong>Djerba, Tunisia</strong>. With <strong>4 years of experience</strong>, I specialize in TypeScript / JavaScript, React, Next.js and NestJS. I turn business needs into maintainable web applications, from user interfaces to APIs. My expertise covers frontend development with React and Next.js, as well as backend development with Node.js and NestJS.',
        'At <strong>YZY Digital</strong>, I work in particular on <strong>Carene Digital</strong>, a multi-brand, multi-tenant insurance platform built as a monorepo (Next.js, NestJS, MongoDB, Keycloak).',
        'I work on business features, authentication, automated testing, debugging and infrastructure.'
      ],
      '#apropos .stats .label': ['years of experience','Stack: frontend, backend & infrastructure','Core ecosystem','Fluent French · intermediate English'],
      '#competences .section-tag': '02. Skills',
      '#competences .section-title': 'My toolkit.',
      '#competences .section-lead': 'An end-to-end TypeScript stack, backed by strong testing, DevOps and security practices.',
      '.skill-card h3': ['Frontend','Backend','Data & CMS','Authentication & security','DevOps & infrastructure','Testing & quality','Cloud & AI','Collaboration'],
      '#projets .section-tag': '03. Projects',
      '#projets .section-title': 'Full Stack web projects and applications.',
      '#projets .section-lead': 'Professional and personal projects showcasing my ability to build web products from frontend to backend and solve concrete needs.',
      '.project-details summary': ['Read the case study','Read the case study'],
      '.case-study-link': ['Read full case study →','Read full case study →','Read full case study →','Read full case study →','View GitHub repository →','View GitHub repository →','Try the demo →','View demo →','View source on GitHub →','View demo →'],
      '.project-details p': [
        '<b>Approach:</b> a shared monorepo foundation, several Next.js applications for different user journeys, NestJS APIs, MongoDB and Keycloak. Brand-specific needs are handled through configuration and theming rather than duplicated applications.',
        '<b>Workflow:</b> retrieve the document from the Veos document system using quote and tenant context, expose processing through <code>POST /api/ocr/analyze</code>, and integrate Mistral Document through Azure AI Foundry. This overview intentionally avoids client-sensitive details.'
      ],
      '.project h3': ['Carene Digital','AI document analysis','Altémed intranet','Umrah management application','StockFlow','FunisLearn','Wael Souabni Portfolio','Amjed Ben Chouikha Portfolio'],
      '.project .context': ['YZY Digital · Insurance platform','Carene Digital · OCR module','YZY Digital · Company intranet','Israa Travel Agency · Web & mobile','Personal project · Inventory & invoicing SaaS','Personal project · Educational games platform','Personal project · Professional portfolio','Client / Freelance project · Professional portfolio'],
      '.project > p:not(.project-meta):not(.problem)': [
        'Multi-brand, multi-tenant insurance platform in a monorepo: NestJS APIs, several Next.js applications (back office, customer area, pricing journey), MongoDB and Keycloak.',
        'Designed the <code>POST /api/ocr/analyze</code> endpoint and integrated Mistral Document through Azure AI Foundry, retrieving documents from the Veos document system by quote and tenant.',
        'Developed and maintained an intranet based on Next.js, Strapi and MySQL, including API design and content management.',
        'Web and mobile Umrah management application: Laravel backend, Vue.js web interfaces and a Flutter mobile app.',
        'Stock and invoicing management SaaS with dashboards, customers, quotes, invoices and role management, documented with Next.js, TypeScript, Prisma and PostgreSQL.',
        'Interactive educational games platform for children, with playful activities and an interface designed for young users. The project focuses on Arabic content and learning through play.',
        'Professional portfolio designed and developed to present my background, Full Stack skills, experience and projects through a responsive, multilingual experience.',
        'Design and development of a professional portfolio with a premium visual identity, interactive experience and mobile-friendly interface.'
      ],
      '.project .project-meta': [
        '<b>Role:</b> Full Stack Developer · business features, frontend, APIs and authentication.',
        '<b>Role:</b> Full Stack Developer · API, AI integration and document processing.',
        '<b>Role:</b> Full Stack Developer · frontend, backend and content management.',
        '<b>Role:</b> Full Stack development · application and data layer.',
        '<b>Role:</b> Full Stack development · interface, interactions and game logic.',
        '<b>Role:</b> Full Stack development · design, frontend, SEO and integration.',
        '<b>Role:</b> Full Stack development · UI integration, responsive design and interactions.'
      ],
      '.project .problem': [
        '<b>Problem solved:</b> quickly onboard partner brands with their own configuration and theme, without duplicating code.',
        '<b>Problem solved:</b> automate reading and processing customer documents to speed up insurance case handling.',
        '<b>Problem solved:</b> centralize internal information and let teams manage their own content through a CMS.',
        '<b>Problem solved:</b> digitize trip organization and pilgrim tracking previously handled manually by the agency.',
        '<b>Goal:</b> centralize stock, customer and invoicing workflows in one application.',
        '<b>Goal:</b> give children a simple, playful digital space to learn through games, adapted to the Tunisian linguistic context.',
        '<b>Goal:</b> give recruiters and clients a clear overview of my expertise and projects.',
        '<b>Goal:</b> showcase Amjed’s profile, skills and work through a professional presentation.'
      ],
      '#parcours .section-tag': '04. Experience',
      '#parcours .section-title': 'Experience & education.',
      '.tl-item h3': ['Full Stack TypeScript / JavaScript Developer','Election polling-station agent','Laravel / Vue.js / Flutter Developer','Community Manager','Professional Master’s — ICT and Tourism Innovation','Laravel / Vue.js / Flutter Developer','Application Designer / Web Developer','Internship','Applied Bachelor’s — Multimedia and Web Development','High school diploma in Experimental Sciences'],
      '.tl-item .org': ['YZY Digital · Djerba','Independent High Authority for Elections (ISIE) · Robbana, Djerba','Israa Travel Agency · Midoun, Djerba','Israa Travel Agency · Djerba','ISET Djerba','Électronique du Sud · Djerba','Be-Soft · El May, Djerba','Tunisie Telecom · Houmt Souk, Djerba','ISET Djerba','Lycée El Mey · Djerba'],
      '.tl-date': ['Aug 2022 — Present','Oct 6, 2024 · Dec 17, 2023 · Jun 25, 2022','Feb 2022 — Jun 2022','Jun 2021 — Aug 2021','Sep 2020 — Jun 2022','Feb 2020 — May 2020','Jan 2019 — Feb 2019','Jan 2018 — Feb 2018','Sep 2017 — Jun 2020','Jun 2017'],
      '.tl-item p': ['Carene Digital (multi-brand insurance), Altémed intranet. Business features, multi-brand theming, Keycloak/NextAuth SSO, Playwright and K6 tests, Docker and Kafka infrastructure.','Participation in election operations and following polling-station procedures.','Design and development of a web and mobile Umrah management application using Laravel, Vue.js and Flutter, with source control on GitHub.','Conceptual study for an Umrah management app; creation of social-media visuals, images and videos; management of comments, direct messages and mentions.','Web and mobile task management application.','News web application built with HTML5, CSS3 and PHP.','Honors: Fairly Good.'],
      '#playground .section-tag': '05. Playground',
      '#playground .section-title': 'Need a short break?',
      '#playground .section-lead': 'Six mini-games built with vanilla JavaScript, no framework, showcasing my frontend approach, interactions and browser-side logic.',
      '.game-tab': ['🐍 Snake','🧠 Tech Memory','❌ Tic-Tac-Toe','💣 Minesweeper','🐤 Flappy Bird','⌨️ Typing'],
      '#snakeMsg': 'Eat technologies to grow. Avoid the walls and your own tail!',
      '#snakeStart': 'Play',
      '.game-side p': ['Use arrow keys or W A S D to move; Space to pause.','On mobile: swipe across the board or use the directional pad.','Find all 8 pairs of technologies from my stack in as few moves as possible.','Play against a small AI and line up three symbols.','Reveal squares without hitting mines.','Fly between pipes and stay in the air as long as possible.','Type the displayed words quickly and accurately.'],
      '.game-stats .k': ['Score','Best','Moves','Time','Pairs','Best'],
      '#snakeRestart': 'Restart',
      '#memRestart': 'New game',
      '#contact .section-tag': '06. Contact',
      '#contact .section-title': 'Let’s work together.',
      '#contact .section-lead': 'Have a project, an opportunity or a question? Send me a message — I’ll get back to you quickly.',
      '#contactDialogTitle': 'Send a message',
      '.contact-dialog-header p': 'Your message will be delivered directly to my inbox.',
      '.contact-field label': ['Name','Email','Subject','Message'],
      '#contactSubmit': 'Send message',
      '#contactLoadingState h4': 'Sending your message…',
      '#contactLoadingState p': 'Your message is being sent. Please wait a moment.',
      '#contactSuccessState h4': 'Message sent!',
      '#contactSuccessState p': 'Thank you for your message. I’ll reply as soon as possible.',
      '#contactSuccessState button': 'Close',
      '#contactErrorState h4': 'Oops, something went wrong',
      '#contactErrorState p': 'Please try again in a few moments.',
      '#contactRetry': 'Try again',
      'footer .footer-inner > p': '© <span id="year"></span> Wael Souabni · Djerba, Tunisia'
    },
    ar: {
      title: 'وائل الصوابني | مطوّر Full Stack باستخدام TypeScript وNext.js في تونس',
      description: 'وائل الصوابني، مطوّر Full Stack في تونس متخصص في TypeScript وNext.js وReact وNestJS. اكتشف مشاريعي وخبرتي ومهاراتي.',
      '.nav-links a': ['نبذة عني','المهارات','المشاريع','المسار المهني','ألعاب وتجارب','اتصل بي'],
      '.hero .badge': 'متاح لفرص مهنية جديدة',
      '.hero h1': 'وائل <span class="gradient-text">الصوابني</span> — مطوّر Full Stack باستخدام TypeScript',
      '.hero-role': '// TypeScript · Next.js · React · NestJS · تونس',
      '.hero-tagline': 'أطوّر <strong>منصات ويب حديثة وقوية ومتعددة العلامات التجارية</strong>، من واجهات API إلى واجهات المستخدم، باستخدام Next.js وNestJS وMongoDB.',
      '.hero-cta a': ['اكتشف مشاريعي','تحميل السيرة الذاتية','تواصل معي'],
      '#apropos .section-tag': '01. نبذة عني',
      '#apropos .section-title': 'مطوّر Full Stack باستخدام TypeScript وNext.js في تونس.',
      '#apropos .about-text p': [
        'أنا <strong>وائل الصوابني</strong>، <strong>مطوّر Full Stack</strong> أعمل من <strong>جربة، تونس</strong>. لدي <strong>4 سنوات من الخبرة</strong> وأتخصص في TypeScript وJavaScript وReact وNext.js وNestJS. أحوّل احتياجات الأعمال إلى تطبيقات ويب قابلة للصيانة، من الواجهات إلى واجهات API. تشمل خبرتي تطوير الواجهات باستخدام React وNext.js والخلفية باستخدام Node.js وNestJS.',
        'في <strong>YZY Digital</strong> أعمل خصوصًا على <strong>Carene Digital</strong>، وهي منصة تأمين متعددة العلامات التجارية والمستأجرين مبنية ضمن مستودع موحّد (Next.js وNestJS وMongoDB وKeycloak).',
        'أعمل على تطوير الوظائف المهنية والمصادقة والاختبارات الآلية وتصحيح الأخطاء والبنية التحتية.'
      ],
      '#apropos .stats .label': ['سنوات من الخبرة','التقنيات: الواجهة والخلفية والبنية التحتية','التقنيات الأساسية','الفرنسية بطلاقة · الإنجليزية بمستوى متوسط'],
      '#competences .section-tag': '02. المهارات',
      '#competences .section-title': 'أدواتي التقنية.',
      '#competences .section-lead': 'منظومة TypeScript متكاملة، مدعومة بخبرة في الاختبارات وDevOps والأمان.',
      '.skill-card h3': ['الواجهة الأمامية','الواجهة الخلفية','البيانات وأنظمة إدارة المحتوى','المصادقة والأمان','DevOps والبنية التحتية','الاختبارات والجودة','السحابة والذكاء الاصطناعي','التعاون'],
      '#projets .section-tag': '03. المشاريع',
      '#projets .section-title': 'مشاريع وتطبيقات ويب متكاملة.',
      '#projets .section-lead': 'مشاريع مهنية وشخصية تبرز قدرتي على بناء منتجات ويب متكاملة من الواجهة إلى الخلفية وحل احتياجات واقعية.',
      '.project-details summary': ['اقرأ دراسة الحالة','اقرأ دراسة الحالة'],
      '.case-study-link': ['اقرأ دراسة الحالة كاملة ←','اقرأ دراسة الحالة كاملة ←','اقرأ دراسة الحالة كاملة ←','اقرأ دراسة الحالة كاملة ←','عرض مستودع GitHub ←','عرض مستودع GitHub ←','جرّب النسخة التجريبية ←','عرض النسخة التجريبية ←','عرض المصدر على GitHub ←','عرض النسخة التجريبية ←'],
      '.project-details p': [
        '<b>النهج:</b> مستودع موحّد كأساس مشترك، وتطبيقات Next.js متعددة لمسارات المستخدمين، وواجهات NestJS، وMongoDB وKeycloak. تتم إدارة خصوصية كل علامة عبر الإعدادات والسمات بدلًا من تكرار التطبيقات.',
        '<b>مسار العمل:</b> استرجاع المستند من نظام Veos وفق سياق عرض السعر والمستأجر، وإتاحة المعالجة عبر <code>POST /api/ocr/analyze</code>، ثم دمج Mistral Document من خلال Azure AI Foundry. يتجنب هذا العرض التفاصيل الحساسة الخاصة بالعملاء.'
      ],
      '.project h3': ['Carene Digital','تحليل المستندات بالذكاء الاصطناعي','بوابة Altémed الداخلية','تطبيق إدارة العمرة','StockFlow','FunisLearn','محفظة وائل الصوابني','محفظة أمجد بن شويخة'],
      '.project .context': ['YZY Digital · منصة تأمين','Carene Digital · وحدة OCR','YZY Digital · بوابة شركة داخلية','Israa Travel Agency · ويب وهاتف','مشروع شخصي · نظام إدارة المخزون والفواتير','مشروع شخصي · منصة ألعاب تعليمية','مشروع شخصي · معرض أعمال مهني','مشروع عميل / عمل حر · معرض أعمال مهني'],
      '.project > p:not(.project-meta):not(.problem)': [
        'منصة تأمين متعددة العلامات التجارية والمستأجرين ضمن مستودع موحّد: واجهات NestJS وتطبيقات Next.js متعددة ولوحة الإدارة ومساحة العملاء ومسار التسعير، مع MongoDB وKeycloak.',
        'تصميم نقطة النهاية <code>POST /api/ocr/analyze</code> ودمج Mistral Document عبر Azure AI Foundry لاسترجاع المستندات من نظام Veos حسب عرض السعر والمستأجر.',
        'تطوير وصيانة بوابة داخلية باستخدام Next.js وStrapi وMySQL، بما يشمل تصميم واجهات API وإدارة المحتوى.',
        'تطبيق ويب وهاتف لإدارة العمرة، بخلفية Laravel وواجهات Vue.js وتطبيق هاتف باستخدام Flutter.',
        'نظام لإدارة المخزون والفواتير والعملاء وعروض الأسعار والصلاحيات، موثّق باستخدام Next.js وTypeScript وPrisma وPostgreSQL.',
        'منصة تفاعلية للألعاب التعليمية الموجّهة للأطفال، تضم أنشطة ممتعة وواجهة مناسبة لصغار السن، مع تركيز على المحتوى العربي والتعلّم من خلال اللعب.',
        'موقع مهني صُمّم وطُوّر لعرض مسيرتي ومهاراتي في Full Stack وخبراتي ومشاريعي ضمن تجربة متجاوبة ومتعددة اللغات.',
        'تصميم وتطوير معرض أعمال مهني بهوية بصرية مميزة وتجربة تفاعلية وواجهة ملائمة للهواتف.'
      ],
      '.project .project-meta': ['<b>الدور:</b> مطوّر Full Stack · وظائف الأعمال والواجهة وواجهات API والمصادقة.','<b>الدور:</b> مطوّر Full Stack · واجهات API والذكاء الاصطناعي ومعالجة المستندات.','<b>الدور:</b> مطوّر Full Stack · الواجهة والخلفية وإدارة المحتوى.','<b>الدور:</b> تطوير Full Stack · التطبيق وطبقة البيانات.','<b>الدور:</b> تصميم وتطوير Full Stack · الواجهة والتفاعلات ومنطق الألعاب.','<b>الدور:</b> تطوير Full Stack · التصميم والواجهة وSEO والتكامل.','<b>الدور:</b> تطوير Full Stack · دمج الواجهة والتصميم المتجاوب والتفاعلات.'],
      '.project .problem': [
        '<b>المشكلة التي تم حلها:</b> إضافة علامات تجارية شريكة بسرعة، لكل منها إعداداتها وتصميمها، دون تكرار الشيفرة.',
        '<b>المشكلة التي تم حلها:</b> أتمتة قراءة مستندات العملاء ومعالجتها لتسريع ملفات التأمين.',
        '<b>المشكلة التي تم حلها:</b> توحيد المعلومات الداخلية وتمكين الفرق من إدارة محتواها عبر نظام CMS.',
        '<b>المشكلة التي تم حلها:</b> رقمنة تنظيم الرحلات ومتابعة المعتمرين بدلًا من الإجراءات اليدوية.',
        '<b>الهدف:</b> توحيد إدارة المخزون والعملاء والفواتير في تطبيق واحد.',
        '<b>الهدف:</b> توفير مساحة رقمية بسيطة وممتعة للأطفال للتعلّم عبر الألعاب، مع مراعاة السياق اللغوي التونسي.',
        '<b>الهدف:</b> تقديم عرض واضح لمهاراتي ومشاريعي أمام مسؤولي التوظيف والعملاء.',
        '<b>الهدف:</b> إبراز مسار أمجد ومهاراته وأعماله من خلال عرض مهني.'
      ],
      '#parcours .section-tag': '04. المسار المهني',
      '#parcours .section-title': 'الخبرات المهنية والتعليم.',
      '.tl-item h3': ['مطوّر Full Stack TypeScript / JavaScript','عون مكتب اقتراع','مطوّر Laravel / Vue.js / Flutter','مدير مجتمع رقمي','ماجستير مهني — تكنولوجيا المعلومات والابتكار السياحي','مطوّر Laravel / Vue.js / Flutter','مصمم تطبيقات / مطوّر ويب','تدريب مهني','إجازة تطبيقية — الوسائط المتعددة وتطوير الويب','بكالوريا في العلوم التجريبية'],
      '.tl-item .org': ['YZY Digital · جربة','الهيئة العليا المستقلة للانتخابات (ISIE) · رَبّانة، جربة','Israa Travel Agency · ميدون، جربة','Israa Travel Agency · جربة','ISET جربة','Électronique du Sud · جربة','Be-Soft · الماي، جربة','Tunisie Telecom · حومة السوق، جربة','ISET جربة','معهد الماي · جربة'],
      '.tl-date': ['أوت 2022 — إلى اليوم','6 أكتوبر 2024 · 17 ديسمبر 2023 · 25 جوان 2022','فيفري 2022 — جوان 2022','جوان 2021 — أوت 2021','سبتمبر 2020 — جوان 2022','فيفري 2020 — ماي 2020','جانفي 2019 — فيفري 2019','جانفي 2018 — فيفري 2018','سبتمبر 2017 — جوان 2020','جوان 2017'],
      '.tl-item p': ['Carene Digital للتأمين متعدد العلامات التجارية وبوابة Altémed الداخلية. تطوير وظائف الأعمال والتصميم متعدد العلامات، والمصادقة عبر Keycloak/NextAuth، واختبارات Playwright وK6، وبنية Docker وKafka.','المشاركة في العمليات الانتخابية واحترام إجراءات وتعليمات مكتب الاقتراع.','تصميم وتطوير تطبيق ويب وهاتف لإدارة العمرة باستخدام Laravel وVue.js وFlutter، مع إدارة الشيفرة المصدرية عبر GitHub.','إعداد دراسة تصورية لتطبيق إدارة العمرة، وإنشاء الصور والتصاميم والفيديوهات لمنصات التواصل، وإدارة التعليقات والرسائل الخاصة والإشارات.','تطبيق ويب وهاتف لإدارة المهام.','تطبيق أخبار باستخدام HTML5 وCSS3 وPHP.','بتقدير حسن.'],
      '#playground .section-tag': '05. ألعاب وتجارب',
      '#playground .section-title': 'هل تحتاج إلى استراحة قصيرة؟',
      '#playground .section-lead': 'ست ألعاب صغيرة بـJavaScript دون إطار عمل، تعرض أسلوبي في الواجهة والتفاعلات والمنطق داخل المتصفح.',
      '.game-tab': ['🐍 Snake','🧠 ذاكرة التقنيات','❌ إكس-أو','💣 كاسح الألغام','🐤 Flappy Bird','⌨️ سرعة الكتابة'],
      '#snakeMsg': 'اجمع التقنيات لتكبر، وتجنّب الجدران وذيلك!',
      '#snakeStart': 'ابدأ اللعب',
      '.game-side p': ['استخدم الأسهم أو W A S D للتحرك، والمسافة للإيقاف المؤقت.','على الهاتف: اسحب إصبعك على اللوحة أو استخدم أزرار الاتجاهات.','اعثر على الأزواج الثمانية من التقنيات بأقل عدد من الحركات.','واجه ذكاءً اصطناعيًا بسيطًا واصطف بثلاثة رموز.','اكشف المربعات دون لمس الألغام.','مرّ بين الأنابيب وحافظ على الطيران لأطول وقت.','اكتب الكلمات المعروضة بسرعة ودقة.'],
      '.game-stats .k': ['النقاط','أفضل نتيجة','الحركات','الوقت','الأزواج','أفضل نتيجة'],
      '#snakeRestart': 'إعادة اللعب',
      '#memRestart': 'لعبة جديدة',
      '#contact .section-tag': '06. اتصل بي',
      '#contact .section-title': 'لنعمل معًا.',
      '#contact .section-lead': 'هل لديك مشروع أو فرصة أو سؤال؟ أرسل لي رسالة وسأجيبك سريعًا.',
      '#contactDialogTitle': 'إرسال رسالة',
      '.contact-dialog-header p': 'ستصل رسالتك مباشرة إلى بريدي الإلكتروني.',
      '.contact-field label': ['الاسم','البريد الإلكتروني','الموضوع','الرسالة'],
      '#contactSubmit': 'إرسال الرسالة',
      '#contactLoadingState h4': 'جارٍ إرسال الرسالة…',
      '#contactLoadingState p': 'يتم إرسال رسالتك الآن. يرجى الانتظار قليلًا.',
      '#contactSuccessState h4': 'تم إرسال الرسالة!',
      '#contactSuccessState p': 'شكرًا على رسالتك. سأرد عليك في أقرب وقت.',
      '#contactSuccessState button': 'إغلاق',
      '#contactErrorState h4': 'عذرًا، حدث خطأ',
      '#contactErrorState p': 'يرجى المحاولة مجددًا بعد قليل.',
      '#contactRetry': 'إعادة المحاولة',
      'footer .footer-inner > p': '© <span id="year"></span> وائل الصوابني · جربة، تونس'
    }
  };

  function restore() {
    original.forEach((html, el) => { el.innerHTML = html; });
    original.clear();
  }
  function set(selector, value) {
    const nodes = Array.from(document.querySelectorAll(selector));
    const values = Array.isArray(value) ? value : nodes.map(() => value);
    nodes.forEach((el, i) => {
      if (values[i] === undefined) return;
      if (!original.has(el)) original.set(el, el.innerHTML);
      const v = values[i];
      if (selector === '.nav-links a' || selector === '.skill-card h3' || selector === '.project h3' ||
          selector === '.project .context' || selector === '.case-study-link' || selector === '.tl-item h3' || selector === '.game-tab' ||
          selector === '.game-stats .k' || selector === '.contact-field label' ||
          selector === '#apropos .stats .label' || selector === '#snakeStart' ||
          selector === '#snakeRestart' || selector === '#memRestart' || selector === '#contactSubmit' ||
          selector === '#contactRetry' || selector === '#contactSuccessState button') {
        el.textContent = v;
      } else if (selector === '.hero-cta a') {
        const node = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (node) node.textContent = '\n              ' + v + '\n              ';
      } else if (selector === '.hero .badge') {
        const node = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (node) node.textContent = ' ' + v;
      } else {
        el.innerHTML = v;
      }
    });
  }
  function apply(lang) {
    restore();
    if (lang === 'fr') {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.ogTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.ogDescription);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.twitterTitle);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.twitterDescription);
      document.querySelector('meta[property="og:locale"]')?.setAttribute('content', 'fr_FR');
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
    } else {
      const language = dict[lang];
      document.title = language.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', language.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', language.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', language.description);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', language.title);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', language.description);
      document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'ar' ? 'ar_TN' : 'en_US');
      Object.entries(language).forEach(([selector, value]) => {
        if (selector === 'title' || selector === 'description') return;
        set(selector, value);
      });
      const year = document.getElementById('year');
      if (year) year.textContent = new Date().getFullYear();
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    try { localStorage.setItem('portfolio-language', lang); } catch (_) {}
  }
  select.addEventListener('change', () => apply(select.value));
  let saved = 'fr';
  try { saved = localStorage.getItem('portfolio-language') || 'fr'; } catch (_) {}
  if (!['fr','en','ar'].includes(saved)) saved = 'fr';
  select.value = saved;
  apply(saved);
})();