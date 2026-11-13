/* ========================================
   APP STUB PAGES (workspace + client portal)
   Frontend-only guard. A real deployment must enforce
   the same rules on the server.
======================================== */

import {
    getSession,
    signOut
} from "../../services/mock/mock-auth-service.js";

import { confirmDialog } from "../../modules/modal-manager.js";


const area = document.body.dataset.area;
const base = document.body.dataset.base;
const session = getSession();


function redirectIfNotAllowed() {
    if (!session) {
        window.location.replace(`${base}auth/session-expired.html`);

        return true;
    }

    if (area === "internal" && session.workspaceType === "client") {
        window.location.replace(`${base}auth/access-denied.html`);

        return true;
    }

    if (area === "client" && session.workspaceType !== "client") {
        window.location.replace(`${base}auth/access-denied.html`);

        return true;
    }

    return false;
}


function renderSessionDetails() {
    const values = {
        name: session.name,
        email: session.email,
        type: session.workspaceType,
        workspace: session.workspace
    };

    document.querySelectorAll("[data-s]").forEach((element) => {
        element.textContent = values[element.dataset.s] || "Not set yet";
    });
}


async function handleSignOut() {
    const confirmed = await confirmDialog({
        title: "Sign out?",
        body: "You will need to sign in again to continue.",
        confirmText: "Sign Out",
        danger: true
    });

    if (!confirmed) {
        return;
    }

    signOut();
    window.location.href = `${base}auth/login.html`;
}


if (!redirectIfNotAllowed()) {
    renderSessionDetails();
    document.getElementById("out").addEventListener("click", handleSignOut);
}
