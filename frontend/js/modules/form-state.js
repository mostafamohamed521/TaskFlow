/* ========================================
   FORM STATE
   Loading / disabled states for submit buttons and forms.
======================================== */

export function setButtonLoading(button, isLoading, loadingText = "Please wait...") {
    if (!button) {
        return;
    }

    const label = button.querySelector(".tf-button__label");

    if (isLoading) {
        button.dataset.originalLabel = label ? label.textContent : "";
        button.disabled = true;
        button.setAttribute("aria-busy", "true");

        if (label) {
            label.textContent = loadingText;
        }

        const spinner = document.createElement("span");

        spinner.className = "tf-spinner";
        spinner.setAttribute("aria-hidden", "true");
        button.prepend(spinner);

        return;
    }

    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.querySelector(".tf-spinner")?.remove();

    if (label && button.dataset.originalLabel) {
        label.textContent = button.dataset.originalLabel;
    }
}


export function setFormLoading(form, isLoading, loadingText) {
    const submitButton = form.querySelector('[type="submit"]');

    form.setAttribute("aria-busy", isLoading ? "true" : "false");
    setButtonLoading(submitButton, isLoading, loadingText);
}


export function showFormAlert(alertElement, message) {
    if (!alertElement) {
        return;
    }

    const messageElement = alertElement.querySelector("[data-alert-message]") || alertElement;

    messageElement.textContent = message || "";
    alertElement.hidden = !message;
}


/* Prevents double submission and wraps loading + error handling. */
export function handleAsyncSubmit(form, { onSubmit, loadingText, alertElement }) {
    let isSubmitting = false;

    return async function runSubmit(...args) {
        if (isSubmitting) {
            return;
        }

        isSubmitting = true;
        showFormAlert(alertElement, "");
        setFormLoading(form, true, loadingText);

        try {
            await onSubmit(...args);
        } catch (error) {
            showFormAlert(alertElement, error.message || "Something went wrong. Please try again.");
        } finally {
            isSubmitting = false;
            setFormLoading(form, false);
        }
    };
}



/* ========================================
   CHANGE TRACKING (dirty forms)
======================================== */

function serializeForm(form) {
    return JSON.stringify(
        [...form.elements]
            .filter((element) => element.name && element.type !== "file")
            .map((element) => [
                element.name,
                element.type === "checkbox" || element.type === "radio"
                    ? element.checked
                    : element.value
            ])
    );
}


/**
 * Calls onChange(isDirty) whenever the form differs from its last
 * saved snapshot. Call markClean() after loading or saving values.
 */
export function trackFormChanges(form, onChange) {
    let snapshot = serializeForm(form);

    const check = () => onChange(serializeForm(form) !== snapshot);

    form.addEventListener("input", check);
    form.addEventListener("change", check);

    return {
        markClean() {
            snapshot = serializeForm(form);
            onChange(false);
        },

        isDirty() {
            return serializeForm(form) !== snapshot;
        }
    };
}
