/* ========================================
   ONBOARDING STATE
   Single source of truth for the onboarding demo.

   Stored in sessionStorage (cleared when the tab closes).
   Holds only non-sensitive form values: no passwords,
   no tokens. It is never used for authorization.
======================================== */

import { store } from "../../core/storage.js";
import { ROUTES } from "../../core/paths.js";


const STORAGE_KEY = "onboarding";

export const WORKSPACE_TYPES = {
    personal: "Personal",
    freelancer: "Freelancer",
    team: "Team",
    company: "Company"
};

export const INVITE_ROLES = ["Admin", "Member", "Viewer"];

const INITIAL_ONBOARDING_STATE = {
    currentStep: 1,
    workspaceType: null,
    workspaceName: "",
    workspaceDescription: "",
    timeZone: "",
    weekStartsOn: "sunday",
    invitations: [],
    workspace: null,
    workspaceCreated: false,
    onboardingCompleted: false
};


export function getOnboardingState() {
    return {
        ...INITIAL_ONBOARDING_STATE,
        ...(store.get(STORAGE_KEY) || {})
    };
}


export function updateOnboardingState(changes) {
    const nextState = {
        ...getOnboardingState(),
        ...changes
    };

    store.set(STORAGE_KEY, nextState, { session: true });

    return nextState;
}


export function resetOnboardingState() {
    store.remove(STORAGE_KEY);
}


/** Personal workspaces skip the (optional) Invite Team step. */
export function offersTeamInvitations(workspaceType) {
    return workspaceType !== "personal";
}


/** Where an interrupted onboarding should continue. */
export function getOnboardingResumeRoute() {
    const state = getOnboardingState();

    if (!state.workspaceType) {
        return ROUTES.onboardingStart;
    }

    if (!state.workspaceCreated) {
        return ROUTES.createWorkspace;
    }

    if (state.currentStep < 4 && offersTeamInvitations(state.workspaceType)) {
        return ROUTES.inviteTeam;
    }

    return ROUTES.onboardingComplete;
}
