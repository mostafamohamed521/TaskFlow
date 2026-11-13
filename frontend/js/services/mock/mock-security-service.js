/* ========================================
   MOCK SECURITY SERVICE (demo only)
   Nothing here changes a real password or email.
   Passwords are only compared in memory and are
   never stored.
======================================== */

import { getAccountSettings, saveSettingsSection } from "../../modules/settings-state.js";


function wait(milliseconds = 800) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


/** Demo rule: the current password "wrong" simulates a failed check. */
export async function changePassword({ currentPassword }) {
    await wait();

    if (currentPassword === "wrong") {
        throw new Error("Your current password is incorrect.");
    }

    return { simulated: true };
}


export async function requestEmailChange(accountEmail, newEmail) {
    await wait();

    saveSettingsSection(accountEmail, "pendingEmail", newEmail);

    return { simulated: true };
}


export async function resendEmailVerification() {
    await wait(600);

    return { simulated: true };
}


export function getPendingEmail(accountEmail) {
    return getAccountSettings(accountEmail).pendingEmail;
}
