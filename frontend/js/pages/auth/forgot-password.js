/* ========================================
   FORGOT PASSWORD PAGE
   The confirmation message is identical for every
   address so the page never reveals which emails
   have accounts.
======================================== */

import { requestPasswordReset } from "../../services/mock/mock-auth-service.js";

import {
    applyFormErrors,
    enableLiveValidation,
    validateEmailField
} from "../../modules/form-validation.js";

import { handleAsyncSubmit } from "../../modules/form-state.js";


const forgotForm = document.querySelector("#forgot-form");
const requestSection = document.querySelector("#forgot-request");
const confirmationSection = document.querySelector("#forgot-confirmation");
const sentToOutput = document.querySelector("#forgot-sent-to");
const tryAgainButton = document.querySelector("#forgot-try-again");


function getForgotValues() {
    return {
        email: forgotForm.elements.email.value.trim()
    };
}


function validateForgot(values) {
    const emailError = validateEmailField(values.email);

    return emailError ? { email: emailError } : {};
}


function showConfirmation(email) {
    sentToOutput.textContent = email;
    requestSection.hidden = true;
    confirmationSection.hidden = false;
    confirmationSection.focus();
}


function showRequestForm() {
    confirmationSection.hidden = true;
    requestSection.hidden = false;
    forgotForm.elements.email.focus();
    forgotForm.elements.email.select();
}


const runSubmit = handleAsyncSubmit(forgotForm, {
    onSubmit: async () => {
        const { email } = getForgotValues();

        await requestPasswordReset(email);
        showConfirmation(email);
    },
    loadingText: "Sending...",
    alertElement: document.querySelector("#forgot-alert")
});


function handleForgotSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(forgotForm, validateForgot(getForgotValues()))) {
        return;
    }

    runSubmit();
}


function initializeForgotPasswordPage() {
    if (!forgotForm) {
        return;
    }

    enableLiveValidation(forgotForm, validateForgot, getForgotValues);
    forgotForm.addEventListener("submit", handleForgotSubmit);
    tryAgainButton.addEventListener("click", showRequestForm);
}


initializeForgotPasswordPage();
