/* ========================================
   MY PROFILE
======================================== */

import { initAppShell, getAccountContext, renderAccount } from "../../core/app-shell.js";
import { getAccountSettings } from "../../modules/settings-state.js";
import { preparePhoto, saveProfile, validatePhoto } from "../../services/mock/mock-profile-service.js";
import { ensureTimeZoneOption, getBrowserTimeZone } from "../../modules/time-zones.js";

import {
    applyFormErrors,
    enableLiveValidation,
    isBlank,
    setFieldError
} from "../../modules/form-validation.js";

import { handleAsyncSubmit, trackFormChanges } from "../../modules/form-state.js";
import { initCharacterCounters } from "../../modules/char-counter.js";
import { showToast } from "../../modules/toast-manager.js";


const PHONE_PATTERN = /^[+()\d\s-]{6,20}$/;

const profileForm = document.querySelector("#profile-form");
const photoInput = document.querySelector("#profile-photo-input");
const removePhotoButton = document.querySelector("#remove-photo-button");
const cancelButton = document.querySelector('[data-action="cancel"]');
const saveButton = document.querySelector('[type="submit"][form="profile-form"]');
const statusOutput = document.querySelector("#profile-status");

let context = null;
let pendingPhoto;
let changeTracker = null;


/* ----------------------------------------
   Values + validation
---------------------------------------- */

function readProfileValues() {
    const fields = profileForm.elements;

    return {
        fullName: fields.fullName.value.trim(),
        jobTitle: fields.jobTitle.value.trim(),
        phone: fields.phone.value.trim(),
        location: fields.location.value.trim(),
        bio: fields.bio.value.trim(),
        timeZone: fields.timeZone.value
    };
}


function validateProfile(values) {
    const errors = {};

    if (isBlank(values.fullName)) {
        errors.fullName = "Full name is required.";
    } else if (values.fullName.length < 2) {
        errors.fullName = "Enter at least 2 characters.";
    }

    if (values.phone && !PHONE_PATTERN.test(values.phone)) {
        errors.phone = "Enter a valid phone number, for example +20 100 000 0000.";
    }

    return errors;
}


/* ----------------------------------------
   Form state
---------------------------------------- */

function fillForm() {
    const settings = getAccountSettings(context.email);
    const fields = profileForm.elements;
    const timeZone = settings.preferences.timeZone || getBrowserTimeZone();

    ensureTimeZoneOption(fields.timeZone, timeZone);

    fields.fullName.value = settings.profile.fullName || context.session.name || "";
    fields.email.value = context.email;
    fields.jobTitle.value = settings.profile.jobTitle;
    fields.phone.value = settings.profile.phone;
    fields.location.value = settings.profile.location;
    fields.bio.value = settings.profile.bio;
    fields.timeZone.value = timeZone || fields.timeZone.options[0].value;

    fields.bio.dispatchEvent(new Event("input"));
    pendingPhoto = undefined;
    applyFormErrors(profileForm, {});
    updatePhotoControls(settings.profile.photo);
}


function setDirty(isDirty) {
    const hasChanges = isDirty || pendingPhoto !== undefined;

    saveButton.disabled = !hasChanges;
    cancelButton.disabled = !hasChanges;
    statusOutput.textContent = hasChanges ? "You have unsaved changes." : "";
}


/* ----------------------------------------
   Photo (local preview until saved)
---------------------------------------- */

function updatePhotoControls(photo) {
    removePhotoButton.hidden = !photo;

    renderAccount({
        ...getAccountContext(),
        photo
    });
}


async function handlePhotoChange() {
    const file = photoInput.files[0];

    photoInput.value = "";

    if (!file) {
        return;
    }

    const error = validatePhoto(file);

    setFieldError(photoInput, error);

    if (error) {
        return;
    }

    try {
        pendingPhoto = await preparePhoto(file);
        updatePhotoControls(pendingPhoto);
        setDirty(true);
        showToast("Photo ready. Save changes to keep it.");
    } catch (readError) {
        setFieldError(photoInput, readError.message);
    }
}


function handleRemovePhoto() {
    pendingPhoto = null;
    updatePhotoControls(null);
    setDirty(true);
}


/* ----------------------------------------
   Save / cancel
---------------------------------------- */

const runSave = handleAsyncSubmit(profileForm, {
    onSubmit: async () => {
        const values = readProfileValues();
        const current = getAccountSettings(context.email).profile;
        const photo = pendingPhoto === undefined ? current.photo : pendingPhoto;

        await saveProfile(
            context.email,
            {
                fullName: values.fullName,
                jobTitle: values.jobTitle,
                phone: values.phone,
                location: values.location,
                bio: values.bio,
                photo
            },
            values.timeZone
        );

        context = getAccountContext();
        renderAccount(context);
        fillForm();
        changeTracker.markClean();
        showToast("Profile updated successfully!", { type: "success" });
    },
    loadingText: "Saving..."
});


function handleProfileSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(profileForm, validateProfile(readProfileValues()))) {
        showToast("Please fix the highlighted fields.", { type: "error" });

        return;
    }

    runSave();
}


function handleCancel() {
    fillForm();
    changeTracker.markClean();
    showToast("Changes discarded.");
}


function initializeProfilePage() {
    context = initAppShell();

    if (!context || !profileForm) {
        return;
    }

    initCharacterCounters(profileForm);
    fillForm();

    changeTracker = trackFormChanges(profileForm, setDirty);
    changeTracker.markClean();

    enableLiveValidation(profileForm, validateProfile, readProfileValues);

    profileForm.addEventListener("submit", handleProfileSubmit);
    cancelButton.addEventListener("click", handleCancel);
    photoInput.addEventListener("change", handlePhotoChange);
    removePhotoButton.addEventListener("click", handleRemovePhoto);

    if (window.location.hash === "#profile-photo-input") {
        document.querySelector(".tf-profile-card__camera")?.focus();
    }
}


initializeProfilePage();
