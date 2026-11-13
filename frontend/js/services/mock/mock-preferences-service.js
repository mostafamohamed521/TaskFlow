/* ========================================
   MOCK PREFERENCES SERVICE (demo only)
   Preferences, notification and privacy settings,
   local data export and local data removal.
======================================== */

import { store } from "../../core/storage.js";

import {
    clearAccountSettings,
    getAccountSettings,
    saveSettingsSection
} from "../../modules/settings-state.js";

import { getSession, signOut } from "./mock-auth-service.js";


function wait(milliseconds = 600) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


export async function saveSection(email, section, values) {
    await wait();

    return saveSettingsSection(email, section, values);
}


/* ========================================
   EXPORT (local browser data only)
======================================== */

export function buildExport(email) {
    const session = getSession() || {};
    const settings = getAccountSettings(email);
    const { photo, ...profile } = settings.profile;

    return {
        exportedAt: new Date().toISOString(),
        source: "TaskFlow frontend demo: data stored in this browser only, not a server export.",
        account: {
            name: session.name || "",
            email: session.email || email
        },
        workspace: {
            name: session.workspace || "",
            type: session.workspaceType || "",
            role: session.role || ""
        },
        profile: {
            ...profile,
            hasPhoto: Boolean(photo)
        },
        preferences: settings.preferences,
        notifications: settings.notifications,
        privacy: settings.privacy
    };
}


function flatten(object, prefix = "") {
    return Object.entries(object).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object") {
            return flatten(value, path);
        }

        return [[path, value ?? ""]];
    });
}


function escapeCsv(value) {
    const text = String(value);

    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}


export function toCsv(data) {
    const rows = [["field", "value"], ...flatten(data)];

    return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}


export function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}


export function exportAccountData(email, format) {
    const data = buildExport(email);
    const stamp = new Date().toISOString().slice(0, 10);

    if (format === "csv") {
        downloadFile(`taskflow-account-data-${stamp}.csv`, toCsv(data), "text/csv");

        return;
    }

    downloadFile(`taskflow-account-data-${stamp}.json`, JSON.stringify(data, null, 4), "application/json");
}


/* ========================================
   LOCAL DATA REMOVAL
======================================== */

/** Resets saved settings only. Session and workspace stay. */
export async function clearSavedSettings(email) {
    await wait(500);

    clearAccountSettings(email);
}


/**
 * Demo "delete account": clears this account's local demo data
 * (settings, recorded workspace, onboarding state, session).
 * Other accounts' data in this browser is left untouched.
 */
export async function deleteLocalAccount(email) {
    await wait(800);

    const normalizedEmail = String(email || "").toLowerCase();
    const workspaces = store.get("demo-workspaces") || {};

    delete workspaces[normalizedEmail];
    store.set("demo-workspaces", workspaces);

    clearAccountSettings(normalizedEmail);
    store.remove("onboarding");
    signOut();
}
