/* Simple page change: current page fades out (0.2s), the next one fades in via CSS */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname || !/\.html$/.test(u.pathname)) return;
    e.preventDefault();
    document.documentElement.classList.add('is-leaving');
    setTimeout(function () { location.href = u.href; }, 200);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) document.documentElement.classList.remove('is-leaving'); });
})();
