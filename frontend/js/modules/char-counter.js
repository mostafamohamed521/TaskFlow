/* ========================================
   CHARACTER COUNTER
   Markup: <textarea maxlength="250" data-counter="bio-count">
           <span id="bio-count">0 / 250</span>
======================================== */

export function initCharacterCounters(root = document) {
    root.querySelectorAll("[data-counter]").forEach((field) => {
        const output = document.getElementById(field.dataset.counter);
        const limit = Number(field.getAttribute("maxlength"));

        if (!output || !limit) {
            return;
        }

        const update = () => {
            output.textContent = `${field.value.length} / ${limit}`;
        };

        field.addEventListener("input", update);
        update();
    });
}
