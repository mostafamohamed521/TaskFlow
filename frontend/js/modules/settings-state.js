/* ========================================
   SETTINGS STATE
   Account-level settings for the signed-in demo
   account, stored per email in localStorage
   ("tf:settings:<email>"). Non-sensitive values only:
   no passwords, no tokens.
======================================== */

import { store } from "../core/storage.js";


const DEFAULT_SETTINGS = {
    profile: {
        fullName: "",
        jobTitle: "",
        phone: "",
        location: "",
        bio: "",
        photo: null
    },

    preferences: {
        theme: "system",
        language: "en",
        timeZone: "",
        dateFormat: "DD MMM, YYYY",
        timeFormat: "12",
        weekStart: "sunday",
        defaultView: "overview",
        emailDigest: true
    },

    notifications: {
        channels: {
            email: true,
            inApp: true,
            push: false
        },

        types: {
            taskUpdates: true,
            projectUpdates: true,
            teamActivity: true,
            mentions: true,
            calendar: true,
            reports: false
        }
    },

    privacy: {
        profileVisibility: "workspace",
        showActivity: true
    },

    pendingEmail: null
};


function storageKey(email) {
    return `settings:${String(email || "guest").toLowerCase()}`;
}


function mergeDeep(base, override) {
    if (!override || typeof override !== "object") {
        return structuredClone(base);
    }

    const result = structuredClone(base);

    Object.entries(override).forEach(([key, value]) => {
        const isNested = value && typeof value === "object" && !Array.isArray(value)
            && result[key] && typeof result[key] === "object";

        result[key] = isNested ? mergeDeep(result[key], value) : value;
    });

    return result;
}


export function getAccountSettings(email) {
    return mergeDeep(DEFAULT_SETTINGS, store.get(storageKey(email)));
}


export function saveSettingsSection(email, section, values) {
    const settings = getAccountSettings(email);

    settings[section] = values;
    store.set(storageKey(email), settings);

    return settings;
}


export function clearAccountSettings(email) {
    store.remove(storageKey(email));
}


/* ========================================
   DATE + TIME FORMATTING (uses preferences)
======================================== */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function getDateParts(date, timeZone) {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hourCycle: "h23"
    };

    if (timeZone) {
        options.timeZone = timeZone;
    }

    const parts = {};

    new Intl.DateTimeFormat("en-US", options).formatToParts(date).forEach((part) => {
        parts[part.type] = part.value;
    });

    return parts;
}


export function formatDate(date, preferences) {
    const parts = getDateParts(date, preferences.timeZone);
    const day = parts.day.padStart(2, "0");
    const month = parts.month.padStart(2, "0");

    const formats = {
        "DD MMM, YYYY": `${day} ${MONTHS[Number(parts.month) - 1]}, ${parts.year}`,
        "DD/MM/YYYY": `${day}/${month}/${parts.year}`,
        "MM/DD/YYYY": `${month}/${day}/${parts.year}`,
        "YYYY-MM-DD": `${parts.year}-${month}-${day}`
    };

    return formats[preferences.dateFormat] || formats["DD MMM, YYYY"];
}


export function formatTime(date, preferences) {
    const parts = getDateParts(date, preferences.timeZone);
    const hours = Number(parts.hour);

    if (preferences.timeFormat === "24") {
        return `${String(hours).padStart(2, "0")}:${parts.minute}`;
    }

    const hour12 = hours % 12 || 12;

    return `${String(hour12).padStart(2, "0")}:${parts.minute} ${hours < 12 ? "AM" : "PM"}`;
}


export function formatDateTime(date, preferences) {
    return `${formatDate(date, preferences)}, ${formatTime(date, preferences)}`;
}
