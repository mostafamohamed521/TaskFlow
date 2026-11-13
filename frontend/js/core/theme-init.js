/* Runs in <head> before first paint: sets theme + "js" flag (reveal animations only hide content when JS runs) */
(function () {
  var t = null, r = document.documentElement;
  try { t = localStorage.getItem('tf-theme'); } catch (e) {}
  if (!t) t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', t); r.classList.add('js');
})();
