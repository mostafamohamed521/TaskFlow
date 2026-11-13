/* ========================================
   APP PREFERENCES
   Theme previews immediately and is applied on save
   (Cancel restores it). Date / time format and time
   zone drive how dates are shown in the app.
======================================== */

import { initAppShell, renderAccount } from "../../core/app-shell.js";
import { formatDateTime } from "../../modules/settings-state.js";
import { getThemePreference, previewTheme, saveTheme } from "../../modules/theme.js";
import { ensureTimeZoneOption, getBrowserTimeZone } from "../../modules/time-zones.js";
import { initSettingsForm } from "./settings-form.js";


const preferencesForm = document.querySelector("#preferences-form");
const exampleOutput = document.querySelector("#pref-date-example");


function fillPreferences(values) {
    const fields = preferencesForm.elements;
    const timeZone = values.timeZone || getBrowserTimeZone();

    ensureTimeZoneOption(fields.timeZone, timeZone);

    fields.theme.value = getThemePreference();
    fields.language.value = values.language;
    fields.timeZone.value = timeZone || fields.timeZone.options[0].value;
    fields.dateFormat.value = values.dateFormat;
    fields.timeFormat.value = values.timeFormat;
    fields.weekStart.value = values.weekStart;
    fields.defaultView.value = values.defaultView;
    fields.emailDigest.checked = values.emailDigest;

    previewTheme(fields.theme.value);
    renderExample();
}


function readPreferences() {
    const fields = preferencesForm.elements;

    return {
        theme: fields.theme.value,
        language: fields.language.value,
        timeZone: fields.timeZone.value,
        dateFormat: fields.dateFormat.value,
        timeFormat: fields.timeFormat.value,
        weekStart: fields.weekStart.value,
        defaultView: fields.defaultView.value,
        emailDigest: fields.emailDigest.checked
    };
}


function renderExample() {
    exampleOutput.textContent = `e.g., ${formatDateTime(new Date(), readPreferences())}`;
}


function handleFormChange(event) {
    if (event.target.name === "theme") {
        previewTheme(event.target.value);
    }

    renderExample();
}


function initializePreferencesPage() {
    const context = initAppShell();

    if (!context || !preferencesForm) {
        return;
    }

    initSettingsForm({
        form: preferencesForm,
        section: "preferences",
        email: context.email,
        fill: fillPreferences,
        read: readPreferences,
        statusElement: document.querySelector("#preferences-status"),
        successMessage: "Preferences saved.",
        onSaved: (values) => {
            saveTheme(values.theme);
            renderAccount();
        },
        onCancel: () => previewTheme(getThemePreference())
    });

    preferencesForm.addEventListener("change", handleFormChange);
}


initializePreferencesPage();
