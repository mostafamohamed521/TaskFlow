/* ========================================
   SETTINGS FORM HELPER
   Shared Save / Cancel behavior for the settings
   pages that edit one section of the account settings
   (Preferences, Notifications, Privacy).
======================================== */

import { getAccountSettings } from "../../modules/settings-state.js";
import { saveSection } from "../../services/mock/mock-preferences-service.js";
import { handleAsyncSubmit, trackFormChanges } from "../../modules/form-state.js";
import { showToast } from "../../modules/toast-manager.js";


/**
 * @param {object} options
 *   form, section, email,
 *   fill(values)      - writes saved values into the form
 *   read()            - reads values from the form
 *   successMessage, statusElement,
 *   onSaved(values), onCancel()
 */
export function initSettingsForm(options) {
    const { form, section, email, fill, read, successMessage, statusElement } = options;

    const saveButton = document.querySelector(`[type="submit"][form="${form.id}"]`) || form.querySelector('[type="submit"]');
    const cancelButton = document.querySelector(`[data-action="cancel"][form="${form.id}"]`) || form.querySelector('[data-action="cancel"]');

    const setDirty = (isDirty) => {
        saveButton.disabled = !isDirty;
        cancelButton.disabled = !isDirty;

        if (statusElement) {
            statusElement.textContent = isDirty ? "You have unsaved changes." : "";
        }
    };

    fill(getAccountSettings(email)[section]);

    const tracker = trackFormChanges(form, setDirty);

    tracker.markClean();

    const runSave = handleAsyncSubmit(form, {
        onSubmit: async () => {
            const values = read();

            await saveSection(email, section, values);
            tracker.markClean();
            options.onSaved?.(values);
            showToast(successMessage, { type: "success" });
        },
        loadingText: "Saving..."
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        runSave();
    });

    cancelButton.addEventListener("click", () => {
        fill(getAccountSettings(email)[section]);
        tracker.markClean();
        options.onCancel?.();
        showToast("Changes discarded.");
    });

    window.addEventListener("beforeunload", (event) => {
        if (tracker.isDirty()) {
            event.preventDefault();
        }
    });

    return tracker;
}
