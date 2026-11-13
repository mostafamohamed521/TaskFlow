/* ========================================
   ACCOUNT MANAGEMENT
   Export dialog, ownership explanation and the
   delete-account confirmation (demo: local data only).
======================================== */

import { initAppShell } from "../../core/app-shell.js";
import { initModals, openModal } from "../../modules/modal-manager.js";
import { setButtonLoading } from "../../modules/form-state.js";
import { setFieldError } from "../../modules/form-validation.js";
import { showToast } from "../../modules/toast-manager.js";
import { getQueryParam } from "../../core/paths.js";

import {
    deleteLocalAccount,
    exportAccountData
} from "../../services/mock/mock-preferences-service.js";


const CONFIRMATION_WORD = "DELETE";

const exportForm = document.querySelector("#export-form");
const deleteForm = document.querySelector("#delete-form");
const deleteInput = document.querySelector("#delete-confirm");
const deleteButton = document.querySelector("#delete-submit");

let context = null;


function handleExportSubmit(event) {
    event.preventDefault();

    exportAccountData(context.email, exportForm.elements.format.value);
    showToast("Download started. It contains data from this browser only.", { type: "success" });
}


function updateDeleteButton() {
    deleteButton.disabled = deleteInput.value.trim() !== CONFIRMATION_WORD;
    setFieldError(deleteInput, "");
}


async function handleDeleteSubmit(event) {
    event.preventDefault();

    if (deleteInput.value.trim() !== CONFIRMATION_WORD) {
        setFieldError(deleteInput, `Type ${CONFIRMATION_WORD} in capital letters to confirm.`);
        deleteInput.focus();

        return;
    }

    setButtonLoading(deleteButton, true, "Deleting...");
    await deleteLocalAccount(context.email);
    window.location.assign("../../../index.html");
}


function initDeleteDialog() {
    const modal = document.querySelector("#delete-modal");

    deleteInput.addEventListener("input", updateDeleteButton);
    deleteForm.addEventListener("submit", handleDeleteSubmit);

    modal.addEventListener("tf:modal-open", () => {
        deleteForm.reset();
        updateDeleteButton();
    });
}


function initializeAccountPage() {
    context = initAppShell();

    if (!context) {
        return;
    }

    initModals();
    initDeleteDialog();
    exportForm.addEventListener("submit", handleExportSubmit);

    /* Security's "Delete Account" links here so the logic lives in one place. */
    if (getQueryParam("action") === "delete") {
        openModal("delete-modal", document.querySelector('[data-modal-open="delete-modal"]'));
    }
}


initializeAccountPage();
