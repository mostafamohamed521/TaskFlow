/* ========================================
   RESET PASSWORD PAGE
   Link check (valid / expired / invalid), new password
   with strength meter, confirmation and submit.
======================================== */

import {
    checkResetLink,
    resetPassword
} from "../../services/mock/mock-auth-service.js";

import { ROUTES, getQueryParam, navigateTo } from "../../core/paths.js";

import {
    applyFormErrors,
    enableLiveValidation
} from "../../modules/form-validation.js";

import {
    validateNewPassword,
    validatePasswordConfirmation
} from "../../modules/password-utils.js";

import { handleAsyncSubmit } from "../../modules/form-state.js";
import { initPasswordToggles } from "../../modules/password-visibility.js";
import { bindStrengthMeter } from "../../modules/password-strength.js";


const resetForm = document.querySelector("#reset-form");
const checkingSection = document.querySelector("#reset-checking");
const formSection = document.querySelector("#reset-form-section");
const linkErrorSection = document.querySelector("#reset-link-error");

const LINK_ERROR_COPY = {
    expired: {
        title: "Reset Link Expired",
        text: "For your security, password reset links expire after a short time. Request a new link to continue."
    },
    invalid: {
        title: "Invalid Reset Link",
        text: "This reset link is incomplete or has already been used. Request a new link to choose a new password."
    }
};


function getResetValues() {
    return {
        password: resetForm.elements.password.value,
        confirmPassword: resetForm.elements.confirmPassword.value
    };
}


function validateReset(values) {
    const errors = {
        password: validateNewPassword(values.password),
        confirmPassword: validatePasswordConfirmation(values.password, values.confirmPassword)
    };

    return Object.fromEntries(
        Object.entries(errors).filter(([, message]) => message)
    );
}


const runSubmit = handleAsyncSubmit(resetForm, {
    onSubmit: async () => {
        await resetPassword();
        navigateTo(ROUTES.passwordResetSuccess);
    },
    loadingText: "Resetting...",
    alertElement: document.querySelector("#reset-alert")
});


function handleResetSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(resetForm, validateReset(getResetValues()))) {
        return;
    }

    runSubmit();
}


function showLinkError(status) {
    const copy = LINK_ERROR_COPY[status] || LINK_ERROR_COPY.invalid;

    document.querySelector("#reset-error-title").textContent = copy.title;
    document.querySelector("#reset-error-text").textContent = copy.text;
    document.title = `${copy.title} — TaskFlow`;

    linkErrorSection.hidden = false;
}


function initializeForm() {
    initPasswordToggles(resetForm);
    bindStrengthMeter(
        resetForm.elements.password,
        document.querySelector("#reset-strength")
    );
    enableLiveValidation(resetForm, validateReset, getResetValues);
    resetForm.addEventListener("submit", handleResetSubmit);

    formSection.hidden = false;
}


async function initializeResetPasswordPage() {
    const { status } = await checkResetLink(getQueryParam("state"));

    checkingSection.hidden = true;

    if (status !== "valid") {
        showLinkError(status);

        return;
    }

    initializeForm();
}


initializeResetPasswordPage();
