/* ========================================
   MOCK PROFILE SERVICE (demo only)
   Saves profile details in this browser. The photo is
   resized locally and kept as a small data URL; it is
   never uploaded.
======================================== */

import { getAccountSettings, saveSettingsSection } from "../../modules/settings-state.js";
import { updateSession } from "./mock-auth-service.js";


const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const PHOTO_SIZE = 320;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];


function wait(milliseconds = 700) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


export function validatePhoto(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return "Choose a PNG, JPG or WebP image.";
    }

    if (file.size > MAX_PHOTO_BYTES) {
        return "Choose an image smaller than 2 MB.";
    }

    return "";
}


function loadImage(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("This image could not be read."));
        };

        image.src = url;
    });
}


/** Crops to a centered square and returns a compact JPEG data URL. */
export async function preparePhoto(file) {
    const image = await loadImage(file);
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    const canvas = document.createElement("canvas");

    canvas.width = PHOTO_SIZE;
    canvas.height = PHOTO_SIZE;

    canvas.getContext("2d").drawImage(
        image,
        (image.naturalWidth - side) / 2,
        (image.naturalHeight - side) / 2,
        side,
        side,
        0,
        0,
        PHOTO_SIZE,
        PHOTO_SIZE
    );

    return canvas.toDataURL("image/jpeg", 0.85);
}


export async function saveProfile(email, profile, timeZone) {
    await wait();

    const settings = getAccountSettings(email);

    saveSettingsSection(email, "profile", profile);
    saveSettingsSection(email, "preferences", {
        ...settings.preferences,
        timeZone
    });

    updateSession({ name: profile.fullName });
}
