// Builds the four sites into dist/<domain>/.
// The three niche sites: source pages in src/pages are bilingual (elements tagged lang="ro" / lang="en").
// Each gets a Romanian page at / and an English page at /en/, each holding only its own language.
// bilanzaudit.ro is a multi-page site generated from src/bilanzaudit/site.mjs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOPICS } from './src/topics.mjs';
import { privacyBody } from './src/privacy.mjs';
import { bilanzFiles } from './src/bilanzaudit/site.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const TODAY = new Date().toISOString().slice(0, 10);

const COMPANY = {
  name: 'Buchhaltung & Bilanz Audit',
  cui: '35926102',
  reg: 'J40/5123/2016',
  office: 'Splaiul Unirii nr. 16, et. 1, ap. 108, 030139 București',
  phone: '0744.328.886',
  email: 'office@bilanzaudit.ro',
  policy: 'https://www.bilanzaudit.ro/protectia-datelor-cu-caracter-personal/',
  facebook: 'https://www.facebook.com/bilanzaudit',
  // Monday to Friday, 9:00-17:00
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  people: [{ name: 'Iuliana Pană', linkedin: 'https://www.linkedin.com/in/iuliana-pan%C4%83-49100426a/' }],
};

// Cookieless visit statistics (Cloudflare Web Analytics). Paste each site's token here to switch it on;
// while a token is empty, that site loads no analytics script at all.
const CF_ANALYTICS = {
  'infractiunifiscale.ro': '',
  'atragerearaspunderii.ro': '',
  'litigiimunca.ro': '',
};

// Team members. While this list is empty no team page is built. Once filled, every site gets /echipa/ and /en/team/,
// linked from the topic pages and listed in the sitemap.
// Entry: { name: 'Nume Prenume', role: { ro: 'Expert contabil CECCAR', en: 'Chartered accountant' }, bio: { ro: '...', en: '...' } }
const TEAM = [];

const SITES = {
  'infractiunifiscale.ro': {
    theme: '#13253D', accent: '#B3261E', mark: '§',
    look: {
      display: '"Spectral",Georgia,serif', body: '"IBM Plex Sans",system-ui,sans-serif', radius: '0px',
      light: { bg: '#EEF1F5', surface: '#FFFFFF', ink: '#0E1B2C', muted: '#4E5B6E', line: '#CDD4DE', brand: '#13253D', brandInk: '#E7ECF3', accent: '#B3261E', accentInk: '#FFFFFF', link: '#B3261E' },
      dark: { bg: '#0B1320', surface: '#121D2E', ink: '#E6EBF2', muted: '#9AA7BA', line: '#25344A', brand: '#0F1A2A', brandInk: '#E6EBF2', accent: '#E5544B', accentInk: '#1A0806', link: '#E5544B' },
    },
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
    look: {
      display: '"Newsreader",Georgia,serif', body: '"Work Sans",system-ui,sans-serif', radius: '14px',
      light: { bg: '#F1F3EF', surface: '#FFFFFF', ink: '#16231D', muted: '#56635B', line: '#D3D9D2', brand: '#173B2F', brandInk: '#E9EFE9', accent: '#9C6F22', accentInk: '#FFFFFF', link: '#7D5718' },
      dark: { bg: '#0E1512', surface: '#15201B', ink: '#E4EBE6', muted: '#9DABA2', line: '#28362F', brand: '#0A120E', brandInk: '#E4EBE6', accent: '#D9A75A', accentInk: '#0A120E', link: '#D9A75A' },
    },
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
    look: {
      display: '"Bricolage Grotesque","Segoe UI",system-ui,sans-serif', body: '"Source Sans 3",system-ui,sans-serif', radius: '18px',
      light: { bg: '#F6F8F9', surface: '#FFFFFF', ink: '#0F2A2E', muted: '#557074', line: '#D6E0E2', brand: '#0F5C66', brandInk: '#F2FAFA', accent: '#E8B931', accentInk: '#2A2104', link: '#0F5C66' },
      dark: { bg: '#0A1618', surface: '#102225', ink: '#E3EFF0', muted: '#93AEB1', line: '#1F3A3E', brand: '#0C4048', brandInk: '#E3EFF0', accent: '#F0C84E', accentInk: '#221A02', link: '#5FB3BD' },
    },
    // The home page speaks to employees; employers get their own page, so each page has a single H1.
    audience: {
      ro: { slug: 'angajatori', labels: ['Sunt angajat', 'Sunt angajator'],
        title: 'Litigii de muncă pentru angajatori: concediere, cercetare disciplinară | Legal BBA',
        desc: 'Pentru angajatori: cercetare disciplinară conformă, audit de salarizare și Revisal, regulament intern și apărare în instanță în litigiile de muncă.' },
      en: { slug: 'employers', labels: ["I'm an employee", "I'm an employer"],
        title: 'Employment disputes for employers in Romania: dismissal, disciplinary process | Legal BBA',
        desc: 'For employers in Romania: compliant disciplinary process, payroll and Revisal audit, staff handbook and court defence in employment disputes.' },
    },
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

// Text read by search engines and AI agents (meta tags, structured data, llms.txt) is written without diacritics.
const plain = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const plainDeep = (v) => typeof v === 'string' ? (/^(https?:|mailto:)/.test(v) ? v : plain(v))
  : Array.isArray(v) ? v.map(plainDeep)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plainDeep(x)])) : v;
const ldScript = (data) => `<script type="application/ld+json">${JSON.stringify(plainDeep(data)).replace(/</g, '\\u003c')}</script>`;

const homePath = (lang) => (lang === 'en' ? '/en/' : '/');
const topicPath = (lang, t) => (lang === 'en' ? `/en/${t.en.slug}/` : `/${t.ro.slug}/`);

// Topic pages of a site, plus the team page once TEAM is filled in.
function topicsOf(domain) {
  const list = [...TOPICS[domain]];
  if (TEAM.length) {
    const page = (lang) => ({
      slug: lang === 'en' ? 'team' : 'echipa', nav: lang === 'en' ? 'Team' : 'Echipa',
      title: lang === 'en' ? `The team | ${domain}` : `Echipa | ${domain}`,
      desc: lang === 'en' ? `The people behind ${domain}: ${COMPANY.name}.` : `Oamenii din spatele ${domain}: ${COMPANY.name}.`,
      h1: lang === 'en' ? 'The team' : 'Echipa',
      lead: lang === 'en' ? `${domain} is run by the Legal BBA team at ${COMPANY.name}.` : `${domain} este un serviciu al echipei Legal BBA din cadrul ${COMPANY.name}.`,
      sections: TEAM.map((p) => [`${p.name} · ${p.role[lang]}`, p.bio[lang]]),
    });
    list.push({ ro: page('ro'), en: page('en') });
  }
  return list;
}

// Every indexable page of a site as a { ro, en } pair of paths.
function pagesOf(domain) {
  const a = SITES[domain].audience;
  return [
    { ro: '/', en: '/en/' },
    ...(a ? [{ ro: `/${a.ro.slug}/`, en: `/en/${a.en.slug}/` }] : []),
    ...topicsOf(domain).map((t) => ({ ro: topicPath('ro', t), en: topicPath('en', t) })),
    { ro: '/confidentialitate/', en: '/en/privacy/' },
  ];
}

// Remove every element carrying <attr>="<drop>", including its children.
function stripAttr(html, drop, attr = 'lang') {
  const open = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\s${attr}="${drop}"[^>]*>`, 'gi');
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
    if (end < 0) throw new Error(`Unclosed <${tag} ${attr}="${drop}"> at ${m.index}`);
    html = html.slice(0, m.index) + html.slice(end);
    open.lastIndex = m.index;
  }
  return html;
}

function head({ domain, lang, path, meta, fonts, css, altRo, altEn, noindex }) {
  const site = SITES[domain];
  const url = `https://${domain}${path}`;
  meta = { title: plain(meta.title), desc: plain(meta.desc) };
  const beacon = CF_ANALYTICS[domain]
    ? `\n<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${CF_ANALYTICS[domain]}"}'></script>` : '';
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
<meta property="og:image" content="https://${domain}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${site.theme}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${fonts ? `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">` : ''}
<style>${BASE_CSS}
${css}</style>${beacon}
</head>`;
}

// Rewrites the page's JSON-LD for the language being built: URL, description and language follow the page,
// and the FAQPage entries are rebuilt from the questions visible in the #intrebari section, so they always match it.
function structuredData(body, domain, lang, path, meta) {
  const url = `https://${domain}${path}`;
  const serviceId = `https://${domain}/#service`;
  const text = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const faq = [];
  const start = body.indexOf('id="intrebari"');
  if (start >= 0) {
    const section = body.slice(start, body.indexOf('</section>', start));
    const re = /<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>|<div><h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/div>/g;
    let m;
    while ((m = re.exec(section))) faq.push({ q: text(m[1] ?? m[3]), a: text(m[2] ?? m[4]) });
  }
  return body.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
    const data = JSON.parse(json);
    for (const node of data['@graph']) {
      node.inLanguage = lang;
      if (node['@type'] === 'FAQPage') {
        if (faq.length) node.mainEntity = faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }));
      } else {
        Object.assign(node, serviceFields(domain));
        node.url = url;
        node.description = meta.desc;
      }
    }
    data['@graph'].push({ '@type': 'WebPage', '@id': url, url, name: meta.title, description: meta.desc, inLanguage: lang, about: { '@id': serviceId } });
    return ldScript(data);
  });
}

// Company facts shared by the structured data of every site.
function serviceFields(domain) {
  return {
    '@id': `https://${domain}/#service`,
    email: COMPANY.email,
    image: `https://${domain}/og.png`,
    sameAs: [COMPANY.facebook],
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: COMPANY.hours.days, opens: COMPANY.hours.opens, closes: COMPANY.hours.closes }],
    parentOrganization: {
      '@type': 'Organization', name: COMPANY.name, url: 'https://www.bilanzaudit.ro/', taxID: COMPANY.cui, sameAs: [COMPANY.facebook],
      employee: COMPANY.people.map((p) => ({ '@type': 'Person', name: p.name, sameAs: [p.linkedin] })),
    },
  };
}

// aud: on a site with an audience switch, which audience this page is for ('emp' = home page, 'boss' = its own page).
function buildHome(domain, lang, aud = 'emp') {
  const audience = SITES[domain].audience;
  const audPath = (l) => (l === 'en' ? `/en/${audience.en.slug}/` : `/${audience.ro.slug}/`);
  const altRo = aud === 'boss' ? audPath('ro') : '/', altEn = aud === 'boss' ? audPath('en') : '/en/';
  const path = lang === 'en' ? altEn : altRo;
  const meta = aud === 'boss' ? audience[lang] : SITES[domain][lang];
  const src = readFileSync(join(ROOT, 'src/pages', `${domain}.html`), 'utf8');
  const fonts = (src.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)">/) || [])[1];
  const styleStart = src.indexOf('<style>'), styleEnd = src.indexOf('</style>');
  let css = src.slice(styleStart + 7, styleEnd)
    .replaceAll('.lang button[aria-pressed="true"]', '.lang a[aria-current="true"]')
    .replaceAll('.lang button', '.lang a')
    .replaceAll('.switch button[aria-pressed="true"]', '.switch a[aria-current="true"]')
    .replaceAll('.switch button', '.switch a');
  if (audience) css += '\n.switch a{display:inline-block;text-decoration:none}';
  let body = src.slice(styleEnd + 8);

  body = stripAttr(body, lang === 'en' ? 'ro' : 'en');
  // Language switch becomes real links between the RO and EN version of this page
  body = body.replace(/<div class="lang"[^>]*>[\s\S]*?<\/div>/,
    `<div class="lang" role="navigation" aria-label="Limba / Language"><a href="${altRo}" hreflang="ro" aria-current="${lang === 'ro'}">RO</a><a href="${altEn}" hreflang="en" aria-current="${lang === 'en'}">EN</a></div>`);
  if (audience) {
    // One audience per page: drop the other audience's content and turn the switch into links
    body = stripAttr(body, aud === 'boss' ? 'emp' : 'boss', 'data-aud');
    const [emp, boss] = audience[lang].labels;
    body = body.replace(/<div class="switch"[^>]*>[\s\S]*?<\/div>/,
      `<div class="switch" role="navigation" aria-label="Public"><a href="${homePath(lang)}" aria-current="${aud === 'emp'}">${emp}</a><a href="${audPath(lang)}" aria-current="${aud === 'boss'}">${boss}</a></div>`);
    body = body.replace("setAud('emp')", `setAud('${aud}')`);
  }
  // Page language comes from the URL, not from a stored preference
  body = body.replace("var saved='ro';try{saved=localStorage.getItem('lang')||'ro'}catch(e){}", 'var saved=document.documentElement.lang;');
  // Honeypot field for spam bots
  body = body.replace('<form id="f" novalidate>', '<form id="f" novalidate>\n        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>');

  body = structuredData(body, domain, lang, path, meta);

  const bodyAttr = (lang === 'en' ? ' class="en"' : '') + (audience ? ` data-a="${aud}"` : '');
  return `${head({ domain, lang, path, meta, fonts, css, altRo, altEn })}
<body${bodyAttr}>
${body.trim()}
<script src="/assets/form.js" defer></script>
</body>
</html>
`;
}

function simplePage(domain, lang, path, alt, meta, inner, noindex = false) {
  const s = SITES[domain];
  const css = `:root{--bg:#F1F3F6;--surface:#FFFFFF;--fg:#14202E;--muted:#556171;--line:#D9DEE5;--accent:${s.accent};--sh:0 2px 4px rgba(20,32,46,.05),0 18px 40px -16px rgba(20,32,46,.25)}
@media (prefers-color-scheme:dark){:root{--bg:#0E141B;--surface:#151E29;--fg:#E6EBF1;--muted:#9BA7B6;--line:#243142;--accent:${s.accent === s.theme ? '#5FB3BD' : s.accent};--sh:0 4px 10px rgba(0,0,0,.4),0 24px 48px -14px rgba(0,0,0,.7);color-scheme:dark}}
body{background:var(--bg);color:var(--fg);font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.w{max-width:760px;margin:0 auto;padding:40px 20px 64px}
.sheet{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:clamp(20px,5vw,40px);box-shadow:var(--sh)}
a{color:var(--accent)}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:40px;font-weight:600}
.top a{text-decoration:none;color:var(--fg)}
h1{font-size:clamp(1.8rem,4vw,2.4rem);line-height:1.15;margin:0 0 8px;text-wrap:balance}
h2{font-size:1.2rem;margin:32px 0 8px}
p,li{color:var(--muted)} strong{color:var(--fg)}
.meta{font-size:.9rem;color:var(--muted)}
footer{margin-top:28px;font-size:.88rem;color:var(--muted)}`;
  return `${head({ domain, lang, path, meta, fonts: null, css, altRo: alt.ro, altEn: alt.en, noindex })}
<body>
<div class="w">
  <div class="top"><a href="${lang === 'en' ? '/en/' : '/'}">${domain}</a><a href="${lang === 'en' ? alt.ro : alt.en}" hreflang="${lang === 'en' ? 'ro' : 'en'}">${lang === 'en' ? 'RO' : 'EN'}</a></div>
  <div class="sheet">
${inner}
  </div>
  <footer>© ${new Date().getFullYear()} ${esc(COMPANY.name)} · <a href="https://www.bilanzaudit.ro/" rel="noopener">bilanzaudit.ro</a></footer>
</div>
</body>
</html>
`;
}

// A short page on one topic, in the site's own fonts and colours.
function topicPage(domain, lang, topic) {
  const s = SITES[domain], k = s.look, t = topic[lang], en = lang === 'en';
  const src = readFileSync(join(ROOT, 'src/pages', `${domain}.html`), 'utf8');
  const fonts = (src.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)">/) || [])[1];
  const vars = (c) => `--bg:${c.bg};--surface:${c.surface};--ink:${c.ink};--muted:${c.muted};--line:${c.line};--brand:${c.brand};--brand-ink:${c.brandInk};--accent:${c.accent};--accent-ink:${c.accentInk};--link:${c.link}`;
  const css = `:root{${vars(k.light)};--sh:0 2px 4px rgba(15,30,40,.05),0 18px 40px -16px rgba(15,30,40,.28);--sh-sm:0 1px 2px rgba(15,30,40,.06),0 6px 16px -8px rgba(15,30,40,.2)}
@media (prefers-color-scheme:dark){:root{${vars(k.dark)};--sh:0 4px 10px rgba(0,0,0,.4),0 24px 48px -14px rgba(0,0,0,.7);--sh-sm:0 1px 2px rgba(0,0,0,.4),0 6px 16px -8px rgba(0,0,0,.6);color-scheme:dark}}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:400 17px/1.65 ${k.body}}
a{color:var(--link)}
h1,h2{font-family:${k.display};line-height:1.15;margin:0;text-wrap:balance}
p{margin:0}
.w{max-width:820px;margin:0 auto;padding-inline:20px}
.hd{background:var(--brand);color:var(--brand-ink);box-shadow:0 8px 24px -12px rgba(0,0,0,.5)}
.hd .w{display:flex;justify-content:space-between;align-items:center;gap:16px;padding-block:16px}
.hd a{color:inherit;text-decoration:none;font-weight:600}
.hd .logo{font:700 1.15rem/1 ${k.display}}
.crumb{font-size:.88rem;color:var(--muted);margin-block:28px 16px}
.crumb a{color:inherit}
.sheet{background:var(--surface);border:1px solid var(--line);border-radius:${k.radius};padding:clamp(22px,5vw,44px);box-shadow:var(--sh)}
.sheet h1{font-size:clamp(1.9rem,5vw,2.8rem)}
.lead{font-size:1.15rem;margin-top:16px}
.sheet h2{font-size:1.3rem;margin-top:30px}
.sheet h2+p{color:var(--muted);margin-top:8px}
.cta{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center;margin-top:34px}
.btn{display:inline-block;background:var(--accent);color:var(--accent-ink);text-decoration:none;font-weight:600;padding:13px 24px;border-radius:${k.radius === '0px' ? '0px' : '99px'};box-shadow:var(--sh-sm)}
.rel{margin-top:36px}
.rel h2{font-size:1.1rem}
.rel ul{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
.rel a{display:block;height:100%;background:var(--surface);border:1px solid var(--line);border-radius:${k.radius};padding:14px 16px;text-decoration:none;color:var(--ink);font-weight:600;box-shadow:var(--sh-sm)}
.rel a:hover{border-color:var(--link)}
footer{margin-top:44px;padding-block:24px 40px;font-size:.86rem;color:var(--muted)}
footer .w{display:flex;flex-wrap:wrap;gap:10px 24px;justify-content:space-between}
footer a{color:inherit}`;
  const path = topicPath(lang, topic);
  const alt = { ro: topicPath('ro', topic), en: topicPath('en', topic) };
  const home = homePath(lang);
  const meta = { title: t.title.includes('|') ? t.title : `${t.title} | ${domain}`, desc: t.desc };
  const others = topicsOf(domain).filter((o) => o !== topic);
  const cta = t.cta || [`${home}#contact`, en ? 'Request a review of your case' : 'Cere o analiză a situației'];
  const url = `https://${domain}${path}`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': url, url, name: meta.title, description: meta.desc, inLanguage: lang,
      isPartOf: { '@id': `https://${domain}/#service` }, about: { '@id': `https://${domain}/#service` } },
    { '@type': ['ProfessionalService', 'LegalService'], name: domain, url: `https://${domain}${home}`, telephone: '+40744328886', ...serviceFields(domain) },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: domain, item: `https://${domain}${home}` },
      { '@type': 'ListItem', position: 2, name: t.h1, item: url }] },
  ] };
  return `${head({ domain, lang, path, meta, fonts, css, altRo: alt.ro, altEn: alt.en })}
<body>
<header class="hd"><div class="w"><a class="logo" href="${home}">${domain}</a><a href="${en ? alt.ro : alt.en}" hreflang="${en ? 'ro' : 'en'}">${en ? 'RO' : 'EN'}</a></div></header>
<main class="w">
  <nav class="crumb" aria-label="${en ? 'Breadcrumb' : 'Navigare'}"><a href="${home}">${en ? 'Home' : 'Acasă'}</a> › ${esc(t.nav)}</nav>
  <article class="sheet">
    <h1>${esc(t.h1)}</h1>
    <p class="lead">${esc(t.lead)}</p>
${t.sections.map(([h, p]) => `    <h2>${esc(h)}</h2>\n    <p>${esc(p)}</p>`).join('\n')}
    <p class="cta"><a class="btn" href="${cta[0]}">${cta[1]}</a><a href="tel:+40744328886">${COMPANY.phone}</a></p>
  </article>
  <aside class="rel">
    <h2>${en ? 'Related topics' : 'Subiecte apropiate'}</h2>
    <ul>
${others.map((o) => `      <li><a href="${topicPath(lang, o)}">${esc(o[lang].nav)}</a></li>`).join('\n')}
    </ul>
  </aside>
</main>
<footer><div class="w">
  <span>© ${new Date().getFullYear()} ${esc(COMPANY.name)} · <a href="https://www.bilanzaudit.ro/" rel="noopener">bilanzaudit.ro</a></span>
  <span>${en ? 'General information, not legal advice.' : 'Informații generale, nu consultanță juridică.'} · <a href="${en ? '/en/privacy/' : '/confidentialitate/'}">${en ? 'Privacy' : 'Confidențialitate'}</a></span>
</div></footer>
${ldScript(ld)}
</body>
</html>
`;
}

// llms.txt: the hand-written summary from src/static, with the page list generated from what is actually built.
function llmsTxt(domain) {
  const base = readFileSync(join(ROOT, 'src/static', domain, 'llms.txt'), 'utf8').split('## Pagini')[0];
  const a = SITES[domain].audience;
  const lines = [
    `- [Pagina principala (RO)](https://${domain}/)`,
    `- [Home (EN)](https://${domain}/en/)`,
    ...(a ? [`- [Pentru angajatori (RO)](https://${domain}/${a.ro.slug}/)`, `- [For employers (EN)](https://${domain}/en/${a.en.slug}/)`] : []),
    ...topicsOf(domain).flatMap((t) => [
      `- [${t.ro.h1} (RO)](https://${domain}${topicPath('ro', t)}): ${t.ro.lead}`,
      `- [${t.en.h1} (EN)](https://${domain}${topicPath('en', t)}): ${t.en.lead}`,
    ]),
  ];
  return plain(`${base}## Pagini\n${lines.join('\n')}\n`);
}

function privacy(domain, lang) {
  const c = COMPANY;
  const meta = lang === 'en'
    ? { title: `Privacy policy | ${domain}`, desc: `How ${c.name} processes personal data sent through ${domain}.` }
    : { title: `Politica de confidențialitate | ${domain}`, desc: `Cum prelucrează ${c.name} datele personale transmise prin ${domain}.` };
  const path = lang === 'en' ? '/en/privacy/' : '/confidentialitate/';
  return simplePage(domain, lang, path, { ro: '/confidentialitate/', en: '/en/privacy/' }, meta, privacyBody(domain, lang, c, TODAY, { analytics: !!CF_ANALYTICS[domain] }));
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
${pagesOf(domain).map((p) => pair(p.ro, p.en)).join('\n')}
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
  const audience = SITES[domain].audience;
  if (audience) {
    write(join(out, audience.ro.slug, 'index.html'), buildHome(domain, 'ro', 'boss'));
    write(join(out, 'en', audience.en.slug, 'index.html'), buildHome(domain, 'en', 'boss'));
  }
  for (const t of topicsOf(domain)) {
    write(join(out, t.ro.slug, 'index.html'), topicPage(domain, 'ro', t));
    write(join(out, 'en', t.en.slug, 'index.html'), topicPage(domain, 'en', t));
  }
  for (const f of readdirSync(join(ROOT, 'src/static', domain))) copyFileSync(join(ROOT, 'src/static', domain, f), join(out, f));
  write(join(out, 'llms.txt'), llmsTxt(domain));
  mkdirSync(join(out, 'assets'), { recursive: true });
  copyFileSync(join(ROOT, 'src/form.js'), join(out, 'assets/form.js'));
  console.log(`built ${domain}`);
}

{
  const domain = 'bilanzaudit.ro';
  const out = join(DIST, domain);
  for (const [file, content] of Object.entries(bilanzFiles({ company: COMPANY, today: TODAY, privacyBody }))) write(join(out, file), content);
  for (const f of readdirSync(join(ROOT, 'src/static', domain))) copyFileSync(join(ROOT, 'src/static', domain, f), join(out, f));
  // bilanzaudit.ro is published without diacritics, form messages included
  write(join(out, 'assets/form.js'), readFileSync(join(ROOT, 'src/form.js'), 'utf8').normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC'));
  console.log(`built ${domain}`);
}
