/* ========================================
   CLIENT INVITATION PAGE
   Clients are never added to the internal workspace.
   Accepting leads to the Client Portal only.
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


const root = document.querySelector('[data-invitation-kind="client"]');


function getStateCopy(invitation) {
    return {
        "new-account": {
            variant: "info",
            title: "Sign in or create an account to accept",
            message: `This invitation was sent to ${invitation.invitedEmail}. Sign in with that address, or create an account and verify it first.`,
            actions: [
                { label: "Sign In", href: ROUTES.login, variant: "primary" },
                { label: "Create Account", href: ROUTES.register }
            ],
            disableCard: false
        },
        expired: {
            variant: "warning",
            title: "This invitation has expired",
            message: `Ask ${invitation.organizationName} to send you a new project invitation.`,
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        },
        revoked: {
            variant: "error",
            title: "This invitation is no longer available",
            message: `${invitation.organizationName} has withdrawn access to this project.`,
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        },
        accepted: {
            variant: "success",
            title: "Invitation already accepted",
            message: `You can already follow ${invitation.projectName} in your Client Portal.`,
            actions: [{ label: "Open Client Portal", href: ROUTES.clientPortal, variant: "primary" }],
            disableCard: false
        },
        mismatch: {
            variant: "warning",
            title: "This invitation is for a different email",
            message: `This invitation was sent to ${invitation.invitedEmail}. Sign in with that address to accept it.`,
            actions: [{ label: "Sign In With Another Account", href: ROUTES.login, variant: "primary" }]
        }
    };
}


async function initializeClientInvitationPage() {
    if (!root) {
        return;
    }

    const invitation = await getInvitation("client", getQueryParam("state"));

    fillFields(root, invitation);

    if (invitation.state !== "pending") {
        showInvitationState(root, getStateCopy(invitation)[invitation.state]);

        return;
    }

    bindInvitationActions(root, {
        onAccept: () => acceptInvitation(invitation),
        onDecline: () => declineInvitation(invitation),
        acceptedState: {
            variant: "success",
            title: "Invitation accepted",
            message: `You can now follow ${invitation.projectName} in your Client Portal.`,
            actions: [{ label: "Open Client Portal", href: ROUTES.clientPortal, variant: "primary" }],
            disableCard: false
        },
        declinedState: {
            variant: "info",
            title: "Invitation declined",
            message: `You won't have access to ${invitation.projectName}. (Demo: no notification is sent.)`,
            actions: [{ label: "Back to Home", href: ROUTES.home }]
        }
    });
}


initializeClientInvitationPage();
