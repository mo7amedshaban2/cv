/* ==========================================================================
   app.js — منطق السيرة الذاتية بالكامل
   --------------------------------------------------------------------------
   الترتيب:
   1) الثوابت والترجمات      5) العرض (render)
   2) الحالة والتخزين        6) التبديلات (لغة/وضع/ATS)
   3) أدوات مساعدة           7) الطباعة + تصدير صورة
   4) حساب الألوان           8) المشاركة + البيانات المنظمة + التشغيل
   ========================================================================== */
(function () {
  'use strict';

  /* ========================================================================
     1) الثوابت والترجمات
     ===================================================================== */
  var STORE_PREFS = 'cv:prefs';
  var STORE_DATA  = 'cv:data';

  var ICON = {
    mail:     '✉',
    phone:    '☎',
    location: '📍',
    link:     '🔗',
    globe:    '🌐',
    code:     '⌨',
    briefcase:'▣',
    pin:      '·'
  };

  var UI = {
    ar: {
      brand: 'سيرة ذاتية', print: 'طباعة / PDF', image: 'صورة', ats: 'ATS',
      share: 'مشاركة', summary: 'نبذة مختصرة', experience: 'الخبرة العملية',
      education: 'التعليم', projects: 'المشاريع', achievements: 'الإنجازات والجوائز',
      skills: 'المهارات التقنية', soft: 'المهارات الشخصية', langs: 'اللغات',
      certs: 'الشهادات', present: 'حتى الآن', copied: 'تم نسخ الرابط',
      saved: 'تم الحفظ', noData: 'لا توجد بيانات',
      atsOn: 'وضع ATS مُفعّل — عرض نصي نقي لأجهزة الفحص',
      atsOff: 'تم إيقاف وضع ATS',
      atsExit: 'العودة للوضع العادي',
      imgDone: 'تم إنشاء الصورة وحفظها',
      imgFail: 'تعذّر إنشاء الصورة — جرّب من Chrome أو Edge',
      langToast: 'English', menuPng: 'حفظ PNG', menuJpg: 'حفظ JPG',
      menuCopy: 'نسخ الصورة', menuCancel: 'إلغاء', whatsapp: 'واتساب'
    },
    en: {
      brand: 'Résumé', print: 'Print / PDF', image: 'Image', ats: 'ATS',
      share: 'Share', summary: 'Professional Summary', experience: 'Work Experience',
      education: 'Education', projects: 'Projects', achievements: 'Achievements & Awards',
      skills: 'Technical Skills', soft: 'Soft Skills', langs: 'Languages',
      certs: 'Certifications', present: 'Present', copied: 'Link copied',
      saved: 'Saved', noData: 'No data',
      atsOn: 'ATS Mode ON — plain text layout for scanners',
      atsOff: 'ATS Mode OFF',
      atsExit: 'Back to normal view',
      imgDone: 'Image created and downloaded',
      imgFail: 'Could not create the image — try Chrome or Edge',
      langToast: 'العربية', menuPng: 'Save PNG', menuJpg: 'Save JPG',
      menuCopy: 'Copy image', menuCancel: 'Cancel', whatsapp: 'WhatsApp'
    }
  };

  var $  = function (id) { return document.getElementById(id); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ========================================================================
     2) الحالة + التخزين المحلي
     ===================================================================== */
  var boot = window.__CV_BOOT__ || {};
  var bootTheme = boot.theme || 'dark';

  var state = {
    lang:   boot.lang   || 'en',
    theme:  bootTheme,
    ats:    !!boot.ats,
    prefs:  readJSON(STORE_PREFS) || {},
    data:   null
  };

  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
  }
  function removeKey(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  function deepMerge(base, over) {
    if (!over || typeof over !== 'object' || Array.isArray(over)) return over === undefined ? base : over;
    var out = {}, k;
    for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    for (k in over) {
      if (!Object.prototype.hasOwnProperty.call(over, k)) continue;
      var b = out[k], o = over[k];
      out[k] = (b && typeof b === 'object' && !Array.isArray(b) && o && typeof o === 'object' && !Array.isArray(o))
        ? deepMerge(b, o) : o;
    }
    return out;
  }

  /** البيانات الفعلية = ملف data.js + أي تعديلات محفوظة في المتصفح */
  function getData() {
    if (!state.data) state.data = deepMerge(cvData || {}, readJSON(STORE_DATA) || {});
    return state.data;
  }

  /** الإعدادات الفعلية = data.js + تفضيلات المستخدم المحفوظة */
  function getSettings() {
    var s = deepMerge(cvData.settings || {}, state.prefs);
    s.sections = deepMerge((cvData.settings || {}).sections || {}, state.prefs.sections || {});
    s.theme     = state.theme;
    s.ats       = state.ats;
    return s;
  }

  function persistPrefs() {
    var s = getSettings();
    writeJSON(STORE_PREFS, {
      lang: state.lang, theme: state.theme, ats: state.ats,
      accent: s.accentColor, layout: s.layout, density: s.density,
      printTheme: s.printTheme, showPhoto: s.showPhoto,
      showSkillBars: s.showSkillBars, showIcons: s.showIcons,
      dateFormat: s.dateFormat, sections: s.sections
    });
  }

  /* ========================================================================
     3) أدوات مساعدة
     ===================================================================== */
  function tx(k) { return (UI[state.lang] && UI[state.lang][k]) || k; }

  /** حقل ثنائي اللغة مع بديل آمن */
  function bi(obj, field) {
    if (!obj) return '';
    var a = obj[field + 'Ar'], e = obj[field + 'En'];
    if (state.lang === 'ar') return (a || e || '');
    return (e || a || '');
  }

  function list(obj, field) {
    if (!obj) return [];
    var a = obj[field + 'Ar'], e = obj[field + 'En'];
    var arr = state.lang === 'ar' ? (a || e) : (e || a);
    return Array.isArray(arr) ? arr.filter(function (x) { return x && String(x).trim() !== ''; }) : [];
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeURL(url) {
    if (!url) return '';
    var u = String(url).trim();
    if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
    if (/^[\w.+-]+@[\w.-]+\.\w+$/.test(u)) return 'mailto:' + u;
    return 'https://' + u.replace(/^\/+/, '');
  }

  var MONTHS = {
    ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  };

  /** "2023-01" → "يناير 2023" / "Jan 2023" — أو "01/2023" عند اختيار الصيغة الرقمية */
  function formatDate(str) {
    if (!str) return '';
    str = String(str).trim();
    var parts = str.split('-');
    var year = parts[0], month = parts[1] ? parseInt(parts[1], 10) : NaN;
    if (isNaN(month)) return year;
    if (getSettings().dateFormat === 'numeric') {
      return (month < 10 ? '0' : '') + month + '/' + year;
    }
    return MONTHS[state.lang][month - 1] + ' ' + year;
  }

  /** ISO للخاصية datetime */
  function isoDate(str) {
    if (!str) return '';
    var p = String(str).split('-');
    if (p.length === 1) return p[0] + '-01-01';
    return (p[0] || '') + '-' + (p[1] || '01') + '-01';
  }

  function clampNum(n, min, max, def) {
    n = parseFloat(n);
    if (isNaN(n)) return def;
    return Math.min(max, Math.max(min, n));
  }

  function slug(s) {
    return String(s || 'cv').toLowerCase()
      .replace(/[^a-z0-9؀-ۿ]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'cv';
  }

  function isRTL() { return document.documentElement.getAttribute('dir') === 'rtl'; }

  /* ========================================================================
     4) حساب الألوان المشتقة من لون التمييز
     ===================================================================== */
  function hexToRgb(hex) {
    var h = String(hex || '').replace('#', '').trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return { r: 37, g: 99, b: 235 };
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  function rgbToHex(c) {
    function p(v) { v = Math.round(Math.min(255, Math.max(0, v))); return (v < 16 ? '0' : '') + v.toString(16); }
    return '#' + p(c.r) + p(c.g) + p(c.b);
  }
  function mix(hex, target, amount) {
    var a = hexToRgb(hex), t = hexToRgb(target);
    return rgbToHex({
      r: a.r + (t.r - a.r) * amount,
      g: a.g + (t.g - a.g) * amount,
      b: a.b + (t.b - a.b) * amount
    });
  }
  function rgba(hex, alpha) {
    var c = hexToRgb(hex);
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + alpha + ')';
  }
  /** الإضاءة النسبية (WCAG) */
  function luminance(hex) {
    var c = hexToRgb(hex), a = [c.r, c.g, c.b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  /** لون نص مقروء فوق الخلفية المعطاة */
  function readableOn(hex) {
    return luminance(hex) > 0.42 ? '#10151f' : '#ffffff';
  }

  function applyAccent(accent) {
    accent = /^#?[0-9a-fA-F]{3,6}$/.test(String(accent || '')) ? (accent.charAt(0) === '#' ? accent : '#' + accent) : '#b8860b';
    var dark = state.theme === 'dark';
    var dark1 = mix(accent, '#000000', 0.24);   // لون داكن يضمن تباين نص أبيض
    var root = document.documentElement;
    root.style.setProperty('--accent',        accent);
    root.style.setProperty('--accent-dark',   dark1);
    root.style.setProperty('--accent-deep',   mix(accent, '#000000', 0.44));
    root.style.setProperty('--accent-light',  dark ? rgba(accent, 0.20) : mix(accent, '#ffffff', 0.86));
    root.style.setProperty('--accent-soft',   dark ? rgba(accent, 0.18) : mix(accent, '#ffffff', 0.90));
    root.style.setProperty('--accent-text',   dark ? mix(accent, '#ffffff', 0.42) : mix(accent, '#000000', 0.34));
    root.style.setProperty('--accent-contrast', readableOn(accent));
    root.style.setProperty('--accent-contrast-deep', readableOn(dark1));
    root.style.setProperty('--accent-shadow', rgba(accent, 0.42));
    var meta = $('themeColor');
    if (meta) meta.setAttribute('content', dark ? '#0b1120' : '#ffffff');
  }

  /* ========================================================================
     5) العرض
     ===================================================================== */
  function show(el, on) {
    if (!el) return;
    el.style.display = on ? '' : 'none';
  }

  function iconHTML(kind) {
    if (!getSettings().showIcons) return '';
    var i = ICON[kind] || '';
    return i ? '<span class="' + (kind === 'briefcase' || kind === 'pin' ? 'tl-icon' : 'ci-icon') + '" aria-hidden="true">' + i + '</span>' : '';
  }

  function render() {
    var d = getData(), s = getSettings();
    var p = d.personal || {};
    var sec = s.sections || {};
    var i;

    applyAccent(s.accentColor);

    /* ---- اتجاه الصفحة ---- */
    var html = document.documentElement;
    html.setAttribute('lang', state.lang);
    html.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('data-theme', state.theme);
    document.body.setAttribute('data-theme', state.theme);
    document.body.setAttribute('data-ats', state.ats ? 'on' : 'off');
    document.body.setAttribute('data-layout', s.layout === 'one' ? 'one' : 'two');
    document.body.setAttribute('data-density', s.density === 'compact' ? 'compact' : 'normal');
    html.setAttribute('data-print-theme', s.printTheme === 'dark' ? 'dark' : 'light');

    var name = bi(p, 'name') || 'CV';

    /* ---- العناوين والوصف ---- */
    var title = name + ' — ' + (state.lang === 'ar' ? 'سيرة ذاتية' : 'CV');
    document.title = title;
    $('pageTitle').textContent = title;
    var desc = (bi(p, 'summary') || '').slice(0, 300);
    $('metaDescription').setAttribute('content', desc);
    $('metaAuthor').setAttribute('content', name);
    $('ogTitle').setAttribute('content', title);
    $('ogDesc').setAttribute('content', desc);
    $('twTitle').setAttribute('content', title);
    $('twDesc').setAttribute('content', desc);
    $('ogLocale').setAttribute('content', state.lang === 'ar' ? 'ar_EG' : 'en_US');
    $('ogLocaleAlt').setAttribute('content', state.lang === 'ar' ? 'en_US' : 'ar_EG');
    if (p.photo) $('ogImage').setAttribute('content', safeURL(p.photo));

    /* ---- الترويسة ---- */
    $('cvName').textContent  = name;
    $('cvTitle').textContent = bi(p, 'title');

    var photoEl = $('photoEl');
    if (s.showPhoto && p.photo) {
      photoEl.innerHTML = '<img src="' + esc(safeURL(p.photo)) + '" alt="' + esc(name) + '">';
      photoEl.hidden = false;
    } else {
      photoEl.innerHTML = '';
      photoEl.hidden = true;
    }

    /* ---- بيانات الاتصال (نص عادي — مهم جداً لـ ATS) ---- */
    var contacts = [];
    if (p.email)    contacts.push({ ic: 'mail',     label: p.email,    href: 'mailto:' + p.email, prop: 'email' });
    if (p.phone)    contacts.push({ ic: 'phone',    label: p.phone,    href: 'tel:' + String(p.phone).replace(/\s+/g, ''), prop: 'telephone' });
    if (p.location) contacts.push({ ic: 'location', label: p.location, href: '', prop: 'address' });
    if (p.linkedin) contacts.push({ ic: 'link',     label: 'LinkedIn',  href: safeURL(p.linkedin), prop: 'sameAs' });
    if (p.github)   contacts.push({ ic: 'code',     label: 'GitHub',    href: safeURL(p.github),   prop: 'sameAs' });
    if (p.website)  contacts.push({ ic: 'globe',    label: state.lang === 'ar' ? 'الموقع' : 'Website', href: safeURL(p.website), prop: 'url' });

    $('cvContacts').innerHTML = contacts.map(function (c) {
      var inner = iconHTML(c.ic) + '<span class="ci-text">' + esc(c.label) + '</span>';
      if (c.prop === 'address') {
        return '<span class="cv-contact-item" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">' +
               '<span class="ci-text" itemprop="addressLocality">' + esc(c.label) + '</span></span>';
      }
      if (c.prop === 'sameAs' || c.prop === 'url') {
        return '<a class="cv-contact-item" href="' + esc(c.href) + '" target="_blank" rel="noopener me"' +
               ' itemprop="' + c.prop + '">' + inner + '</a>';
      }
      return '<a class="cv-contact-item" href="' + esc(c.href) + '" itemprop="' + c.prop + '">' + inner + '</a>';
    }).join('');

    /* ---- النبذة ---- */
    $('cvSummary').textContent = bi(p, 'summary');
    show($('sec-summary'), !!sec.summary);

    /* ---- الخبرة ---- */
    var exp = Array.isArray(d.experience) ? d.experience : [];
    $('experienceList').innerHTML = exp.length ? exp.map(function (job) {
      var end = job.endDate
        ? formatDate(job.endDate)
        : (state.lang === 'ar' ? (job.currentAr || tx('present')) : (job.currentEn || tx('present')));
      var desc = list(job, 'description');
      var loc  = bi(job, 'location');
      return '<div class="timeline-item">' +
        '<div class="timeline-dot" aria-hidden="true"></div>' +
        '<div class="timeline-header">' +
          '<div class="timeline-title">' + esc(bi(job, 'title')) + '</div>' +
          '<div class="timeline-date"><time datetime="' + esc(isoDate(job.startDate)) + '">' + esc(formatDate(job.startDate)) + '</time>' +
            ' — <time datetime="' + esc(isoDate(job.endDate) || '9999-12-01') + '">' + esc(end) + '</time></div>' +
        '</div>' +
        '<div class="timeline-subtitle">' +
          iconHTML('briefcase') + '<span>' + esc(bi(job, 'company')) + '</span>' +
          (loc ? '<span class="sep">·</span>' + iconHTML('pin') + '<span>' + esc(loc) + '</span>' : '') +
        '</div>' +
        (desc.length
          ? '<ul class="timeline-list">' + desc.map(function (d2) { return '<li>' + esc(d2) + '</li>'; }).join('') + '</ul>'
          : '') +
      '</div>';
    }).join('') : empty(s);
    show($('sec-experience'), !!sec.experience);

    /* ---- التعليم ---- */
    var edu = Array.isArray(d.education) ? d.education : [];
    $('educationList').innerHTML = edu.length ? edu.map(function (e) {
      var desc = list(e, 'description');
      var gpa  = bi(e, 'gpa');
      var loc  = bi(e, 'location');
      return '<div class="timeline-item">' +
        '<div class="timeline-dot" aria-hidden="true"></div>' +
        '<div class="timeline-header">' +
          '<div class="timeline-title">' + esc(bi(e, 'degree')) + '</div>' +
          '<div class="timeline-date"><time>' +
            esc(e.startDate || '') + ' — ' + esc(e.endDate || tx('present')) +
          '</time></div>' +
        '</div>' +
        '<div class="timeline-subtitle">' +
          '<span>' + esc(bi(e, 'institution')) + '</span>' +
          (loc ? '<span class="sep">·</span><span>' + esc(loc) + '</span>' : '') +
          (gpa ? '<span class="sep">·</span><span>' + esc(gpa) + '</span>' : '') +
        '</div>' +
        (desc.length
          ? '<ul class="timeline-list">' + desc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
          : '') +
      '</div>';
    }).join('') : empty(s);
    show($('sec-education'), !!sec.education);

    /* ---- المشاريع ---- */
    var projs = Array.isArray(d.projects) ? d.projects : [];
    $('projectsList').innerHTML = projs.length ? projs.map(function (pr) {
      var tech = Array.isArray(pr.tech) ? pr.tech : [];
      return '<div class="project-card">' +
        '<div class="project-header">' +
          '<div class="project-name">' + esc(bi(pr, 'name')) + '</div>' +
          '<div class="project-links">' +
            (pr.link ? '<a class="project-link" href="' + esc(safeURL(pr.link)) + '" target="_blank" rel="noopener">Code</a>' : '') +
            (pr.demo ? '<a class="project-link" href="' + esc(safeURL(pr.demo)) + '" target="_blank" rel="noopener">Demo</a>' : '') +
          '</div>' +
        '</div>' +
        '<div class="project-desc">' + esc(bi(pr, 'description')) + '</div>' +
        (tech.length ? '<div class="project-tech">' + tech.map(function (t) { return '<span class="tech-badge">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    }).join('') : empty(s);
    show($('sec-projects'), !!sec.projects);

    /* ---- الإنجازات ---- */
    var ach = Array.isArray(d.achievements) ? d.achievements : [];
    $('achievementsList').innerHTML = ach.length ? ach.map(function (a) {
      return '<div class="achievement-item">' +
        '<div class="achievement-icon" aria-hidden="true">🏆</div>' +
        '<div>' +
          '<div class="achievement-title">' + esc(bi(a, 'title')) +
            (a.date ? '<span class="achievement-year">' + esc(a.date) + '</span>' : '') + '</div>' +
          (bi(a, 'description') ? '<div class="achievement-desc">' + esc(bi(a, 'description')) + '</div>' : '') +
        '</div>' +
      '</div>';
    }).join('') : empty(s);
    show($('sec-achievements'), !!sec.achievements);

    /* ---- المهارات التقنية ---- */
    var tech = (d.skills && Array.isArray(d.skills.technical)) ? d.skills.technical : [];
    var useBars = s.showSkillBars && !state.ats;
    $('technicalSkills').innerHTML = tech.length ? tech.map(function (sk) {
      var lvl = clampNum(sk.level, 0, 100, 0);
      return '<div class="skill-item">' +
        '<div class="skill-header">' +
          '<span class="skill-name">' + esc(bi(sk, 'name')) + '</span>' +
          '<span class="skill-pct">' + lvl + '%</span>' +
        '</div>' +
        (useBars
          ? '<div class="skill-bar" role="progressbar" aria-valuenow="' + lvl + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + esc(bi(sk, 'name')) + '">' +
              '<div class="skill-fill" data-level="' + lvl + '"></div></div>'
          : '') +
      '</div>';
    }).join('') : empty(s);
    show($('sec-skills'), !!sec.skills);

    /* ---- المهارات الشخصية ---- */
    var soft = (d.skills && Array.isArray(d.skills.soft)) ? d.skills.soft : [];
    $('softSkills').innerHTML = soft.length
      ? soft.map(function (sk) { return '<span class="tag">' + esc(bi(sk, 'name')) + '</span>'; }).join('')
      : empty(s);
    show($('sec-soft'), !!sec.softSkills);

    /* ---- اللغات ---- */
    var langs = (d.skills && Array.isArray(d.skills.languages)) ? d.skills.languages : [];
    $('languageSkills').innerHTML = langs.length ? langs.map(function (l) {
      return '<div class="lang-item">' +
        '<span>' + esc(bi(l, 'name')) + '</span>' +
        '<span class="lang-level">' + esc(state.lang === 'ar' ? (l.levelAr || l.levelEn || '') : (l.levelEn || l.levelAr || '')) + '</span>' +
      '</div>';
    }).join('') : empty(s);
    show($('sec-langs'), !!sec.languages);

    /* ---- الشهادات ---- */
    var certs = Array.isArray(d.certifications) ? d.certifications : [];
    $('certificationsList').innerHTML = certs.length ? certs.map(function (c) {
      return '<div class="cert-item">' +
        '<div class="cert-icon" aria-hidden="true">🎖</div>' +
        '<div class="cert-info">' +
          '<div class="cert-name">' + esc(bi(c, 'name')) + '</div>' +
          '<div class="cert-meta">' +
            '<span>' + esc(bi(c, 'issuer')) + '</span>' +
            (c.date ? '<span>· ' + esc(c.date) + '</span>' : '') +
            (c.link ? '<a href="' + esc(safeURL(c.link)) + '" target="_blank" rel="noopener">' + (state.lang === 'ar' ? 'الشهادة' : 'Certificate') + '</a>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('') : empty(s);
    show($('sec-certs'), !!sec.certifications);

    /* ---- ترويسة شريط الأدوات ---- */
    $('brandText').textContent = name;
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (UI[state.lang] && UI[state.lang][k]) el.textContent = UI[state.lang][k];
    });
    $('langLabel').textContent = state.lang === 'ar' ? 'EN' : 'ع';

    /* ---- حالة زر ATS + الشريط ---- */
    $('atsBtn').classList.toggle('btn-ats-on', state.ats);
    $('atsBtn').setAttribute('aria-pressed', state.ats ? 'true' : 'false');
    var banner = $('atsBanner');
    $('atsBannerText').textContent = tx('atsOn');
    $('atsExitLabel').textContent = tx('atsExit');
    banner.hidden = !state.ats;

    /* ---- تذييل الطباعة ---- */
    $('pageFoot').textContent = location.host ? location.protocol + '//' + location.host + location.pathname : '';

    /* ---- تحريك أشرطة المهارات ---- */
    requestAnimationFrame(function () {
      setTimeout(function () {
        $$('.skill-fill').forEach(function (el) {
          el.style.width = (parseFloat(el.dataset.level) || 0) + '%';
        });
      }, 60);
    });

    buildJsonLd();
  }

  function empty() { return '<div class="section-empty">' + esc(tx('noData')) + '</div>'; }

  /* ========================================================================
     6) التبديلات
     ===================================================================== */
  function toggleLang() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    persistPrefs();
    render();
    showToast(tx('langToast') === 'English' ? 'English' : (state.lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English'));
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    persistPrefs();
    render();
  }

  function toggleAts() {
    state.ats = !state.ats;
    persistPrefs();
    render();
    showToast(state.ats ? tx('atsOn') : tx('atsOff'));
  }

  function setLang(lang) {
    if (lang !== 'ar' && lang !== 'en') return;
    state.lang = lang; persistPrefs(); render();
  }

  function setTheme(theme) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    persistPrefs(); render();
  }

  function setAts(on) {
    state.ats = !!on; persistPrefs(); render();
  }

  function setAccent(hex) {
    state.prefs.accentColor = hex; persistPrefs(); render();
  }

  function setSection(name, on) {
    state.prefs.sections = state.prefs.sections || {};
    state.prefs.sections[name] = !!on;
    persistPrefs(); render();
  }

  function setSetting(key, val) {
    state.prefs[key] = val; persistPrefs(); render();
  }

  function setLayout(v)  { setSetting('layout', v === 'one' ? 'one' : 'two'); }
  function setDensity(v) { setSetting('density', v === 'compact' ? 'compact' : 'normal'); }

  /* ========================================================================
     7) الطباعة + تصدير صورة
     ===================================================================== */
  function printCV() {
    // اجعل أشرطة المهارات في موضعها النهائي قبل فتح نافذة الطباعة
    $$('.skill-fill').forEach(function (el) {
      el.style.transition = 'none';
      el.style.width = (parseFloat(el.dataset.level) || 0) + '%';
    });
    // لو كان المستخدِم يطبع بدون تفعيل ATS، نوقف فقط شريط الأدوات
    window.print();
    setTimeout(function () {
      $$('.skill-fill').forEach(function (el) { el.style.transition = ''; });
    }, 800);
  }

  /* ---------- تصدير صورة (PNG / JPG) بدون أي مكتبة خارجية ---------- */

  /** يجمع كل قواعد CSS الخاصة بالصفحة في نص واحد */
  function collectCSS() {
    var out = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i], rules;
      try { rules = sheet.cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (var j = 0; j < rules.length; j++) {
        var t = rules[j].cssText || '';
        if (t.indexOf('@media print') === 0) continue;   // لا نطبع أنماط الطباعة داخل الصورة
        if (t.indexOf('@media (prefers-reduced-motion') === 0) continue;
        out.push(t);
      }
    }
    return out.join('\n');
  }

  /** يجلب خطوط Google كـ data URI حتى تظهر داخل الصورة */
  function inlineFonts(css) {
    var links = $$('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    if (!links.length) return Promise.resolve(css);
    var url = links[0].href;
    if (state.lang === 'ar' && links[1]) url = links[1].href;
    return fetch(url, { credentials: 'omit' })
      .then(function (r) { return r.text(); })
      .then(function (text) {
        var jobs = [];
        text.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, function (_, u) {
          if (jobs.some(function (j) { return j.u === u; })) return _;
          jobs.push({ u: u, p: fetch(u).then(function (r) { return r.blob(); }).then(function (b) {
            return new Promise(function (res) {
              var fr = new FileReader();
              fr.onload = function () { res({ u: u, v: fr.result }); };
              fr.onerror = function () { res(null); };
              fr.readAsDataURL(b);
            });
          }).catch(function () { return null; }) });
          return _;
        });
        return Promise.all(jobs.map(function (j) { return j.p; })).then(function (res) {
          var fontCSS = text;
          res.forEach(function (r) { if (r) fontCSS = fontCSS.split(r.u).join(r.v); });
          return css + '\n' + fontCSS;
        });
      })
      .catch(function () { return css; });   // فشل التحميل غير مؤثر
  }

  /** يجلب الصورة الشخصية كـ data URI (وإلا Tomcat canvas) */
  function inlinePhoto() {
    var img = $('photoEl') ? $('photoEl').querySelector('img') : null;
    if (!img) return Promise.resolve();
    var src = img.getAttribute('src');
    if (!src || src.indexOf('data:') === 0) return Promise.resolve();
    return fetch(src).then(function (r) { return r.blob(); }).then(function (b) {
      return new Promise(function (res) {
        var fr = new FileReader();
        fr.onload = function () { img.setAttribute('src', fr.result); res(); };
        fr.onerror = function () { res(); };
        fr.readAsDataURL(b);
      });
    }).catch(function () {});
  }

  /** يحذف كل عقد التعليقات من العنصر (تعليقات HTML تحتوي "--" وهي XML غير صالح) */
  function stripComments(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) { if (node.parentNode) node.parentNode.removeChild(node); });
    return root;
  }

  /** يبني مستند SVG يحتوي على السيرة */
  function buildSVG(cssText, width, height) {
    var paper = stripComments($('cvPaper').cloneNode(true));

    // نظّف العناصر التفاعلية غير المرئية في التصدير
    $$('.project-link', paper).forEach(function (n) { n.remove(); });
    $$('.cert-meta a', paper).forEach(function (n) { n.remove(); });

    var wrap = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    wrap.setAttribute('dir', document.documentElement.getAttribute('dir') || 'ltr');
    wrap.setAttribute('lang', state.lang);
    wrap.setAttribute('style',
      'width:' + width + 'px;background:' + (state.theme === 'dark' ? '#0b1120' : '#ffffff') + ';margin:0;padding:0;');

    var styleEl = document.createElementNS('http://www.w3.org/1999/xhtml', 'style');
    styleEl.textContent = cssText +
      '\n.cv-paper{box-shadow:none !important;border:1px solid ' +
      (state.theme === 'dark' ? '#22304d' : '#e2e6ee') + ' !important;width:' + width + 'px;margin:0;}' +
      '\n.cv-wrapper{padding:0 !important;max-width:none !important;}';

    wrap.appendChild(styleEl);
    wrap.appendChild(paper);

    var body = new XMLSerializer().serializeToString(wrap);
    // امنع كسر XML من رموز التحكم
    body = body.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' +
      width + ' ' + height + '">' +
      '<foreignObject x="0" y="0" width="' + width + '" height="' + height + '">' +
      body + '</foreignObject></svg>';
  }

  function svgToCanvas(svgStr, width, height, type, quality, scale) {
    return new Promise(function (resolve, reject) {
      var blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(width * scale);
          canvas.height = Math.round(height * scale);
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = state.theme === 'dark' ? '#0b1120' : '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);
          canvas.toBlob(function (b) {
            if (!b) return reject(new Error('toBlob failed'));
            resolve(b);
          }, type, quality);
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('svg load failed')); };
      img.src = url;
    });
  }

  var busy = false;
  function exportImage(type, mode) {
    type = type === 'jpg' ? 'jpeg' : 'png';
    mode = mode || 'download';
    if (busy) return;
    busy = true;
    showToast(tx('image') + '…');

    var paper = $('cvPaper');
    var rect = paper.getBoundingClientRect();
    var width = Math.ceil(rect.width);
    var height = Math.ceil(paper.scrollHeight || rect.height);
    var scale = Math.min(2, Math.max(1, 16000 / height));

    return inlinePhoto()
      .then(function () { return inlineFonts(collectCSS()); })
      .then(function (css) { return buildSVG(css, width, height); })
      .then(function (svg) { return svgToCanvas(svg, width, height, 'image/' + type, 0.94, scale); })
      .then(function (blob) {
        var d = getData();
        var fname = slug(bi(d.personal || {}, 'name')) + '-CV-' + state.lang.toUpperCase() +
                    (type === 'jpeg' ? '.jpg' : '.png');
        var file = new File([blob], fname, { type: blob.type });

        if (mode === 'copy' && navigator.clipboard && window.ClipboardItem) {
          return navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]).then(function () {
            showToast(tx('menuCopy') + ' ✓');
          });
        }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fname;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        showToast(tx('imgDone'));
      })
      .catch(function () { showToast(tx('imgFail')); })
      .then(function () { busy = false; });
  }

  /** قائمة صغيرة لاختيار صيغة الصورة */
  function imageMenu(anchor) {
    var old = $('.img-menu');
    if (old) { old.remove(); return; }

    var menu = document.createElement('div');
    menu.className = 'img-menu';
    menu.setAttribute('role', 'menu');
    var items = [
      { label: tx('menuPng'), fn: function () { exportImage('png'); } },
      { label: tx('menuJpg'), fn: function () { exportImage('jpg'); } },
      { label: tx('menuCopy'), fn: function () { exportImage('png', 'copy'); } }
    ];
    menu.innerHTML = items.map(function (it, i) {
      return '<button type="button" role="menuitem" data-i="' + i + '">' + esc(it.label) + '</button>';
    }).join('');
    document.body.appendChild(menu);

    var r = anchor.getBoundingClientRect();
    var top = r.bottom + window.scrollY + 6;
    menu.style.position = 'absolute';
    menu.style.top = top + 'px';
    if (isRTL()) {
      menu.style.right = Math.max(8, window.innerWidth - r.right) + 'px';
    } else {
      menu.style.left = Math.max(8, r.left + window.scrollX) + 'px';
    }

    menu.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-i]');
      if (!b) return;
      items[+b.dataset.i].fn();
      menu.remove();
    });
    setTimeout(function () {
      document.addEventListener('click', function h(ev) {
        if (!menu.contains(ev.target)) { menu.remove(); document.removeEventListener('click', h); }
      });
    }, 0);
  }

  /* ========================================================================
     8) المشاركة + البيانات المنظمة + التشغيل
     ===================================================================== */
  function shareCV() {
    var d = getData();
    var payload = {
      title: bi(d.personal || {}, 'name') + ' — CV',
      text: (bi(d.personal || {}, 'summary') || '').slice(0, 200),
      url: location.href
    };
    if (navigator.share) {
      navigator.share(payload).catch(function () {});
    } else {
      copyText(location.href).then(function () { showToast(tx('copied')); });
    }
  }

  function shareWhatsApp() {
    var d = getData();
    var name = bi(d.personal || {}, 'name') || 'CV';
    var title = bi(d.personal || {}, 'title') || '';
    var url = location.href;
    var text = '👋 ' + name + (title ? ' — ' + title : '') + '\n\n' + url;
    var waUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  function copyText(txt) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(txt);
    }
    return new Promise(function (res) {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove();
      res();
    });
  }

  /** JSON-LD = أقوى صيغة ساخرة لمحركات البحث والـ ATS */
  function buildJsonLd() {
    var d = getData(), p = d.personal || {}, s = getSettings();
    var lang = state.lang;
    var pick = function (field) { return (lang === 'ar' ? (p[field + 'Ar'] || p[field + 'En']) : (p[field + 'En'] || p[field + 'Ar'])) || ''; };
    var plist = function (field) {
      var arr = (lang === 'ar' ? (p[field + 'Ar'] || p[field + 'En']) : (p[field + 'En'] || p[field + 'Ar'])) || [];
      return Array.isArray(arr) ? arr : [];
    };

    var person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': pick('name'),
      'jobTitle': pick('title'),
      'description': pick('summary')
    };
    if (p.email) person.email = 'mailto:' + p.email;
    if (p.phone) person.telephone = p.phone;
    if (p.website) person.url = safeURL(p.website);
    if (p.location) {
      person.address = { '@type': 'PostalAddress', 'addressLocality': p.location };
    }
    var sameAs = [];
    if (p.linkedin) sameAs.push(safeURL(p.linkedin));
    if (p.github) sameAs.push(safeURL(p.github));
    if (sameAs.length) person.sameAs = sameAs;

    var tech = (d.skills && d.skills.technical) || [];
    if (tech.length) {
      person.knowsAbout = tech.map(function (t) { return bi(t, 'name'); })
        .filter(function (x) { return x; });
    }
    var langs = (d.skills && d.skills.languages) || [];
    if (langs.length) {
      person.knowsLanguage = langs.map(function (l) {
        var n = bi(l, 'name');
        return /^en/i.test(n) ? 'en' : (/^ا|^ع|arab/i.test(n) ? 'ar' : n);
      });
    }
    var edu = Array.isArray(d.education) ? d.education : [];
    if (edu.length) {
      person.alumniOf = {
        '@type': 'EducationalOrganization',
        'name': bi(edu[0], 'institution')
      };
    }
    var certs = Array.isArray(d.certifications) ? d.certifications : [];
    if (certs.length) {
      person.hasCredential = certs.map(function (c) {
        return { '@type': 'EducationalOccupationalCredential', 'name': bi(c, 'name'), 'dateCreated': c.date || undefined };
      });
    }
    var jobs = Array.isArray(d.experience) ? d.experience : [];
    if (jobs.length) {
      person.worksFor = jobs.map(function (j) {
        var o = { '@type': 'Organization', 'name': bi(j, 'company') };
        if (j.startDate) o.startDate = isoDate(j.startDate);
        if (j.endDate) o.endDate = isoDate(j.endDate);
        return o;
      });
    }
    void s;
    $('jsonLd').textContent = JSON.stringify(person, null, 2);
  }

  /* ---------- التنبيه ---------- */
  var toastTimer = null;
  function showToast(msg) {
    var el = $('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  /* ---------- اختصارات لوحة المفاتيح ---------- */
  function bindKeys() {
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key.toLowerCase();
      if (k === 'l') { toggleLang(); }
      else if (k === 'd') { toggleTheme(); }
      else if (k === 'a') { toggleAts(); }
      else if (k === 'p') { e.preventDefault(); printCV(); }
      else if (k === 'i') { e.preventDefault(); exportImage('png'); }
      else if (k === 'e') { if (window.toggleEditor) toggleEditor(); }
      else if (k === 'escape') {
        var m = $('.img-menu');
        if (m) m.remove();
        if (window.closeEditor && window.closeEditor()) return;
        if (state.ats) setAts(false);   /* مخرج ثانٍ من وضع ATS */
      }
    });
  }

  /* ---------- التشغيل ---------- */
  function init() {
    render();
    bindKeys();

    window.addEventListener('beforeprint', function () {
      $$('.skill-fill').forEach(function (el) {
        el.style.transition = 'none';
        el.style.width = (parseFloat(el.dataset.level) || 0) + '%';
      });
    });
  }

  /* ---------- الواجهة العامة ---------- */
  window.cvState      = state;
  window.cvGetData    = getData;
  window.cvGetSettings= getSettings;
  window.cvSaveData   = function (obj) {
    state.data = deepMerge(cvData || {}, obj || {});
    return writeJSON(STORE_DATA, state.data);
  };
  window.cvResetData  = function () { removeKey(STORE_DATA); state.data = null; render(); };
  window.cvHasLocalEdits = function () { return !!readJSON(STORE_DATA); };
  window.cvExportJSON = function () {
    var data = state.data || deepMerge(cvData || {}, readJSON(STORE_DATA) || {});
    return 'const cvData = ' + JSON.stringify(stripRuntime(data), null, 2) + ';\n';
  };
  function stripRuntime(data) {
    var out = JSON.parse(JSON.stringify(data));
    if (out.settings) {
      delete out.settings.theme;
      delete out.settings.ats;
    }
    return out;
  }

  window.toggleLang   = toggleLang;
  window.toggleTheme  = toggleTheme;
  window.toggleAts    = toggleAts;
  window.setLang      = setLang;
  window.setTheme     = setTheme;
  window.setAts       = setAts;
  window.setAccent    = setAccent;
  window.setSection   = setSection;
  window.setSetting   = setSetting;
  window.setLayout    = setLayout;
  window.setDensity   = setDensity;
  window.printCV      = printCV;
  window.exportImage  = exportImage;
  window.showImageMenu = imageMenu;
  window.cvBuildSVG   = function () {         // مُ useful للدمج أو التشخيص
    var paper = $('cvPaper');
    return buildSVG(collectCSS(), Math.ceil(paper.getBoundingClientRect().width), Math.ceil(paper.scrollHeight));
  };
  window.shareCV      = shareCV;
  window.shareWhatsApp = shareWhatsApp;
  window.showToast    = showToast;
  window.cvRerender   = render;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
