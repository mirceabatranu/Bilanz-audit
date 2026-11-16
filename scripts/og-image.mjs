// Draws the 1200x630 sharing image of each site into src/static/<domain>/og.png.
// Run only when the text or colours change: node scripts/og-image.mjs (needs Playwright with Chromium).
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SITES = {
  'infractiunifiscale.ro': { bg: '#13253D', ink: '#E7ECF3', accent: '#E5544B', mark: '§', serif: true,
    title: 'Evaziune fiscală: expertiză contabilă și apărare', sub: 'Inspecții ANAF · Contestații · Expert contabil parte' },
  'atragerearaspunderii.ro': { bg: '#173B2F', ink: '#E9EFE9', accent: '#D9A75A', mark: 'R', serif: true,
    title: 'Atragerea răspunderii administratorului', sub: 'Insolvență · Răspundere solidară ANAF · Expertiză contabilă' },
  'litigiimunca.ro': { bg: '#0F5C66', ink: '#F2FAFA', accent: '#E8B931', mark: 'M', serif: false,
    title: 'Litigii de muncă pentru angajați și angajatori', sub: 'Concediere · Sancțiuni disciplinare · Salarii neplătite' },
};

const html = (domain, s) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:${s.bg};color:${s.ink};font-family:Inter,system-ui,sans-serif;padding:70px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
body::after{content:"";position:absolute;right:-150px;top:-150px;width:520px;height:520px;border-radius:50%;border:64px solid ${s.accent};opacity:.9}
.top{display:flex;align-items:center;gap:20px;font-size:34px;font-weight:700;position:relative;z-index:1}
.mark{width:68px;height:68px;border-radius:14px;background:${s.accent};color:${s.bg};display:grid;place-items:center;font:700 42px/1 Georgia,serif}
h1{font:${s.serif ? '600 64px/1.1 "DejaVu Serif",Georgia,serif' : '800 68px/1.08 "Inter Display",Inter,sans-serif'};max-width:760px;letter-spacing:-.01em;position:relative;z-index:1}
.sub{font-size:30px;opacity:.85;margin-top:26px}
.foot{font-size:26px;opacity:.75;border-top:2px solid ${s.accent};padding-top:22px}
</style>
<div class="top"><span class="mark">${s.mark}</span>${domain}</div>
<div><h1>${s.title}</h1><p class="sub">${s.sub}</p></div>
<p class="foot">Buchhaltung &amp; Bilanz Audit · București · 0744.328.886</p>`;

const browser = await chromium.launch();
for (const [domain, s] of Object.entries(SITES)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html(domain, s));
  await page.screenshot({ path: join(ROOT, 'src/static', domain, 'og.png') });
  await page.close();
  console.log(`og.png for ${domain}`);
}
await browser.close();
