// Short topic pages, one entry per page and language.
// slug: URL path segment (RO pages live at /<slug>/, EN pages at /en/<slug>/).
// sections: [heading, paragraph] pairs. Visible text keeps diacritics; the build strips them from meta tags.
export const TOPICS = {
  'litigiimunca.ro': [
    {
      ro: {
        slug: 'contestare-concediere', nav: 'Contestarea concedierii',
        title: 'Contestarea deciziei de concediere: termen 45 de zile',
        desc: 'Cum contești decizia de concediere: termen de 45 de zile, ce verifică instanța și ce poți obține. Analiză pe documente, București.',
        h1: 'Contestarea deciziei de concediere',
        lead: 'Ai 45 de zile calendaristice de la comunicarea deciziei ca să o contești la tribunal (art. 268 alin. 1 lit. a Codul muncii).',
        sections: [
          ['Ce verificăm în decizie', 'Motivarea în fapt și în drept, respectarea preavizului, procedura urmată și termenele în care angajatorul putea emite decizia. Sarcina probei aparține angajatorului (art. 272 Codul muncii).'],
          ['Ce poți obține', 'Anularea deciziei, despăgubiri egale cu salariile indexate și majorate de care ai fi beneficiat și, la cerere, reintegrarea pe post (art. 80 Codul muncii).'],
          ['Cât costă procesul', 'Litigiile de muncă sunt scutite de taxa judiciară de timbru (art. 270 Codul muncii). Cererea se depune la tribunalul de la domiciliul sau locul tău de muncă.'],
        ],
      },
      en: {
        slug: 'challenging-dismissal', nav: 'Challenging a dismissal',
        title: 'Challenging a dismissal in Romania: the 45-day deadline',
        desc: 'How to challenge a dismissal decision in Romania: 45-day deadline, what the court reviews and what you can obtain.',
        h1: 'Challenging a dismissal decision',
        lead: 'You have 45 calendar days from receiving the decision to challenge it before the tribunal (art. 268 (1) a, Labour Code).',
        sections: [
          ['What we check in the decision', 'The factual and legal reasons, the notice period, the procedure followed and the time limits the employer had to respect. The burden of proof lies with the employer (art. 272, Labour Code).'],
          ['What you can obtain', 'Annulment of the decision, compensation equal to the indexed and increased pay you would have received and, on request, reinstatement (art. 80, Labour Code).'],
          ['What it costs', 'Employment disputes are exempt from court stamp duty (art. 270, Labour Code). The claim is filed with the tribunal where you live or work.'],
        ],
      },
    },
    {
      ro: {
        slug: 'sanctiuni-disciplinare', nav: 'Sancțiuni disciplinare',
        title: 'Contestarea sanctiunii disciplinare: termen 30 de zile',
        desc: 'Sancțiune disciplinară: termen de contestare de 30 de zile, cercetarea prealabilă și termenele pe care trebuie să le respecte angajatorul.',
        h1: 'Contestarea sancțiunii disciplinare',
        lead: 'Decizia de sancționare se contestă în 30 de zile calendaristice de la comunicare (art. 252 alin. 5 Codul muncii).',
        sections: [
          ['Cercetarea disciplinară prealabilă', 'Cu excepția avertismentului scris, nicio sancțiune nu poate fi dispusă fără cercetare disciplinară prealabilă: convocare scrisă, ascultarea salariatului și dreptul la apărare (art. 251 Codul muncii).'],
          ['Termenele angajatorului', 'Decizia trebuie emisă în 30 de zile de la data la care angajatorul a luat cunoștință de abatere și nu mai târziu de 6 luni de la săvârșirea ei (art. 252 alin. 1 Codul muncii).'],
          ['Pentru angajatori', 'Pregătim convocarea, procesul-verbal și decizia motivată astfel încât sancțiunea să reziste unei contestații.'],
        ],
      },
      en: {
        slug: 'disciplinary-sanctions', nav: 'Disciplinary sanctions',
        title: 'Challenging a disciplinary sanction in Romania: 30 days',
        desc: 'Disciplinary sanctions in Romania: 30-day deadline to challenge, the prior investigation and the time limits the employer must respect.',
        h1: 'Challenging a disciplinary sanction',
        lead: 'A sanction decision can be challenged within 30 calendar days of being communicated (art. 252 (5), Labour Code).',
        sections: [
          ['The prior disciplinary investigation', 'Except for a written warning, no sanction can be applied without a prior investigation: written notice, hearing the employee and the right to a defence (art. 251, Labour Code).'],
          ['The employer\'s time limits', 'The decision must be issued within 30 days of the employer learning of the misconduct and no later than 6 months after it took place (art. 252 (1), Labour Code).'],
          ['For employers', 'We prepare the notice, the minutes and the reasoned decision so that the sanction holds up if challenged.'],
        ],
      },
    },
    {
      ro: {
        slug: 'ore-suplimentare-neplatite', nav: 'Ore suplimentare neplătite',
        title: 'Ore suplimentare neplatite: calcul si recuperare pe 3 ani',
        desc: 'Recuperarea orelor suplimentare neplătite: termen de 3 ani, expertiză contabilă pe pontaje, state de plată și Revisal.',
        h1: 'Ore suplimentare neplătite',
        lead: 'Drepturile salariale neacordate pot fi cerute în 3 ani de la data la care erau datorate (art. 268 alin. 1 lit. c Codul muncii).',
        sections: [
          ['Cum se compensează munca suplimentară', 'Orele suplimentare se compensează cu ore libere plătite în următoarele 90 de zile. Dacă acest lucru nu este posibil, se plătesc cu un spor de cel puțin 75% din salariul de bază (art. 122–123 Codul muncii).'],
          ['Cum dovedim suma', 'Calculăm diferențele din pontaje, state de plată, fluturași și Revisal. Angajatorul trebuie să țină evidența orelor lucrate și să o prezinte instanței.'],
          ['Ce mai poți cere', 'Sporuri, concediu neefectuat, bonusuri restante și dobânda legală pentru întârziere.'],
        ],
      },
      en: {
        slug: 'unpaid-overtime', nav: 'Unpaid overtime',
        title: 'Unpaid overtime in Romania: calculation and 3-year claims',
        desc: 'Recovering unpaid overtime in Romania: 3-year time limit, accounting analysis of timesheets, payslips and Revisal.',
        h1: 'Unpaid overtime',
        lead: 'Unpaid wage entitlements can be claimed within 3 years of the date they fell due (art. 268 (1) c, Labour Code).',
        sections: [
          ['How overtime is compensated', 'Overtime is compensated with paid time off within the next 90 days. Where that is not possible, it is paid with a premium of at least 75% of base salary (arts. 122–123, Labour Code).'],
          ['How we prove the amount', 'We calculate the differences from timesheets, payroll records, payslips and Revisal. The employer must keep records of hours worked and produce them in court.'],
          ['What else you can claim', 'Allowances, unused leave, outstanding bonuses and statutory interest for late payment.'],
        ],
      },
    },
    {
      ro: {
        slug: 'termene-contestatie', nav: 'Termene de contestare',
        title: 'Termene de contestare in litigiile de munca: 45 zile, 30 zile, 3 ani',
        desc: 'Termenele din Codul muncii: 45 de zile pentru concediere, 30 de zile pentru sancțiuni, 3 ani pentru salarii. Calculator de termen.',
        h1: 'Termene de contestare în litigiile de muncă',
        lead: 'Termenul curge de la data la care ți-a fost comunicată decizia. Un termen pierdut duce de regulă la respingerea cererii.',
        sections: [
          ['45 de zile: concedierea', 'Decizia de concediere și celelalte decizii privind încheierea, executarea, modificarea, suspendarea sau încetarea contractului (art. 268 alin. 1 lit. a Codul muncii).'],
          ['30 de zile: sancțiunea disciplinară', 'Decizia de sancționare disciplinară se contestă în 30 de zile calendaristice de la comunicare (art. 252 alin. 5 Codul muncii).'],
          ['3 ani: salarii și alte drepturi bănești', 'Drepturile salariale neacordate și despăgubirile se pot cere în 3 ani de la nașterea dreptului (art. 268 alin. 1 lit. c Codul muncii).'],
        ],
        cta: ['/#termen', 'Deschide calculatorul de termen'],
      },
      en: {
        slug: 'deadlines', nav: 'Deadlines',
        title: 'Deadlines in Romanian employment disputes: 45 days, 30 days, 3 years',
        desc: 'Labour Code deadlines in Romania: 45 days for dismissal, 30 days for sanctions, 3 years for wages. Deadline calculator.',
        h1: 'Deadlines in employment disputes',
        lead: 'The deadline runs from the date the decision was communicated to you. A missed deadline usually means the claim is dismissed.',
        sections: [
          ['45 days: dismissal', 'The dismissal decision and other decisions on concluding, performing, amending, suspending or ending the contract (art. 268 (1) a, Labour Code).'],
          ['30 days: disciplinary sanction', 'A disciplinary sanction decision can be challenged within 30 calendar days of being communicated (art. 252 (5), Labour Code).'],
          ['3 years: wages and other money claims', 'Unpaid wage entitlements and compensation can be claimed within 3 years of the right arising (art. 268 (1) c, Labour Code).'],
        ],
        cta: ['/en/#termen', 'Open the deadline calculator'],
      },
    },
  ],

  'infractiunifiscale.ro': [
    {
      ro: {
        slug: 'contestare-decizie-impunere', nav: 'Contestarea deciziei de impunere',
        title: 'Contestarea deciziei de impunere ANAF: termen 45 de zile',
        desc: 'Contestația împotriva deciziei de impunere: termen de 45 de zile, unde se depune și ce urmează în contencios administrativ.',
        h1: 'Contestarea deciziei de impunere',
        lead: 'Contestația se depune în 45 de zile de la comunicarea deciziei (art. 270 Cod procedură fiscală).',
        sections: [
          ['Ce verificăm', 'Baza de impozitare, deductibilitatea cheltuielilor, TVA-ul și accesoriile stabilite prin raportul de inspecție fiscală, pe documentele sursă.'],
          ['Pașii procedurii', 'Contestație administrativă la organul fiscal, apoi acțiune în contencios administrativ împotriva deciziei de soluționare.'],
          ['De ce contează termenul', 'Depășirea celor 45 de zile duce de regulă la respingerea contestației fără analiza fondului.'],
        ],
      },
      en: {
        slug: 'tax-assessment-appeal', nav: 'Appealing a tax assessment',
        title: 'Appealing an ANAF tax assessment in Romania: 45-day deadline',
        desc: 'Appealing a Romanian tax assessment decision: 45-day deadline, where to file and what follows before the administrative court.',
        h1: 'Appealing a tax assessment decision',
        lead: 'The appeal must be filed within 45 days of receiving the decision (art. 270, Fiscal Procedure Code).',
        sections: [
          ['What we check', 'The tax base, deductible expenses, VAT and the interest and penalties set by the tax audit report, against the source documents.'],
          ['The steps', 'An administrative appeal to the tax authority, then an action before the administrative court against the decision on the appeal.'],
          ['Why the deadline matters', 'Missing the 45 days usually means the appeal is dismissed without a review on the merits.'],
        ],
      },
    },
    {
      ro: {
        slug: 'expert-contabil-parte', nav: 'Expert contabil parte',
        title: 'Expert contabil parte in dosarul de evaziune fiscala',
        desc: 'Expert contabil parte în dosarul penal de evaziune fiscală: obiective, obiecțiuni și opinie separată la expertiza contabilă judiciară.',
        h1: 'Expert contabil parte în dosarul penal',
        lead: 'Expertul parte este recomandat de dumneavoastră și lucrează alături de expertul numit de procuror sau de instanță.',
        sections: [
          ['Ce face expertul parte', 'Participă la efectuarea expertizei, propune obiective, formulează obiecțiuni și poate redacta o opinie separată.'],
          ['De ce este necesar', 'Fără el, concluziile expertului oficial privind prejudiciul rămân de cele mai multe ori necontestate tehnic.'],
          ['Când intervenim', 'Ideal înainte de dispunerea expertizei, pentru a formula obiectivele. Putem interveni și ulterior, cu obiecțiuni sau cerere de supliment.'],
        ],
      },
      en: {
        slug: 'party-accounting-expert', nav: 'Party-appointed accounting expert',
        title: 'Party-appointed accounting expert in Romanian tax evasion cases',
        desc: 'A party-appointed accounting expert in a Romanian tax evasion file: questions, objections and separate opinion on the forensic report.',
        h1: 'Party-appointed accounting expert',
        lead: 'The party expert is nominated by you and works alongside the expert appointed by the prosecutor or the court.',
        sections: [
          ['What the party expert does', 'Takes part in the examination, proposes questions, raises objections and can write a separate opinion.'],
          ['Why it matters', 'Without one, the official expert\'s conclusions on the loss usually go unchallenged on the technical side.'],
          ['When we step in', 'Ideally before the expert report is ordered, to draft the questions. We can also step in later, with objections or a request for a supplement.'],
        ],
      },
    },
    {
      ro: {
        slug: 'evaziune-fiscala-art-9', nav: 'Evaziunea fiscală (art. 9)',
        title: 'Evaziune fiscala art. 9 Legea 241/2005: fapte si aparare',
        desc: 'Infracțiunea de evaziune fiscală (art. 9 Legea 241/2005): ce fapte intră, ce pedeapsă prevede legea și cum se verifică prejudiciul.',
        h1: 'Evaziunea fiscală: art. 9 din Legea 241/2005',
        lead: 'Art. 9 sancționează, între altele, operațiunile fictive, veniturile neînregistrate și distrugerea documentelor contabile, cu închisoare de la 2 la 8 ani.',
        sections: [
          ['Nu orice diferență de impozit este evaziune', 'Evaziunea presupune intenția de a sustrage sume de la plată. O eroare de interpretare sau de calcul este o problemă fiscală, nu penală.'],
          ['Prejudiciul decide dosarul', 'Încadrarea și pedeapsa depind de suma reținută ca prejudiciu. O verificăm pe documente: bază de impozitare, cheltuieli deductibile, TVA.'],
          ['Ce facem', 'Recalculăm prejudiciul, reconstituim evidențele lipsă și susținem concluziile ca expert contabil parte.'],
        ],
      },
      en: {
        slug: 'tax-evasion-article-9', nav: 'Tax evasion (art. 9)',
        title: 'Tax evasion under art. 9 of Romanian Law 241/2005',
        desc: 'The offence of tax evasion in Romania (art. 9, Law 241/2005): which acts it covers, the penalty and how the loss is tested.',
        h1: 'Tax evasion: art. 9 of Law 241/2005',
        lead: 'Art. 9 punishes, among others, fictitious transactions, unrecorded income and the destruction of accounting records, with 2 to 8 years\' imprisonment.',
        sections: [
          ['Not every tax shortfall is evasion', 'Evasion requires intent to avoid paying. An interpretation or calculation error is a tax matter, not a criminal one.'],
          ['The loss decides the case', 'The charge and the sentence depend on the amount treated as the loss. We test it against the documents: tax base, deductible expenses, VAT.'],
          ['What we do', 'We recalculate the loss, rebuild missing records and support the findings as party-appointed accounting expert.'],
        ],
      },
    },
    {
      ro: {
        slug: 'acoperirea-prejudiciului-art-10', nav: 'Acoperirea prejudiciului (art. 10)',
        title: 'Acoperirea prejudiciului art. 10 Legea 241/2005',
        desc: 'Acoperirea integrală a prejudiciului în dosarul de evaziune fiscală (art. 10 Legea 241/2005): efecte și verificarea sumei.',
        h1: 'Acoperirea prejudiciului: art. 10 din Legea 241/2005',
        lead: 'Acoperirea integrală a prejudiciului, în condițiile art. 10, poate reduce semnificativ limitele pedepsei.',
        sections: [
          ['Mai întâi verificăm suma', 'Înainte de plată verificăm dacă prejudiciul reținut este corect. O sumă calculată greșit înseamnă o plată mai mare decât cea datorată.'],
          ['Momentul plății', 'Efectele depind de etapa procesului în care se face plata. Stabilim împreună cu apărătorul dumneavoastră momentul potrivit.'],
          ['Ce pregătim', 'Calculul prejudiciului și al accesoriilor, documentele de plată și dovada acoperirii pentru dosar.'],
        ],
      },
      en: {
        slug: 'repaying-the-loss-article-10', nav: 'Repaying the loss (art. 10)',
        title: 'Repaying the loss under art. 10 of Romanian Law 241/2005',
        desc: 'Full repayment of the loss in a Romanian tax evasion case (art. 10, Law 241/2005): effects and checking the amount.',
        h1: 'Repaying the loss: art. 10 of Law 241/2005',
        lead: 'Full repayment of the loss under art. 10 can significantly reduce the sentencing range.',
        sections: [
          ['We check the amount first', 'Before paying, we check that the loss claimed is correct. A miscalculated amount means paying more than is due.'],
          ['Timing', 'The effects depend on the stage of the case at which payment is made. We agree the right moment with your defence lawyer.'],
          ['What we prepare', 'The calculation of the loss and of interest and penalties, the payment documents and proof of repayment for the file.'],
        ],
      },
    },
  ],

  'atragerearaspunderii.ro': [
    {
      ro: {
        slug: 'art-169-legea-85-2014', nav: 'Art. 169 Legea 85/2014',
        title: 'Art. 169 Legea 85/2014: atragerea raspunderii administratorului',
        desc: 'Atragerea răspunderii administratorului în insolvență (art. 169 Legea 85/2014): cine o cere, ce trebuie dovedit și cum vă apărați.',
        h1: 'Art. 169 din Legea 85/2014',
        lead: 'Judecătorul-sindic poate obliga membrii organelor de conducere să suporte o parte din pasivul firmei, dacă au contribuit la starea de insolvență prin faptele enumerate de lege.',
        sections: [
          ['Cine poate cere', 'Administratorul judiciar sau lichidatorul și, în anumite condiții, creditorii.'],
          ['Ce trebuie dovedit', 'Fapta, vinovăția și legătura de cauzalitate cu insolvența. Lipsa uneia singure duce la respingerea cererii.'],
          ['Cum vă apărăm', 'Expertiză contabilă asupra cauzelor reale ale insolvenței, reconstituirea evidențelor și întâmpinare pe documente.'],
        ],
      },
      en: {
        slug: 'article-169-insolvency-liability', nav: 'Art. 169 of Law 85/2014',
        title: 'Art. 169 of Romanian Law 85/2014: director liability in insolvency',
        desc: 'Director liability in Romanian insolvency (art. 169, Law 85/2014): who can claim, what must be proven and how to defend.',
        h1: 'Art. 169 of Law 85/2014',
        lead: 'The insolvency judge can order members of management to bear part of the company\'s debts if they contributed to the insolvency through the acts listed in the law.',
        sections: [
          ['Who can claim', 'The judicial administrator or the liquidator and, under certain conditions, the creditors.'],
          ['What must be proven', 'The act, fault and a causal link with the insolvency. If one is missing, the claim fails.'],
          ['How we defend you', 'A forensic accounting report on the real causes of insolvency, rebuilding the records and a defence based on documents.'],
        ],
      },
    },
    {
      ro: {
        slug: 'raspundere-solidara-anaf', nav: 'Răspunderea solidară ANAF',
        title: 'Raspundere solidara ANAF: contestarea deciziei in 45 de zile',
        desc: 'Decizie ANAF de atragere a răspunderii solidare (art. 25 Cod procedură fiscală): termen de contestare de 45 de zile, verificarea condițiilor și a sumelor.',
        h1: 'Răspunderea solidară cu firma față de ANAF',
        lead: 'ANAF poate emite o decizie prin care administratorul sau asociatul răspunde solidar pentru datoriile fiscale ale firmei (art. 25 Cod procedură fiscală).',
        sections: [
          ['Termenul de contestare', 'Decizia se contestă în 45 de zile de la comunicare, pe cale administrativă, apoi în contencios administrativ.'],
          ['Ce verificăm', 'Dacă sunt îndeplinite condițiile legale pentru fiecare faptă reținută și dacă sumele atribuite vă aparțin.'],
          ['Ce ne trimiteți', 'Decizia primită, dovada comunicării și documentele contabile din perioada vizată.'],
        ],
      },
      en: {
        slug: 'joint-tax-liability-anaf', nav: 'Joint tax liability (ANAF)',
        title: 'Joint tax liability with ANAF in Romania: 45 days to appeal',
        desc: 'ANAF joint-liability decisions in Romania (art. 25, Fiscal Procedure Code): 45-day appeal deadline, testing the conditions and amounts.',
        h1: 'Joint liability for company tax debts',
        lead: 'ANAF can issue a decision making a director or shareholder jointly liable for the company\'s tax debts (art. 25, Fiscal Procedure Code).',
        sections: [
          ['The appeal deadline', 'The decision can be appealed within 45 days of being communicated, first administratively, then before the administrative court.'],
          ['What we check', 'Whether the legal conditions are met for each act alleged and whether the amounts assigned to you are right.'],
          ['What to send us', 'The decision, proof of when you received it and the accounting records for the period concerned.'],
        ],
      },
    },
    {
      ro: {
        slug: 'administrator-formal', nav: 'Administrator formal',
        title: 'Administrator formal: raspunde pentru datoriile firmei?',
        desc: 'Răspunderea administratorului formal și a administratorului de fapt pentru datoriile firmei: ce contează și cum vă protejați.',
        h1: 'Am fost administrator doar formal. Răspund?',
        lead: 'Administratorul de drept poate răspunde chiar fără implicare reală. Contează însă ce fapte vă sunt imputate și ce dovezi există.',
        sections: [
          ['Administratorul de fapt', 'Persoana care a condus efectiv firma poate răspunde la rândul ei, chiar dacă nu figurează în acte.'],
          ['Am cedat firma', 'Puteți fi chemat să răspundeți pentru perioada în care ați condus societatea. Un audit înainte de cesiune vă protejează.'],
          ['Lipsa documentelor', 'Nu înseamnă automat răspundere, dar creează o prezumție greu de răsturnat. Reconstituirea evidenței contabile este adesea cea mai eficientă apărare.'],
        ],
      },
      en: {
        slug: 'nominal-director', nav: 'Nominal director',
        title: 'Nominal directors in Romania: liable for company debts?',
        desc: 'Liability of nominal and de facto directors for company debts in Romania: what matters and how to protect yourself.',
        h1: 'I was only a nominal director. Am I liable?',
        lead: 'A formally appointed director can be liable even without real involvement. What matters is which acts are alleged and what evidence exists.',
        sections: [
          ['The de facto director', 'The person who actually ran the company can be liable too, even if not named in the records.'],
          ['I sold the company', 'You can still be pursued for the period you ran the company. A review before the sale protects you.'],
          ['Missing records', 'They do not mean automatic liability, but they create a presumption that is hard to rebut. Rebuilding the books is often the most effective defence.'],
        ],
      },
    },
  ],
};
