// Contact form: posts to /api/contact (Firebase Hosting rewrite to the "contact" Cloud Function).
(function () {
  var f = document.getElementById('f');
  if (!f) return;
  var s = document.getElementById('f-status');
  var btn = f.querySelector('button[type="submit"]');
  var t0 = Date.now();
  var en = document.documentElement.lang === 'en';
  var T = en ? {
    invalid: 'Please fill in your name, a valid email, a message, and tick the consent box.',
    sending: 'Sending…',
    ok: 'Thank you. We received your message and will reply as soon as possible, usually within one working day.',
    err: 'The message could not be sent. Please try again, or call us on 0744 328 886.'
  } : {
    invalid: 'Completați numele, un email valid, mesajul și bifați acordul.',
    sending: 'Se trimite…',
    ok: 'Vă mulțumim. Am primit mesajul și vă răspundem cât mai curând, de regulă într-o zi lucrătoare.',
    err: 'Mesajul nu a putut fi trimis. Încercați din nou sau sunați la 0744 328 886.'
  };
  function val(keys) {
    for (var i = 0; i < keys.length; i++) {
      var el = f.querySelector('[name="' + keys[i] + '"],#' + keys[i]);
      if (!el) continue;
      if (el.type === 'radio') { var c = f.querySelector('[name="' + el.name + '"]:checked'); return c ? c.value : ''; }
      if (el.type === 'checkbox') return el.checked;
      return el.value.trim();
    }
    return '';
  }
  function show(msg) { s.hidden = false; s.textContent = msg; }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.checkValidity()) { show(T.invalid); return; }
    var data = {
      site: location.hostname.replace(/^www\./, ''),
      lang: document.documentElement.lang,
      name: val(['name', 'f-name']),
      email: val(['email', 'f-email']),
      phone: val(['phone', 'f-phone']),
      message: val(['message', 'f-msg']),
      stage: val(['stage', 'f-stage']),
      role: val(['role']),
      consent: val(['f-gdpr']) === true,
      website: val(['website']),
      elapsed: Date.now() - t0
    };
    btn.disabled = true;
    show(T.sending);
    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { show(T.ok); f.reset(); })
      .catch(function () { show(T.err); })
      .then(function () { btn.disabled = false; });
  });
})();
