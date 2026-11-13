/* ========================================
   TEAM INVITATION PAGE
   The role is read from the invitation and displayed
   read-only. Nothing on this page can change it.
======================================== */

import {
    acceptInvitation,
    declineInvitation,
    getInvitation
} from "../../services/mock/mock-invitation-service.js";

import { ROUTES, getQueryParam } from "../../core/paths.js";

import {
    bindInvitationActions,
    fillFields,
    showInvitationState
} from "../../modules/invitation-view.js";


const root = document.querySelector('[data-invitation-kind="team"]');


function getStateCopy(invitation) {
    const signInActions = [
        { label: "Sign In", href: ROUTES.login, variant: "primary" },
        { label: "Create Account", href: ROUTES.register }
    ];

    return {
        "new-account": {
            variant: "info",
            title: "Sign in or create an account to accept",
            message: `This invitation was sent to ${invitation.invitedEmail}. Sign in with that address, or create an account and verify it first.`,
            actions: signInActions,
            disableCard: false
        },
        expired: {
            variant: "warning",
            title: "This invitation has expired",
            message: `Ask ${invitation.inviterName} to send you a new invitation to ${invitation.workspaceName}.`,
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        },
        revoked: {
            variant: "error",
            title: "This invitation is no longer available",
            message: "The workspace admin has withdrawn this invitation. Contact them if you think this is a mistake.",
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        },
        accepted: {
            variant: "success",
            title: "You're already a member",
            message: `This invitation has already been accepted. Open ${invitation.workspaceName} to continue.`,
            actions: [{ label: "Open Workspace", href: ROUTES.workspace, variant: "primary" }],
            disableCard: false
        },
        mismatch: {
            variant: "warning",
            title: "This invitation is for a different email",
            message: `You're signed in with another account, but this invitation was sent to ${invitation.invitedEmail}. Sign in with that address to accept it.`,
            actions: [{ label: "Sign In With Another Account", href: ROUTES.login, variant: "primary" }]
        }
    };
}


async function initializeTeamInvitationPage() {
    if (!root) {
        return;
    }

    const invitation = await getInvitation("team", getQueryParam("state"));
    const stateCopy = getStateCopy(invitation);

    fillFields(root, invitation);

    if (invitation.state !== "pending") {
        showInvitationState(root, stateCopy[invitation.state]);

        return;
    }

    bindInvitationActions(root, {
        onAccept: () => acceptInvitation(invitation),
        onDecline: () => declineInvitation(invitation),
        acceptedState: {
            variant: "success",
            title: "Invitation accepted",
            message: `You've joined ${invitation.workspaceName} as a ${invitation.role}.`,
            actions: [{ label: "Go to Workspace", href: ROUTES.workspace, variant: "primary" }],
            disableCard: false
        },
        declinedState: {
            variant: "info",
            title: "Invitation declined",
            message: `We'll let ${invitation.inviterName} know you won't be joining right now. (Demo: no notification is sent.)`,
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        }
    });
}


initializeTeamInvitationPage();
