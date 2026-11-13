/* ========================================
   TOAST MANAGER
   Branded, accessible toast notifications
   (replaces alert()).
======================================== */

const DEFAULT_DURATION = 5000;
const CLOSE_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
`;


function getRegion() {
    let region = document.querySelector(".tf-toast-region");

    if (region) {
        return region;
    }

    region = document.createElement("div");
    region.className = "tf-toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.append(region);

    return region;
}


function createToast(message, type) {
    const toast = document.createElement("div");
    const text = document.createElement("p");
    const closeButton = document.createElement("button");

    toast.className = `tf-toast tf-toast--${type}`;

    text.className = "tf-toast__message";
    text.textContent = message;

    closeButton.type = "button";
    closeButton.className = "tf-toast__close";
    closeButton.setAttribute("aria-label", "Dismiss notification");
    closeButton.innerHTML = CLOSE_ICON;
    closeButton.addEventListener("click", () => toast.remove());

    toast.append(text, closeButton);

    return toast;
}


/** type: "info" | "success" | "error" | "warning" */
export function showToast(message, { type = "info", duration = DEFAULT_DURATION } = {}) {
    const toast = createToast(message, type);

    getRegion().append(toast);

    if (duration > 0) {
        window.setTimeout(() => toast.remove(), duration);
    }

    return toast;
}
