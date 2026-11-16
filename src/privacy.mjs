// Privacy policy body (RO / EN), shared by all sites.
// opts.analytics adds the Cloudflare Web Analytics sentence.
// opts.intro / opts.introEn replace the default intro paragraph; opts.formItem / opts.formItemEn the contact-form bullet.
export function privacyBody(domain, lang, c, today, opts = {}) {
  if (lang === 'en') {
    return `  <h1>Privacy policy</h1>
  <p class="meta">Last updated: ${today}</p>
  ${opts.introEn || `<p>We take the protection of your personal data seriously. This page explains what data we process through ${domain}, why, and what rights you have under Regulation (EU) 2016/679 (GDPR). ${domain} belongs to ${c.name}, and this page supplements the <a href="${c.policy}" rel="noopener">data protection policy on bilanzaudit.ro</a> (in Romanian).</p>`}
  <h2>1. Data controller</h2>
  <p><strong>${c.name} SRL</strong>, tax ID ${c.cui}, trade register ${c.reg}, address ${c.office}, Romania.<br>Email: ${c.email} · Phone: +40 744 328 886</p>
  <h2>2. What we process</h2>
  <ul>
    <li>${opts.formItemEn || '<strong>Contact form data</strong> you choose to send: name, email, phone (optional), your message and, where asked, where your case stands or your role (e.g. director, employee).'}</li>
    <li><strong>Technical data</strong>: IP address and browser type, processed automatically by our hosting provider to run and secure the site. We do not use it to identify you.</li>
  </ul>
  <p id="cookies">The site uses no analytics or marketing cookies.${opts.analytics ? ' We count visits with Cloudflare Web Analytics, which uses no cookies and does not identify visitors.' : ''}</p>
  <h2>3. Purposes and legal bases</h2>
  <ul>
    <li>Answering your request and preparing an offer: consent and pre-contractual steps (Art. 6(1)(a) and (b) GDPR).</li>
    <li>Performing a contract if you become a client (Art. 6(1)(b)).</li>
    <li>Meeting legal obligations, including tax and archiving rules (Art. 6(1)(c)).</li>
    <li>Running and securing the site: our legitimate interest (Art. 6(1)(f)).</li>
  </ul>
  <h2>4. Who receives the data</h2>
  <p>Messages are stored in Google Firebase (Google Cloud, EU region) and delivered to us by email through Resend. The site's fonts load from Google Fonts. These providers act as processors and use the data only to provide their service, with the safeguards GDPR requires for any transfer outside the EU. We never sell or rent your data.</p>
  <h2>5. How long we keep it</h2>
  <p>We keep data only as long as needed for the purpose it was collected for, then delete it. Documents the law requires us to archive are kept until that period ends.</p>
  <h2>6. Your rights</h2>
  <p>You have the right of access, rectification, erasure, restriction, data portability and objection, the right not to be subject to a decision based solely on automated processing, and the right to withdraw consent at any time without affecting earlier processing. To use them, write to ${c.email}. We reply within 30 days.</p>
  <h2>7. Complaints</h2>
  <p>You can complain to the Romanian data protection authority (ANSPDCP), Bd. Gheorghe Magheru 28-30, Sector 1, 010336 Bucharest, <a href="https://www.dataprotection.ro" rel="noopener">dataprotection.ro</a>.</p>`;
  }
  return `  <h1>Politica de confidențialitate</h1>
  <p class="meta">Ultima actualizare: ${today}</p>
  ${opts.intro || `<p>Protecția datelor dumneavoastră cu caracter personal este importantă pentru noi. Această pagină explică ce date prelucrăm prin ${domain}, de ce și ce drepturi aveți, în conformitate cu Regulamentul (UE) 2016/679 (GDPR). Site-ul ${domain} aparține ${c.name} și se completează cu <a href="${c.policy}" rel="noopener">politica de protecție a datelor de pe bilanzaudit.ro</a>.</p>`}
  <h2>1. Operatorul</h2>
  <p><strong>${c.name} SRL</strong>, CUI ${c.cui}, nr. Reg. Com. ${c.reg}, cu sediul în ${c.office}.<br>Email: ${c.email} · Telefon: ${c.phone}</p>
  <h2>2. Ce date prelucrăm</h2>
  <ul>
    <li>${opts.formItem || '<strong>Datele din formularul de contact</strong>, pe care ni le transmiteți voluntar: nume, email, telefon (opțional), conținutul mesajului și, după caz, stadiul situației sau calitatea dumneavoastră (de ex. administrator, angajat).'}</li>
    <li><strong>Date tehnice</strong>: adresa IP și tipul de browser, prelucrate automat de furnizorul de găzduire pentru funcționarea și securitatea site-ului. Nu le folosim pentru a vă identifica.</li>
  </ul>
  <p id="cookies">Site-ul nu folosește cookie-uri de analiză sau de marketing.${opts.analytics ? ' Numărăm vizitele cu Cloudflare Web Analytics, care nu folosește cookie-uri și nu identifică vizitatorii.' : ''}</p>
  <h2>3. Scopuri și temeiuri legale</h2>
  <ul>
    <li>Răspunsul la solicitarea dumneavoastră și pregătirea unei oferte: consimțământul și demersurile înainte de încheierea unui contract (art. 6 alin. 1 lit. a și b GDPR).</li>
    <li>Executarea contractului, dacă deveniți client (art. 6 alin. 1 lit. b).</li>
    <li>Respectarea obligațiilor legale, inclusiv fiscale și de arhivare (art. 6 alin. 1 lit. c).</li>
    <li>Securitatea și funcționarea site-ului: interesul nostru legitim (art. 6 alin. 1 lit. f).</li>
  </ul>
  <h2>4. Cui transmitem datele</h2>
  <p>Mesajele sunt stocate în Google Firebase (Google Cloud, regiune UE) și ne sunt livrate pe email prin serviciul Resend. Fonturile site-ului se încarcă de la Google Fonts. Acești furnizori acționează ca persoane împuternicite și prelucrează datele doar pentru a ne furniza serviciul, cu garanțiile cerute de GDPR pentru eventualele transferuri în afara UE. Nu vindem și nu închiriem datele.</p>
  <h2>5. Cât timp păstrăm datele</h2>
  <p>Păstrăm datele doar cât este necesar pentru scopul în care au fost colectate, apoi le ștergem. Documentele pentru care legea impune o perioadă de arhivare se păstrează până la expirarea acesteia.</p>
  <h2>6. Drepturile dumneavoastră</h2>
  <p>Aveți dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, la portabilitatea datelor, de opoziție, dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrare automată și dreptul de a vă retrage oricând consimțământul, fără a afecta prelucrarea anterioară. Pentru a le exercita, scrieți-ne la ${c.email}. Răspundem în cel mult 30 de zile.</p>
  <h2>7. Plângeri</h2>
  <p>Puteți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, cod poștal 010336, București, <a href="https://www.dataprotection.ro" rel="noopener">dataprotection.ro</a>.</p>`;
}
