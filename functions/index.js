// Receives contact-form submissions from all three sites (via the /api/contact Hosting rewrite),
// stores them in Firestore and emails them through Resend.
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const logger = require('firebase-functions/logger');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const RESEND_API_KEY = defineSecret('RESEND_API_KEY');
const MAIL_FROM = defineString('MAIL_FROM', { default: 'Formular site <formular@infractiunifiscale.ro>' });
const MAIL_TO = defineString('MAIL_TO', { default: 'bilanzaudit@gmail.com' });

const SITES = {
  'infractiunifiscale.ro': 'Infracțiuni fiscale',
  'atragerearaspunderii.ro': 'Atragerea răspunderii',
  'litigiimunca.ro': 'Litigii de muncă',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

exports.contact = onRequest(
  { region: 'europe-west1', secrets: [RESEND_API_KEY], maxInstances: 3, memory: '256MiB', timeoutSeconds: 30 },
  async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ ok: false });
    const b = req.body || {};

    // Silently accept obvious bots so they don't retry: honeypot filled or submitted too fast.
    if (b.website || Number(b.elapsed) < 3000) return res.json({ ok: true });

    const msg = {
      site: clip(b.site, 80).replace(/^www\./, ''),
      lang: b.lang === 'en' ? 'en' : 'ro',
      name: clip(b.name, 120),
      email: clip(b.email, 200),
      phone: clip(b.phone, 40),
      message: clip(b.message, 5000),
      stage: clip(b.stage, 120),
      role: clip(b.role, 60),
    };
    if (!msg.name || !EMAIL_RE.test(msg.email) || msg.message.length < 5 || b.consent !== true) {
      return res.status(400).json({ ok: false, error: 'invalid' });
    }
    const siteLabel = SITES[msg.site] || msg.site || 'necunoscut';

    const ref = await getFirestore().collection('mesajeContact').add({
      ...msg,
      siteLabel,
      consent: true,
      userAgent: clip(req.get('user-agent') || '', 300),
      createdAt: FieldValue.serverTimestamp(),
      emailStatus: 'pending',
    });

    const rows = [
      ['Site', `${siteLabel} (${msg.site})`],
      ['Nume', msg.name],
      ['Email', msg.email],
      ['Telefon', msg.phone || '-'],
      msg.stage && ['Stadiu', msg.stage],
      msg.role && ['Rol', msg.role],
      ['Limba', msg.lang.toUpperCase()],
    ].filter(Boolean);

    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY.value().trim()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: MAIL_FROM.value(),
          to: MAIL_TO.value().split(',').map((x) => x.trim()),
          reply_to: msg.email,
          subject: `[${msg.site}] Mesaj nou de la ${msg.name}`,
          text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${msg.message}\n\nID: ${ref.id}`,
          html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
            .map(([k, v]) => `<tr><td style="color:#666">${html(k)}</td><td><strong>${html(v)}</strong></td></tr>`)
            .join('')}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${html(msg.message)}</p><p style="font-family:Arial,sans-serif;font-size:12px;color:#999">ID Firestore: ${ref.id}</p>`,
        }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      await ref.update({ emailStatus: 'sent' });
    } catch (err) {
      // The message is already saved, so the visitor still gets a success response.
      logger.error('Email delivery failed', { id: ref.id, error: String(err) });
      await ref.update({ emailStatus: 'failed', emailError: String(err).slice(0, 500) });
    }
    return res.json({ ok: true });
  }
);
