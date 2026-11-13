/* Back-to-top button and footer year */
(function () {
  var up = document.getElementById('toTop');
  window.addEventListener('scroll', function () { up.classList.toggle('show', window.scrollY > 800); }, { passive: true });
  up.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
