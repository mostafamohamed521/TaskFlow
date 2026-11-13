/* ========================================
   MOCK WORKSPACE SERVICE (demo only)

   Returns predictable demo objects. Nothing is sent to a
   server and no real workspace or permission is created.
   Replace these bodies with API calls later.
======================================== */

import { store } from "../../core/storage.js";
import { getSession, updateSession } from "./mock-auth-service.js";


const COMPLETED_WORKSPACES_KEY = "demo-workspaces";


function wait(milliseconds = 700) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


/** Creates the demo workspace. The creator is always the Owner. */
export async function createWorkspace(details) {
    await wait();

    return {
        id: "demo-workspace-001",
        name: details.name,
        type: details.type,
        description: details.description,
        timeZone: details.timeZone,
        weekStartsOn: details.weekStartsOn,
        role: "owner",
        memberCount: 1,
        projectCount: 0,
        taskCount: 0
    };
}


/**
 * Marks onboarding as finished for the demo account, so the
 * next demo sign-in goes straight to the workspace.
 */
export async function completeOnboarding(workspace) {
    await wait(400);

    const session = getSession() || {};
    const completed = store.get(COMPLETED_WORKSPACES_KEY) || {};

    updateSession({
        workspaceType: workspace.type,
        workspace: workspace.name,
        role: "owner"
    });

    if (session.email) {
        completed[session.email] = {
            name: workspace.name,
            type: workspace.type
        };

        store.set(COMPLETED_WORKSPACES_KEY, completed);
    }
}


/** Workspace saved for an email by a finished demo onboarding, if any. */
export function getCompletedWorkspace(email) {
    const completed = store.get(COMPLETED_WORKSPACES_KEY) || {};

    return completed[String(email || "").toLowerCase()] || null;
}
