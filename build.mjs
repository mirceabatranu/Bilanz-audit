// Builds the three sites into dist/<domain>/.
// Source pages in src/pages are bilingual (elements tagged lang="ro" / lang="en").
// Each site gets a Romanian page at / and an English page at /en/, each holding only its own language.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const TODAY = new Date().toISOString().slice(0, 10);

const COMPANY = {
  name: 'Buchhaltung & Bilanz Audit',
  cui: '35926102',
  reg: 'J40/5123/2016',
  address: 'Aleea Ninsorii nr. 26, ap. 6, Sector 3, București',
  phone: '0744 328 886',
  email: 'bilanzaudit@gmail.com',
};

const SITES = {
  'infractiunifiscale.ro': {
    theme: '#13253D', accent: '#B3261E', mark: '§',
    ro: {
      title: 'Infracțiuni fiscale și evaziune fiscală: expertiză și apărare | Legal BBA',
      desc: 'Apărare și expertiză contabilă în dosare de evaziune fiscală (Legea 241/2005), inspecții ANAF și contestații. Buchhaltung & Bilanz Audit, București.',
    },
    en: {
      title: 'Tax crime and tax evasion defence, forensic accounting | Legal BBA',
      desc: 'Forensic accounting and legal advice in Romanian tax evasion cases (Law 241/2005), ANAF tax audits and tax appeals. Buchhaltung & Bilanz Audit, Bucharest.',
    },
  },
  'atragerearaspunderii.ro': {
    theme: '#173B2F', accent: '#9C6F22', mark: 'R',
    ro: {
      title: 'Atragerea răspunderii administratorului: insolvență și ANAF | Legal BBA',
      desc: 'Apărarea administratorilor în acțiuni de atragere a răspunderii: art. 169 Legea 85/2014, răspundere solidară ANAF, expertiza cauzelor insolvenței.',
    },
    en: {
      title: 'Director liability defence: insolvency and tax claims | Legal BBA',
      desc: 'Defending company directors against personal liability claims in Romania: insolvency (art. 169 Law 85/2014), joint tax liability with ANAF, forensic review of the causes of insolvency.',
    },
  },
  'litigiimunca.ro': {
    theme: '#0F5C66', accent: '#0F5C66', mark: 'M',
    ro: {
      title: 'Litigii de muncă: concediere, sancțiuni, salarii neplătite | Legal BBA',
      desc: 'Litigii de muncă pentru angajați și angajatori: contestarea concedierii, sancțiuni disciplinare, drepturi salariale, expertiză contabilă de salarizare.',
    },
    en: {
      title: 'Employment disputes in Romania: dismissal, sanctions, unpaid wages | Legal BBA',
      desc: 'Employment disputes for employees and employers in Romania: challenging dismissals, disciplinary sanctions, wage claims and payroll forensic accounting.',
    },
  },
};

const BASE_CSS = ':root{color-scheme:light}html{-webkit-text-size-adjust:100%}body{margin:0}img{max-width:100%;height:auto}[hidden]{display:none!important}.hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}.lang a{text-decoration:none;display:inline-block}';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Remove every element carrying lang="<drop>", including its children.
function stripLang(html, drop) {
  const open = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\slang="${drop}"[^>]*>`, 'gi');
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const tagRe = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    tagRe.lastIndex = m.index + m[0].length;
    let depth = 1, t, end = -1;
    while ((t = tagRe.exec(html))) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (depth === 0) { end = t.index + t[0].length; break; }
    }
    if (end < 0) throw new Error(`Unclosed <${tag} lang="${drop}"> at ${m.index}`);
    html = html.slice(0, m.index) + html.slice(end);
    open.lastIndex = m.index;
  }
  return html;
}

function head({ domain, lang, path, meta, fonts, css, altRo, altEn, noindex }) {
  const site = SITES[domain];
  const url = `https://${domain}${path}`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ro" href="https://${domain}${altRo}">
<link rel="alternate" hreflang="en" href="https://${domain}${altEn}">
<link rel="alternate" hreflang="x-default" href="https://${domain}${altRo}">`}
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${domain}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'ro_RO'}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="${site.theme}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${fonts ? `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">` : ''}
<style>${BASE_CSS}
${css}</style>
</head>`;
}

function buildHome(domain, lang) {
  const src = readFileSync(join(ROOT, 'src/pages', `${domain}.html`), 'utf8');
  const fonts = (src.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)">/) || [])[1];
  const styleStart = src.indexOf('<style>'), styleEnd = src.indexOf('</style>');
  let css = src.slice(styleStart + 7, styleEnd)
    .replaceAll('.lang button[aria-pressed="true"]', '.lang a[aria-current="true"]')
    .replaceAll('.lang button', '.lang a');
  let body = src.slice(styleEnd + 8);

  body = stripLang(body, lang === 'en' ? 'ro' : 'en');
  // Language switch becomes real links between / and /en/
  body = body.replace(/<div class="lang"[^>]*>[\s\S]*?<\/div>/,
    `<div class="lang" role="navigation" aria-label="Limba / Language"><a href="/" hreflang="ro" aria-current="${lang === 'ro'}">RO</a><a href="/en/" hreflang="en" aria-current="${lang === 'en'}">EN</a></div>`);
  // Page language comes from the URL, not from a stored preference
  body = body.replace("var saved='ro';try{saved=localStorage.getItem('lang')||'ro'}catch(e){}", 'var saved=document.documentElement.lang;');
  // Honeypot field for spam bots
  body = body.replace('<form id="f" novalidate>', '<form id="f" novalidate>\n        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>');

  const path = lang === 'en' ? '/en/' : '/';
  const bodyAttr = lang === 'en' ? ' class="en"' : '';
  return `${head({ domain, lang, path, meta: SITES[domain][lang], fonts, css, altRo: '/', altEn: '/en/' })}
<body${bodyAttr}>
${body.trim()}
<script src="/assets/form.js" defer></script>
</body>
</html>
`;
}

function simplePage(domain, lang, path, alt, meta, inner, noindex = false) {
  const s = SITES[domain];
  const css = `:root{--bg:#F7F8FA;--fg:#14202E;--muted:#556171;--line:#D9DEE5;--accent:${s.accent}}
@media (prefers-color-scheme:dark){:root{--bg:#0E141B;--fg:#E6EBF1;--muted:#9BA7B6;--line:#243142;--accent:${s.accent === s.theme ? '#5FB3BD' : s.accent};color-scheme:dark}}
body{background:var(--bg);color:var(--fg);font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.w{max-width:760px;margin:0 auto;padding:40px 20px 64px}
a{color:var(--accent)}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:40px;font-weight:600}
.top a{text-decoration:none;color:var(--fg)}
h1{font-size:clamp(1.8rem,4vw,2.4rem);line-height:1.15;margin:0 0 8px;text-wrap:balance}
h2{font-size:1.2rem;margin:32px 0 8px}
p,li{color:var(--muted)} strong{color:var(--fg)}
.meta{font-size:.9rem;color:var(--muted)}
footer{border-top:1px solid var(--line);margin-top:48px;padding-top:20px;font-size:.88rem;color:var(--muted)}`;
  return `${head({ domain, lang, path, meta, fonts: null, css, altRo: alt.ro, altEn: alt.en, noindex })}
<body>
<div class="w">
  <div class="top"><a href="${lang === 'en' ? '/en/' : '/'}">${domain}</a><a href="${lang === 'en' ? alt.ro : alt.en}" hreflang="${lang === 'en' ? 'ro' : 'en'}">${lang === 'en' ? 'RO' : 'EN'}</a></div>
${inner}
  <footer>© ${new Date().getFullYear()} ${COMPANY.name} · CUI ${COMPANY.cui} · ${COMPANY.reg}</footer>
</div>
</body>
</html>
`;
}

function privacy(domain, lang) {
  const c = COMPANY;
  const ro = `  <h1>Politica de confidențialitate</h1>
  <p class="meta">Ultima actualizare: ${TODAY}</p>
  <h2>Cine prelucrează datele</h2>
  <p>Operatorul datelor este <strong>${c.name}</strong>, CUI ${c.cui}, ${c.reg}, cu sediul în ${c.address}. Ne puteți contacta la ${c.email} sau ${c.phone}.</p>
  <h2>Ce date colectăm</h2>
  <p>Prin formularul de contact de pe ${domain} colectăm numele, adresa de email, numărul de telefon (opțional) și conținutul mesajului. Nu folosim cookie-uri de analiză sau de marketing. Site-ul reține în browser doar limba aleasă.</p>
  <h2>De ce și pe ce temei</h2>
  <p>Folosim datele pentru a răspunde solicitării și, dacă este cazul, pentru a pregăti o ofertă sau un contract. Temeiul legal este consimțământul dumneavoastră și efectuarea de demersuri înainte de încheierea unui contract (art. 6 alin. 1 lit. a și b din Regulamentul UE 2016/679).</p>
  <h2>Cine mai are acces</h2>
  <p>Mesajele sunt stocate în Google Firebase (Google Cloud, regiune UE) și transmise pe email prin serviciul Resend. Fonturile site-ului sunt încărcate de la Google Fonts. Acești furnizori acționează ca persoane împuternicite și prelucrează datele doar pentru a ne furniza serviciul, cu garanțiile prevăzute de GDPR pentru eventualele transferuri în afara UE.</p>
  <h2>Cât timp păstrăm datele</h2>
  <p>Păstrăm mesajele cel mult 3 ani de la ultima corespondență, cu excepția cazului în care legea sau un contract încheiat cu dumneavoastră impune o perioadă mai lungă.</p>
  <h2>Drepturile dumneavoastră</h2>
  <p>Aveți dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a vă retrage consimțământul oricând, scriind la ${c.email}. Puteți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (<a href="https://www.dataprotection.ro" rel="noopener">dataprotection.ro</a>).</p>`;
  const en = `  <h1>Privacy policy</h1>
  <p class="meta">Last updated: ${TODAY}</p>
  <h2>Who processes your data</h2>
  <p>The data controller is <strong>${c.name}</strong>, tax ID ${c.cui}, trade register ${c.reg}, registered at ${c.address}, Romania. Contact us at ${c.email} or +40 744 328 886.</p>
  <h2>What we collect</h2>
  <p>Through the contact form on ${domain} we collect your name, email address, phone number (optional) and your message. We use no analytics or marketing cookies. The site only stores your chosen language in your browser.</p>
  <h2>Why, and on what legal basis</h2>
  <p>We use your data to answer your request and, where relevant, to prepare an offer or contract. The legal basis is your consent and steps taken before entering into a contract (Art. 6(1)(a) and (b) GDPR).</p>
  <h2>Who else has access</h2>
  <p>Messages are stored in Google Firebase (Google Cloud, EU region) and delivered by email through Resend. The site's fonts load from Google Fonts. These providers act as processors and use the data only to provide their service, with the safeguards GDPR requires for any transfer outside the EU.</p>
  <h2>How long we keep it</h2>
  <p>We keep messages for at most 3 years after our last correspondence, unless the law or a contract with you requires longer.</p>
  <h2>Your rights</h2>
  <p>You have the right of access, rectification, erasure, restriction, portability and objection, and you can withdraw consent at any time by writing to ${c.email}. You can complain to the Romanian data protection authority (<a href="https://www.dataprotection.ro" rel="noopener">dataprotection.ro</a>).</p>`;
  const meta = lang === 'en'
    ? { title: `Privacy policy | ${domain}`, desc: `How ${c.name} processes personal data sent through ${domain}.` }
    : { title: `Politica de confidențialitate | ${domain}`, desc: `Cum prelucrează ${c.name} datele personale transmise prin ${domain}.` };
  const path = lang === 'en' ? '/en/privacy/' : '/confidentialitate/';
  return simplePage(domain, lang, path, { ro: '/confidentialitate/', en: '/en/privacy/' }, meta, lang === 'en' ? en : ro);
}

function notFound(domain) {
  const inner = `  <h1>Pagina nu există</h1>
  <p>Adresa accesată nu există sau a fost mutată. <a href="/">Mergi la pagina principală</a>.</p>
  <p lang="en">This page does not exist. <a href="/en/">Go to the home page</a>.</p>`;
  return simplePage(domain, 'ro', '/404.html', { ro: '/', en: '/en/' }, { title: `Pagina nu există | ${domain}`, desc: 'Pagina nu a fost găsită.' }, inner, true);
}

function favicon(domain) {
  const s = SITES[domain];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${s.theme}"/><text x="32" y="45" font-family="Georgia,serif" font-size="38" font-weight="700" text-anchor="middle" fill="${s.accent === s.theme ? '#E8B931' : s.accent === '#9C6F22' ? '#D9A75A' : '#FFFFFF'}">${s.mark}</text></svg>\n`;
}

function sitemap(domain) {
  const pair = (ro, en) => [ro, en].map((loc) => `  <url>
    <loc>https://${domain}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <xhtml:link rel="alternate" hreflang="ro" href="https://${domain}${ro}"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://${domain}${en}"/>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pair('/', '/en/')}
${pair('/confidentialitate/', '/en/privacy/')}
</urlset>
`;
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

rmSync(DIST, { recursive: true, force: true });
for (const domain of Object.keys(SITES)) {
  const out = join(DIST, domain);
  write(join(out, 'index.html'), buildHome(domain, 'ro'));
  write(join(out, 'en/index.html'), buildHome(domain, 'en'));
  write(join(out, 'confidentialitate/index.html'), privacy(domain, 'ro'));
  write(join(out, 'en/privacy/index.html'), privacy(domain, 'en'));
  write(join(out, '404.html'), notFound(domain));
  write(join(out, 'favicon.svg'), favicon(domain));
  write(join(out, 'sitemap.xml'), sitemap(domain));
  for (const f of readdirSync(join(ROOT, 'src/static', domain))) copyFileSync(join(ROOT, 'src/static', domain, f), join(out, f));
  mkdirSync(join(out, 'assets'), { recursive: true });
  copyFileSync(join(ROOT, 'src/form.js'), join(out, 'assets/form.js'));
  console.log(`built ${domain}`);
}
