(() => {
  const actions = document.querySelector('.nav-actions');
  if (!actions || document.getElementById('languageSelect')) return;

  const label = document.createElement('label');
  label.className = 'language-switch';
  label.htmlFor = 'languageSelect';
  label.innerHTML = '<span class="sr-only">Language</span><select id="languageSelect" aria-label="Choose language" title="Choose language"><option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="ar">🇹🇳 AR</option></select>';

  const select = label.querySelector('select');
  const toggle = document.createElement('div');
  toggle.className = 'language-segmented';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', 'Choose language');
  toggle.innerHTML = [
    '<button type="button" class="language-option" data-language="fr" aria-pressed="true" aria-label="Français">🇫🇷 <span>FR</span></button>',
    '<button type="button" class="language-option" data-language="en" aria-pressed="false" aria-label="English">🇬🇧 <span>EN</span></button>',
    '<button type="button" class="language-option" data-language="ar" aria-pressed="false" aria-label="العربية">🇹🇳 <span>AR</span></button>'
  ].join('');
  select.hidden = true;
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');
  label.appendChild(toggle);

  const syncToggle = (lang) => {
    toggle.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === lang;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
  };

  toggle.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (!button) return;
    select.value = button.dataset.language;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    syncToggle(select.value);
  });

  select.addEventListener('change', () => syncToggle(select.value));
  let savedLanguage = 'fr';
  try {
    savedLanguage = localStorage.getItem('portfolio-language') || 'fr';
  } catch (_) {}
  if (!['fr', 'en', 'ar'].includes(savedLanguage)) savedLanguage = 'fr';
  select.value = savedLanguage;
  syncToggle(savedLanguage);

  const themeButton = document.getElementById('themeToggle');
  actions.insertBefore(label, themeButton || actions.firstChild);

  const style = document.createElement('style');
  style.textContent = [
    '.language-switch{display:inline-flex;align-items:center;position:relative}',
    '.language-switch select[hidden]{display:none}',
    '.language-segmented{display:inline-flex;align-items:center;gap:2px;padding:3px;border:1px solid var(--border);border-radius:999px;background:var(--surface);direction:ltr}',
    '.language-option{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-width:42px;min-height:32px;padding:0 8px;border:0;border-radius:999px;background:transparent;color:var(--text-muted);font:600 .76rem var(--font);cursor:pointer;white-space:nowrap;transition:background .2s ease,color .2s ease,transform .2s ease}',
    '.language-option:hover{color:var(--text);background:var(--accent-soft)}',
    '.language-option.is-active{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#0b0d12;box-shadow:0 2px 10px rgba(94,234,212,.12)}',
    '.language-option:active{transform:scale(.96)}',
    '.language-option:focus-visible{outline:2px solid var(--accent);outline-offset:2px}',
    '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}',
    'html[dir="rtl"] body{font-family:Tahoma,Arial,var(--font)}',
    'html[dir="rtl"] .hero h1,html[dir="rtl"] .section-title,html[dir="rtl"] .about-text,html[dir="rtl"] .section-lead,html[dir="rtl"] .project,html[dir="rtl"] .timeline,html[dir="rtl"] .contact-box,html[dir="rtl"] .contact-dialog{text-align:right}',
    'html[dir="rtl"] .hero-grid,html[dir="rtl"] .about-grid{direction:rtl}',
    'html[dir="rtl"] .timeline{padding-left:0;padding-right:28px}',
    'html[dir="rtl"] .timeline:before{left:auto;right:6px}',
    'html[dir="rtl"] .tl-item:before{left:auto;right:-28px}',
    'html[dir="rtl"] .project .problem{border-left:0;padding-left:0;border-right:2px solid var(--accent);padding-right:12px}',
    'html[dir="rtl"] .hero-photo:before{inset:18px 18px -18px -18px}',
    'html[dir="rtl"] .floating-card{left:auto;right:-36px}',
    'html[dir="rtl"] .nav-links a:after{left:auto;right:0}',
    'html[dir="rtl"] .contact-form{text-align:right}',
    '@media(max-width:520px){.language-option{min-width:34px;min-height:30px;padding:0 5px;font-size:.7rem}.language-segmented{gap:1px;padding:2px}}',
    '@media(prefers-reduced-motion:reduce){.language-option{transition:none}}'
  ].join('\n');
  document.head.appendChild(style);

  const i18n = document.createElement('script');
  i18n.src = 'js/i18n.js';
  i18n.defer = true;
  document.body.appendChild(i18n);
})();