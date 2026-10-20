(() => {
  const actions = document.querySelector('.nav-actions');
  if (!actions || document.getElementById('languageSelect')) return;
  const label = document.createElement('label');
  label.className = 'language-switch';
  label.htmlFor = 'languageSelect';
  label.innerHTML = '<span class="sr-only">Language</span><select id="languageSelect" aria-label="Choose language" title="Choose language"><option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="ar">🇹🇳 AR</option></select>';
  const themeButton = document.getElementById('themeToggle');
  actions.insertBefore(label, themeButton || actions.firstChild);

  const style = document.createElement('style');
  style.textContent = [
    '.language-switch select{min-height:40px;padding:0 10px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--text);font:600 .82rem var(--font);cursor:pointer}',
    '.language-switch select:focus-visible{outline:2px solid var(--accent);outline-offset:3px}',
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
    '@media(max-width:520px){.language-switch select{padding:0 6px;font-size:.75rem}}'
  ].join('\n');
  document.head.appendChild(style);

  const i18n = document.createElement('script');
  i18n.src = 'js/i18n.js';
  i18n.defer = true;
  document.body.appendChild(i18n);
})();