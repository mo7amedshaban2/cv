/* ============================================================================
 *  data.js — ملف بياناتك الشخصية (الملف الوحيد الذي تحتاج لتعديله)
 *  ---------------------------------------------------------------------------
 *  كل الحقول come بصيغة "حقل" للغة العربية و "حقلEn" للإنجليزية.
 *  مثال: nameAr  /  nameEn
 *
 *  ⚠️ لا تحذف علامات الاقتباس (" ") ولا الفاصلة (,) في آخر كل سطر.
 *  ⚠️ لا تستخدم الفاصلة (,) داخل نص عربي/إنجليزي إن لم تكن جزءاً من البنية.
 * ========================================================================== */

const cvData = {

  /* ==========================================================================
   *  1) البيانات الشخصية
   * ======================================================================= */
  personal: {
    nameAr:    "محمد شبانة",
    nameEn:    "Mohamed Shabana",
    titleAr:   "أخصائي مبيعات · دعم تقني · خدمة عملاء",
    titleEn:   "Sales & Technical Support Specialist | Customer Service",
    email:     "mo7amedshaban2@gmail.com",
    phone:     "+20 101 577 3465",
    location:  "Mansoura, Dakahlia, Egypt",
    linkedin:  "https://linkedin.com/in/mo7amedshaban2",
    github:    "",
    website:   "",
    summaryAr: "أخصائي مبيعات ودعم تقني وخدمة عملاء بخبرة أكثر من سنتين في شركة Eagle Eye لأنظمة الأمن، مع خلفية أكاديمية في نظم المعلومات الإدارية. أجيد تحويل الاستفسارات إلى صفقات مغلقة من خلال الاستشارات التقنية الاحترافية، وبناء علاقات طويلة المدى مع العملاء، وإدارة ما بعد البيع بكفاءة. طوّرت أنظمة أتمتة بـ Excel وGoogle Sheets حسّنت الكفاءة التشغيلية للفريق بشكل ملموس. أعمل بكفاءة أعلى في بيئات منظمة ذات أهداف وأنظمة واضحة — فلسفة عمل تدفعني دائماً لإنتاج تحسينات حقيقية في أداء الفريق، بما يتوافق تماماً مع سياسات المؤسسة وثقافتها وقيمها.",
    summaryEn: "Sales, Technical Support & Customer Service Specialist with 2+ years at Eagle Eye Security Systems and an MIS academic background. Proven ability to convert inquiries into closed deals through professional technical consultations, build long-term client relationships, and efficiently manage after-sales support. Developed Excel and Google Sheets automation tools that measurably improved team productivity. Performs best in structured environments with clear goals and defined systems — a work philosophy that consistently drives meaningful improvements to team operations, always in alignment with organizational policies, culture, and values.",
    photo:     ""
  },

  /* ==========================================================================
   *  2) الخبرات الوظيفية
   *  - أضف كائناً جديداً داخل المصفوفة لكل وظيفة
   *  - endDate: ""  ⇦  تعني "حتى الآن"
   *  - التواريخ بصيغة "YYYY-MM"  مثل  "2023-01"
   * ======================================================================= */
  experience: [
    {
      titleAr:    "أخصائي مبيعات ودعم تقني وخدمة عملاء",
      titleEn:    "Sales & Technical Support Specialist | Customer Service",
      companyAr:  "Eagle Eye For Security Systems",
      companyEn:  "Eagle Eye For Security Systems",
      locationAr: "المنصورة، مصر",
      locationEn: "Mansoura, Egypt",
      startDate:  "2023-01",
      endDate:    "2025-04",
      currentAr:  "",
      currentEn:  "",
      descriptionAr: [
        "إدارة دورة المبيعات الكاملة لأنظمة الأمن والمراقبة (CCTV وكاميرات IP وأنظمة إنذار) من استقبال العميل المحتمل حتى إغلاق الصفقة وما بعدها",
        "تقديم استشارات تقنية احترافية تساعد العملاء على اختيار أنسب منتجات الأمن وفق احتياجاتهم وميزانياتهم — مما أسهم في رفع معدل تحويل الاستفسارات إلى مبيعات",
        "إدارة علاقات العملاء ومتابعة ما بعد البيع وحل المشكلات التقنية بسرعة للحفاظ على مستوى رضا مرتفع",
        "استقبال وتصنيف وتصعيد طلبات الدعم الفني وشكاوى العملاء وضمان حلها في أسرع وقت ممكن",
        "تشخيص الأعطال الميدانية والبرمجية لأنظمة CCTV وDVR/NVR وكاميرات الشبكة وتقديم الدعم للفنيين في الموقع",
        "تطوير نظام Excel لتتبع الصيانة مع تعريف QR لكل جهاز — قلّص وقت البحث عن سجلات الأعطال بشكل ملحوظ",
        "بناء نظام تسعير ديناميكي على Google Sheets يعرض توافر المنتجات والأسعار في الوقت الفعلي — رفع إنتاجية فريق المبيعات وقلّل أخطاء التسعير",
        "إعداد وصيانة كتالوجات المنتجات والمواصفات التقنية وعروض الأسعار ومستندات ما بعد البيع"
      ],
      descriptionEn: [
        "Managed the full sales cycle for security and surveillance solutions (CCTV, IP cameras, alarm systems) from lead qualification through deal closure and post-sale follow-up",
        "Delivered professional technical consultations helping clients select the right security products based on their needs and budgets — contributing to improved inquiry-to-sale conversion rates",
        "Maintained strong customer relationships through proactive after-sales support and rapid technical issue resolution to sustain high customer satisfaction levels",
        "Received, categorized, and escalated technical support requests and customer complaints to ensure timely resolution and high first-contact resolution rates",
        "Diagnosed field and software faults for CCTV systems, DVR/NVR units, and network cameras; provided remote and on-site guidance to field technicians",
        "Built an Excel-based maintenance tracking system with QR code device identification — significantly reduced time to retrieve fault history and service records",
        "Developed a dynamic pricing system on Google Sheets displaying real-time product availability and prices — boosted sales team productivity and reduced pricing errors",
        "Prepared and maintained product catalogs, technical specifications, quotations, and after-sales documentation"
      ]
    },
    {
      titleAr:    "متخصص منظومة عمليات",
      titleEn:    "Operations Systems Specialist",
      companyAr:  "القوات المسلحة المصرية — الخدمة العسكرية الإلزامية",
      companyEn:  "Egyptian Armed Forces · Mandatory Military Service",
      locationAr: "مصر",
      locationEn: "Egypt",
      startDate:  "2025-04",
      endDate:    "2026-06",
      currentAr:  "",
      currentEn:  "",
      descriptionAr: [
        "استلام وتصنيف التعليمات والبلاغات التشغيلية الواردة (فكسات وأوامر) وتحليلها وتحويلها إلى إجراءات تنفيذية بدقة وسرعة",
        "تنفيذ المهام التشغيلية المطلوبة وفق الأوامر الصادرة بالأولويات الصحيحة وضمان الالتزام بالمواعيد",
        "إعداد وتقديم تقارير العمليات اليومية والدورية للقيادة بأسلوب واضح ومنظم",
        "إدارة وأرشفة الوثائق والسجلات التشغيلية الرسمية بأعلى درجات الدقة والسرية",
        "تشغيل وصيانة الأجهزة المكتبية وأجهزة الحاسوب والطابعات وضمان استمرارية العمل التقني",
        "التنسيق بين الوحدات المختلفة ونقل المعلومات التشغيلية بدقة وفي الوقت المناسب"
      ],
      descriptionEn: [
        "Received, classified, and analyzed incoming operational directives and communications; translated them into precise executable actions with speed and accuracy",
        "Executed required operational tasks according to issued orders with correct prioritization and strict deadline compliance",
        "Prepared and submitted daily and periodic operational reports to command leadership in a clear and well-structured format",
        "Managed and archived official operational documents and records with the highest standards of accuracy and confidentiality",
        "Operated and maintained office computers, printers, and technical equipment to ensure continuous operational readiness",
        "Coordinated between units and transmitted operational information accurately and on time"
      ]
    }
  ],

  /* ==========================================================================
   *  3) التعليم
   * ======================================================================= */
  education: [
    {
      degreeAr:      "بكالوريوس نظم المعلومات الإدارية (MIS)",
      degreeEn:      "Bachelor of Management Information Systems (MIS)",
      institutionAr: "معهد النيل العالي للعلوم التجارية وتكنولوجيا الحاسوب",
      institutionEn: "Nile Higher Institute for Commercial Sciences & Computer Technology",
      locationAr:    "المنصورة، مصر",
      locationEn:    "Mansoura, Egypt",
      startDate:     "2020",
      endDate:       "2024",
      gpaAr:         "جيد جداً — 81.73%",
      gpaEn:         "Very Good — 81.73%",
      descriptionAr: [
        "مشروع التخرج: ممتاز — المركز الثاني",
        "الدور: قائد فريق",
        "مرتب الرابع أكاديمياً في السنتين الأولى والثانية",
        "شهادة تقدير رسمية"
      ],
      descriptionEn: [
        "Graduation Project: Excellent — 2nd Place",
        "Role: Team Leader",
        "Ranked 4th academically in 1st & 2nd years",
        "Official recognition certificate"
      ]
    }
  ],

  /* ==========================================================================
   *  4) المهارات
   *  - technical : لها مستوى 0→100 (لرسم الشريط)
   *  - soft      : بدون مستوى (تظهر كوسوم)
   *  - languages : لها مستوى نصي
   * ======================================================================= */
  skills: {
    technical: [
      { nameAr: "Microsoft Excel & Automation",         nameEn: "Microsoft Excel & Automation",         level: 95 },
      { nameAr: "Google Sheets & Dashboards",           nameEn: "Google Sheets & Dashboards",           level: 90 },
      { nameAr: "الدعم التقني — Hardware & Software",   nameEn: "Technical Support — Hardware & Software", level: 88 },
      { nameAr: "إدارة علاقات العملاء (CRM)",           nameEn: "CRM & Customer Relationship Management", level: 85 },
      { nameAr: "Windows OS — تثبيت وصيانة",           nameEn: "Windows OS — Installation & Maintenance", level: 85 },
      { nameAr: "أنظمة CCTV وDVR/NVR",                 nameEn: "CCTV / DVR / NVR Security Systems",    level: 82 },
      { nameAr: "إدارة المبيعات ودورة البيع",           nameEn: "Sales Cycle & Pipeline Management",    level: 80 },
      { nameAr: "VBA / Macros",                         nameEn: "VBA / Macros",                         level: 75 },
      { nameAr: "HTML / CSS",                           nameEn: "HTML / CSS",                           level: 72 },
      { nameAr: "Laravel / MySQL",                      nameEn: "Laravel / MySQL",                      level: 65 }
    ],
    soft: [
      { nameAr: "خدمة العملاء",            nameEn: "Customer Service"        },
      { nameAr: "إغلاق الصفقات",           nameEn: "Deal Closing"            },
      { nameAr: "التفاوض والإقناع",         nameEn: "Negotiation & Persuasion"},
      { nameAr: "حل المشكلات",             nameEn: "Problem Solving"         },
      { nameAr: "التواصل الفعّال",          nameEn: "Effective Communication" },
      { nameAr: "قيادة الفريق",            nameEn: "Team Leadership"         },
      { nameAr: "إدارة الوقت والأولويات",  nameEn: "Time & Priority Management"},
      { nameAr: "الدقة في التوثيق",        nameEn: "Accurate Documentation"  },
      { nameAr: "العمل تحت الضغط",         nameEn: "Working Under Pressure"  }
    ],
    languages: [
      { nameAr: "العربية",    nameEn: "Arabic",  levelAr: "لغة أم",      levelEn: "Native"   },
      { nameAr: "الإنجليزية", nameEn: "English", levelAr: "A2 — أساسي",  levelEn: "A2 — Basic" }
    ]
  },

  /* ==========================================================================
   *  5) المشاريع
   *  - tech: مصفوفة تقنيات — كل عنصر نص بسيط بدون فاصلة
   * ======================================================================= */
  projects: [
    {
      nameAr:        "Pocket — موقع إدارة المالية الشخصية",
      nameEn:        "Pocket — Personal Finance Management Website",
      descriptionAr: "منصة ويب لإدارة الدخل والمصروفات والميزانية. قدت فريق التطوير وفزنا بالمركز الثاني وحصلنا على تقدير رسمي للتميز.",
      descriptionEn: "Web platform for managing income, expenses, and budgeting. Led project planning, development & team collaboration. Secured 2nd place; official recognition for excellence.",
      tech: ["Laravel", "HTML", "CSS", "MySQL"],
      link: "",
      demo: ""
    },
    {
      nameAr:        "نظام تتبع الصيانة",
      nameEn:        "Maintenance Tracking System",
      descriptionAr: "نظام Excel بتتبع QR Code لتحديد الأجهزة، مع قواعد بيانات مركزية للعملاء والأجهزة والأعطال وسجلات الصيانة — حسّن دقة سير العمل وكفاءة الخدمة.",
      descriptionEn: "Excel system with QR code identification for device tracking. Centralized customer, device, fault & maintenance records. Improved workflow accuracy and service efficiency.",
      tech: ["Microsoft Excel", "VBA", "QR Code Systems", "Data Validation"],
      link: "",
      demo: ""
    },
    {
      nameAr:        "نظام التسعير الديناميكي",
      nameEn:        "Dynamic Pricing System",
      descriptionAr: "منصة Google Sheets مؤتمتة مع قواعد بيانات مركزية، توفر إتاحة المنتجات والتسعير في الوقت الفعلي — رفعت إنتاجية فريق المبيعات ودقة الأسعار.",
      descriptionEn: "Automated Google Sheets platform with centralized databases. Real-time product availability and pricing management. Boosted sales team productivity and pricing accuracy.",
      tech: ["Google Sheets", "Data Validation", "Workflow Automation", "Reporting"],
      link: "",
      demo: ""
    },
    {
      nameAr:        "نظام إدارة الإجازات الآلي",
      nameEn:        "Automated Leave Management System",
      descriptionAr: "نظام Excel طوّرته بمبادرة شخصية خلال الخدمة العسكرية لحل مشكلة حقيقية كانت تُدار يدوياً. يتتبع بيانات الأفراد وأرصدة الإجازات ويحسب الاستحقاق تلقائياً — قلّص الأخطاء الإدارية وحسّن الشفافية ووفّر وقت المعالجة اليدوية.",
      descriptionEn: "Excel system developed as a personal initiative during military service to automate a manual leave-tracking process. Tracks personnel records, calculates leave entitlements, and monitors balances automatically — reduced administrative errors, improved transparency, and saved significant manual processing time.",
      tech: ["Microsoft Excel", "VBA", "Data Validation", "Process Automation"],
      link: "",
      demo: ""
    }
  ],

  /* ==========================================================================
   *  6) الشهادات
   * ======================================================================= */
  certifications: [
    {
      nameAr:   "دبلوم تطوير الويب Full Stack",
      nameEn:   "Full Stack Web Development Diploma",
      issuerAr: "IT Share Academy — المنصورة",
      issuerEn: "IT Share Academy — Mansoura",
      date:     "2024",
      link:     ""
    }
  ],

  /* ==========================================================================
   *  7) الإنجازات والجوائز
   * ======================================================================= */
  achievements: [
    {
      titleAr:       "تطوير أنظمة أتمتة فعلية في بيئة إنتاج حقيقية",
      titleEn:       "Built & Deployed Real-World Automation Systems in Production",
      descriptionAr: "طوّرت أنظمة Excel وGoogle Sheets نشطة داخل الشركة لتتبع الصيانة وإدارة التسعير وإدارة الإجازات — أسهمت في تحسين ملموس في إنتاجية الفريق وتقليص الأخطاء اليدوية.",
      descriptionEn: "Built and deployed Excel and Google Sheets systems actively used in production for maintenance tracking, pricing management, and leave administration — measurably improved team productivity and reduced manual errors.",
      date: "2023"
    },
    {
      titleAr:       "قائد فريق مشروع التخرج — المركز الثاني",
      titleEn:       "Graduation Project Team Leader — Ranked 2nd Place",
      descriptionAr: "قدت فريق تطوير منصة Pocket لإدارة المالية الشخصية وحققت المركز الثاني مع تقدير رسمي للتميز الأكاديمي.",
      descriptionEn: "Led the development team for Pocket, a personal finance management platform; ranked 2nd place with an official recognition certificate for academic excellence.",
      date: "2024"
    },
    {
      titleAr:       "الرابع أكاديمياً في السنتين الأولى والثانية",
      titleEn:       "Top Academic Performance — Ranked 4th in 1st & 2nd Years",
      descriptionAr: "حققت المركز الرابع أكاديمياً في السنة الأولى والثانية مع شهادة تقدير رسمية من الجهة الأكاديمية.",
      descriptionEn: "Ranked 4th academically in the 1st and 2nd years with an official recognition certificate.",
      date: "2021"
    },
    {
      titleAr:       "إدارة دورة مبيعات كاملة في سوق أنظمة الأمن التنافسي",
      titleEn:       "Managed Full Sales Cycle in a Competitive Security Systems Market",
      descriptionAr: "اكتسبت خبرة شاملة في استقبال العملاء المحتملين وتقديم الاستشارات التقنية وإغلاق الصفقات وإدارة ما بعد البيع في سوق تقني تنافسي.",
      descriptionEn: "Acquired end-to-end experience in lead handling, technical consultations, deal closing, and after-sales management within a competitive technical market.",
      date: "2024"
    }
  ],

  /* ==========================================================================
   *  8) الإعدادات — تحكم كامل في الشكل والسلوك
   * ======================================================================= */
  settings: {

    /* اللغة الافتراضية: "ar" أو "en" */
    defaultLang: "en",

    /* الوضع الافتراضي: "dark" (مظلم) أو "light" (فاتح) */
    defaultTheme: "dark",

    /* تشغيل وضع ATS تلقائياً عند فتح الصفحة؟ true / false */
    defaultAts: false,

    /* اللون الرئيسي — أي قيمة HEX.
       يتم اشتقاق بقية الدرجات منه تلقائياً (فاتح/غامق/شفافية). */
    accentColor: "#b8860b",

    /* الصورة الشخصية */
    showPhoto: false,

    /* أشرطة المهارات (تُخفى تلقائياً في وضع ATS) */
    showSkillBars: true,

    /* الأيقونات الزخرفية (👤 📍 🏆 …) — تُخفى تلقائياً في وضع ATS */
    showIcons: true,

    /* تخطيط الصفحة: "two" (عمودان) أو "one" (عمود واحد) */
    layout: "two",

    /* كثافة العرض:
       "normal"  → مريح
       "compact" → أصغر حجماً (يساعد على إخراج السيرة في صفحة واحدة) */
    density: "normal",

    /* ألوان الطباعة (Ctrl+P / PDF):
       "light" → نص أسود على ورق أبيض (آمن مع كل الطابعات) ← الافتراضي
       "dark"  → نسخة مطبوعة داكنة (يلزم تفعيل "Background graphics" في نافذة الطباعة) */
    printTheme: "light",

    /* صيغة التواريخ:
       "long"    → يناير 2023 · January 2023
       "numeric" → 01/2023 */
    dateFormat: "long",

    /* الأقسام — true = إظهار / false = إخفاء نهائي */
    sections: {
      summary:        true,
      experience:     true,
      education:      true,
      skills:         true,
      softSkills:     true,
      languages:      true,
      projects:       true,
      certifications: true,
      achievements:   true
    },

    /* الأقسام التي تظهر في العمود الجانبي (الوضع "two" فقط) */
    sidebar: ["skills", "softSkills", "languages", "certifications"]
  }
};
