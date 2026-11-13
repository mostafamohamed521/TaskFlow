/* Accessible accordion: each button toggles its own panel */
document.querySelectorAll('.faq-q').forEach(function (b) {
  b.addEventListener('click', function () {
    var open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open);
    b.parentElement.classList.toggle('open', !open);
  });
});
