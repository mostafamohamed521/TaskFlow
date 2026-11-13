/* ========================================
   VERIFY EMAIL PAGE
   Shows the (masked) address, simulates opening the
   verification link and rate-limits "Resend Email".
======================================== */

import {
    getPendingRegistration,
    maskEmail,
    resendVerificationEmail
} from "../../services/mock/mock-auth-service.js";

import { ROUTES, getQueryParam, navigateTo } from "../../core/paths.js";
import { showToast } from "../../modules/toast-manager.js";


const RESEND_COOLDOWN_SECONDS = 30;

const emailOutput = document.querySelector("#verify-email-address");
const openEmailButton = document.querySelector("#open-email-button");
const resendButton = document.querySelector("#resend-button");
const statusOutput = document.querySelector("#verify-status");


function renderMaskedEmail() {
    const pending = getPendingRegistration();

    if (pending && pending.email) {
        emailOutput.textContent = maskEmail(pending.email);
    }
}


function startResendCooldown() {
    let secondsLeft = RESEND_COOLDOWN_SECONDS;
    const originalLabel = "Resend Email";

    resendButton.disabled = true;
    resendButton.textContent = `Resend in ${secondsLeft}s`;

    const timer = window.setInterval(() => {
        secondsLeft -= 1;

        if (secondsLeft <= 0) {
            window.clearInterval(timer);
            resendButton.disabled = false;
            resendButton.textContent = originalLabel;

            return;
        }

        resendButton.textContent = `Resend in ${secondsLeft}s`;
    }, 1000);
}


async function handleResend() {
    resendButton.disabled = true;
    resendButton.textContent = "Sending...";

    try {
        await resendVerificationEmail();

        const message = "Demo: a new verification email would be sent now. No email is sent in this demo.";

        statusOutput.textContent = message;
        showToast(message, { type: "success" });
        startResendCooldown();
    } catch (error) {
        resendButton.disabled = false;
        resendButton.textContent = "Resend Email";
        showToast("We couldn't resend the email. Please try again.", { type: "error" });
    }
}


function handleOpenEmail() {
    /* In the demo this stands in for clicking the link inside the email. */
    navigateTo(`${ROUTES.emailVerified}?token=demo-valid`);
}


function initializeVerifyEmailPage() {
    renderMaskedEmail();

    openEmailButton.addEventListener("click", handleOpenEmail);
    resendButton.addEventListener("click", handleResend);

    if (getQueryParam("resend") === "1") {
        handleResend();
    }
}


initializeVerifyEmailPage();
