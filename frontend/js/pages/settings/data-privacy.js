/* ========================================
   DATA & PRIVACY
======================================== */

import { initAppShell, renderAccount } from "../../core/app-shell.js";
import { closeModal, initModals } from "../../modules/modal-manager.js";
import { getAccountSettings } from "../../modules/settings-state.js";
import { setButtonLoading } from "../../modules/form-state.js";
import { showToast } from "../../modules/toast-manager.js";
import { initSettingsForm } from "./settings-form.js";

import {
    clearSavedSettings,
    exportAccountData
} from "../../services/mock/mock-preferences-service.js";

import { previewTheme, getThemePreference } from "../../modules/theme.js";


const privacyForm = document.querySelector("#privacy-form");

let context = null;
let tracker = null;


function fillPrivacy(values) {
    privacyForm.elements.profileVisibility.value = values.profileVisibility;
    privacyForm.elements.showActivity.checked = values.showActivity;
}


function readPrivacy() {
    return {
        profileVisibility: privacyForm.elements.profileVisibility.value,
        showActivity: privacyForm.elements.showActivity.checked
    };
}


function initDownloads() {
    document.querySelector("#download-json").addEventListener("click", () => {
        exportAccountData(context.email, "json");
        showToast("JSON download started. It contains data from this browser only.", { type: "success" });
    });

    document.querySelector("#download-csv").addEventListener("click", () => {
        exportAccountData(context.email, "csv");
        showToast("CSV download started. It contains data from this browser only.", { type: "success" });
    });
}


function initClearData() {
    const confirmButton = document.querySelector("#clear-data-confirm");

    confirmButton.addEventListener("click", async () => {
        setButtonLoading(confirmButton, true, "Deleting...");
        await clearSavedSettings(context.email);
        setButtonLoading(confirmButton, false);
        closeModal("clear-data-modal");

        fillPrivacy(getAccountSettings(context.email).privacy);
        tracker.markClean();
        renderAccount();
        previewTheme(getThemePreference());

        showToast("Your saved settings were reset in this browser.", { type: "success" });
    });
}


function initializeDataPrivacyPage() {
    context = initAppShell();

    if (!context || !privacyForm) {
        return;
    }

    initModals();

    tracker = initSettingsForm({
        form: privacyForm,
        section: "privacy",
        email: context.email,
        fill: fillPrivacy,
        read: readPrivacy,
        statusElement: document.querySelector("#privacy-status"),
        successMessage: "Privacy settings saved."
    });

    initDownloads();
    initClearData();
}


initializeDataPrivacyPage();
