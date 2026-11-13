/* Branded confirmation dialog (native <dialog>: focus trap + Escape handled by the browser). Resolves true/false. */
export function confirmDialog({ title, body, confirmText = 'Confirm', cancelText = 'Cancel', danger = false }) {
  return new Promise((resolve) => {
    const d = document.createElement('dialog'); d.className = 'dlg'; d.setAttribute('aria-labelledby', 'dlgT');
    d.innerHTML = '<h2 id="dlgT"></h2><p></p><div class="dlg-actions"><button class="btn btn-outline" type="button" data-x="0"></button><button class="btn ' + (danger ? 'btn-danger' : 'btn-fill') + '" type="button" data-x="1"></button></div>';
    d.querySelector('h2').textContent = title; d.querySelector('p').textContent = body;
    d.querySelector('[data-x="0"]').textContent = cancelText; d.querySelector('[data-x="1"]').textContent = confirmText;
    let ans = false; d.addEventListener('click', (e) => { const b = e.target.closest('[data-x]'); if (b) { ans = b.dataset.x === '1'; d.close(); } });
    d.addEventListener('close', () => { d.remove(); resolve(ans); });
    document.body.appendChild(d); d.showModal();
  });
}
