/* ========================================
   INVITATION VIEW
   Shared rendering for the Team and Client invitation
   pages. Each page supplies its own copy and data.
======================================== */

import { setButtonLoading } from "./form-state.js";
import { showToast } from "./toast-manager.js";


export function fillFields(root, data) {
    root.querySelectorAll("[data-field]").forEach((element) => {
        const value = data[element.dataset.field];

        if (value !== undefined) {
            element.textContent = value;
        }
    });
}



function createAction({ label, href, variant = "secondary" }) {
    const link = document.createElement("a");

    link.className = `tf-button tf-button--${variant} tf-button--compact`;
    link.href = href;
    link.textContent = label;

    return link;
}


/**
 * Shows a non-pending state (expired, revoked, new account...)
 * and hides the Accept / Decline buttons.
 */
export function showInvitationState(root, { variant, title, message, actions = [], disableCard = true }) {
    const statePanel = root.querySelector("#invite-state");
    const alertElement = statePanel.querySelector(".tf-alert");
    const actionContainer = root.querySelector("#invite-state-actions");

    alertElement.className = `tf-alert tf-alert--${variant}`;
    alertElement.hidden = false;
    alertElement.querySelector("[data-alert-title]").textContent = title;
    alertElement.querySelector("[data-alert-message]").textContent = message;

    actionContainer.replaceChildren(...actions.map(createAction));

    root.querySelector("#invite-actions").hidden = true;
    root.classList.toggle("tf-invite--inactive", disableCard);
    statePanel.hidden = false;
}


export function bindInvitationActions(root, { onAccept, onDecline, acceptedState, declinedState }) {
    const acceptButton = root.querySelector("#invite-accept");
    const declineButton = root.querySelector("#invite-decline");

    acceptButton.addEventListener("click", async () => {
        setButtonLoading(acceptButton, true, "Accepting...");
        declineButton.disabled = true;

        try {
            await onAccept();
            showInvitationState(root, acceptedState);
        } catch (error) {
            showToast("We couldn't accept the invitation. Please try again.", { type: "error" });
            setButtonLoading(acceptButton, false);
            declineButton.disabled = false;
        }
    });

    declineButton.addEventListener("click", async () => {
        setButtonLoading(declineButton, true, "Declining...");
        acceptButton.disabled = true;

        try {
            await onDecline();
            showInvitationState(root, declinedState);
        } catch (error) {
            showToast("We couldn't decline the invitation. Please try again.", { type: "error" });
            setButtonLoading(declineButton, false);
            acceptButton.disabled = false;
        }
    });
}
