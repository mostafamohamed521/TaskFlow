/* ========================================
   PASSWORD VISIBILITY
   Markup: <button class="tf-password-toggle"
                   data-password-toggle="<input-id>"
                   aria-pressed="false" ...>
======================================== */

function updateToggle(button, input, isVisible) {
    input.type = isVisible ? "text" : "password";

    button.setAttribute("aria-pressed", String(isVisible));
    button.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
}


export function initPasswordToggles(root = document) {
    root.querySelectorAll("[data-password-toggle]").forEach((button) => {
        const input = document.getElementById(button.dataset.passwordToggle);

        if (!input) {
            return;
        }

        updateToggle(button, input, false);

        button.addEventListener("click", () => {
            const willShow = input.type === "password";

            updateToggle(button, input, willShow);
            input.focus();
        });
    });
}
