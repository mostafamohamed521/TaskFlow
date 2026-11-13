/* Contact form: validation + real delivery when js/data/site-config.js is filled in */
(function () {
  var f = document.getElementById('contactForm'); if (!f) return;
  var cfg = window.TASKFLOW_CONFIG || {}, ok = document.getElementById('formOk'), fail = document.getElementById('formFail'), btn = document.getElementById('sendBtn');
  if (cfg.contactEmail) {
    var a = document.getElementById('directEmail');
    a.href = 'mailto:' + cfg.contactEmail; a.textContent = cfg.contactEmail;
    document.getElementById('direct').hidden = false;
  }
  function err(el, m) { el.setAttribute('aria-invalid', !!m); document.getElementById(el.id + 'Err').textContent = m || ''; return !m; }
  function check() {
    var e = f.elements, bad = [];
    var r = [[e.name, e.name.value.trim() ? '' : 'Enter your full name.'],
      [e.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.value) ? '' : 'Enter a valid email address.'],
      [e.topic, e.topic.value ? '' : 'Choose a topic.'],
      [e.message, e.message.value.trim().length >= 10 ? '' : 'Write at least 10 characters.']];
    r.forEach(function (x) { if (!err(x[0], x[1])) bad.push(x[0]); });
    if (bad.length) bad[0].focus();
    return !bad.length;
  }
  f.addEventListener('submit', function (ev) {
    ev.preventDefault(); ok.hidden = fail.hidden = true;
    if (!check()) return;
    var e = f.elements;
    if (e._honey.value) { ok.textContent = 'Thank you. Your message was sent.'; ok.hidden = false; return; }
    var url = cfg.contactEndpoint || (cfg.contactEmail ? 'https://formsubmit.co/ajax/' + encodeURIComponent(cfg.contactEmail) : '');
    if (!url) { ok.textContent = 'Demo only: the form is valid, but nothing was sent because no delivery address is configured yet.'; ok.hidden = false; return; }
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: e.name.value.trim(), email: e.email.value.trim(), topic: e.topic.value, message: e.message.value.trim(), _subject: 'TaskFlow contact: ' + e.topic.value, _template: 'table' }) })
      .then(function (r) { if (!r.ok) throw 0; return r.json().catch(function () { return {}; }); })
      .then(function (j) { if (j && (j.success === false || j.success === 'false')) throw 0; ok.textContent = 'Thank you. Your message was sent.'; ok.hidden = false; f.reset(); })
      .catch(function () { fail.textContent = 'Your message could not be sent. Please try again' + (cfg.contactEmail ? ' or email us directly.' : '.'); fail.hidden = false; })
      .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
  });
})();
