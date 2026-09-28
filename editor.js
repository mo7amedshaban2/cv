/* ==========================================================================
   editor.js — محرر البيانات داخل المتصفح
   --------------------------------------------------------------------------
   كل تعديل هنا يُحفظ في localStorage على جهازك فقط (لا يُرفع لأي خادم).
   لتثبيت التعديلات على النشر: Export data.js ثم ارفع الملف على GitHub.
   ========================================================================== */
(function () {
  'use strict';

  var AR = true;              // نصوص المحرر بالعربية (يمكن تبديلها يدوياً أدناه)
  var open = false;
  var W = null;               // نسخة عمل من البيانات
  var tab = 'personal';

  var TABS = [
    { id: 'personal', ar: 'الشخصية', en: 'Personal' },
    { id: 'appearance', ar: 'المظهر', en: 'Appearance' },
    { id: 'experience', ar: 'الخبرات', en: 'Experience' },
    { id: 'education', ar: 'التعليم', en: 'Education' },
    { id: 'skills', ar: 'المهارات', en: 'Skills' },
    { id: 'projects', ar: 'المشاريع', en: 'Projects' },
    { id: 'certs', ar: 'الشهادات', en: 'Certs' },
    { id: 'achieve', ar: 'الإنجازات', en: 'Awards' },
    { id: 'data', ar: 'البيانات', en: 'Data' }
  ];

  /* ترجمات واجهة المحرر */
  var L = {
    title:      'تحرير السيرة الذاتية',
    sub:        'التعديلات تُحفظ في هذا المتصفح فقط',
    save:       'حفظ',
    saved:      'تم الحفظ ✓',
    cancel:     'إلغاء',
    close:      'إغلاق',
    add:        'إضافة',
    del:        'حذف',
    empty:      'لا توجد عناصر — اضغط «إضافة»',
    ar:         'بالعربية',
    en:         'بالإنجليزية',
    lines:      'سطر واحد لكل عنصر',
    exportFile: 'تنزيل data.js',
    importFile: 'استيراد ملف',
    resetLocal: 'التراجع عن تعديلات المتصفح',
    resetAsk:   'سيتم حذف كل تعديلاتك المحفوظة في هذا المتصفح والعودة إلى محتوى ملف data.js. متابعة؟',
    note:       '<b>ملاحظة:</b> هذه التعديلات تعيش في متصفحك أنت. لفتحها على أي جهاز آخر أو نشرها للعالم، اضغط «تنزيل data.js» وارفع الملف على GitHub.',
    linkedLocal:'يوجد تعديلات محفوظة محلياً في هذا المتصفح.',
    lang:       'اللغة الافتراضية',
    theme:      'الوضع الافتراضي',
    dark:       'مظلم',
    light:      'فاتح',
    accent:     'اللون الرئيسي',
    layout:     'تخطيط الصفحة',
    twoCol:     'عمودان',
    oneCol:     'عمود واحد',
    density:    'كثافة العرض',
    normal:     'مريحة',
    compact:    'مضغوطة (صفحة واحدة)',
    printTheme: 'ألوان الطباعة',
    showPhoto:  'إظهار الصورة الشخصية',
    showBars:   'إظهار أشرطة المهارات',
    showIcons:  'إظهار الأيقونات',
    dateFormat: 'صيغة التواريخ',
    fmtLong:    'يناير 2023 / Jan 2023',
    fmtNum:     '01/2023 (رقمية)',
    sections:   'الأقسام الظاهرة',
    useditor:   'استخدم المحرر لإضافة أي محتوى تريده',
    langNote:   'اللغة تُحدَّد من الشريط العلوي وتُحفظ تلقائياً.'
  };

  function t(k) { return L[k] || k; }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function arrToText(a) { return Array.isArray(a) ? a.join('\n') : ''; }
  function textToArr(s) {
    return String(s || '').split('\n')
      .map(function (x) { return x.trim(); })
      .filter(function (x) { return x !== ''; });
  }

  /* ---------------------------------------------------------------- أدوات */
  function field(label, value, onInput, opts) {
    opts = opts || {};
    var id = 'f' + (field._i = (field._i || 0) + 1);
    return '<div class="field"><label for="' + id + '">' + esc(label) + '</label>' +
      '<input id="' + id + '" type="' + (opts.type || 'text') + '" value="' + esc(value || '') + '"' +
      (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : '') +
      (opts.dir ? ' dir="' + opts.dir + '"' : '') +
      ' data-oninput="' + esc(onInput) + '">' +
      (opts.hint ? '<div class="hint">' + esc(opts.hint) + '</div>' : '') +
      '</div>';
  }

  function area(label, value, onInput, hint, dir) {
    var id = 'f' + (field._i = (field._i || 0) + 1);
    return '<div class="field"><label for="' + id + '">' + esc(label) + '</label>' +
      '<textarea id="' + id + '"' + (dir ? ' dir="' + dir + '"' : '') +
      ' data-oninput="' + esc(onInput) + '">' + esc(arrToText(value)) + '</textarea>' +
      (hint ? '<div class="hint">' + esc(hint) + '</div>' : '') + '</div>';
  }

  function pair(labelA, valA, pathA, labelB, valB, pathB, opts) {
    return '<div class="field-row">' +
      field(labelA, valA, pathA, opts) +
      field(labelB, valB, pathB, opts) +
      '</div>';
  }

  function selectField(label, value, options, onChange) {
    var id = 'f' + (field._i = (field._i || 0) + 1);
    return '<div class="field"><label for="' + id + '">' + esc(label) + '</label>' +
      '<select id="' + id + '" data-onchange="' + esc(onChange) + '">' +
      options.map(function (o) {
        return '<option value="' + esc(o[0]) + '"' + (o[0] === value ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('') + '</select></div>';
  }

  function switchRow(label, checked, onChange) {
    var id = 'f' + (field._i = (field._i || 0) + 1);
    return '<label class="switch-row" for="' + id + '"><span>' + esc(label) + '</span>' +
      '<input id="' + id + '" type="checkbox"' + (checked ? ' checked' : '') +
      ' data-onchange="' + esc(onChange) + '"></label>';
  }

  function group(title, items, renderItem, newItem) {
    return '<div class="ed-group">' +
      '<div class="ed-group-head"><span>' + esc(title) + '</span>' +
        '<button type="button" class="icon-btn" data-add="' + esc(title) + '" title="' + esc(t('add')) + '">+</button>' +
      '</div>' +
      (items.length ? items.map(renderItem).join('') : '<div class="hint">' + esc(t('empty')) + '</div>') +
      '</div>';
  }

  /* ------------------------------------------------------------- التبويبات */
  function tabPersonal() {
    var p = W.personal = W.personal || {};
    return '<div class="ed-section-label">' + t('useditor') + '</div>' +
      field(t('ar') + ' — الاسم', p.nameAr, 'personal.nameAr', { dir: 'rtl' }) +
      field(t('en') + ' — Name',  p.nameEn, 'personal.nameEn', { dir: 'ltr' }) +
      area(t('ar') + ' — المسمى الوظيفي', p.titleAr, 'personal.titleAr') +
      area(t('en') + ' — Job Title', p.titleEn, 'personal.titleEn', 'dir="ltr"') +
      field('البريد الإلكتروني / Email', p.email, 'personal.email', { type: 'email', dir: 'ltr' }) +
      field('الهاتف / Phone', p.phone, 'personal.phone', { type: 'tel', dir: 'ltr' }) +
      field('الموقع / Location', p.location, 'personal.location', { dir: 'ltr' }) +
      field('LinkedIn', p.linkedin, 'personal.linkedin', { type: 'url', dir: 'ltr' }) +
      field('GitHub', p.github, 'personal.github', { type: 'url', dir: 'ltr' }) +
      field('موقعك / Website', p.website, 'personal.website', { type: 'url', dir: 'ltr' }) +
      field('رابط الصورة / Photo URL', p.photo, 'personal.photo', { type: 'url', dir: 'ltr',
        hint: 'ضع رابط صورة مباشرة (ينتهي بـ .jpg أو .png)' }) +
      area(t('ar') + ' — نبذة', p.summaryAr, 'personal.summaryAr', t('lines')) +
      area(t('en') + ' — Summary', p.summaryEn, 'personal.summaryEn', t('lines'), 'ltr');
  }

  function tabAppearance() {
    var s = window.cvGetSettings();
    var sec = s.sections || {};
    var names = {
      summary: 'النبذة', experience: 'الخبرة', education: 'التعليم',
      skills: 'المهارات التقنية', softSkills: 'المهارات الشخصية',
      languages: 'اللغات', projects: 'المشاريع',
      certifications: 'الشهادات', achievements: 'الإنجازات'
    };
    return '<div class="ed-section-label">الوضع</div>' +
      selectField(t('lang'), s.defaultLang, [['en', 'English'], ['ar', 'العربية']], 'set:defaultLang') +
      selectField(t('theme'), s.defaultTheme, [['dark', t('dark')], ['light', t('light')]], 'set:defaultTheme') +
      '<div class="field"><label>' + esc(t('accent')) + '</label>' +
        '<div class="field-row">' +
          '<input type="color" value="' + esc(s.accentColor || '#b8860b') + '" data-oninput="set:accentColor">' +
          '<input type="text" value="' + esc(s.accentColor || '#b8860b') + '" data-oninput="set:accentColor" dir="ltr">' +
        '</div><div class="hint">' + esc(t('langNote')) + '</div></div>' +
      '<div class="ed-section-label">التخطيط</div>' +
      selectField(t('layout'), s.layout, [['two', t('twoCol')], ['one', t('oneCol')]], 'set:layout') +
      selectField(t('density'), s.density, [['normal', t('normal')], ['compact', t('compact')]], 'set:density') +
      selectField(t('printTheme'), s.printTheme || 'light', [['light', t('light')], ['dark', t('dark')]], 'set:printTheme') +
      selectField(t('dateFormat'), s.dateFormat || 'long', [['long', t('fmtLong')], ['numeric', t('fmtNum')]], 'set:dateFormat') +
      '<div class="ed-section-label">العناصر</div>' +
      switchRow(t('showPhoto'), !!s.showPhoto, 'set:showPhoto') +
      switchRow(t('showBars'), !!s.showSkillBars, 'set:showSkillBars') +
      switchRow(t('showIcons'), !!s.showIcons, 'set:showIcons') +
      '<div class="ed-section-label">' + esc(t('sections')) + '</div>' +
      Object.keys(names).map(function (k) {
        return switchRow(names[k], sec[k] !== false, 'sec:' + k);
      }).join('');
  }

  function tabExperience() {
    var list = W.experience = Array.isArray(W.experience) ? W.experience : [];
    return group(t('experience'), list, function (job, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="experience:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), job.titleAr, 'experience.' + i + '.titleAr', { dir: 'rtl' }) +
        field(t('en'), job.titleEn, 'experience.' + i + '.titleEn', { dir: 'ltr' }) +
        field(t('ar'), job.companyAr, 'experience.' + i + '.companyAr', { dir: 'rtl' }) +
        field(t('en'), job.companyEn, 'experience.' + i + '.companyEn', { dir: 'ltr' }) +
        field('المدينة (ع)', job.locationAr, 'experience.' + i + '.locationAr', { dir: 'rtl' }) +
        field('City (en)', job.locationEn, 'experience.' + i + '.locationEn', { dir: 'ltr' }) +
        '<div class="field-row">' +
          field('من / Start (YYYY-MM)', job.startDate, 'experience.' + i + '.startDate', { dir: 'ltr', placeholder: '2023-01' }) +
          field('إلى / End (فارغ = الآن)', job.endDate, 'experience.' + i + '.endDate', { dir: 'ltr', placeholder: '2025-04' }) +
        '</div>' +
        area(t('ar') + ' — المهام', job.descriptionAr, 'experience.' + i + '.descriptionAr', t('lines')) +
        area(t('en') + ' — Duties', job.descriptionEn, 'experience.' + i + '.descriptionEn', t('lines'));
    }, { titleAr: '', titleEn: '', companyAr: '', companyEn: '', startDate: '', endDate: '', descriptionAr: [], descriptionEn: [] });
  }

  function tabEducation() {
    var list = W.education = Array.isArray(W.education) ? W.education : [];
    return group(t('education'), list, function (e, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="education:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), e.degreeAr, 'education.' + i + '.degreeAr', { dir: 'rtl' }) +
        field(t('en'), e.degreeEn, 'education.' + i + '.degreeEn', { dir: 'ltr' }) +
        field(t('ar'), e.institutionAr, 'education.' + i + '.institutionAr', { dir: 'rtl' }) +
        field(t('en'), e.institutionEn, 'education.' + i + '.institutionEn', { dir: 'ltr' }) +
        field('المدينة (ع)', e.locationAr, 'education.' + i + '.locationAr', { dir: 'rtl' }) +
        field('City (en)', e.locationEn, 'education.' + i + '.locationEn', { dir: 'ltr' }) +
        '<div class="field-row">' +
          field('Start (YYYY)', e.startDate, 'education.' + i + '.startDate', { dir: 'ltr', placeholder: '2020' }) +
          field('End (YYYY)', e.endDate, 'education.' + i + '.endDate', { dir: 'ltr', placeholder: '2024' }) +
        '</div>' +
        field('التقدير / Grade', e.gpaEn, 'education.' + i + '.gpaEn', { dir: 'ltr' }) +
        area(t('ar') + ' — تفاصيل', e.descriptionAr, 'education.' + i + '.descriptionAr', t('lines')) +
        area(t('en') + ' — details', e.descriptionEn, 'education.' + i + '.descriptionEn', t('lines'));
    }, { degreeAr: '', degreeEn: '', institutionAr: '', institutionEn: '', startDate: '', endDate: '', descriptionAr: [], descriptionEn: [] });
  }

  function tabSkills() {
    W.skills = W.skills || {};
    var tech = W.skills.technical = Array.isArray(W.skills.technical) ? W.skills.technical : [];
    var soft = W.skills.soft = Array.isArray(W.skills.soft) ? W.skills.soft : [];
    var lang = W.skills.languages = Array.isArray(W.skills.languages) ? W.skills.languages : [];

    return group('المهارات التقنية', tech, function (s, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="skills.technical:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field('الاسم / Name', s.nameEn || s.nameAr, 'skills.technical.' + i + '.nameEn', { dir: 'ltr' }) +
        '<div class="field"><label>النسبة %</label><input type="number" min="0" max="100" value="' +
          esc(s.level === undefined ? 80 : s.level) + '" data-oninput="skills.technical.' + i + '.level"></div>';
    }, { nameAr: '', nameEn: '', level: 80 }) +

    group('المهارات الشخصية', soft, function (s, i) {
      return '<div class="field-row">' +
        field('بالعربية', s.nameAr, 'skills.soft.' + i + '.nameAr', { dir: 'rtl' }) +
        '<div style="flex:0 0 34px;display:flex;align-items:flex-end;padding-bottom:2px">' +
          '<button type="button" class="icon-btn danger" data-del="skills.soft:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field('بالإنجليزية', s.nameEn, 'skills.soft.' + i + '.nameEn', { dir: 'ltr' }) +
        '</div>';
    }, { nameAr: '', nameEn: '' }) +

    group('اللغات', lang, function (l, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="skills.languages:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), l.nameAr, 'skills.languages.' + i + '.nameAr', { dir: 'rtl' }) +
        field(t('en'), l.nameEn, 'skills.languages.' + i + '.nameEn', { dir: 'ltr' }) +
        field('المستوى (ع)', l.levelAr, 'skills.languages.' + i + '.levelAr', { dir: 'rtl' }) +
        field('Level (en)', l.levelEn, 'skills.languages.' + i + '.levelEn', { dir: 'ltr' });
    }, { nameAr: '', nameEn: '', levelAr: '', levelEn: '' });
  }

  function tabProjects() {
    var list = W.projects = Array.isArray(W.projects) ? W.projects : [];
    return group(t('projects'), list, function (p, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="projects:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), p.nameAr, 'projects.' + i + '.nameAr', { dir: 'rtl' }) +
        field(t('en'), p.nameEn, 'projects.' + i + '.nameEn', { dir: 'ltr' }) +
        area(t('ar') + ' — الوصف', p.descriptionAr, 'projects.' + i + '.descriptionAr') +
        area(t('en') + ' — Description', p.descriptionEn, 'projects.' + i + '.descriptionEn', null, 'ltr') +
        area('التقنيات / Tech', p.tech, 'projects.' + i + '.tech', t('lines')) +
        field('رابط الكود', p.link, 'projects.' + i + '.link', { type: 'url', dir: 'ltr' }) +
        field('رابط الديمو', p.demo, 'projects.' + i + '.demo', { type: 'url', dir: 'ltr' });
    }, { nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '', tech: [], link: '', demo: '' });
  }

  function tabCerts() {
    var list = W.certifications = Array.isArray(W.certifications) ? W.certifications : [];
    return group(t('certs'), list, function (c, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="certifications:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), c.nameAr, 'certifications.' + i + '.nameAr', { dir: 'rtl' }) +
        field(t('en'), c.nameEn, 'certifications.' + i + '.nameEn', { dir: 'ltr' }) +
        field('الجهة (ع)', c.issuerAr, 'certifications.' + i + '.issuerAr', { dir: 'rtl' }) +
        field('Issuer (en)', c.issuerEn, 'certifications.' + i + '.issuerEn', { dir: 'ltr' }) +
        field('السنة', c.date, 'certifications.' + i + '.date', { dir: 'ltr' }) +
        field('رابط الشهادة', c.link, 'certifications.' + i + '.link', { type: 'url', dir: 'ltr' });
    }, { nameAr: '', nameEn: '', issuerAr: '', issuerEn: '', date: '', link: '' });
  }

  function tabAchieve() {
    var list = W.achievements = Array.isArray(W.achievements) ? W.achievements : [];
    return group(t('achieve'), list, function (a, i) {
      return '<div class="ed-group-head"><span>#' + (i + 1) + '</span>' +
          '<button type="button" class="icon-btn danger" data-del="achievements:' + i + '" title="' + esc(t('del')) + '">×</button></div>' +
        field(t('ar'), a.titleAr, 'achievements.' + i + '.titleAr', { dir: 'rtl' }) +
        field(t('en'), a.titleEn, 'achievements.' + i + '.titleEn', { dir: 'ltr' }) +
        area(t('ar') + ' — التفاصيل', a.descriptionAr, 'achievements.' + i + '.descriptionAr') +
        area(t('en') + ' — Details', a.descriptionEn, 'achievements.' + i + '.descriptionEn', null, 'ltr') +
        field('السنة', a.date, 'achievements.' + i + '.date', { dir: 'ltr' });
    }, { titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', date: '' });
  }

  function tabData() {
    return '<div class="ed-note">' + t('note') + '</div>' +
      '<div class="ed-section-label">ملف البيانات</div>' +
      '<button type="button" class="btn btn-secondary" data-act="export" style="width:100%;justify-content:center;margin-bottom:8px">' +
        '⤓ ' + esc(t('exportFile')) + '</button>' +
      '<button type="button" class="btn btn-secondary" data-act="import" style="width:100%;justify-content:center;margin-bottom:8px">' +
        '⤒ ' + esc(t('importFile')) + '</button>' +
      '<button type="button" class="btn btn-secondary" data-act="reset" style="width:100%;justify-content:center">' +
        '↺ ' + esc(t('resetLocal')) + '</button>' +
      '<input type="file" id="importFile" accept=".js,.json,.txt" hidden>' +
      '<div class="ed-note" style="margin-top:12px">' +
        '<b>ترتيب الملفات:</b><br>' +
        'index.html — بنية الصفحة<br>' +
        'styles.css — التصميم والألوان<br>' +
        'app.js — المنطق والتصدير<br>' +
        'editor.js — هذا المحرر<br>' +
        'data.js — بياناتك (احفظ تعديلاتك هنا للنشر)' +
      '</div>';
  }

  var RENDERERS = {
    personal: tabPersonal, appearance: tabAppearance, experience: tabExperience,
    education: tabEducation, skills: tabSkills, projects: tabProjects,
    certs: tabCerts, achieve: tabAchieve, data: tabData
  };

  /* --------------------------------------------------------------- العرض */
  function paint() {
    var el = document.getElementById('editor');
    var body = document.querySelector('.ed-body');
    var scroll = body ? body.scrollTop : 0;

    el.innerHTML =
      '<div class="ed-head">' +
        '<div><h2>' + esc(t('title')) + '</h2><div class="ed-sub">' + esc(t('sub')) + '</div></div>' +
        '<button type="button" class="icon-btn" data-act="close" title="' + esc(t('close')) + '">×</button>' +
      '</div>' +
      '<div class="ed-tabs">' + TABS.map(function (x) {
        return '<button type="button" class="ed-tab" role="tab" data-tab="' + x.id + '"' +
          (x.id === tab ? ' aria-selected="true"' : ' aria-selected="false"') + '>' +
          esc(AR ? x.ar : x.en) + '</button>';
      }).join('') + '</div>' +
      '<div class="ed-body">' + RENDERERS[tab]() + '</div>' +
      '<div class="ed-foot">' +
        '<button type="button" class="btn btn-primary" data-act="save">' + esc(t('save')) + '</button>' +
        '<button type="button" class="btn btn-secondary" data-act="export">⤓ ' + esc(t('exportFile')) + '</button>' +
        '<button type="button" class="btn btn-secondary" data-act="close">' + esc(t('close')) + '</button>' +
      '</div>';

    if (body) body.scrollTop = scroll;
  }

  /* ------------------------------------------------------------- الأحداث */
  function setPath(path, value) {
    var parts = path.split('.');
    var obj = W;
    for (var i = 0; i < parts.length - 1; i++) {
      var key = parts[i];
      if (obj[key] === undefined || obj[key] === null) obj[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
      obj = obj[key];
    }
    obj[parts[parts.length - 1]] = value;
  }

  function getPath(path) {
    var parts = path.split('.'), obj = W, i;
    for (i = 0; i < parts.length; i++) {
      if (obj === undefined || obj === null) return undefined;
      obj = obj[parts[i]];
    }
    return obj;
  }

  var NUMERIC = /\.level$/;

  function onEdit(path, raw, isArea) {
    if (isArea) {
      // area قد تمثل حقلاً نصياً واحداً أو مصفوفة
      var cur = getPath(path);
      setPath(path, Array.isArray(cur) ? textToArr(raw) : raw);
    } else {
      setPath(path, NUMERIC.test(path) ? (parseInt(raw, 10) || 0) : raw);
    }
  }

  function onSetting(path, value) {
    if (path.indexOf('default') === 0) {
      // defaultLang / defaultTheme / defaultAts تبقى في data.js — نخزّنها في التفضيلات
      window.setSetting(path, value);
      if (path === 'defaultLang') window.setLang(value);
      if (path === 'defaultTheme') window.setTheme(value);
      return;
    }
    if (path === 'accentColor') window.setAccent(value);
    else window.setSetting(path, value);
  }

  function save() {
    window.cvSaveData(W);
    window.cvRerender();
    window.showToast(t('saved'));
    close();
  }

  function exportFile() {
    window.cvSaveData(W);
    var text = window.cvExportJSON();
    var blob = new Blob([text], { type: 'text/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    window.showToast('data.js ⤓');
  }

  function importFile(file) {
    if (!file) return;
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var txt = String(fr.result);
        // نقبل ملف data.js أو JSON
        var json = txt.trim();
        json = json.replace(/^\s*(const|let|var)\s+cvData\s*=\s*/, '').replace(/;\s*$/, '');
        var obj = JSON.parse(json);
        if (!obj || typeof obj !== 'object') throw new Error('bad');
        W = obj;
        window.cvSaveData(W);
        window.cvRerender();
        paint();
        window.showToast(t('saved'));
      } catch (err) {
        window.showToast('✕ ' + (err.message || 'error'));
      }
    };
    fr.readAsText(file);
  }

  function addItem(which) {
    var map = {
      'الخبرة العملية': ['experience', { titleAr: '', titleEn: '', companyAr: '', companyEn: '', locationAr: '', locationEn: '', startDate: '', endDate: '', descriptionAr: [], descriptionEn: [] }],
      'التعليم': ['education', { degreeAr: '', degreeEn: '', institutionAr: '', institutionEn: '', startDate: '', endDate: '', descriptionAr: [], descriptionEn: [] }],
      'المهارات التقنية': ['skills.technical', { nameAr: '', nameEn: '', level: 80 }],
      'المهارات الشخصية': ['skills.soft', { nameAr: '', nameEn: '' }],
      'اللغات': ['skills.languages', { nameAr: '', nameEn: '', levelAr: '', levelEn: '' }],
      'المشاريع': ['projects', { nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '', tech: [], link: '', demo: '' }],
      'الشهادات': ['certifications', { nameAr: '', nameEn: '', issuerAr: '', issuerEn: '', date: '', link: '' }],
      'الإنجازات': ['achievements', { titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', date: '' }]
    };
    var m = map[which];
    if (!m) return;
    var path = m[0].split('.'), obj = W, i;
    for (i = 0; i < path.length - 1; i++) {
      if (!obj[path[i]]) obj[path[i]] = {};
      obj = obj[path[i]];
    }
    var key = path[path.length - 1];
    if (!Array.isArray(obj[key])) obj[key] = [];
    obj[key].push(m[1]);
    paint();
  }

  function delItem(spec) {
    var parts = spec.split(':');
    var path = parts[0], idx = +parts[1];
    var p = path.split('.'), obj = W, i;
    for (i = 0; i < p.length - 1; i++) obj = obj[p[i]];
    var key = p[p.length - 1];
    if (Array.isArray(obj[key])) obj[key].splice(idx, 1);
    paint();
  }

  function bind() {
    var ed = document.getElementById('editor');

    ed.addEventListener('input', function (e) {
      var path = e.target.getAttribute && e.target.getAttribute('data-oninput');
      if (!path) return;
      if (path.indexOf('set:') === 0) return onSetting(path.slice(4), e.target.value);
      if (path.indexOf('sec:') === 0) return;
      onEdit(path, e.target.value, e.target.tagName === 'TEXTAREA');
    });

    ed.addEventListener('change', function (e) {
      var path = e.target.getAttribute && e.target.getAttribute('data-onchange');
      if (!path) return;
      if (e.target.type === 'checkbox') {
        if (path.indexOf('sec:') === 0) { window.setSection(path.slice(4), e.target.checked); paint(); return; }
        if (path.indexOf('set:') === 0) { onSetting(path.slice(4), e.target.checked); paint(); return; }
        return;
      }
      if (path.indexOf('set:') === 0) { onSetting(path.slice(4), e.target.value); return; }
      onEdit(path, e.target.value, false);
    });

    ed.addEventListener('click', function (e) {
      var tb = e.target.closest('[data-tab]');
      if (tb) { tab = tb.getAttribute('data-tab'); paint(); return; }

      var add = e.target.closest('[data-add]');
      if (add) { addItem(add.getAttribute('data-add')); return; }

      var del = e.target.closest('[data-del]');
      if (del) { delItem(del.getAttribute('data-del')); return; }

      var act = e.target.closest('[data-act]');
      if (!act) return;
      var a = act.getAttribute('data-act');
      if (a === 'save') save();
      else if (a === 'close') close();
      else if (a === 'export') exportFile();
      else if (a === 'import') ed.querySelector('#importFile').click();
      else if (a === 'reset') {
        if (confirm(t('resetAsk'))) { window.cvResetData(); close(); }
      }
    });

    ed.addEventListener('change', function (e) {
      if (e.target.id === 'importFile') importFile(e.target.files && e.target.files[0]);
    });

    document.getElementById('editorBackdrop').addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { e.stopPropagation(); close(); }
    });
  }

  /* ------------------------------------------------------------- التشغيل */
  function openEditor() {
    W = JSON.parse(JSON.stringify(window.cvGetData()));
    tab = 'personal';
    document.getElementById('editor').hidden = false;
    document.getElementById('editorBackdrop').hidden = false;
    open = true;
    paint();
  }

  function close() {
    document.getElementById('editor').hidden = true;
    document.getElementById('editorBackdrop').hidden = true;
    open = false;
  }

  function toggleEditor() { open ? close() : openEditor(); }

  /* للمفتاح Esc: يُرجع true إذا كان المحرر مفتوحاً (حتى لا يُغلق وضع ATS أيضاً) */
  function closeIfOpen() {
    if (!open) return false;
    close();
    return true;
  }

  window.toggleEditor = toggleEditor;
  window.cvOpenEditor = openEditor;
  window.closeEditor = closeIfOpen;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
