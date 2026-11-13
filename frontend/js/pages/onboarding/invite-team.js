/* ========================================
   STEP 3: INVITE TEAM (optional)
   Editable rows: email + role (Admin / Member / Viewer).
   Owner is never offered: the creator already owns
   the workspace.
======================================== */

import {
    INVITE_ROLES,
    getOnboardingState,
    updateOnboardingState
} from "./onboarding-state.js";

import { createPendingInvitations } from "../../services/mock/mock-invitation-service.js";
import { getSession } from "../../services/mock/mock-auth-service.js";
import { ROUTES, navigateTo } from "../../core/paths.js";
import { isBlank, isValidEmail, setFieldError } from "../../modules/form-validation.js";
import { handleAsyncSubmit, showFormAlert } from "../../modules/form-state.js";
import { showToast } from "../../modules/toast-manager.js";


const MAX_ROWS = 10;

const inviteForm = document.querySelector("#invite-team-form");
const rowList = document.querySelector("#invite-rows");
const rowTemplate = document.querySelector("#invite-row-template");
const addRowButton = document.querySelector("#add-invite-row");
const skipLink = document.querySelector("#skip-invites");
const shareLinkToggle = document.querySelector("#share-link");
const alertElement = document.querySelector("#invite-alert");

let rowCounter = 0;


/* ----------------------------------------
   Rows
---------------------------------------- */

function connectRowLabels(row) {
    rowCounter += 1;

    const emailInput = row.querySelector('[name="email"]');
    const roleSelect = row.querySelector('[name="role"]');
    const errorElement = row.querySelector(".tf-field__error");

    emailInput.id = `invite-email-${rowCounter}`;
    roleSelect.id = `invite-role-${rowCounter}`;
    errorElement.id = `${emailInput.id}-error`;

    emailInput.setAttribute("aria-describedby", errorElement.id);
    row.querySelector('[data-label-for="email"]').htmlFor = emailInput.id;
    row.querySelector('[data-label-for="role"]').htmlFor = roleSelect.id;
}


function updateRowControls() {
    const rows = rowList.querySelectorAll(".tf-invite-row");

    addRowButton.disabled = rows.length >= MAX_ROWS;

    rows.forEach((row) => {
        row.querySelector("[data-remove-row]").hidden = rows.length === 1;
    });
}


function addRow({ email = "", role = "Member", focus = false } = {}) {
    const row = rowTemplate.content.firstElementChild.cloneNode(true);

    connectRowLabels(row);

    row.querySelector('[name="email"]').value = email;
    row.querySelector('[name="role"]').value = role;
    row.dataset.role = role;

    rowList.append(row);
    updateRowControls();

    if (focus) {
        row.querySelector('[name="email"]').focus();
    }
}


function removeRow(row) {
    const nextFocus = row.previousElementSibling || row.nextElementSibling;

    row.remove();
    updateRowControls();
    saveDraftRows();
    nextFocus?.querySelector('[name="email"]').focus();
}


function readRows() {
    return [...rowList.querySelectorAll(".tf-invite-row")].map((row) => ({
        row,
        emailInput: row.querySelector('[name="email"]'),
        email: row.querySelector('[name="email"]').value.trim().toLowerCase(),
        role: row.querySelector('[name="role"]').value
    }));
}


/* Keeps unsent rows when the user goes Back or refreshes. */
function saveDraftRows() {
    const drafts = readRows()
        .filter((entry) => entry.email)
        .map(({ email, role }) => ({ email, role }));

    updateOnboardingState({ invitations: drafts });
}


/* ----------------------------------------
   Validation
---------------------------------------- */

function getEmailError(email, seenEmails, ownEmail) {
    if (!isValidEmail(email)) {
        return "Enter a valid email address.";
    }

    if (ownEmail && email === ownEmail) {
        return "You're the workspace owner. Enter a teammate's email instead.";
    }

    if (seenEmails.has(email)) {
        return "This email is already in the list.";
    }

    return "";
}


function collectInvitations() {
    const ownEmail = (getSession()?.email || "").toLowerCase();
    const seenEmails = new Set();
    const invitations = [];
    let firstInvalid = null;

    readRows().forEach(({ emailInput, email, role }) => {
        if (isBlank(email)) {
            setFieldError(emailInput, "");

            return;
        }

        const message = getEmailError(email, seenEmails, ownEmail)
            || (INVITE_ROLES.includes(role) ? "" : "Choose a role.");

        setFieldError(emailInput, message);

        if (message) {
            firstInvalid = firstInvalid || emailInput;

            return;
        }

        seenEmails.add(email);
        invitations.push({ email, role });
    });

    return { invitations, firstInvalid };
}


/* ----------------------------------------
   Submit / skip
---------------------------------------- */

function goToComplete(invitations) {
    updateOnboardingState({
        invitations,
        currentStep: 4
    });

    navigateTo(ROUTES.onboardingComplete);
}


const runSubmit = handleAsyncSubmit(inviteForm, {
    onSubmit: async (invitations) => {
        const pending = await createPendingInvitations(invitations);

        showToast(
            `${pending.length} invitation${pending.length === 1 ? "" : "s"} added in demo mode. No emails were sent.`,
            { type: "success" }
        );

        goToComplete(pending);
    },
    loadingText: "Adding invitations...",
    alertElement
});


function handleInviteSubmit(event) {
    event.preventDefault();
    showFormAlert(alertElement, "");

    const { invitations, firstInvalid } = collectInvitations();

    if (firstInvalid) {
        firstInvalid.focus();

        return;
    }

    if (invitations.length === 0) {
        goToComplete([]);

        return;
    }

    runSubmit(invitations);
}


function handleSkip(event) {
    event.preventDefault();
    goToComplete([]);
}


/* ----------------------------------------
   Events
---------------------------------------- */

function handleRowClick(event) {
    const removeButton = event.target.closest("[data-remove-row]");

    if (removeButton) {
        removeRow(removeButton.closest(".tf-invite-row"));
    }
}


function handleRowChange(event) {
    if (event.target.name === "role") {
        event.target.closest(".tf-invite-row").dataset.role = event.target.value;
    }

    saveDraftRows();
}


function handleShareLinkToggle() {
    updateOnboardingState({ shareInviteLink: shareLinkToggle.checked });

    if (shareLinkToggle.checked) {
        showToast("Shareable invite links will be available once TaskFlow is connected to its server.");
    }
}


function restoreRows() {
    const { invitations, shareInviteLink } = getOnboardingState();

    if (invitations.length === 0) {
        addRow();
    } else {
        invitations.forEach((invitation) => addRow(invitation));
    }

    shareLinkToggle.checked = Boolean(shareInviteLink);
}


function initializeInviteTeamPage() {
    if (!inviteForm) {
        return;
    }

    restoreRows();

    addRowButton.addEventListener("click", () => addRow({ focus: true }));
    rowList.addEventListener("click", handleRowClick);
    rowList.addEventListener("change", handleRowChange);
    rowList.addEventListener("input", saveDraftRows);
    skipLink.addEventListener("click", handleSkip);
    shareLinkToggle.addEventListener("change", handleShareLinkToggle);
    inviteForm.addEventListener("submit", handleInviteSubmit);
}


initializeInviteTeamPage();
