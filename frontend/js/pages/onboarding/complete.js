/* ========================================
   STEP 4: GET STARTED
   Shows the real demo onboarding data and finishes
   onboarding, so the next sign-in skips it.
======================================== */

import {
    WORKSPACE_TYPES,
    getOnboardingState,
    resetOnboardingState
} from "./onboarding-state.js";

import { completeOnboarding } from "../../services/mock/mock-workspace-service.js";
import { ROUTES, navigateTo } from "../../core/paths.js";
import { setButtonLoading } from "../../modules/form-state.js";
import { showToast } from "../../modules/toast-manager.js";


const finishButton = document.querySelector("#finish-onboarding");


function renderSummary(state) {
    const workspace = state.workspace;
    const values = {
        name: workspace?.name || state.workspaceName || "My Workspace",
        type: WORKSPACE_TYPES[workspace?.type || state.workspaceType] || "Personal",
        role: "Owner",
        invitations: String(state.invitations.length)
    };

    Object.entries(values).forEach(([key, value]) => {
        document.querySelector(`#summary-${key}`).textContent = value;
    });
}


async function handleFinish() {
    const state = getOnboardingState();

    setButtonLoading(finishButton, true, "Opening workspace...");

    try {
        await completeOnboarding({
            name: state.workspace?.name || state.workspaceName || "My Workspace",
            type: state.workspace?.type || state.workspaceType || "personal"
        });

        resetOnboardingState();
        navigateTo(ROUTES.workspace);
    } catch (error) {
        setButtonLoading(finishButton, false);
        showToast("We couldn't open your workspace. Please try again.", { type: "error" });
    }
}


function initializeCompletePage() {
    if (!finishButton) {
        return;
    }

    const state = getOnboardingState();

    /* Someone landing here without a workspace goes back to the right step. */
    if (!state.workspaceCreated) {
        navigateTo(ROUTES.onboardingStart);

        return;
    }

    renderSummary(state);
    finishButton.addEventListener("click", handleFinish);
}


initializeCompletePage();
