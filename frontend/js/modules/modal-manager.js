/* ========================================
   MODAL MANAGER
   Opens .tf-modal dialogs, traps focus, closes on
   Esc / backdrop / [data-modal-close], and returns
   focus to the element that opened the dialog.

   Markup: <button data-modal-open="my-modal">
           <div class="tf-modal" id="my-modal" hidden>...
======================================== */

const FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
].join(",");

let activeModal = null;
let returnFocusTo = null;


function getFocusable(modal) {
    return [...modal.querySelectorAll(FOCUSABLE)].filter((element) => element.offsetParent !== null);
}


function trapFocus(event) {
    if (!activeModal || event.key !== "Tab") {
        return;
    }

    const focusable = getFocusable(activeModal);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}


function handleKeydown(event) {
    if (event.key === "Escape" && activeModal) {
        closeModal(activeModal.id);

        return;
    }

    trapFocus(event);
}


export function openModal(id, trigger = document.activeElement) {
    const modal = document.getElementById(id);

    if (!modal) {
        return;
    }

    if (activeModal) {
        closeModal(activeModal.id, { restoreFocus: false });
    }

    activeModal = modal;
    returnFocusTo = trigger;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);

    modal.dispatchEvent(new CustomEvent("tf:modal-open"));

    const [firstField] = getFocusable(modal.querySelector(".tf-modal__dialog"))
        .filter((element) => !element.matches(".tf-modal__close"));

    (firstField || modal.querySelector(".tf-modal__close"))?.focus();
}


export function closeModal(id, { restoreFocus = true } = {}) {
    const modal = document.getElementById(id);

    if (!modal || modal.hidden) {
        return;
    }

    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
    activeModal = null;

    modal.dispatchEvent(new CustomEvent("tf:modal-close"));

    if (restoreFocus && returnFocusTo && document.contains(returnFocusTo)) {
        returnFocusTo.focus();
    }
}


/** Wires [data-modal-open] triggers and close controls inside a root. */
export function initModals(root = document) {
    root.querySelectorAll("[data-modal-open]").forEach((trigger) => {
        trigger.addEventListener("click", () => openModal(trigger.dataset.modalOpen, trigger));
    });

    root.querySelectorAll(".tf-modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal || event.target.closest("[data-modal-close]")) {
                closeModal(modal.id);
            }
        });
    });
}


/**
 * Promise-based confirmation built on the same modal styles
 * (replaces window.confirm()).
 */
export function confirmDialog({ title, body, confirmText = "Confirm", cancelText = "Cancel", danger = false }) {
    return new Promise((resolve) => {
        const id = "tf-confirm-dialog";

        document.getElementById(id)?.remove();

        const modal = document.createElement("div");
        const dialog = document.createElement("div");
        const heading = document.createElement("h2");
        const text = document.createElement("p");
        const actions = document.createElement("div");
        const cancelButton = document.createElement("button");
        const confirmButton = document.createElement("button");

        modal.className = "tf-modal";
        modal.id = id;
        modal.hidden = true;

        dialog.className = "tf-modal__dialog";
        dialog.setAttribute("role", "alertdialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-labelledby", `${id}-title`);

        heading.className = "tf-modal__title";
        heading.id = `${id}-title`;
        heading.textContent = title;

        text.className = "tf-modal__text";
        text.textContent = body;

        actions.className = "tf-form-actions";

        cancelButton.type = "button";
        cancelButton.className = "tf-button tf-button--secondary";
        cancelButton.textContent = cancelText;
        cancelButton.setAttribute("data-modal-close", "");

        confirmButton.type = "button";
        confirmButton.className = `tf-button ${danger ? "tf-button--danger" : "tf-button--primary"}`;
        confirmButton.textContent = confirmText;

        actions.append(cancelButton, confirmButton);
        dialog.append(heading, text, actions);
        modal.append(dialog);
        document.body.append(modal);

        let confirmed = false;

        confirmButton.addEventListener("click", () => {
            confirmed = true;
            closeModal(id);
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal || event.target.closest("[data-modal-close]")) {
                closeModal(id);
            }
        });

        modal.addEventListener("tf:modal-close", () => {
            modal.remove();
            resolve(confirmed);
        });

        openModal(id);
    });
}
