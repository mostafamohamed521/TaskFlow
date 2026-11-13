/* ========================================
   STEP 2: CREATE WORKSPACE
   Form + live preview. Values are saved as the user
   types, so Back / refresh never loses them.
======================================== */

import {
    WORKSPACE_TYPES,
    getOnboardingState,
    offersTeamInvitations,
    updateOnboardingState
} from "./onboarding-state.js";

import { createWorkspace } from "../../services/mock/mock-workspace-service.js";
import { ROUTES, navigateTo } from "../../core/paths.js";

import {
    applyFormErrors,
    enableLiveValidation,
    isBlank
} from "../../modules/form-validation.js";

import { handleAsyncSubmit } from "../../modules/form-state.js";
import { initCharacterCounters } from "../../modules/char-counter.js";

import {
    ensureTimeZoneOption,
    getBrowserTimeZone
} from "../../modules/time-zones.js";


const NAME_MAX_LENGTH = 60;
const DESCRIPTION_MAX_LENGTH = 250;
const PREVIEW_FALLBACK_NAME = "My Workspace";

const workspaceForm = document.querySelector("#create-workspace-form");
const previewName = document.querySelector("#preview-name");
const previewType = document.querySelector("#preview-type");


/* ----------------------------------------
   Values + validation
---------------------------------------- */

function getWorkspaceValues() {
    const fields = workspaceForm.elements;

    return {
        name: fields.name.value.trim(),
        type: fields.type.value,
        description: fields.description.value.trim(),
        timeZone: fields.timeZone.value,
        weekStartsOn: fields.weekStart.value
    };
}


function validateWorkspace(values) {
    const errors = {};

    if (isBlank(values.name)) {
        errors.name = "Workspace name is required.";
    } else if (values.name.length < 2 || values.name.length > NAME_MAX_LENGTH) {
        errors.name = `Use between 2 and ${NAME_MAX_LENGTH} characters.`;
    }

    if (!WORKSPACE_TYPES[values.type]) {
        errors.type = "Choose a workspace type.";
    }

    if (!values.timeZone) {
        errors.timeZone = "Choose a time zone.";
    }

    if (values.description.length > DESCRIPTION_MAX_LENGTH) {
        errors.description = `Keep the description under ${DESCRIPTION_MAX_LENGTH} characters.`;
    }

    return errors;
}


/* ----------------------------------------
   State + preview
---------------------------------------- */

function restoreValues() {
    const state = getOnboardingState();
    const fields = workspaceForm.elements;
    const timeZone = state.timeZone || getBrowserTimeZone();

    ensureTimeZoneOption(fields.timeZone, timeZone);

    fields.name.value = state.workspaceName;
    fields.type.value = state.workspaceType || "personal";
    fields.description.value = state.workspaceDescription;
    fields.timeZone.value = timeZone || fields.timeZone.options[0].value;
    fields.weekStart.value = state.weekStartsOn;
}


function saveFormState() {
    const values = getWorkspaceValues();

    updateOnboardingState({
        workspaceName: values.name,
        workspaceType: values.type,
        workspaceDescription: values.description,
        timeZone: values.timeZone,
        weekStartsOn: values.weekStartsOn
    });
}


function updatePreview() {
    const values = getWorkspaceValues();

    previewName.textContent = values.name || PREVIEW_FALLBACK_NAME;
    previewType.textContent = WORKSPACE_TYPES[values.type] || "";
}


/* ----------------------------------------
   Submit
---------------------------------------- */

const runSubmit = handleAsyncSubmit(workspaceForm, {
    onSubmit: async () => {
        const values = getWorkspaceValues();
        const workspace = await createWorkspace(values);
        const nextRoute = offersTeamInvitations(values.type)
            ? ROUTES.inviteTeam
            : ROUTES.onboardingComplete;

        updateOnboardingState({
            workspace,
            workspaceCreated: true,
            currentStep: nextRoute === ROUTES.inviteTeam ? 3 : 4
        });

        navigateTo(nextRoute);
    },
    loadingText: "Creating workspace...",
    alertElement: document.querySelector("#workspace-alert")
});


function handleWorkspaceSubmit(event) {
    event.preventDefault();

    if (!applyFormErrors(workspaceForm, validateWorkspace(getWorkspaceValues()))) {
        return;
    }

    runSubmit();
}


function handleFormChange() {
    saveFormState();
    updatePreview();
}


function initializeCreateWorkspacePage() {
    if (!workspaceForm) {
        return;
    }

    restoreValues();
    initCharacterCounters(workspaceForm);
    updatePreview();

    workspaceForm.addEventListener("input", handleFormChange);
    workspaceForm.addEventListener("change", handleFormChange);
    workspaceForm.addEventListener("submit", handleWorkspaceSubmit);

    enableLiveValidation(workspaceForm, validateWorkspace, getWorkspaceValues);
}


initializeCreateWorkspacePage();
