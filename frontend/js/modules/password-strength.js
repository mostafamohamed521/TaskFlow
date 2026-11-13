/* ========================================
   PASSWORD STRENGTH METER (DOM binding)
======================================== */

import { getPasswordStrength } from "./password-utils.js";


function renderMeter(meter, password) {
    const strength = getPasswordStrength(password);
    const valueElement = meter.querySelector("[data-strength-value]");

    meter.dataset.level = String(strength.level);

    if (valueElement) {
        valueElement.textContent = strength.label;
    }
}


export function bindStrengthMeter(input, meter) {
    if (!input || !meter) {
        return;
    }

    function update() {
        renderMeter(meter, input.value);
    }

    input.addEventListener("input", update);
    update();
}
