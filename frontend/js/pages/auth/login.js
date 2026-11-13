/* ========================================
   LOGIN PAGE
======================================== */

import {
    getHomeRouteFor,
    signIn
} from "../../services/mock/mock-auth-service.js";

import { navigateTo } from "../../core/paths.js";
import { getOnboardingResumeRoute } from "../onboarding/onboarding-state.js";

import {
    applyFormErrors,
    enableLiveValidation,
    validateEmailField
} from "../../modules/form-validation.js";

import { handleAsyncSubmit } from "../../modules/form-state.js";
import { initPasswordToggles } from "../../modules/password-visibility.js";


const loginForm = document.querySelector("#login-form");
const alertElement = document.querySelector("#login-alert");


function getLoginValues() {
    return {
        email: loginForm.elements.email.value.trim(),
        password: loginForm.elements.password.value,
        remember: loginForm.elements.remember.checked
    };
}


function validateLogin(values) {
    const errors = {};
    const emailError = validateEmailField(values.email);

    if (emailError) {
        errors.email = emailError;
    }

    if (!values.password) {
        errors.password = "Password is required.";
    }

    return errors;
}


async function submitLogin() {
    const session = await signIn(getLoginValues());
    const hasDestination = session.workspace || session.workspaceType === "client";

    /* New accounts continue onboarding where they left off. */
    navigateTo(hasDestination ? getHomeRouteFor(session) : getOnboardingResumeRoute());
}


function handleLoginSubmit(event) {
    event.preventDefault();

    const values = getLoginValues();

    if (!applyFormErrors(loginForm, validateLogin(values))) {
        return;
    }

    runSubmit();
}


const runSubmit = handleAsyncSubmit(loginForm, {
    onSubmit: submitLogin,
    loadingText: "Signing in...",
    alertElement
});



function initializeLoginPage() {
    if (!loginForm) {
        return;
    }

    initPasswordToggles(loginForm);
    enableLiveValidation(loginForm, validateLogin, getLoginValues);
    loginForm.addEventListener("submit", handleLoginSubmit);
}


initializeLoginPage();
