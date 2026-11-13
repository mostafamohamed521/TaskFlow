/* ========================================
   NOTIFICATION SETTINGS
   Saved as preferences. Mobile Push is unavailable;
   email delivery needs the TaskFlow server.
======================================== */

import { initAppShell } from "../../core/app-shell.js";
import { initSettingsForm } from "./settings-form.js";


const TYPE_KEYS = ["taskUpdates", "projectUpdates", "teamActivity", "mentions", "calendar", "reports"];

const notificationsForm = document.querySelector("#notifications-form");


function fillNotifications(values) {
    const fields = notificationsForm.elements;

    fields["channel-email"].checked = values.channels.email;
    fields["channel-inApp"].checked = values.channels.inApp;
    fields["channel-push"].checked = false;

    TYPE_KEYS.forEach((key) => {
        fields[key].checked = values.types[key];
    });
}


function readNotifications() {
    const fields = notificationsForm.elements;

    return {
        channels: {
            email: fields["channel-email"].checked,
            inApp: fields["channel-inApp"].checked,
            push: false
        },
        types: Object.fromEntries(TYPE_KEYS.map((key) => [key, fields[key].checked]))
    };
}


function initializeNotificationsPage() {
    const context = initAppShell();

    if (!context || !notificationsForm) {
        return;
    }

    initSettingsForm({
        form: notificationsForm,
        section: "notifications",
        email: context.email,
        fill: fillNotifications,
        read: readNotifications,
        statusElement: document.querySelector("#notifications-status"),
        successMessage: "Notification settings saved. Delivery starts once the server is connected."
    });
}


initializeNotificationsPage();
