/* ========================================
   STEP 1: CHOOSE WORKSPACE TYPE
   Radio-group cards. Saves the choice only;
   no workspace is created yet.
======================================== */

import {
    getOnboardingState,
    updateOnboardingState
} from "./onboarding-state.js";

import { ROUTES, navigateTo } from "../../core/paths.js";


const typeForm = document.querySelector("#choose-type-form");
const errorElement = document.querySelector("#workspace-type-error");
const typeFieldset = document.querySelector(".tf-type-grid");


function restoreSelection() {
    const { workspaceType } = getOnboardingState();
    const savedOption = workspaceType
        ? typeForm.querySelector(`[name="workspaceType"][value="${workspaceType}"]`)
        : null;

    if (savedOption) {
        savedOption.checked = true;
    }
}


function showSelectionError(message) {
    errorElement.textContent = message;
    typeFieldset.setAttribute("aria-invalid", message ? "true" : "false");
}


function handleTypeSubmit(event) {
    event.preventDefault();

    const selectedType = typeForm.elements.workspaceType.value;

    if (!selectedType) {
        showSelectionError("Choose the option that best describes how you'll use TaskFlow.");
        typeForm.querySelector('[name="workspaceType"]').focus();

        return;
    }

    updateOnboardingState({
        workspaceType: selectedType,
        currentStep: 2
    });

    navigateTo(ROUTES.createWorkspace);
}


function initializeChooseTypePage() {
    if (!typeForm) {
        return;
    }

    restoreSelection();

    typeForm.addEventListener("submit", handleTypeSubmit);
    typeForm.addEventListener("change", () => {
        showSelectionError("");
        updateOnboardingState({ workspaceType: typeForm.elements.workspaceType.value });
    });
}


initializeChooseTypePage();
