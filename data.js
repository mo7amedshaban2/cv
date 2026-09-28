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
    titleAr:   "خريج نظم المعلومات الإدارية · دعم تقني ومبيعات",
    titleEn:   "MIS Graduate · Technical Support & Sales Specialist",
    email:     "mo7amedshaban2@gmail.com",
    phone:     "+20 101 577 3465",
    location:  "Mansoura, Dakahlia, Egypt",
    linkedin:  "https://linkedin.com/in/mo7amsedshaban2",
    github:    "",
    website:   "",
    summaryAr: "خريج نظم المعلومات الإدارية بخبرة عملية في الدعم التقني وعمليات المبيعات وأنظمة الأمن والخدمة وأتمتة العمليات. متخصص في تقديم الاستشارات التقنية وحل مشكلات الأجهزة والبرامج ودعم العملاء وتطوير حلول Excel لتحسين الكفاءة التشغيلية. أتممت الخدمة العسكرية كاتب عمليات بخبرة في العمليات الإدارية والدعم التقني وإدارة مكاتب الأنظمة.",
    summaryEn: "MIS graduate with hands-on experience in Technical Support, Sales Operations, Security Systems, Customer Service, and Process Automation. Skilled in providing technical consultations, troubleshooting hardware and software issues, supporting customers, and developing Excel-based solutions that improve operational efficiency and workflow management. Completed military service as an Operations Clerk with experience in administrative operations, technical support, Excel automation, and office systems management.",
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
      titleAr:    "أخصائي دعم تقني ومبيعات",
      titleEn:    "Technical Support & Sales Specialist",
      companyAr:  "Eagle Eye For Security Systems",
      companyEn:  "Eagle Eye For Security Systems",
      locationAr: "المنصورة، مصر",
      locationEn: "Mansoura, Egypt",
      startDate:  "2023-01",
      endDate:    "2025-04",
      currentAr:  "",
      currentEn:  "",
      descriptionAr: [
        "تقديم استشارات تقنية وتوصيات منتجات لأنظمة الأمن والمراقبة",
        "تشخيص وحل المشكلات المتعلقة بالمنتجات وإدارة استفسارات العملاء بعد البيع",
        "تطوير أنظمة أتمتة بـ Excel وGoogle Sheets لتحسين تتبع الصيانة وإدارة الأسعار ومراقبة المخزون والكفاءة التشغيلية",
        "إنشاء وصيانة وصف المنتجات والمواصفات ومواد المبيعات"
      ],
      descriptionEn: [
        "Provided technical consultations and product recommendations for security and surveillance systems",
        "Troubleshot and resolved product-related issues; managed after-sales customer inquiries",
        "Developed Excel & Google Sheets automation systems improving maintenance tracking, pricing management, inventory visibility, and operational efficiency",
        "Created and maintained product descriptions, specifications, and sales materials"
      ]
    },
    {
      titleAr:    "كاتب عمليات",
      titleEn:    "Operations Clerk",
      companyAr:  "القوات المسلحة المصرية — الخدمة العسكرية",
      companyEn:  "Egyptian Armed Forces · Military Service",
      locationAr: "مصر",
      locationEn: "Egypt",
      startDate:  "2025-04",
      endDate:    "2026-06",
      currentAr:  "",
      currentEn:  "",
      descriptionAr: [
        "إدارة التوثيق الإداري والعمليات باستخدام MS Word وExcel وPowerPoint",
        "تقديم الدعم التقني لأجهزة الحاسوب والطابعات ومشكلات البرامج",
        "المساعدة في تثبيت Windows وإعداد البرامج وإصلاح أعطال التعريفات"
      ],
      descriptionEn: [
        "Managed administrative and operational documentation using MS Word, Excel, and PowerPoint",
        "Provided technical support for office computers, printers, and software issues",
        "Assisted with Windows installation, software setup, and driver troubleshooting"
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
      { nameAr: "Microsoft Excel & Automation", nameEn: "Microsoft Excel & Automation", level: 95 },
      { nameAr: "Google Sheets",                nameEn: "Google Sheets",                level: 90 },
      { nameAr: "الدعم التقني / Hardware & Software", nameEn: "Technical Support / Hardware & Software", level: 88 },
      { nameAr: "Windows OS / تثبيت وصيانة",   nameEn: "Windows OS / Installation & Maintenance", level: 85 },
      { nameAr: "QR Code Systems",              nameEn: "QR Code Systems",              level: 80 },
      { nameAr: "HTML / CSS",                   nameEn: "HTML / CSS",                   level: 75 },
      { nameAr: "VBA / Macros",                 nameEn: "VBA / Macros",                 level: 70 },
      { nameAr: "Laravel / MySQL",              nameEn: "Laravel / MySQL",              level: 65 }
    ],
    soft: [
      { nameAr: "قيادة الفريق",     nameEn: "Team Leadership"   },
      { nameAr: "حل المشكلات",      nameEn: "Problem Solving"   },
      { nameAr: "خدمة العملاء",     nameEn: "Customer Service"  },
      { nameAr: "التواصل الفعّال",  nameEn: "Communication"     },
      { nameAr: "إدارة الوقت",      nameEn: "Time Management"   },
      { nameAr: "الدقة في التوثيق", nameEn: "Documentation"     }
    ],
    languages: [
      { nameAr: "العربية",    nameEn: "Arabic",  levelAr: "لغة أم",  levelEn: "Native"  },
      { nameAr: "الإنجليزية", nameEn: "English", levelAr: "A2 — أساسي", levelEn: "A2 — Basic" }
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
      descriptionAr: "نظام Excel يؤتمت تتبع الموظفين وحساب استحقاق الإجازات — قلّل العبء اليدوي وحسّن الدقة الإدارية وعزّز الشفافية في إدارة الإجازات.",
      descriptionEn: "Excel-based system automating personnel tracking and leave eligibility calculations. Reduced manual workload and improved administrative accuracy. Enhanced transparency in leave management processes.",
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
      titleAr:       "قائد فريق مشروع التخرج — المركز الثاني",
      titleEn:       "Graduation Project Team Leader — Ranked 2nd Place",
      descriptionAr: "قاد الفريق في مشروع Pocket لإدارة المالية الشخصية وحصل على المركز الثاني مع تقدير رسمي.",
      descriptionEn: "Led the team in Pocket personal finance project, ranked 2nd with official recognition for excellence.",
      date: "2024"
    },
    {
      titleAr:       "بناء أنظمة أتمتة Excel وSheets في بيئة إنتاج حقيقية",
      titleEn:       "Built Production-Used Excel & Sheets Automation Systems",
      descriptionAr: "طوّر حلول أتمتة حقيقية نشطة في الشركة وأسهمت في تحسين العمليات فعلياً.",
      descriptionEn: "Developed real automation solutions actively used in production, improving operational workflows.",
      date: "2023"
    },
    {
      titleAr:       "الرابع أكاديمياً في السنتين الأولى والثانية",
      titleEn:       "Top Academic Performance — Ranked 4th in 1st & 2nd Years",
      descriptionAr: "حصل على المركز الرابع أكاديمياً في السنة الأولى والثانية مع شهادة تقدير رسمية.",
      descriptionEn: "Ranked 4th academically in 1st & 2nd years with official recognition certificate.",
      date: "2021"
    },
    {
      titleAr:       "تحسين عمليات الصيانة والتسعير والعمليات",
      titleEn:       "Improved Maintenance, Pricing & Operational Workflows",
      descriptionAr: "أسهمت الأنظمة المطوّرة في تحسين ملموس في كفاءة العمليات اليومية للشركة.",
      descriptionEn: "Developed systems that measurably improved daily company operations efficiency.",
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
