/* ========================================
   EMAIL VERIFIED PAGE
   Success state, or expired / invalid link state.
======================================== */

import { verifyEmailToken } from "../../services/mock/mock-auth-service.js";
import { getQueryParam } from "../../core/paths.js";
import { resetOnboardingState } from "../onboarding/onboarding-state.js";


const loadingSection = document.querySelector("#verified-loading");
const successSection = document.querySelector("#verified-success");
const errorSection = document.querySelector("#verified-error");
const errorTitle = document.querySelector("#verified-error-title");
const errorText = document.querySelector("#verified-error-text");

const ERROR_COPY = {
    expired: {
        title: "This Link Has Expired",
        text: "Verification links are only valid for a limited time. Request a new link to finish setting up your account."
    },
    invalid: {
        title: "This Link Is Not Valid",
        text: "This verification link is incomplete or has already been used. Request a new link to verify your email."
    }
};


function showSection(section) {
    [loadingSection, successSection, errorSection].forEach((candidate) => {
        candidate.hidden = candidate !== section;
    });

    const heading = section.querySelector("h1");

    if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus();
    }
}


function showError(status) {
    const copy = ERROR_COPY[status] || ERROR_COPY.invalid;

    errorTitle.textContent = copy.title;
    errorText.textContent = copy.text;
    document.title = `${copy.title} — TaskFlow`;

    showSection(errorSection);
}


async function initializeEmailVerifiedPage() {
    const token = getQueryParam("token") || "demo-valid";

    try {
        const result = await verifyEmailToken(token);

        if (result.status === "verified") {
            /* A newly verified account always starts onboarding fresh. */
            resetOnboardingState();
            showSection(successSection);

            return;
        }

        showError(result.status);
    } catch (error) {
        showError("invalid");
    }
}


initializeEmailVerifiedPage();
