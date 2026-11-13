/* ========================================
   FORM VALIDATION
   Pure checks plus helpers that render inline,
   accessible error messages.

   Convention: each input has an error element with
   the id "<input-id>-error", referenced from the
   input's aria-describedby.
======================================== */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


export function isValidEmail(value) {
    return EMAIL_PATTERN.test(String(value).trim());
}


export function isBlank(value) {
    return String(value ?? "").trim() === "";
}


export function validateEmailField(value) {
    if (isBlank(value)) {
        return "Email address is required.";
    }

    if (!isValidEmail(value)) {
        return "Enter a valid email address, for example name@example.com.";
    }

    return "";
}


function getErrorElement(input) {
    return document.getElementById(`${input.id}-error`);
}


export function setFieldError(input, message) {
    const errorElement = getErrorElement(input);

    input.setAttribute("aria-invalid", message ? "true" : "false");

    if (errorElement) {
        errorElement.textContent = message || "";
    }
}


export function clearFormErrors(form) {
    form.querySelectorAll("[aria-invalid]").forEach((input) => {
        setFieldError(input, "");
    });
}


/**
 * Renders an { fieldName: message } object onto the form.
 * Returns true when the form is valid. Focuses the first invalid field.
 */
export function applyFormErrors(form, errors) {
    let firstInvalid = null;

    for (const element of form.elements) {
        if (!element.name || !element.id) {
            continue;
        }

        const message = errors[element.name] || "";

        setFieldError(element, message);

        if (message && !firstInvalid) {
            firstInvalid = element;
        }
    }

    if (firstInvalid) {
        firstInvalid.focus();
    }

    return !firstInvalid;
}


/**
 * Re-validates a field as the user corrects it, but only after
 * it has been marked invalid once (no errors while typing the first time).
 */
export function enableLiveValidation(form, validate, readValues) {
    function revalidate(event) {
        const field = event.target;

        if (!field.name) {
            return;
        }

        const isInvalid = field.getAttribute("aria-invalid") === "true";
        const isBlurEvent = event.type === "focusout";

        if (!isInvalid && !isBlurEvent) {
            return;
        }

        if (isBlurEvent && isBlank(field.value) && !isInvalid) {
            return;
        }

        const errors = validate(readValues());

        setFieldError(field, errors[field.name] || "");
        refreshDependentFields(form, field, errors);
    }

    form.addEventListener("input", revalidate);
    form.addEventListener("change", revalidate);
    form.addEventListener("focusout", revalidate);
}


/* Keeps "confirm password" in sync when the original password changes. */
function refreshDependentFields(form, changedField, errors) {
    form.querySelectorAll(`[data-matches="${changedField.name}"]`).forEach((dependent) => {
        if (dependent.getAttribute("aria-invalid") === "true") {
            setFieldError(dependent, errors[dependent.name] || "");
        }
    });
}
