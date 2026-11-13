/* ========================================
   ACCESS DENIED
   "Contact Admin" prepares a message the user can
   copy and send; "Go to Dashboard" points to the
   right home for the signed-in demo account.
======================================== */

import {
    getHomeRouteFor,
    getSession
} from "../../services/mock/mock-auth-service.js";

import { initModals } from "../../modules/modal-manager.js";
import { showToast } from "../../modules/toast-manager.js";


const homeLink = document.querySelector("#go-home-button");
const messageField = document.querySelector("#contact-admin-message");
const copyButton = document.querySelector("#copy-admin-message");


function buildAdminMessage(session) {
    const name = session?.name || "A team member";
    const page = document.referrer || "a TaskFlow page";

    return `Hi, this is ${name}. I tried to open ${page} but my role doesn't allow it. `
        + "Could you review my access in our TaskFlow workspace? Thank you.";
}


function pointHomeLink(session) {
    if (!session) {
        homeLink.href = "../../index.html";
        homeLink.querySelector(".tf-button__label").textContent = "Go to Home";

        return;
    }

    homeLink.href = getHomeRouteFor(session);
}


async function copyMessage() {
    try {
        await navigator.clipboard.writeText(messageField.value);
        showToast("Message copied. Paste it into an email or chat to your admin.", { type: "success" });
    } catch (error) {
        messageField.select();
        showToast("Select the message and copy it with Ctrl+C.");
    }
}


function initializeAccessDeniedPage() {
    const session = getSession();

    pointHomeLink(session);
    messageField.value = buildAdminMessage(session);

    initModals();
    copyButton.addEventListener("click", copyMessage);
}


initializeAccessDeniedPage();
