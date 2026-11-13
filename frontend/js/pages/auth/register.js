/* ========================================
   REGISTER PAGE
======================================== */

import { register } from "../../services/mock/mock-auth-service.js";
import { ROUTES, navigateTo } from "../../core/paths.js";

import {
    applyFormErrors,
    enableLiveValidation,
    isBlank,
    validateEmailField
} from "../../modules/form-validation.js";

import {
    validateNewPassword,
    validatePasswordConfirmation
} from "../../modules/password-utils.js";

import { handleAsyncSubmit } from "../../modules/form-state.js";
import { initPasswordToggles } from "../../modules/password-visibility.js";
import { showToast } from "../../modules/toast-manager.js";


const registerForm = document.querySelector("#register-form");
const alertElement = document.querySelector("#register-alert");


function getRegisterValues() {
    const fields = registerForm.elements;

    return {
        fullName: fields.fullName.value.trim(),
        email: fields.email.value.trim(),
        password: fields.password.value,
        confirmPassword: fields.confirmPassword.value,
        terms: fields.terms.checked
    };
}


function validateFullName(fullName) {
    if (isBlank(fullName)) {
        return "Full name is required.";
    }

    if (fullName.length < 2 || fullName.length > 80) {
        return "Enter a name between 2 and 80 characters.";
    }

    return "";
}


function validateRegister(values) {
    const errors = {
        fullName: validateFullName(values.fullName),
        email: validateEmailField(values.email),
        password: validateNewPassword(values.password),
        confirmPassword: validatePasswordConfirmation(values.password, values.confirmPassword),
        terms: values.terms ? "" : "Please accept the Terms of Service and Privacy Policy to continue."
    };

    return Object.fromEntries(
        Object.entries(errors).filter(([, message]) => message)
    );
}


async function submitRegistration() {
    const values = getRegisterValues();

    /* Only name and email go to the mock service. Passwords are never stored. */
    await register({
        fullName: values.fullName,
        email: values.email
    });

    navigateTo(ROUTES.verifyEmail);
}


const runSubmit = handleAsyncSubmit(registerForm, {
    onSubmit: submitRegistration,
    loadingText: "Creating account...",
    alertElement
});


function handleRegisterSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(registerForm, validateRegister(getRegisterValues()))) {
        return;
    }

    runSubmit();
}


function handleSocialClick(event) {
    const provider = event.currentTarget.dataset.provider;

    showToast(`${provider} sign-in isn't available in this demo yet. Please register with your email.`, {
        type: "warning"
    });
}


function initializeRegisterPage() {
    if (!registerForm) {
        return;
    }

    initPasswordToggles(registerForm);
    enableLiveValidation(registerForm, validateRegister, getRegisterValues);

    registerForm.addEventListener("submit", handleRegisterSubmit);

    document.querySelectorAll("[data-provider]").forEach((button) => {
        button.addEventListener("click", handleSocialClick);
    });
}


initializeRegisterPage();
