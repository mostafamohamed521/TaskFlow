/* ========================================
   SECURITY SETTINGS
   Change Password and Change Email dialogs,
   demo login sessions.
======================================== */

import { initAppShell } from "../../core/app-shell.js";
import { closeModal, initModals, openModal } from "../../modules/modal-manager.js";
import { getAccountSettings, formatDateTime } from "../../modules/settings-state.js";
import { maskEmail } from "../../services/mock/mock-auth-service.js";

import {
    changePassword,
    getPendingEmail,
    requestEmailChange,
    resendEmailVerification
} from "../../services/mock/mock-security-service.js";

import {
    applyFormErrors,
    clearFormErrors,
    enableLiveValidation,
    validateEmailField
} from "../../modules/form-validation.js";

import {
    STRONG_PASSWORD_REQUIREMENTS,
    getRequirementResults,
    validateNewPassword,
    validatePasswordConfirmation
} from "../../modules/password-utils.js";

import { handleAsyncSubmit, setButtonLoading } from "../../modules/form-state.js";
import { initPasswordToggles } from "../../modules/password-visibility.js";
import { bindStrengthMeter } from "../../modules/password-strength.js";
import { showToast } from "../../modules/toast-manager.js";


const passwordForm = document.querySelector("#password-form");
const emailForm = document.querySelector("#email-form");

let context = null;


/* ========================================
   CHANGE PASSWORD
======================================== */

function readPasswordValues() {
    return {
        currentPassword: passwordForm.elements.currentPassword.value,
        newPassword: passwordForm.elements.newPassword.value,
        confirmPassword: passwordForm.elements.confirmPassword.value
    };
}


function validatePasswordChange(values) {
    const errors = {
        currentPassword: values.currentPassword ? "" : "Enter your current password.",
        newPassword: validateNewPassword(values.newPassword, STRONG_PASSWORD_REQUIREMENTS),
        confirmPassword: validatePasswordConfirmation(values.newPassword, values.confirmPassword)
    };

    if (!errors.newPassword && values.newPassword === values.currentPassword) {
        errors.newPassword = "Choose a password that is different from your current one.";
    }

    return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}


function renderRequirements() {
    const list = document.querySelector("#new-password-requirements");
    const results = getRequirementResults(passwordForm.elements.newPassword.value, STRONG_PASSWORD_REQUIREMENTS);

    list.replaceChildren(
        ...results.map((result) => {
            const item = document.createElement("li");
            const state = document.createElement("span");

            item.className = "tf-requirements__item";
            item.dataset.met = String(result.met);
            item.textContent = result.label;

            state.className = "tf-visually-hidden";
            state.textContent = result.met ? " (met)" : " (not met)";
            item.append(state);

            return item;
        })
    );
}


/* Password values live only in the form; they are wiped on close. */
function resetPasswordForm() {
    passwordForm.reset();
    clearFormErrors(passwordForm);
    document.querySelector("#password-alert").hidden = true;
    passwordForm.elements.newPassword.dispatchEvent(new Event("input"));
    renderRequirements();
}


const runPasswordChange = handleAsyncSubmit(passwordForm, {
    onSubmit: async () => {
        await changePassword(readPasswordValues());
        closeModal("password-modal");
        showToast("Demo: password change simulated. No password was changed or stored.", { type: "success" });
    },
    loadingText: "Updating...",
    alertElement: document.querySelector("#password-alert")
});


function handlePasswordSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(passwordForm, validatePasswordChange(readPasswordValues()))) {
        return;
    }

    runPasswordChange();
}


function initPasswordDialog() {
    initPasswordToggles(passwordForm);
    bindStrengthMeter(passwordForm.elements.newPassword, document.querySelector("#new-password-strength"));
    passwordForm.elements.newPassword.addEventListener("input", renderRequirements);
    renderRequirements();

    enableLiveValidation(passwordForm, validatePasswordChange, readPasswordValues);
    passwordForm.addEventListener("submit", handlePasswordSubmit);

    document.querySelector("#password-modal").addEventListener("tf:modal-close", resetPasswordForm);
}


/* ========================================
   CHANGE EMAIL
======================================== */

function readEmailValues() {
    return {
        newEmail: emailForm.elements.newEmail.value.trim().toLowerCase(),
        confirmEmail: emailForm.elements.confirmEmail.value.trim().toLowerCase()
    };
}


function validateEmailChange(values) {
    const errors = {};
    const formatError = validateEmailField(values.newEmail);

    if (formatError) {
        errors.newEmail = formatError;
    } else if (values.newEmail === context.email.toLowerCase()) {
        errors.newEmail = "This is already your current email address.";
    }

    if (!values.confirmEmail) {
        errors.confirmEmail = "Confirm the new email address.";
    } else if (values.confirmEmail !== values.newEmail) {
        errors.confirmEmail = "Email addresses do not match.";
    }

    return errors;
}


function showEmailStep(step) {
    document.querySelector("#email-step-form").hidden = step !== "form";
    document.querySelector("#email-step-verify").hidden = step !== "verify";
}


function renderPendingEmail() {
    const note = document.querySelector("#pending-email-note");
    const pending = getPendingEmail(context.email);

    note.hidden = !pending;
    note.textContent = pending ? `Waiting for verification: ${maskEmail(pending)}` : "";
}


const runEmailChange = handleAsyncSubmit(emailForm, {
    onSubmit: async () => {
        const { newEmail } = readEmailValues();

        await requestEmailChange(context.email, newEmail);

        document.querySelector("#email-masked").textContent = maskEmail(newEmail);
        showEmailStep("verify");
        renderPendingEmail();
        document.querySelector("#email-resend").focus();
    },
    loadingText: "Sending..."
});


function handleEmailSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(emailForm, validateEmailChange(readEmailValues()))) {
        return;
    }

    runEmailChange();
}


async function handleResend(event) {
    const button = event.currentTarget;

    setButtonLoading(button, true, "Sending...");
    await resendEmailVerification();
    setButtonLoading(button, false);
    showToast("Demo: a new verification email would be sent now. No email was sent.");
}


function initEmailDialog() {
    const modal = document.querySelector("#email-modal");

    emailForm.elements.currentEmail.value = context.email;

    enableLiveValidation(emailForm, validateEmailChange, readEmailValues);
    emailForm.addEventListener("submit", handleEmailSubmit);
    document.querySelector("#email-resend").addEventListener("click", handleResend);

    modal.addEventListener("tf:modal-open", () => {
        emailForm.reset();
        emailForm.elements.currentEmail.value = context.email;
        clearFormErrors(emailForm);
        showEmailStep("form");
    });

    renderPendingEmail();
}


/* ========================================
   LOGIN SESSIONS (current browser + one example)
======================================== */

function describeCurrentDevice() {
    const agent = navigator.userAgent;

    const os = [
        ["Windows", /Windows/],
        ["macOS", /Mac OS X/],
        ["Android", /Android/],
        ["iOS", /iPhone|iPad/],
        ["Linux", /Linux/]
    ].find(([, pattern]) => pattern.test(agent))?.[0] || "This device";

    const browser = [
        ["Edge", /Edg\//],
        ["Chrome", /Chrome\//],
        ["Firefox", /Firefox\//],
        ["Safari", /Safari\//]
    ].find(([, pattern]) => pattern.test(agent))?.[0] || "Browser";

    return `${os} • ${browser}`;
}


function renderSessions() {
    const preferences = getAccountSettings(context.email).preferences;
    const exampleDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    document.querySelector("#current-session-title").textContent = describeCurrentDevice();
    document.querySelector("#current-session-place").textContent = "This browser";
    document.querySelector("#current-session-time").textContent = formatDateTime(new Date(), preferences);
    document.querySelector("#example-session-time").textContent = formatDateTime(exampleDate, preferences);

    document.querySelector("#end-example-session").addEventListener("click", () => {
        document.querySelector("#example-session").remove();
        showToast("Example session removed from the list.", { type: "success" });
    });
}


function initializeSecurityPage() {
    context = initAppShell();

    if (!context) {
        return;
    }

    initModals();
    initPasswordDialog();
    initEmailDialog();
    renderSessions();

    if (window.location.hash === "#change-email") {
        openModal("email-modal", document.querySelector('[data-modal-open="email-modal"]'));
    }
}


initializeSecurityPage();
