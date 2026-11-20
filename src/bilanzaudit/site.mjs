// bilanzaudit.ro: multi-page site. bilanzFiles() returns { 'relative/path': content } for dist/bilanzaudit.ro/.
// Home is bilingual (/ and /en/); service pages, the article and the quote form are Romanian only.
// Text is written with diacritics; DIACRITICS = false strips them from the built HTML.

const DIACRITICS = false;
const ORIGIN = 'https://www.bilanzaudit.ro';
const FONTS = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap';
const THEME = '#1E2D4A';
const MAPS = 'https://maps.app.goo.gl/R3jmTdMv92TMPsMo9';

const plain = (s) => (DIACRITICS ? s : s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const NICHE = [
  { domain: 'infractiunifiscale.ro', ro: 'Evaziune fiscală, inspecții ANAF și contestații: expertiză contabilă și apărare în dosarele penale.', en: 'Tax evasion cases, ANAF audits and tax appeals: forensic accounting and defence.' },
  { domain: 'atragerearaspunderii.ro', ro: 'Apărarea administratorilor când lichidatorul sau ANAF cer plata personală a datoriilor firmei.', en: 'Defending directors when a liquidator or ANAF seeks personal payment of company debts.' },
  { domain: 'litigiimunca.ro', ro: 'Concedieri, sancțiuni disciplinare și salarii neplătite, pentru angajați și angajatori.', en: 'Dismissals, disciplinary sanctions and unpaid wages, for employees and employers.' },
];

// ---------- service pages ----------
const SERVICES = [
  {
    slug: 'contabilitate', short: 'Contabilitate',
    title: 'Contabilitate financiară și de gestiune',
    seo: 'Servicii de contabilitate financiară și de gestiune în București',
    desc: 'Evidență contabilă completă: înregistrare documente, balanțe lunare, declarații fiscale, situații financiare anuale, trezorerie și contabilitate de gestiune.',
    card: 'Evidență financiară și de gestiune, balanțe lunare, declarații și situații financiare anuale.',
    cardEn: 'Financial and management accounting, monthly trial balances, tax returns and annual accounts.',
    titleEn: 'Accounting',
    lead: 'Ținem evidența contabilă completă a firmei, de la documentele primare până la situațiile financiare anuale. În paralel urmărim efectul fiscal al fiecărei înregistrări, ca surprizele să nu apară la control.',
    sections: [
      ['Evidența curentă', [
        'Înregistrarea documentelor primare conform normelor și principiilor contabile',
        'Evidența analitică și sintetică a clienților și furnizorilor',
        'Evidența mijloacelor fixe și calculul amortizării',
        'Registrul jurnal, registrul inventar, jurnalele de TVA și cartea mare',
        'Balanța de verificare lunară',
      ]],
      ['Declarații și situații financiare', [
        'Calculul obligațiilor de plată și pregătirea documentelor de plată',
        'Întocmirea și depunerea declarațiilor lunare, trimestriale și anuale',
        'Optimizarea impozitelor de plată, în limitele legii',
        'Situațiile financiare semestriale și anuale',
        'Inventarierea anuală a conturilor și confirmările de sold',
      ]],
      ['Trezorerie', [
        'Monitorizarea conturilor bancare: tranzacții și solduri de numerar',
        'Procesarea plăților aprobate, inclusiv a celor către angajați',
        'Documentele contabile pentru operațiunile bancare și de numerar',
      ]],
      ['Contabilitate de gestiune', [
        'Calculația costurilor',
        'Bugetul de venituri și cheltuieli',
        'Rapoarte despre poziția financiară, performanță și fluxurile de trezorerie',
        'Proceduri și politici contabile adaptate fiecărei firme',
        'Estimarea impozitelor și taxelor în proiectele de investiții',
      ]],
      ['Refacerea contabilității', [
        'Reconstruirea evidenței din extrase bancare, facturi și declarații depuse',
        'Verificarea soldurilor, analiza creanțelor și datoriilor, reconcilierea conturilor',
        'Identificarea diferențelor care influențează situația patrimonială a firmei',
        'Evidență refăcută care poate fi folosită în litigii, insolvență sau la un control fiscal',
      ]],
      ['Arhivă', [
        'Arhivarea documentelor, în format fizic și electronic',
      ]],
    ],
    note: 'De ce contează o contabilitate refăcută într-un litigiu: <a href="/articole/refacere-contabilitate-litigii/">citiți articolul</a>.',
  },
  {
    slug: 'contabilitate-in-cloud', short: 'Contabilitate în cloud',
    title: 'Contabilitate în cloud',
    seo: 'Contabilitate în cloud: documente scanate, rapoarte online',
    desc: 'Trimiteți documentele scanate sau fotografiate, noi le înregistrăm, iar dumneavoastră vedeți situația firmei oricând, de pe orice dispozitiv.',
    card: 'Documente trimise scanat sau foto, rapoarte disponibile oricând, de pe orice dispozitiv.',
    cardEn: 'Send documents as scans or photos and see your reports any time, on any device.',
    titleEn: 'Cloud accounting',
    lead: 'Nu mai alergați toată ziua cu chitanțe și dosare. Este suficient să scanați sau să fotografiați documentele: noi le prelucrăm, iar dumneavoastră vedeți situația firmei de oriunde.',
    steps: [
      ['Trimiteți documentele', 'Facturi, bonuri, extrase: scanate sau fotografiate, fără drumuri la birou.'],
      ['Le înregistrăm', 'Prelucrăm documentele și ținem evidența la zi, inclusiv partea fiscală.'],
      ['Vedeți rezultatele', 'Rapoartele financiare sunt disponibile oricând, de pe orice dispozitiv.'],
    ],
    sections: [
      ['Ce câștigați', [
        'Acces la datele contabile de oriunde: de pe teren, de acasă, de la client sau din concediu',
        'Rapoarte financiare în timp real, nu doar la sfârșit de lună',
        'Mai puține erori, pentru că datele se introduc manual mult mai rar',
        'Mai mulți utilizatori, din locații diferite, pot lucra în același timp',
        'Acces criptat și protejat prin parolă',
        'Știți mereu ce taxe aveți de plătit, unde și până când',
      ]],
    ],
  },
  {
    slug: 'consultanta-fiscala', short: 'Consultanță fiscală',
    title: 'Consultanță fiscală și financiară',
    seo: 'Consultanță fiscală și financiară, asistență la control ANAF',
    desc: 'TVA, impozit pe profit și pe venit, facilități fiscale, asistență și reprezentare la controale ANAF, contestații, cash-flow și buget.',
    card: 'TVA, impozit pe profit, facilități fiscale, asistență la controale ANAF și contestații.',
    cardEn: 'VAT, corporate tax, tax incentives, support during ANAF audits and tax appeals.',
    titleEn: 'Tax and financial advice',
    lead: 'Fiscalitatea nu mai este o anexă a contabilității, ci parte din fiecare decizie. Vă ajutăm să plătiți corect, să folosiți facilitățile la care aveți dreptul și să treceți fără emoții printr-un control.',
    sections: [
      ['Fiscalitate', [
        'Certificarea declarațiilor fiscale',
        'Impozite directe: impozit pe profit, impozit pe venit, impozitul pe veniturile nerezidenților',
        'Impozite indirecte: TVA și accize',
        'Verificarea calculului, reținerii și plății impozitelor și taxelor',
        'Identificarea și aplicarea facilităților fiscale prevăzute de lege',
        'Reglementări fiscale pentru activitățile de import și export',
        'Informare operativă despre modificările legislative și efectul lor asupra firmei',
        'Asistență la întocmirea declarațiilor de impozite și taxe',
      ]],
      ['Controale ANAF', [
        'Pregătirea și asistența în timpul controlului fiscal',
        'Reprezentare la inspecția fiscală',
        'Reprezentare la controlul pentru rambursarea TVA',
        'Redactarea contestațiilor și a altor documente adresate organelor fiscale',
      ]],
      ['Consultanță financiară', [
        'Analiza fluxurilor financiare și a cash-flow-ului',
        'Bugetul de venituri și cheltuieli',
        'Raportul de management',
        'Analiza capitalurilor și a imobilizărilor',
        'Studii privind oportunitățile oferite de legislația fiscală și contabilă',
        'Consultanță pentru raportările semestriale și anuale',
      ]],
    ],
    note: 'Dacă un control fiscal a ajuns la plângere penală, vedeți <a href="https://infractiunifiscale.ro/">infractiunifiscale.ro</a>.',
  },
  {
    slug: 'resurse-umane-salarizare', short: 'Resurse umane și salarizare',
    title: 'Resurse umane și salarizare',
    seo: 'Administrare personal și salarizare: ITM, state de plată, D112',
    desc: 'Administrare personal și salarizare: contracte și ITM, state de plată, D112 și D100, concedii, adeverințe, fluturași electronici, formular A1.',
    card: 'Contracte și ITM, state de plată, D112, concedii, adeverințe și fluturași electronici.',
    cardEn: 'Employment contracts, payroll, D112 returns, leave records and payslips.',
    titleEn: 'HR and payroll',
    lead: 'Preluăm toată partea administrativă a angajaților, de la contractul de muncă la fluturașul de salariu, ca dumneavoastră să vă ocupați de echipă, nu de formulare.',
    sections: [
      ['Administrare personal', [
        'Consultanță privind Codul muncii',
        'Transmiterea la ITM a contractelor individuale de muncă, actelor adiționale și deciziilor de suspendare sau încetare',
        'Evidența contractelor suspendate, de exemplu pentru maternitate, și documentele aferente',
        'Proceduri de promovare, sancționare sau concediere disciplinară',
        'Adeverințe medicale și de venit',
        'Evidența concediilor medicale, de odihnă și fără plată',
        'Note de lichidare',
        'Organizarea controalelor medicale la angajare, periodice sau suplimentare',
        'Dosarele pentru indemnizația de șomaj și pentru indemnizația de creștere a copilului',
        'Formularul A1 pentru detașarea salariaților în statele UE',
        'Notificări din timp pentru termenele legate de personal',
      ]],
      ['Salarizare', [
        'Baza de date cu contractele de muncă, modificările și încetările lor',
        'Verificarea pontajelor',
        'Statele de plată: ore suplimentare, ore de noapte, sporuri, bonusuri, rețineri, concedii, avantaje în natură',
        'Întocmirea și depunerea declarațiilor D112 și D100, inclusiv a celor rectificative',
        'Fișele fiscale ale angajaților',
        'Ordinele de plată și fișierele de bancă pentru salarii',
        'Adeverințe de bancă pentru salariați',
        'Fluturași de salariu electronici, protejați cu parolă',
        'Calculul veniturilor din drepturi de autor, contracte de mandat și contracte de administrator',
        'Rapoarte de costuri salariale și evidența zilelor de concediu',
        'Arhivarea documentelor, în format fizic și electronic',
      ]],
    ],
    note: 'Pentru concedieri contestate, sancțiuni sau salarii neplătite ajunse în instanță, vedeți <a href="https://litigiimunca.ro/">litigiimunca.ro</a>.',
  },
  {
    slug: 'infiintare-firma', short: 'Înființare firmă și sediu',
    title: 'Înființare firmă și sediu social',
    seo: 'Înființare firmă, înregistrare TVA și sediu social în București',
    desc: 'Consultanță la înființarea firmei, înregistrare în scopuri de TVA, organizarea contabilității, sediu social și preluarea corespondenței.',
    card: 'Forma de organizare potrivită, înregistrare în scopuri de TVA, sediu social și corespondență.',
    cardEn: 'Choosing the right legal form, VAT registration, registered office and mail handling.',
    titleEn: 'Company set-up and registered office',
    lead: 'Deciziile luate la început, forma de organizare, regimul de TVA și felul în care organizați contabilitatea, contează ani de zile. Vă ajutăm să le luați corect din prima.',
    sections: [
      ['Înființare', [
        'Consultanță privind modul de înființare și forma de organizare',
        'Înființarea firmei',
        'Înregistrarea în scopuri de TVA',
        'Comparație între regimurile de impozitare din statele Uniunii Europene',
        'Organizarea optimă a activității financiar-contabile',
        'Recomandări privind personalul necesar',
      ]],
      ['Sediu social', [
        'Sediu social conform reglementărilor în vigoare, cu preluarea corespondenței',
        'Închirierea de spații de birou și documentele necesare pentru sediul social',
        'Servicii alese în funcție de nevoile fiecărui client',
      ]],
    ],
  },
  {
    slug: 'expertiza-contabila', short: 'Expertiză contabilă',
    title: 'Expertiză contabilă judiciară',
    seo: 'Expertiză contabilă judiciară și extrajudiciară',
    desc: 'Expertize contabile judiciare și extrajudiciare: interpretarea evidenței contabile și concluzii care servesc drept probă în dosare penale, civile și comerciale.',
    card: 'Expertize judiciare și extrajudiciare, cu concluzii care pot fi folosite ca probă.',
    cardEn: 'Court-appointed and private forensic accounting reports that can be used as evidence.',
    titleEn: 'Forensic accounting',
    lead: 'Expertiza contabilă interpretează datele din evidența contabilă, formulează opinii asupra problemelor investigate și trage concluzii pe baza constatărilor. Aceste concluzii servesc drept probă pentru organul judiciar care a dispus expertiza.',
    sections: [
      ['Unde intervenim', [
        'Dosare de evaziune fiscală și alte infracțiuni economice',
        'Acțiuni de atragere a răspunderii administratorilor în insolvență',
        'Litigii de muncă privind drepturile salariale',
        'Litigii civile și comerciale: creanțe, prejudicii, decontări între asociați',
      ]],
      ['Ce primiți', [
        'Analiza documentelor contabile și a întrebărilor din dosar',
        'Constatări formulate clar, pe cifre',
        'Concluzii care pot fi folosite ca probă',
      ]],
      ['Expert parte', [
        'Analiză contabilă independentă, alături de expertul numit de procuror sau de instanță',
        'Obiective propuse înainte de dispunerea expertizei',
        'Obiecțiuni argumentate și opinie separată la expertiza judiciară',
        'Identificarea omisiunilor, a erorilor de calcul și a interpretărilor contabile discutabile',
        'Colaborare directă cu avocatul care asigură apărarea juridică',
      ]],
    ],
    note: 'Fiecare tip de dosar are un site dedicat: <a href="https://infractiunifiscale.ro/">infracțiuni fiscale</a>, <a href="https://atragerearaspunderii.ro/">atragerea răspunderii</a> și <a href="https://litigiimunca.ro/">litigii de muncă</a>.',
  },
];

const LEGAL = {
  slug: 'legal-bba', short: 'Legal BBA',
  title: 'Legal BBA: contabilitate și drept, în același dosar',
  seo: 'Legal BBA: consultanță juridică, infracțiuni fiscale, atragerea răspunderii, litigii de muncă',
  desc: 'Consultanță juridică și reprezentare prin case de avocatură partenere, insolvență cu practician partener, executări silite prin BEJ, împreună cu expertiza contabilă Bilanz Audit.',
  lead: 'Multe probleme juridice ale unei firme pornesc de la cifre. Legal BBA reunește expertiza contabilă și fiscală a echipei Bilanz Audit cu serviciile juridice ale partenerilor noștri, ca un dosar complex să fie coordonat dintr-un singur loc.',
  intro: 'Tot ce presupune consultanță juridică și reprezentare în instanță este asigurat de case de avocatură cu care Buchhaltung & Bilanz Audit are parteneriate semnate în acest sens. Procedurile de insolvență se desfășoară împreună cu practicianul în insolvență <a href="https://tgvch.ro/servicii/insolventa/" target="_blank" rel="noopener">Cosmin A. Hârceagă (TGV-CH Restructuring &amp; Insolvency SPRL)</a>, iar executările silite prin <strong>BEJ Petre Cristian</strong>. Noi aducem cifrele: expertiză contabilă judiciară și extrajudiciară, expert parte, refacerea și verificarea evidențelor.',
  sections: [
    ['Infracțiuni fiscale', [
      'Asistență la inspecția fiscală și contestarea deciziei de impunere',
      'Reprezentare în dosarele de evaziune fiscală, prin avocați specializați în drept penal fiscal',
      'Expert contabil parte și recalcularea prejudiciului',
      'Strategia de acoperire a prejudiciului (art. 10 Legea 241/2005)',
    ]],
    ['Atragerea răspunderii și insolvență', [
      'Apărarea administratorilor în acțiunile întemeiate pe art. 169 Legea 85/2014',
      'Contestarea deciziilor ANAF de atragere a răspunderii solidare (art. 25 Cod procedură fiscală)',
      'Acțiuni în răspundere împotriva administratorilor și recuperarea prejudiciilor',
      'Reorganizare judiciară, faliment și restructurare, împreună cu practicianul în insolvență partener',
      'Expertiza cauzelor insolvenței și refacerea contabilității',
    ]],
    ['Dreptul muncii și litigii de muncă', [
      'Consultanță privind Codul muncii, prin casa de avocatură parteneră specializată în litigii de muncă',
      'Înregistrarea și încetarea contractelor individuale de muncă, reintegrare',
      'Concedieri individuale și colective, cercetare disciplinară',
      'Reprezentare în litigiile de muncă și expertiză contabilă de salarizare',
    ]],
    ['Litigii civile, comerciale și executare silită', [
      'Litigii civile și comerciale, recuperare de creanțe, contencios administrativ și fiscal',
      'Consiliere pentru soluționarea pe cale amiabilă, negociere și mediere',
      'Executarea silită a titlurilor executorii, prin BEJ Petre Cristian',
      'Expertize contabile în litigii: creanțe, prejudicii, decontări între asociați',
    ]],
  ],
};

// Partners shown on the Legal BBA page.
const PARTNERS = [
  { who: 'Consultanță juridică și reprezentare', name: 'Case de avocatură partenere', text: 'Consultanța juridică, redactarea actelor și reprezentarea în fața instanțelor și a organelor de urmărire penală sunt asigurate de avocați, pe baza parteneriatelor semnate cu Buchhaltung & Bilanz Audit.' },
  { who: 'Insolvență', name: 'Cosmin A. Hârceagă', href: 'https://tgvch.ro/servicii/insolventa/', text: 'Practician în insolvență, managing partner al TGV-CH Restructuring & Insolvency SPRL: reorganizare judiciară, faliment, restructurare și consultanță pentru creditori.' },
  { who: 'Executare silită', name: 'BEJ Petre Cristian', text: 'Executarea silită a hotărârilor și a celorlalte titluri executorii obținute de clienții noștri.' },
];

// Articles, newest first. body is HTML.
const NEW_ARTICLES = [
  {
    slug: 'atragerea-raspunderii-administratorilor',
    kicker: 'Atragerea răspunderii',
    title: 'Atragerea răspunderii administratorilor: responsabilitatea nu începe odată cu insolvența',
    desc: 'Răspunderea administratorilor poate fi angajată și în timpul funcționării societății: răspundere civilă, contractuală sau delictuală și răspundere solidară fiscală (art. 25 Cod procedură fiscală).',
    note: 'Ați fost chemat să răspundeți pentru datoriile unei firme? Vedeți <a href="https://atragerearaspunderii.ro/">atragerearaspunderii.ro</a>.',
    body: `<p class="lede">Răspunderea administratorilor unei societăți nu se limitează la situațiile în care societatea ajunge în insolvență.</p>
<p>Pe parcursul funcționării societății, anumite decizii manageriale, operațiuni patrimoniale nejustificate, utilizarea necorespunzătoare a activelor, încălcarea obligațiilor legale sau contractuale ori prejudicierea societății și a creditorilor pot constitui temeiuri pentru angajarea răspunderii civile, contractuale sau delictuale, după caz.</p>
<p>În materia obligațiilor fiscale poate interveni inclusiv răspunderea solidară a administratorilor, în condițiile restrictive prevăzute de art. 25 din Codul de procedură fiscală.</p>
<h2>Ce presupune analiza unei astfel de situații</h2>
<p>Analiza presupune examinarea documentelor contabile, a fluxurilor financiare, a operațiunilor cu părțile afiliate, a transferurilor de active, a relațiilor comerciale și a deciziilor adoptate de organele de conducere.</p>
<p>Identificarea prejudiciului, stabilirea persoanelor responsabile și demonstrarea legăturii de cauzalitate sunt elemente esențiale pentru fundamentarea unei acțiuni în răspundere.</p>
<h2>Cum vă putem sprijini</h2>
<p>Buchhaltung &amp; Bilanz Audit oferă analiză financiar-contabilă, expertiză contabilă judiciară și extrajudiciară și asistență de specialitate în calitate de expert parte, inclusiv în litigii având ca obiect atragerea răspunderii administratorilor, recuperarea prejudiciilor și verificarea operațiunilor economice care au afectat patrimoniul societăților. Consultanța juridică și reprezentarea sunt asigurate prin casele de avocatură partenere, iar procedurile de insolvență împreună cu practicianul în insolvență Cosmin A. Hârceagă (TGV-CH Restructuring &amp; Insolvency).</p>
<p class="callout">Prevenția, documentarea și analiza contabilă riguroasă pot face diferența între o suspiciune și o răspundere demonstrată.</p>`,
  },
  {
    slug: 'expert-parte-argumente-contabile-fiscale',
    kicker: 'Expertiză contabilă',
    title: 'Expert parte: argumente contabile și fiscale în susținerea poziției procesuale',
    desc: 'Rolul expertului parte în litigiile comerciale și fiscale și în cauzele de insolvență: analiză contabilă independentă, obiecțiuni argumentate și identificarea erorilor din expertiza judiciară.',
    note: 'Aveți un dosar de evaziune fiscală? Vedeți <a href="https://infractiunifiscale.ro/expert-contabil-parte/">expertul contabil parte pe infractiunifiscale.ro</a>.',
    body: `<p class="lede">În litigiile comerciale, fiscale și în cauzele generate de procedurile de insolvență, documentele contabile nu reprezintă doar o evidență a operațiunilor economice.</p>
<p>Ele pot constitui probe importante pentru stabilirea situației de fapt. Fie că discutăm despre atragerea răspunderii patrimoniale, prejudicii economice, operațiuni nejustificate, creanțe contestate sau diferențe rezultate din evidențele contabile, interpretarea corectă a informațiilor financiare poate influența înțelegerea aspectelor tehnice ale cauzei.</p>
<h2>Ce aduce expertul parte</h2>
<p>Participarea unui expert parte permite părții interesate să beneficieze de o analiză contabilă independentă, să formuleze obiecțiuni argumentate la concluziile unei expertize judiciare și să identifice eventualele omisiuni, erori de calcul sau interpretări contabile discutabile.</p>
<p>Rolul expertului este de a furniza argumente tehnice fundamentate, fără a substitui atribuțiile instanței în stabilirea răspunderii juridice și fără a înlocui apărarea juridică, asigurată de avocat.</p>
<h2>Experiența noastră</h2>
<p>Buchhaltung &amp; Bilanz Audit pune la dispoziție experiență în domeniul contabil, fiscal și al expertizelor judiciare, pentru cauze în care analiza financiar-contabilă necesită rigoare, documentare și o abordare interdisciplinară, împreună cu avocații partenerilor noștri.</p>`,
  },
  {
    slug: 'refacere-contabilitate-litigii',
    kicker: 'Contabilitate',
    title: 'Refacerea contabilității: documentele contabile pot deveni elemente esențiale într-un litigiu',
    desc: 'O contabilitate incompletă sau neactualizată poate deveni relevantă în insolvență și în acțiunile de atragere a răspunderii. Ce presupune refacerea și verificarea evidenței contabile.',
    note: 'Refacerea evidenței este adesea cea mai eficientă apărare a administratorului. Vedeți <a href="https://atragerearaspunderii.ro/refacere-contabilitate/">atragerearaspunderii.ro</a>.',
    body: `<p class="lede">O contabilitate incompletă, neactualizată sau ținută necorespunzător poate genera consecințe care depășesc sfera fiscală.</p>
<p>În contextul unei proceduri de insolvență, lipsa documentelor justificative, neconcordanțele dintre evidența contabilă și situația patrimonială reală sau imposibilitatea identificării operațiunilor economice pot deveni aspecte relevante inclusiv în cadrul acțiunilor de atragere a răspunderii patrimoniale.</p>
<h2>Mai mult decât înregistrarea documentelor restante</h2>
<p>Serviciile de refacere a contabilității presupun reconstruirea evidenței economico-financiare: verificarea soldurilor, analiza creanțelor și datoriilor, reconcilierea conturilor și identificarea eventualelor diferențe care pot influența situația patrimonială a societății.</p>
<h2>Ce realizăm</h2>
<p>Buchhaltung &amp; Bilanz Audit realizează lucrări de refacere și verificare a evidențelor contabile, precum și analize de specialitate necesare în litigii și proceduri de insolvență. În funcție de obiectivele cauzei, putem asigura și asistență de specialitate în calitate de expert parte.</p>`,
  },
  {
    slug: 'raspundere-patrimoniala-insolventa-analiza-contabila',
    kicker: 'Insolvență',
    title: 'Atragerea răspunderii patrimoniale în insolvență: analiza contabilă poate face diferența',
    desc: 'În acțiunile de atragere a răspunderii patrimoniale din insolvență, analiza documentelor contabile și legătura dintre operațiuni și prejudiciu pot fi decisive.',
    note: 'Ați primit cererea lichidatorului? Vedeți <a href="https://atragerearaspunderii.ro/">atragerearaspunderii.ro</a>.',
    body: `<p class="lede">Procedurile de insolvență pot ridica probleme complexe privind modul de administrare a societății, utilizarea activelor, evidența operațiunilor economico-financiare și cauzele care au condus la starea de insolvență.</p>
<p>În acțiunile privind atragerea răspunderii patrimoniale, analiza documentelor contabile, identificarea eventualelor nereguli și stabilirea legăturii dintre operațiunile economice și prejudiciul invocat pot avea un rol esențial.</p>
<h2>Ce oferim</h2>
<p>Buchhaltung &amp; Bilanz Audit oferă servicii de expertiză contabilă judiciară și extrajudiciară, inclusiv în calitate de expert parte, pentru analiza situațiilor financiar-contabile, verificarea operațiunilor patrimoniale și formularea unor concluzii tehnice fundamentate pe documente și pe reglementările aplicabile.</p>
<p>Pentru procedura de insolvență lucrăm cu practicianul în insolvență <a href="https://tgvch.ro/servicii/insolventa/" target="_blank" rel="noopener">Cosmin A. Hârceagă (TGV-CH Restructuring &amp; Insolvency SPRL)</a>, iar consultanța juridică și reprezentarea sunt asigurate prin casele de avocatură partenere.</p>
<p class="callout">Dacă sunteți implicat într-un litigiu privind atragerea răspunderii administratorilor sau într-o procedură de insolvență, analiza contabilă de specialitate poate contribui la susținerea argumentelor dumneavoastră.</p>`,
  },
].map((a) => ({ ...a, date: '2026-11-19', dateRo: '19 noiembrie 2026', author: 'Iuliana Pană', role: 'Expert contabil, membru CECCAR' }));

const ARTICLE = {
  slug: 'factura-de-stornare-evaziune-fiscala',
  title: 'Ce legătură are o factură de stornare cu evaziunea fiscală?',
  desc: 'Factura de stornare pare o simplă corecție contabilă, dar neînregistrarea ei sau o stornare fictivă pot întruni elementele evaziunii fiscale (art. 9 Legea 241/2005).',
  date: '2025-05-24', dateRo: '24 mai 2025',
  author: 'Iuliana Pană', role: 'Expert contabil, membru CECCAR',
  body: `<p class="lede">Nihil sine fiscalitate, sau de ce nimic nu mai funcționează fără fiscalitate în contabilitate.</p>
<p>În viața de zi cu zi auzim des expresia latină „Nihil sine Deo”: nimic fără Dumnezeu. În contabilitatea de zi cu zi, realitatea pare să ne impună o deviză adaptată vremurilor noastre: „Nihil sine fiscalitate”, nimic fără fiscalitate.</p>
<p>Amortizare fiscală, cheltuieli deductibile, venituri neimpozabile, plafon de microîntreprindere: termenii aceștia au devenit prezențe constante în vocabularul nostru profesional. Oricât de bine pregătit ar fi un contabil, nu mai poate ignora latura fiscală a documentelor pe care le prelucrează. Trebuie să o înțeleagă, să o anticipeze și, de multe ori, să o interpreteze în favoarea clientului, dar în limitele legii.</p>
<p>Pornind de aici, am ales un subiect aparent banal, dar cu implicații fiscale serioase: facturile de stornare.</p>
<h2>Factura de stornare: un simplu document? Nu chiar.</h2>
<p>La prima vedere, factura de stornare pare o formalitate. Din punct de vedere contabil, este doar corecția unei operațiuni anterioare. Din perspectivă fiscală însă, această „corecție” poate ascunde riscuri majore. Folosită greșit, poate duce chiar la întrunirea elementelor unei infracțiuni de evaziune fiscală.</p>
<p>Iată două situații frecvente.</p>
<h3>1. Cumpărătorul nu înregistrează factura de stornare</h3>
<ul>
<li>Societatea X cumpără servicii de la societatea Y.</li>
<li>X înregistrează factura și deduce TVA-ul aferent.</li>
<li>Ulterior, Y emite o factură de stornare, dar X nu o înregistrează în contabilitate.</li>
</ul>
<p>Rezultatul: X păstrează deducerea de TVA și recunoaște în continuare cheltuiala, deși operațiunea comercială a fost anulată.</p>
<p>Această omisiune aparent minoră poate fi sancționată penal. Potrivit art. 9 alin. (1) lit. b) și c) din Legea nr. 241/2005 pentru prevenirea și combaterea evaziunii fiscale, constituie evaziune fiscală omiterea evidențierii în actele contabile a operațiunilor efectuate sau evidențierea unor cheltuieli care nu au la bază operațiuni reale.</p>
<p class="callout"><strong>Exemplu din practică:</strong> prin Decizia penală nr. 589/2016, Curtea de Apel Pitești a condamnat administratorul unei firme care nu înregistrase factura de stornare și păstrase astfel, nejustificat, deducerea de TVA.</p>
<h3>2. Vânzătorul emite și înregistrează o stornare fictivă</h3>
<ul>
<li>Societatea A prestează servicii, emite factura și o înregistrează.</li>
<li>Ulterior emite o factură de stornare fără temei real, ca să anuleze artificial veniturile și obligațiile fiscale aferente.</li>
</ul>
<p>Aici avem de-a face cu o operațiune fictivă, iar legea este foarte clară: art. 9 alin. (1) lit. c) din Legea nr. 241/2005 sancționează evidențierea în contabilitate a unor operațiuni fictive.</p>
<p>Această conduită este mai gravă decât omisiunea din primul exemplu, pentru că presupune intenția directă de fraudare și crearea unor realități contabile false.</p>
<h2>e-Factura: un aliat neașteptat al contabilului?</h2>
<p>Sistemul e-Factura a fost privit la început cu suspiciune, mai ales din cauza presiunii administrative pe care o aduce. Poate că nu este chiar atât de rău pe cât părea. Din perspectiva contabilului, e-Factura oferă trasabilitate și transparență și poate preveni multe dintre situațiile de mai sus.</p>
<p>Nu de puține ori primim documente pe care trebuie să le înregistrăm fără să cunoaștem contextul complet al tranzacției. În acest sens, digitalizarea poate deveni un instrument de protecție profesională, nu doar unul de control.</p>
<h2>Concluzie</h2>
<p>În contabilitate, fiscalitatea nu mai este o opțiune, ci o componentă obligatorie a fiecărei decizii și a fiecărei înregistrări. Fie că vorbim de o simplă stornare sau de o politică fiscală complexă, „Nihil sine fiscalitate” a devenit realitate de zi cu zi.</p>
<p>Atenția la detalii, înțelegerea implicațiilor legale și comunicarea cu clientul nu mai sunt simple recomandări. Sunt obligații profesionale pentru orice contabil responsabil.</p>`,
  kicker: 'Fiscalitate',
  note: 'Aveți un dosar de evaziune fiscală sau o inspecție ANAF în desfășurare? Vedeți <a href="https://infractiunifiscale.ro/">infractiunifiscale.ro</a>.',
};
const ARTICLES = [...NEW_ARTICLES, ARTICLE];

// ---------- layout ----------
const CSS = `:root{--bg:#E8E6E0;--surface:#FBFAF7;--ink:#131A26;--muted:#4C5563;--line:#D0CCC2;--navy:#16223A;--navy-ink:#EEF1F6;--navy-hi:#F2B27E;--accent:#9F4714;--on-accent:#FFFFFF;--accent-soft:#EDD9CA;
--sh-sm:0 1px 2px rgba(19,26,38,.07),0 2px 6px rgba(19,26,38,.06);--sh:0 1px 2px rgba(19,26,38,.07),0 8px 22px rgba(19,26,38,.10);--sh-lg:0 2px 6px rgba(19,26,38,.10),0 18px 44px rgba(19,26,38,.18);
--display:"Source Serif 4",Georgia,"Times New Roman",serif;--body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0F141C;--surface:#161D28;--ink:#E6EAF0;--muted:#9AA5B4;--line:#263142;--navy:#0A0F17;--navy-ink:#E6EAF0;--navy-hi:#F2B27E;--accent:#EE9A62;--on-accent:#1A1108;--accent-soft:#2A1E16;--sh-sm:0 1px 2px rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3);--sh:0 1px 2px rgba(0,0,0,.45),0 8px 22px rgba(0,0,0,.4);--sh-lg:0 2px 6px rgba(0,0,0,.5),0 18px 44px rgba(0,0,0,.55);color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0F141C;--surface:#161D28;--ink:#E6EAF0;--muted:#9AA5B4;--line:#263142;--navy:#0A0F17;--navy-ink:#E6EAF0;--navy-hi:#F2B27E;--accent:#EE9A62;--on-accent:#1A1108;--accent-soft:#2A1E16;--sh-sm:0 1px 2px rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3);--sh:0 1px 2px rgba(0,0,0,.45),0 8px 22px rgba(0,0,0,.4);--sh-lg:0 2px 6px rgba(0,0,0,.5),0 18px 44px rgba(0,0,0,.55);color-scheme:dark}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:88px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.65 var(--body)}
img{max-width:100%;height:auto}[hidden]{display:none!important}
a{color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
h1,h2,h3{font-family:var(--display);font-weight:500;line-height:1.15;margin:0;text-wrap:balance}
p{margin:0}
.wrap{max-width:1120px;margin:0 auto;padding-inline:20px}
.kicker{font-size:.76rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}

header.top{background:var(--navy);color:var(--navy-ink);position:sticky;top:0;z-index:20;box-shadow:0 2px 14px rgba(8,12,20,.28)}
.top .wrap{display:flex;align-items:center;gap:28px;min-height:68px}
.brand{text-decoration:none;font:600 1.25rem/1.1 var(--display);white-space:nowrap}
.brand small{display:block;font:500 .66rem/1.5 var(--body);letter-spacing:.1em;text-transform:uppercase;opacity:.65;margin-top:3px}
.top nav{display:flex;align-items:center;gap:22px;margin-left:auto;font-size:.92rem}
.top nav a{text-decoration:none;opacity:.82;white-space:nowrap}
.top nav a:hover,.top nav a[aria-current="page"]{opacity:1;color:var(--navy-hi)}
.top .cta{opacity:1;background:var(--navy-hi);color:#1E2D4A;padding:9px 16px;border-radius:99px;font-weight:600}
.top .cta:hover{color:#1E2D4A;filter:brightness(1.06)}
.top .lng{font-size:.78rem;font-weight:600;border:1px solid color-mix(in srgb,var(--navy-ink) 35%,transparent);border-radius:99px;padding:5px 11px}
@media (max-width:900px){
  .top .wrap{flex-wrap:wrap;gap:0 16px;padding-block:10px}
  .top nav{order:3;width:100%;margin:8px 0 0;overflow-x:auto;gap:18px;padding-bottom:4px;scrollbar-width:none}
  .top nav .cta{display:none}
  .top .m-cta{margin-left:auto}
}
@media (min-width:901px){.top .m-cta{display:none}}

.btn{display:inline-block;padding:13px 24px;border-radius:99px;background:var(--accent);color:var(--on-accent);text-decoration:none;font-weight:600;box-shadow:var(--sh-sm);transition:box-shadow .15s,transform .15s}
.btn:hover{box-shadow:var(--sh);transform:translateY(-1px)}
.btn.ghost{background:var(--surface);color:var(--ink);border:1px solid var(--line)}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}

/* home */
main{display:block}
.hero{padding-block:64px 72px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,380px);gap:56px;align-items:center}
.hero h1{font-size:clamp(2.3rem,5vw,3.9rem);margin-block:16px 22px;letter-spacing:-.01em}
.hero h1 i{color:var(--accent)}
.hero .lead{font-size:1.1rem;color:var(--muted);max-width:56ch}
.due{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:26px;box-shadow:var(--sh-lg)}
.due .k{font-size:.76rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.due .date{font:500 2.1rem/1.1 var(--display);margin-top:8px}
.due .left{display:inline-block;margin-top:10px;font-size:.85rem;font-weight:600;background:var(--accent-soft);color:var(--accent);padding:4px 12px;border-radius:99px}
.due ul{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:0}
.due li{display:flex;gap:12px;padding:9px 0;border-top:1px solid var(--line);font-size:.92rem}
.due li b{min-width:46px;font-weight:600}
.due p{font-size:.8rem;color:var(--muted);margin-top:14px}
@media (max-width:960px){.hero{grid-template-columns:1fr;gap:36px;padding-block:44px 56px}}

section.block{padding-block:72px;border-top:1px solid var(--line)}
.sec-title{display:grid;gap:10px;margin-bottom:32px;max-width:62ch}
.sec-title h2{font-size:clamp(1.8rem,3.4vw,2.6rem)}
.sec-title p{color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px;display:grid;gap:10px;align-content:start;text-decoration:none;box-shadow:var(--sh);transition:border-color .15s,box-shadow .15s,transform .15s}
a.card:hover{border-color:var(--accent);box-shadow:var(--sh-lg);transform:translateY(-2px)}
.card h3{font-size:1.3rem}
.card p{color:var(--muted);font-size:.93rem}
.card .more{font-size:.86rem;font-weight:600;color:var(--accent);margin-top:4px}
.card .num{font:500 1rem/1 var(--display);color:var(--accent)}
.other{margin-top:22px;font-size:.92rem;color:var(--muted)}
.other b{color:var(--ink);font-weight:600}
@media (max-width:960px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:620px){.grid{grid-template-columns:1fr}}

.band{background:var(--navy);color:var(--navy-ink);border-radius:20px;box-shadow:var(--sh-lg);padding:clamp(28px,5vw,56px);display:grid;gap:28px}
.band .kicker{color:var(--navy-hi)}
.band h2{font-size:clamp(1.7rem,3.2vw,2.4rem);max-width:28ch}
.steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;counter-reset:s}
.steps div{border-top:1px solid color-mix(in srgb,var(--navy-ink) 25%,transparent);padding-top:16px;display:grid;gap:6px}
.steps div::before{counter-increment:s;content:"0" counter(s);font:500 1.5rem/1 var(--display);color:var(--navy-hi)}
.steps h3{font-size:1.15rem}
.steps p{font-size:.92rem;opacity:.8}
.band .btn{justify-self:start;background:var(--navy-hi);color:#1E2D4A}
@media (max-width:760px){.steps{grid-template-columns:1fr}}

.why{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 48px}
.why div{border-top:2px solid var(--ink);padding-top:16px}
.why h3{font-size:1.25rem;margin-bottom:8px}
.why p{color:var(--muted);font-size:.95rem}
@media (max-width:760px){.why{grid-template-columns:1fr}}

.niche .card .dom{font:600 1.15rem/1.2 var(--display);color:var(--ink)}
.article-teaser{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:clamp(22px,4vw,40px);text-decoration:none;box-shadow:var(--sh);transition:border-color .15s,box-shadow .15s}
.article-teaser:hover{border-color:var(--accent);box-shadow:var(--sh-lg)}
.article-teaser h3{font-size:clamp(1.4rem,2.6vw,1.9rem);margin-block:10px}
.article-teaser p{color:var(--muted);max-width:68ch}
.article-teaser .by{font-size:.86rem;margin-top:12px}
@media (max-width:720px){.article-teaser{grid-template-columns:1fr}}

.contact{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}
.contact ul{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:14px}
.contact li{display:grid;gap:2px}
.contact .k{font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.contact .v{overflow-wrap:anywhere}
.contact .aside-note{margin-top:24px;padding:16px 18px;border-radius:12px;background:var(--accent-soft);font-size:.92rem;box-shadow:var(--sh-sm)}
@media (max-width:860px){.contact{grid-template-columns:1fr}}

form{display:grid;gap:14px;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:24px;box-shadow:var(--sh-lg)}
label{display:grid;gap:6px;font-size:.86rem;font-weight:500}
input,select,textarea{font:inherit;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);width:100%;box-shadow:inset 0 1px 2px rgba(19,26,38,.08)}
textarea{min-height:110px;resize:vertical}
fieldset{border:0;padding:0;margin:0;display:grid;gap:8px;min-width:0}
legend{font-size:.86rem;font-weight:500;margin-bottom:6px;padding:0}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips label{display:flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line);border-radius:99px;font-weight:500;cursor:pointer}
.chips input{width:auto;accent-color:var(--accent);margin:0}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media (max-width:560px){.row2{grid-template-columns:1fr}}
.check{display:flex;gap:10px;font-weight:400;color:var(--muted)}
.check input{width:auto;margin-top:4px;accent-color:var(--accent)}
button.submit{justify-self:start;padding:13px 26px;border-radius:99px;border:0;background:var(--accent);color:var(--on-accent);font:600 .95rem/1 var(--body);cursor:pointer;box-shadow:var(--sh-sm)}
button.submit:disabled{opacity:.6;cursor:default}
.status{font-size:.9rem;padding:12px 14px;border-radius:10px;background:var(--accent-soft)}
form h2{font-size:1.4rem}

/* inner pages */
.crumbs{font-size:.84rem;color:var(--muted);padding-top:28px}
.crumbs a{color:var(--muted)}
.page-head{padding-block:18px 40px;max-width:780px}
.page-head h1{font-size:clamp(2rem,4.4vw,3.1rem);margin-block:12px 18px}
.page-head .lead{font-size:1.1rem;color:var(--muted)}
.layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:56px;padding-bottom:80px;align-items:start}
.content h2{font-size:1.5rem;margin:40px 0 14px}
.content h2:first-child{margin-top:0}
ul.ticks{list-style:none;padding:0;margin:0;display:grid;gap:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:var(--sh)}
ul.ticks li{padding:12px 18px 12px 44px;border-top:1px solid var(--line);position:relative}
ul.ticks li:first-child{border-top:0}
ul.ticks li::before{content:"";position:absolute;left:18px;top:21px;width:10px;height:6px;border-left:2px solid var(--accent);border-bottom:2px solid var(--accent);transform:rotate(-45deg)}
.content .note{margin-top:32px;padding:16px 18px;border-left:3px solid var(--accent);background:var(--surface);border-radius:0 12px 12px 0;font-size:.95rem;box-shadow:var(--sh-sm)}
.content .note a{color:var(--accent)}
.content .steps-light{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:8px}
.content .steps-light div{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px;display:grid;gap:6px;box-shadow:var(--sh)}
.content .steps-light b{font:500 1.5rem/1 var(--display);color:var(--accent)}
.content .steps-light h3{font-size:1.1rem}
.content .steps-light p{font-size:.9rem;color:var(--muted)}
@media (max-width:760px){.content .steps-light{grid-template-columns:1fr}}
aside.side{position:sticky;top:96px;display:grid;gap:18px}
.side .box{background:var(--navy);color:var(--navy-ink);border-radius:16px;padding:22px;display:grid;gap:12px;box-shadow:var(--sh-lg)}
.side .box h2{font-size:1.25rem}
.side .box p{font-size:.9rem;opacity:.85}
.side .box .btn{background:var(--navy-hi);color:#1E2D4A;text-align:center}
.side .box a.tel{font:600 1.2rem/1.2 var(--display);color:var(--navy-hi);text-decoration:none}
.side nav{display:grid;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:8px 18px;box-shadow:var(--sh)}
.side nav b{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:10px 0 4px}
.side nav a{text-decoration:none;padding:9px 0;border-top:1px solid var(--line);font-size:.93rem}
.side nav a:hover,.side nav a[aria-current="page"]{color:var(--accent)}
@media (max-width:960px){.layout{grid-template-columns:1fr;gap:40px}aside.side{position:static}}

.prose{max-width:720px;padding-bottom:80px}
.prose p,.prose li{color:var(--ink);font-size:1.05rem;line-height:1.75}
.prose p+p,.prose ul+p,.prose p+ul,.prose h3+ul{margin-top:16px}
.prose h2{font-size:1.65rem;margin:44px 0 14px}
.prose h3{font-size:1.25rem;margin:32px 0 12px}
.prose ul{padding-left:22px;margin:0}
.prose .lede{font:500 1.35rem/1.45 var(--display);color:var(--muted)}
.prose .callout{background:var(--accent-soft);border-radius:12px;padding:16px 18px;margin-top:20px;box-shadow:var(--sh-sm)}
.prose .meta{font-size:.92rem;color:var(--muted)}
.prose a{color:var(--accent)}
.author{margin-top:44px;padding-top:20px;border-top:1px solid var(--line);display:grid;gap:2px}
.author b{font-family:var(--display);font-size:1.15rem;font-weight:600}
.author span{color:var(--muted);font-size:.92rem}

footer.foot{background:var(--navy);box-shadow:0 -2px 14px rgba(8,12,20,.18);color:var(--navy-ink);padding-block:48px 36px;font-size:.9rem}
.foot .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:32px}
.foot h2{font:600 .74rem/1.4 var(--body);letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-bottom:12px}
.foot ul{list-style:none;padding:0;margin:0;display:grid;gap:6px}
.foot a{text-decoration:none;opacity:.85}.foot a:hover{opacity:1;color:var(--navy-hi)}
.foot .legal{margin-top:36px;padding-top:20px;border-top:1px solid color-mix(in srgb,var(--navy-ink) 18%,transparent);opacity:.65;font-size:.82rem;display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between}
@media (max-width:760px){.foot .cols{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}`;

function head({ lang, path, title, desc, alt, noindex, jsonld }) {
  const url = ORIGIN + path;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
${alt ? `<link rel="alternate" hreflang="ro" href="${ORIGIN}${alt.ro}">
<link rel="alternate" hreflang="en" href="${ORIGIN}${alt.en}">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}${alt.ro}">` : ''}
<meta property="og:type" content="${path.startsWith('/articole/') && path.length > 10 ? 'article' : 'website'}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Buchhaltung &amp; Bilanz Audit">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'ro_RO'}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="${THEME}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${CSS}</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

function header(lang, current) {
  const en = lang === 'en';
  const items = en
    ? [['/en/#servicii', 'Services'], ['/en/#cloud', 'Cloud accounting'], ['/en/#legal', 'Legal BBA'], ['/en/#contact', 'Contact']]
    : [['/#servicii', 'Servicii'], ['/contabilitate-in-cloud/', 'Contabilitate în cloud'], ['/legal-bba/', 'Legal BBA'], ['/articole/', 'Articole'], ['/#contact', 'Contact']];
  const cta = en ? ['/en/#contact', 'Get in touch'] : ['/cere-oferta/', 'Cere ofertă'];
  return `<header class="top">
  <div class="wrap">
    <a class="brand" href="${en ? '/en/' : '/'}">Bilanz Audit<small>Buchhaltung &amp; Bilanz Audit</small></a>
    <a class="cta m-cta btn" href="${cta[0]}" style="padding:8px 14px;font-size:.85rem">${cta[1]}</a>
    <nav aria-label="${en ? 'Main' : 'Principal'}">
      ${items.map(([h, t]) => `<a href="${h}"${h === current ? ' aria-current="page"' : ''}>${t}</a>`).join('\n      ')}
      <a class="cta" href="${cta[0]}">${cta[1]}</a>
      <a class="lng" href="${en ? '/' : '/en/'}" hreflang="${en ? 'ro' : 'en'}" lang="${en ? 'ro' : 'en'}">${en ? 'RO' : 'EN'}</a>
    </nav>
  </div>
</header>`;
}

function footer(lang, c) {
  const en = lang === 'en';
  const year = new Date().getFullYear();
  return `<footer class="foot">
  <div class="wrap">
    <div class="cols">
      <div>
        <h2>Buchhaltung &amp; Bilanz Audit</h2>
        <ul>
          <li><a href="${MAPS}" target="_blank" rel="noopener">${c.office}</a></li>
          <li><a href="tel:+40744328886">${c.phone}</a> · <a href="https://wa.me/40744328886" target="_blank" rel="noopener">WhatsApp</a></li>
          <li>${c.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join(' · ')}</li>
        </ul>
      </div>
      <div>
        <h2>${en ? 'Services' : 'Servicii'}</h2>
        <ul>
          ${SERVICES.map((s) => `<li><a href="/${s.slug}/">${en ? s.titleEn : s.short}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h2>Legal BBA</h2>
        <ul>
          <li><a href="/legal-bba/">${en ? 'Legal services' : 'Servicii juridice'}</a></li>
          ${NICHE.map((n) => `<li><a href="https://${n.domain}/">${n.domain}</a></li>`).join('\n          ')}
          <li><a href="/articole/">${en ? 'Articles (RO)' : 'Articole'}</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <span>© ${year} ${c.name} SRL · CUI ${c.cui} · ${c.reg}</span>
      <span><a href="${en ? '/en/privacy/' : '/protectia-datelor-cu-caracter-personal/'}">${en ? 'Privacy policy' : 'Protecția datelor'}</a></span>
    </div>
  </div>
</footer>`;
}

function page({ lang = 'ro', path, title, desc, alt, noindex, jsonld, current, body, scripts = '' }, c) {
  return plain(`${head({ lang, path, title, desc, alt, noindex, jsonld })}
<body>
${header(lang, current)}
<main>
${body}
</main>
${footer(lang, c)}
${scripts}
</body>
</html>
`);
}

// ---------- shared JSON-LD ----------
function org(c) {
  return {
    '@type': 'AccountingService', '@id': ORIGIN + '/#firma',
    name: 'Buchhaltung & Bilanz Audit', alternateName: 'Bilanz Audit', url: ORIGIN + '/',
    description: 'Firmă de contabilitate și consultanță fiscală din București: contabilitate financiară și în cloud, salarizare, consultanță fiscală, expertiză contabilă.',
    telephone: '+40744328886', email: c.emails[0], taxID: c.cui, areaServed: 'RO', availableLanguage: ['ro', 'en'],
    address: { '@type': 'PostalAddress', streetAddress: 'Splaiul Unirii nr. 16, et. 1, ap. 108', postalCode: '030139', addressLocality: 'București', addressCountry: 'RO' },
    geo: { '@type': 'GeoCoordinates', latitude: 44.4232208, longitude: 26.1090618 }, hasMap: MAPS,
    subOrganization: NICHE.map((n) => ({ '@type': 'LegalService', url: `https://${n.domain}/` })),
  };
}

// ---------- home ----------
function home(lang, c) {
  const en = lang === 'en';
  const T = en ? {
    title: 'Accounting firm in Bucharest | Buchhaltung & Bilanz Audit',
    desc: 'Accounting, cloud bookkeeping, payroll and tax advice for small and mid-sized companies in Romania. Buchhaltung & Bilanz Audit, Bucharest.',
    kicker: 'Accounting · Forensic · Legal BBA · Bucharest',
    h1: 'Books kept up to date, with the <i>tax</i> side thought through first.',
    lead: 'Buchhaltung & Bilanz Audit handles accounting, payroll and dealings with ANAF, the Romanian tax authority, for small and mid-sized companies, from start-ups to established businesses. We also work in the cloud. When the numbers end up in court, we provide forensic accounting and, through Legal BBA and our partner lawyers, legal advice and representation.',
    cta1: 'Get in touch', cta1h: '#contact', cta2: 'Call 0744.328.886',
    dueK: 'Next tax deadline', dueList: [['D100', 'Taxes withheld and paid'], ['D112', 'Payroll contributions'], ['D300', 'VAT return'], ['D390', 'EU recapitulative statement, if needed']],
    dueNote: 'The general deadline is the 25th of the following month; if it falls on a weekend it moves to the next working day. We track it for you.',
    svcK: 'Services', svcH: 'Everything about your company’s numbers, in one place', svcP: 'Detailed service pages are in Romanian.',
    more: 'Details (RO) →',
    other: '<b>Also:</b> accounting and tax support in mergers and acquisitions · environmental and waste reporting, through licensed partners · legal services through Legal BBA.',
    cloudK: 'Cloud accounting', cloudH: 'No binders, no trips to the office',
    steps: [['Send your documents', 'Invoices, receipts, bank statements: scanned or photographed.'], ['We book them', 'We process everything and keep your books current, tax included.'], ['See the results', 'Financial reports are available any time, on any device.']],
    cloudBtn: 'How it works (RO)',
    whyK: 'Why us', whyH: 'Why companies work with us',
    why: [['Tax in every entry', 'We don’t stop at booking documents. We look at the tax effect of each transaction, so problems are prevented rather than fixed after an audit.'], ['Deadlines tracked for you', 'You always know what to pay, where and by when. We remind you in good time, so nothing slips.'], ['A long-term partner', 'Running a business has ups and downs. We advise you through the hard moments and help you use the opportunities.'], ['A quote that fits', 'Pricing starts from your real volume: documents per month, employees and the services you need.'], ['Recognised expertise', 'Our chartered accountants have at least 8 years of training and experience and also specialise in tax, labour law, commercial law and financial management.'], ['Lower financial risk', 'Accounting does not tolerate approximations: one mistake can mean extra costs or fines. Our accountants are insured and stand behind the accuracy of your books.']],
    legalK: 'Legal BBA', legalH: 'When the numbers end up in court', legalP: 'Legal advice and representation are provided by law firms under signed partnership agreements, insolvency work together with an insolvency practitioner and enforcement through a court bailiff. We bring the forensic accounting. Three dedicated services:',
    artK: 'From our practice', artBy: `${ARTICLE.author}, ${'chartered accountant, CECCAR member'} · in Romanian`,
    artTitle: 'What does a credit note have to do with tax evasion?', artP: 'A credit note looks like a simple accounting correction. Not booking it, or issuing a fictitious one, can amount to tax evasion under Romanian law.',
    read: 'Read (RO) →',
    conK: 'Contact', conH: 'Let’s talk about your company',
    firm: 'Firm', addr: 'Address', tel: 'Phone / WhatsApp',
    quote: 'Need a price? Use our <a href="/cere-oferta/">quote form</a> (in Romanian) or simply describe your company below.',
    fName: 'Name', fPhone: 'Phone', fMsg: 'Message', fPh: 'E.g. limited company, VAT-registered, 3 employees, about 60 documents a month.', fAgree: 'I agree to my data being processed under the <a href="/en/privacy/">privacy policy</a>.', fSend: 'Send',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    left: ['today', 'tomorrow', 'in {n} days'],
  } : {
    title: 'Firmă de contabilitate București | Buchhaltung & Bilanz Audit',
    desc: 'Contabilitate financiară și în cloud, salarizare, consultanță fiscală și expertiză contabilă pentru firme mici și mijlocii. Buchhaltung & Bilanz Audit, București.',
    kicker: 'Contabilitate · Expertiză · Legal BBA · București',
    h1: 'Contabilitate ținută la zi, cu <i>fiscalitatea</i> gândită dinainte.',
    lead: 'Buchhaltung & Bilanz Audit ține contabilitatea, salarizarea și relația cu ANAF pentru firme mici și mijlocii, de la start-up-uri la afaceri consolidate. Lucrăm și în cloud. Când cifrele ajung în instanță, oferim expertiză contabilă și, prin Legal BBA și avocații partenerilor noștri, consultanță juridică și reprezentare.',
    cta1: 'Cere o ofertă', cta1h: '/cere-oferta/', cta2: 'Sună: 0744.328.886',
    dueK: 'Următorul termen fiscal', dueList: [['D100', 'Impozite reținute și plata lor'], ['D112', 'Contribuții salariale'], ['D300', 'Decontul de TVA'], ['D390', 'Declarația recapitulativă, dacă e cazul']],
    dueNote: 'Termenul general este 25 ale lunii următoare. Dacă pică în weekend, se mută în prima zi lucrătoare. Noi îl urmărim pentru dumneavoastră.',
    svcK: 'Servicii', svcH: 'Tot ce ține de cifrele firmei, într-un singur loc', svcP: 'De la prima factură până la situațiile financiare anuale, cu salarizarea și relația cu ANAF incluse.',
    more: 'Detalii →',
    other: '<b>Alte servicii:</b> asistență contabilă și fiscală în fuziuni și achiziții · raportări de mediu și evidența deșeurilor, prin colaboratori autorizați · servicii juridice prin <a href="/legal-bba/">Legal BBA</a>.',
    cloudK: 'Contabilitate în cloud', cloudH: 'Fără dosare, fără drumuri la birou',
    steps: SERVICES[1].steps,
    cloudBtn: 'Cum funcționează',
    whyK: 'De ce noi', whyH: 'De ce să lucrați cu noi',
    why: [['Fiscalitatea în fiecare înregistrare', 'Nu ne oprim la înregistrarea documentelor. Ne uităm la efectul fiscal al fiecărei operațiuni, ca problemele să fie prevenite, nu corectate după un control.'], ['Termene urmărite pentru dumneavoastră', 'Știți mereu ce aveți de plătit, unde și până când. Vă anunțăm din timp, ca să nu pierdeți nimic din vedere.'], ['Un partener pe termen lung', 'Viața de antreprenor are suișuri și coborâșuri. Vă consiliem în momentele dificile și vă ajutăm să folosiți oportunitățile.'], ['O ofertă pe măsura firmei', 'Prețul pornește de la volumul real: numărul de documente pe lună, angajații și serviciile de care aveți nevoie.'], ['Expertiză recunoscută', 'Contabilii noștri autorizați au cel puțin 8 ani de pregătire și experiență și sunt specializați și în fiscalitate, drept social, drept comercial și management financiar.'], ['Riscuri financiare minime', 'Contabilitatea nu tolerează aproximările: o singură eroare poate aduce costuri suplimentare sau amenzi. Contabilii noștri sunt asigurați și garantează acuratețea evidenței dumneavoastră.']],
    legalK: 'Legal BBA', legalH: 'Când cifrele ajung în instanță', legalP: 'Consultanța juridică și reprezentarea sunt asigurate de case de avocatură cu care avem parteneriate semnate, procedurile de insolvență împreună cu un practician în insolvență, iar executările silite prin BEJ Petre Cristian. Noi aducem expertiza contabilă. Avem trei servicii dedicate:',
    artK: 'Din practica noastră', artBy: `${ARTICLES[0].author}, ${ARTICLES[0].role} · ${ARTICLES[0].dateRo}`,
    artTitle: ARTICLES[0].title, artP: ARTICLES[0].desc,
    read: 'Citește articolul →',
    conK: 'Contact', conH: 'Vorbim despre firma dumneavoastră',
    firm: 'Firma', addr: 'Adresa', tel: 'Telefon / WhatsApp',
    quote: 'Aveți nevoie de un preț? Completați <a href="/cere-oferta/">cererea de ofertă</a>, cu câteva date despre firmă.',
    fName: 'Nume', fPhone: 'Telefon', fMsg: 'Mesaj', fPh: 'Ex.: SRL plătitor de TVA, 3 angajați, cam 60 de documente pe lună.', fAgree: 'Sunt de acord cu prelucrarea datelor conform <a href="/protectia-datelor-cu-caracter-personal/">politicii de protecție a datelor</a>.', fSend: 'Trimite',
    days: ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
    months: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
    left: ['astăzi', 'mâine', 'peste {n} zile'],
  };

  const body = `<div class="wrap">
  <section class="hero">
    <div>
      <p class="kicker">${T.kicker}</p>
      <h1>${T.h1}</h1>
      <p class="lead">${T.lead}</p>
      <div class="btns"><a class="btn" href="${T.cta1h}">${T.cta1}</a><a class="btn ghost" href="tel:+40744328886">${T.cta2}</a></div>
    </div>
    <div class="due" aria-live="polite">
      <p class="k">${T.dueK}</p>
      <p class="date" id="due-date">25</p>
      <span class="left" id="due-left" hidden></span>
      <ul>${T.dueList.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
      <p>${T.dueNote}</p>
    </div>
  </section>
</div>

<section class="block" id="servicii">
  <div class="wrap">
    <div class="sec-title"><p class="kicker">${T.svcK}</p><h2>${T.svcH}</h2><p>${T.svcP}</p></div>
    <div class="grid">
      ${SERVICES.map((s) => `<a class="card" href="/${s.slug}/"><h3>${en ? s.titleEn : s.short}</h3><p>${en ? s.cardEn : s.card}</p><span class="more">${T.more}</span></a>`).join('\n      ')}
    </div>
    <p class="other" id="alte-servicii">${T.other}</p>
  </div>
</section>

<section class="block" id="cloud">
  <div class="wrap">
    <div class="band">
      <div style="display:grid;gap:10px"><p class="kicker">${T.cloudK}</p><h2>${T.cloudH}</h2></div>
      <div class="steps">${T.steps.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
      <a class="btn" href="/contabilitate-in-cloud/">${T.cloudBtn}</a>
    </div>
  </div>
</section>

<section class="block" id="de-ce-noi">
  <div class="wrap">
    <div class="sec-title"><p class="kicker">${T.whyK}</p><h2>${T.whyH}</h2></div>
    <div class="why">${T.why.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div>
</section>

<section class="block niche" id="legal">
  <div class="wrap">
    <div class="sec-title"><p class="kicker">${T.legalK}</p><h2>${T.legalH}</h2><p>${T.legalP}</p></div>
    <div class="grid">
      ${NICHE.map((n) => `<a class="card" href="https://${n.domain}/${en ? 'en/' : ''}"><span class="dom">${n.domain}</span><p>${en ? n.en : n.ro}</p><span class="more">${n.domain} ↗</span></a>`).join('\n      ')}
    </div>
    <p class="other">${en ? '<a href="/legal-bba/">Legal BBA and our partners (RO) →</a>' : '<a href="/legal-bba/">Legal BBA: consultanță juridică, insolvență și executare silită, prin partenerii noștri →</a> · <a href="/articole/">Toate articolele</a>'}</p>
  </div>
</section>

<section class="block" id="articole">
  <div class="wrap">
    <a class="article-teaser" href="/articole/${en ? ARTICLE.slug : ARTICLES[0].slug}/">
      <div><p class="kicker">${T.artK}</p><h3>${T.artTitle}</h3><p>${T.artP}</p><p class="by">${T.artBy}</p></div>
      <span class="btn">${T.read}</span>
    </a>
  </div>
</section>

<section class="block" id="contact">
  <div class="wrap contact">
    <div>
      <p class="kicker">${T.conK}</p>
      <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem);margin-top:10px">${T.conH}</h2>
      <ul>
        <li><span class="k">${T.firm}</span><span class="v">${c.name} SRL · CUI ${c.cui} · ${c.reg}</span></li>
        <li><span class="k">${T.addr}</span><span class="v"><a href="${MAPS}" target="_blank" rel="noopener">${c.office}</a></span></li>
        <li><span class="k">${T.tel}</span><span class="v"><a href="tel:+40744328886">${c.phone}</a> · <a href="https://wa.me/40744328886" target="_blank" rel="noopener">WhatsApp</a></span></li>
        <li><span class="k">Email</span><span class="v">${c.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join(' · ')}</span></li>
      </ul>
      <p class="aside-note">${T.quote}</p>
    </div>
    ${contactForm(T)}
  </div>
</section>`;

  const script = `<script>
(function(){
  var D=${JSON.stringify(T.days)},M=${JSON.stringify(T.months)},L=${JSON.stringify(T.left)};
  var now=new Date(),t=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  function due(y,m){var d=new Date(y,m,25);while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1);return d}
  var d=due(t.getFullYear(),t.getMonth());if(d<t)d=due(t.getFullYear(),t.getMonth()+1);
  var n=Math.round((d-t)/864e5);
  document.getElementById('due-date').textContent=${en ? "D[d.getDay()]+', '+d.getDate()+' '+M[d.getMonth()]" : "D[d.getDay()]+', '+d.getDate()+' '+M[d.getMonth()]"};
  var l=document.getElementById('due-left');l.textContent=n===0?L[0]:n===1?L[1]:L[2].replace('{n}',n);l.hidden=false;
})();
</script>
<script src="/assets/form.js" defer></script>`;

  return page({
    lang, path: en ? '/en/' : '/', title: T.title, desc: T.desc, alt: { ro: '/', en: '/en/' },
    jsonld: { '@context': 'https://schema.org', ...org(c) }, current: null, body, scripts: script,
  }, c);
}

function contactForm(T) {
  return `<form id="f" novalidate>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <label for="f-name">${T.fName}<input id="f-name" required autocomplete="name"></label>
      <div class="row2">
        <label for="f-email">Email<input id="f-email" type="email" required autocomplete="email"></label>
        <label for="f-phone">${T.fPhone}<input id="f-phone" type="tel" autocomplete="tel"></label>
      </div>
      <label for="f-msg">${T.fMsg}<textarea id="f-msg" required placeholder="${esc(T.fPh)}"></textarea></label>
      <label class="check" for="f-gdpr"><input id="f-gdpr" type="checkbox" required><span>${T.fAgree}</span></label>
      <button class="submit" type="submit">${T.fSend}</button>
      <p class="status" id="f-status" role="status" hidden></p>
    </form>`;
}

// ---------- inner pages ----------
function sidebar(currentSlug) {
  return `<aside class="side">
    <div class="box">
      <h2>Cereți o ofertă</h2>
      <p>Spuneți-ne câteva lucruri despre firmă și vă trimitem un preț pe măsura volumului real.</p>
      <a class="btn" href="/cere-oferta/">Cere ofertă</a>
      <p>sau sunați la</p>
      <a class="tel" href="tel:+40744328886">0744.328.886</a>
    </div>
    <nav aria-label="Servicii">
      <b>Servicii</b>
      ${SERVICES.map((s) => `<a href="/${s.slug}/"${s.slug === currentSlug ? ' aria-current="page"' : ''}>${s.short}</a>`).join('\n      ')}
      <a href="/legal-bba/"${currentSlug === 'legal-bba' ? ' aria-current="page"' : ''}>Legal BBA</a>
    </nav>
  </aside>`;
}

function servicePage(s, c) {
  const steps = s.steps ? `<div class="steps-light">${s.steps.map(([h, p], i) => `<div><b>0${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>` : '';
  const intro = s.intro ? `<p class="note" style="margin:0 0 8px">${s.intro}</p>` : '';
  const partners = s.slug === 'legal-bba' ? `<h2>Partenerii noștri</h2>
      <div class="grid niche" style="grid-template-columns:1fr">${PARTNERS.map((p) => `<${p.href ? `a href="${p.href}" target="_blank" rel="noopener"` : 'div'} class="card"><span class="kicker">${p.who}</span><span class="dom">${p.name}</span><p>${p.text}</p></${p.href ? 'a' : 'div'}>`).join('')}</div>` : '';
  const niche = s.slug === 'legal-bba' ? `<h2>Servicii dedicate</h2>
      <div class="grid niche" style="grid-template-columns:1fr">${NICHE.map((n) => `<a class="card" href="https://${n.domain}/"><span class="dom">${n.domain}</span><p>${n.ro}</p></a>`).join('')}</div>` : '';
  const body = `<div class="wrap">
  <p class="crumbs"><a href="/">Acasă</a> / ${s.slug === 'legal-bba' ? 'Legal BBA' : `<a href="/#servicii">Servicii</a> / ${s.short}`}</p>
  <div class="page-head">
    <p class="kicker">${s.slug === 'legal-bba' ? 'Legal BBA' : 'Servicii'}</p>
    <h1>${s.title}</h1>
    <p class="lead">${s.lead}</p>
  </div>
  <div class="layout">
    <div class="content">
      ${intro}
      ${steps}
      ${s.sections.map(([h, items]) => `<h2>${h}</h2>\n      <ul class="ticks">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('\n      ')}
      ${partners}
      ${niche}
      ${s.note ? `<p class="note">${s.note}</p>` : ''}
    </div>
    ${sidebar(s.slug)}
  </div>
</div>`;
  const path = `/${s.slug}/`;
  return page({
    path, title: `${s.seo} | Bilanz Audit`, desc: s.desc, current: s.slug === 'legal-bba' ? '/legal-bba/' : s.slug === 'contabilitate-in-cloud' ? '/contabilitate-in-cloud/' : null,
    jsonld: {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Service', name: s.title, description: s.desc, url: ORIGIN + path, areaServed: 'RO', provider: { '@id': ORIGIN + '/#firma' } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Acasă', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: s.short, item: ORIGIN + path }] },
      ],
    },
    body,
  }, c);
}

function articlePage(a, c) {
  const path = `/articole/${a.slug}/`;
  const body = `<div class="wrap">
  <p class="crumbs"><a href="/">Acasă</a> / <a href="/articole/">Articole</a></p>
  <div class="page-head">
    <p class="kicker">${a.kicker} · ${a.dateRo}</p>
    <h1>${a.title}</h1>
  </div>
  <article class="prose">
    ${a.body}
    <div class="author"><b>${a.author}</b><span>${a.role} · Buchhaltung &amp; Bilanz Audit</span><span>${c.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join(' · ')} · <a href="tel:+40744328886">${c.phone}</a></span></div>
    <p class="note" style="margin-top:32px">${a.note}</p>
  </article>
</div>`;
  return page({
    path, title: `${a.title} | Bilanz Audit`, desc: a.desc, current: '/articole/',
    jsonld: { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.desc, datePublished: a.date, inLanguage: 'ro', mainEntityOfPage: ORIGIN + path, author: { '@type': 'Person', name: a.author, jobTitle: a.role }, publisher: { '@id': ORIGIN + '/#firma', '@type': 'Organization', name: 'Buchhaltung & Bilanz Audit' } },
    body,
  }, c);
}

function articlesIndex(c) {
  const body = `<div class="wrap">
  <p class="crumbs"><a href="/">Acasă</a> / Articole</p>
  <div class="page-head">
    <p class="kicker">Articole</p>
    <h1>Din practica noastră</h1>
    <p class="lead">Situații reale din contabilitate, fiscalitate, insolvență și litigii, explicate de echipa Bilanz Audit.</p>
  </div>
  <div style="padding-bottom:80px;display:grid;gap:18px">
    ${ARTICLES.map((a) => `<a class="article-teaser" href="/articole/${a.slug}/">
      <div><p class="kicker">${a.kicker} · ${a.dateRo}</p><h3>${a.title}</h3><p>${a.desc}</p><p class="by">${a.author}, ${a.role}</p></div>
      <span class="btn">Citește →</span>
    </a>`).join('')}
  </div>
</div>`;
  return page({ path: '/articole/', title: 'Articole despre contabilitate, fiscalitate și insolvență | Bilanz Audit', desc: 'Articole despre contabilitate, fiscalitate, insolvență și atragerea răspunderii, scrise de experții contabili Buchhaltung & Bilanz Audit.', current: '/articole/', body }, c);
}

function offerPage(c) {
  const services = ['Contabilitate', 'Contabilitate în cloud', 'Resurse umane și salarizare', 'Consultanță fiscală', 'Consultanță financiară', 'Consultanță juridică', 'Expertiză contabilă', 'Refacere contabilitate', 'Înființare firmă / sediu'];
  const chips = (name, opts, type = 'radio', checked) => `<div class="chips">${opts.map((o, i) => `<label><input type="${type}" name="${name}" data-x="${name}" value="${o}"${checked === i ? ' checked' : ''}>${o}</label>`).join('')}</div>`;
  const body = `<div class="wrap">
  <p class="crumbs"><a href="/">Acasă</a> / Cere ofertă</p>
  <div class="page-head">
    <p class="kicker">Ofertă</p>
    <h1>Cerere de ofertă pentru servicii contabile</h1>
    <p class="lead">Cu cât știm mai multe despre firmă, cu atât oferta e mai exactă. Doar persoana de contact și emailul sunt obligatorii. Răspundem de regulă într-o zi lucrătoare.</p>
  </div>
  <div class="layout">
    <form id="f" novalidate>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <h2>Despre firmă</h2>
      <div class="row2">
        <label for="o-company">Denumirea firmei<input id="o-company" data-x="company" autocomplete="organization"></label>
        <label for="o-cui">CUI<input id="o-cui" data-x="cui" inputmode="numeric"></label>
      </div>
      <label for="o-address">Adresa sediului<input id="o-address" data-x="address" autocomplete="street-address"></label>
      <fieldset><legend>Servicii dorite (puteți alege mai multe)</legend>${chips('services', services, 'checkbox')}</fieldset>
      <fieldset><legend>Plătitor de TVA</legend>${chips('vat', ['Nu', 'Lunar', 'Trimestrial'])}</fieldset>
      <fieldset><legend>Plătitor de impozit</legend>${chips('profitTax', ['Lunar', 'Trimestrial'])}</fieldset>
      <fieldset><legend>Reprezentare în relația cu ANAF și alte instituții</legend>${chips('anaf', ['Da', 'Nu'])}</fieldset>
      <div class="row2">
        <label for="o-emp">Număr de angajați<input id="o-emp" data-x="employees" type="number" min="0" inputmode="numeric"></label>
        <label for="o-docs">Documente pe lună (aprox.)<input id="o-docs" data-x="docs" type="number" min="0" inputmode="numeric"></label>
      </div>
      <h2 style="margin-top:12px">Persoana de contact</h2>
      <label for="f-name">Nume<input id="f-name" required autocomplete="name"></label>
      <div class="row2">
        <label for="f-email">Email<input id="f-email" type="email" required autocomplete="email"></label>
        <label for="f-phone">Telefon<input id="f-phone" type="tel" autocomplete="tel"></label>
      </div>
      <label for="f-msg">Alte informații<textarea id="f-msg" placeholder="Activitatea firmei, programul de contabilitate folosit acum, de când doriți să începem."></textarea></label>
      <label class="check" for="f-gdpr"><input id="f-gdpr" type="checkbox" required><span>Sunt de acord cu prelucrarea datelor conform <a href="/protectia-datelor-cu-caracter-personal/">politicii de protecție a datelor</a>.</span></label>
      <button class="submit" type="submit">Trimite cererea</button>
      <p class="status" id="f-status" role="status" hidden></p>
    </form>
    <aside class="side">
      <div class="box">
        <h2>Preferați telefonul?</h2>
        <p>Sunați-ne sau scrieți-ne pe WhatsApp.</p>
        <a class="tel" href="tel:+40744328886">0744.328.886</a>
        <a class="btn" href="https://wa.me/40744328886" target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <nav aria-label="Servicii"><b>Servicii</b>${SERVICES.map((s) => `<a href="/${s.slug}/">${s.short}</a>`).join('')}</nav>
    </aside>
  </div>
</div>`;
  return page({ path: '/cere-oferta/', title: 'Cere ofertă pentru servicii contabile | Bilanz Audit', desc: 'Cerere de ofertă pentru contabilitate, salarizare și consultanță fiscală. Completați câteva date despre firmă și primiți un preț pe măsura volumului real.', current: null, body, scripts: '<script src="/assets/form.js" defer></script>' }, c);
}

function privacyPage(lang, c, today, privacyBody) {
  const en = lang === 'en';
  const others = NICHE.map((n) => n.domain).join(', ');
  const opts = {
    intro: `<p>Protecția datelor dumneavoastră cu caracter personal este importantă pentru noi. Această pagină explică ce date prelucrăm prin bilanzaudit.ro, de ce și ce drepturi aveți, în conformitate cu Regulamentul (UE) 2016/679 (GDPR). Aceeași politică se aplică și site-urilor ${others}, care aparțin ${c.name}.</p>`,
    introEn: `<p>We take the protection of your personal data seriously. This page explains what data we process through bilanzaudit.ro, why, and what rights you have under Regulation (EU) 2016/679 (GDPR). The same policy covers ${others}, which also belong to ${c.name}.</p>`,
    formItem: '<strong>Datele din formularele de contact și de ofertă</strong>, pe care ni le transmiteți voluntar: nume, email, telefon (opțional), mesajul și, în cererea de ofertă, date despre firmă (denumire, CUI, sediu, servicii dorite, regim de TVA și de impozitare, număr de angajați, volum de documente).',
    formItemEn: '<strong>Contact and quote form data</strong> you choose to send: name, email, phone (optional), your message and, in the quote form, company details (name, tax ID, address, services needed, VAT and tax regime, headcount, document volume).',
  };
  const path = en ? '/en/privacy/' : '/protectia-datelor-cu-caracter-personal/';
  const body = `<div class="wrap"><article class="prose" style="padding-top:40px">
${privacyBody('bilanzaudit.ro', lang, c, today, opts)}
</article></div>`;
  return page({
    lang, path, alt: { ro: '/protectia-datelor-cu-caracter-personal/', en: '/en/privacy/' },
    title: en ? 'Privacy policy | Bilanz Audit' : 'Protecția datelor cu caracter personal | Bilanz Audit',
    desc: en ? `How ${c.name} processes personal data.` : `Cum prelucrează ${c.name} datele cu caracter personal.`,
    body,
  }, c);
}

function notFound(c) {
  const body = `<div class="wrap"><div class="page-head" style="padding-block:72px 96px">
    <p class="kicker">404</p>
    <h1>Pagina nu există</h1>
    <p class="lead">Adresa accesată nu există sau a fost mutată când am reorganizat site-ul. <a href="/" style="color:var(--accent)">Mergeți la pagina principală</a> sau alegeți un serviciu de mai jos.</p>
    <p class="lead" lang="en" style="margin-top:10px">This page does not exist. <a href="/en/" style="color:var(--accent)">Go to the English home page</a>.</p>
    <div class="btns">${SERVICES.map((s) => `<a class="btn ghost" href="/${s.slug}/">${s.short}</a>`).join('')}</div>
  </div></div>`;
  return page({ path: '/404.html', title: 'Pagina nu există | Bilanz Audit', desc: 'Pagina nu a fost găsită.', noindex: true, body }, c);
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${THEME}"/><text x="32" y="45" font-family="Georgia,serif" font-size="38" font-weight="700" text-anchor="middle" fill="#F2B27E">B</text></svg>\n`;
}

function sitemap(today) {
  const url = (loc, alt) => `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${today}</lastmod>${alt ? `
    <xhtml:link rel="alternate" hreflang="ro" href="${ORIGIN}${alt.ro}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${alt.en}"/>` : ''}
  </url>`;
  const home = { ro: '/', en: '/en/' }, priv = { ro: '/protectia-datelor-cu-caracter-personal/', en: '/en/privacy/' };
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[url('/', home), url('/en/', home),
    ...SERVICES.map((s) => url(`/${s.slug}/`)), url('/legal-bba/'), url('/cere-oferta/'),
    url('/articole/'), ...ARTICLES.map((a) => url(`/articole/${a.slug}/`)),
    url(priv.ro, priv), url(priv.en, priv)].join('\n')}
</urlset>
`;
}

export function bilanzFiles({ company: c, today, privacyBody }) {
  const files = {
    'index.html': home('ro', c),
    'en/index.html': home('en', c),
    'legal-bba/index.html': servicePage(LEGAL, c),
    'articole/index.html': articlesIndex(c),
    'cere-oferta/index.html': offerPage(c),
    'protectia-datelor-cu-caracter-personal/index.html': privacyPage('ro', c, today, privacyBody),
    'en/privacy/index.html': privacyPage('en', c, today, privacyBody),
    '404.html': notFound(c),
    'favicon.svg': favicon(),
    'sitemap.xml': sitemap(today),
  };
  for (const s of SERVICES) files[`${s.slug}/index.html`] = servicePage(s, c);
  for (const a of ARTICLES) files[`articole/${a.slug}/index.html`] = articlePage(a, c);
  return files;
}
