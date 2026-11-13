(function () {
  var nav = document.getElementById('nav'), btn = document.getElementById('menuBtn'), menu = document.getElementById('mobile');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 12); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  function setOpen(o) {
    menu.classList.toggle('open', o);
    btn.setAttribute('aria-expanded', o);
    btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
