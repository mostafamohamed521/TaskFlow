/* ========================================
   MOCK INVITATION SERVICE (demo only)

   Team invitations and client invitations are deliberately
   separate: team members join an internal workspace,
   clients only get the Client Portal.

   The role comes from the invitation (set by the inviter).
   The recipient can never change it here, and a real
   backend must enforce that again on the server.
======================================== */

import { store } from "../../core/storage.js";
import { getSession, updateSession } from "./mock-auth-service.js";


/* Scenarios that can be previewed with ?state=<name> */
export const INVITATION_STATES = [
    "pending",
    "new-account",
    "expired",
    "revoked",
    "accepted",
    "mismatch"
];

const TEAM_INVITATION = {
    kind: "team",
    inviterName: "Ahmed Aymen",
    workspaceName: "Globiq Team",
    workspaceSummary: "Product Development Team",
    memberCount: "12",
    projectCount: "5",
    role: "Member",
    roleLabel: "Team Member",
    invitedEmail: "team@demo.example"
};

const CLIENT_INVITATION = {
    kind: "client",
    organizationName: "Globiq Team",
    teamName: "Globiq",
    projectName: "Globiq Project",
    projectSummary: "Trade Document Agent \u2013 MVP",
    duration: "Nov 10, 2026 \u2013 Jan 31, 2027",
    invitedEmail: "client@demo.example"
};

function wait(milliseconds = 700) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


function resolveState(requestedState, invitation) {
    if (INVITATION_STATES.includes(requestedState)) {
        return requestedState;
    }

    const session = getSession();

    if (!session) {
        return "new-account";
    }

    if (session.email && session.email !== invitation.invitedEmail) {
        return "mismatch";
    }

    return "pending";
}


export async function getInvitation(kind, requestedState) {
    await wait(300);

    const invitation = kind === "client" ? CLIENT_INVITATION : TEAM_INVITATION;

    return {
        ...invitation,
        state: resolveState(requestedState, invitation)
    };
}


export async function acceptInvitation(invitation) {
    await wait();

    if (invitation.kind === "client") {
        updateSession({
            email: invitation.invitedEmail,
            workspaceType: "client",
            workspace: null,
            clientProject: invitation.projectName
        });

        return;
    }

    updateSession({
        email: invitation.invitedEmail,
        workspaceType: "team",
        workspace: invitation.workspaceName,
        role: invitation.role.toLowerCase()
    });
}


export async function declineInvitation(invitation) {
    await wait(500);

    store.set(`declined-${invitation.kind}-invitation`, { declined: true }, { session: true });
}


/* ========================================
   ONBOARDING: PENDING TEAM INVITATIONS
   Returns demo records only. No email is sent.
======================================== */

export async function createPendingInvitations(invitations) {
    await wait(600);

    return invitations.map((invitation, index) => ({
        id: `demo-invite-${index + 1}`,
        email: invitation.email,
        role: invitation.role,
        status: "pending"
    }));
}
