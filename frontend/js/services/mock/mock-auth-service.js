/* ========================================
   MOCK AUTH SERVICE (demo only, no backend)

   Replace these function bodies with real API calls later;
   the signatures and return shapes can stay the same.

   - No password is ever stored or checked.
   - No email is sent and no token is really validated.
   - The "session" is a plain demo flag in sessionStorage /
     localStorage. It provides no security.
======================================== */

import { store } from "../../core/storage.js";
import { ROUTES } from "../../core/paths.js";
import { getCompletedWorkspace } from "./mock-workspace-service.js";


const DEMO_USERS = [
    {
        email: "team@demo.example",
        name: "Karim Said",
        workspaceType: "team",
        workspace: "Northwind Studio",
        role: "member"
    },
    {
        email: "freelancer@demo.example",
        name: "Mona Adel",
        workspaceType: "freelancer",
        workspace: "Mona Adel Design",
        role: "owner"
    },
    {
        email: "new@demo.example",
        name: "Omar Nabil",
        workspaceType: null,
        workspace: null
    },
    {
        email: "client@demo.example",
        name: "Hana Fouad",
        workspaceType: "client",
        workspace: null
    }
];

/* Special addresses that trigger predictable demo outcomes */
const UNAVAILABLE_EMAIL = "unavailable@demo.example";
const TAKEN_EMAIL = "taken@demo.example";


function wait(milliseconds = 700) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}


function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}


/* ========================================
   SESSION
======================================== */

export function getSession() {
    return store.get("session");
}


function saveSession(session, { remember = false } = {}) {
    store.set("session", { ...session, demo: true }, { session: !remember });
}


/* Keeps the session where it was stored ("Remember me" uses localStorage). */
export function updateSession(changes) {
    const current = getSession() || {};
    let remembered = false;

    try {
        remembered = localStorage.getItem("tf:session") !== null;
    } catch (error) {
        remembered = false;
    }

    saveSession({ ...current, ...changes }, { remember: remembered });
}


export function signOut() {
    store.remove("session");
}


/** Where a signed-in user should land. */
export function getHomeRouteFor(session) {
    if (!session) {
        return ROUTES.login;
    }

    if (session.workspaceType === "client") {
        return ROUTES.clientPortal;
    }

    return session.workspace ? ROUTES.workspace : ROUTES.onboardingStart;
}


/* ========================================
   SIGN IN / REGISTER
======================================== */

export async function signIn({ email, password, remember }) {
    await wait();

    const normalizedEmail = normalizeEmail(email);

    if (normalizedEmail === UNAVAILABLE_EMAIL) {
        throw new Error("Sign-in is temporarily unavailable in this demo. Please try again in a moment.");
    }

    /* Demo rule: the password "wrong" simulates invalid credentials.
       Unknown addresses sign in as a new user without a workspace. */
    if (password === "wrong") {
        throw new Error("Invalid email or password. Please check your details and try again.");
    }

    const user = DEMO_USERS.find((candidate) => candidate.email === normalizedEmail) || {
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0],
        workspaceType: null,
        workspace: null
    };

    /* An account that already finished onboarding in this browser keeps its workspace. */
    const completedWorkspace = getCompletedWorkspace(normalizedEmail);

    if (completedWorkspace) {
        user.workspaceType = completedWorkspace.type;
        user.workspace = completedWorkspace.name;
        user.role = "owner";
    }

    saveSession(
        {
            name: user.name,
            email: user.email,
            workspaceType: user.workspaceType,
            workspace: user.workspace,
            role: user.role || null
        },
        { remember }
    );

    return getSession();
}


export async function register({ fullName, email }) {
    await wait();

    const normalizedEmail = normalizeEmail(email);
    const alreadyExists = normalizedEmail === TAKEN_EMAIL
        || DEMO_USERS.some((user) => user.email === normalizedEmail);

    if (alreadyExists) {
        throw new Error("We couldn't create an account with these details. If you already have an account, try signing in instead.");
    }

    store.set(
        "pending-registration",
        {
            name: fullName.trim(),
            email: normalizedEmail
        },
        { session: true }
    );
}


/* ========================================
   EMAIL VERIFICATION
======================================== */

export function getPendingRegistration() {
    return store.get("pending-registration");
}


export function maskEmail(email) {
    const [localPart, domain] = String(email || "").split("@");

    if (!localPart || !domain) {
        return "you@example.com";
    }

    const visible = localPart.slice(0, Math.min(2, localPart.length - 1) || 1);

    return `${visible}${"*".repeat(Math.max(3, localPart.length - visible.length))}@${domain}`;
}


export async function resendVerificationEmail() {
    await wait(600);

    /* A real API would queue a new email here. */
    return { simulated: true };
}


/**
 * Demo token check. Real verification happens on the server.
 * "expired" and "invalid" simulate the failure states.
 */
export async function verifyEmailToken(token) {
    await wait(500);

    if (token === "expired" || token === "invalid") {
        return { status: token };
    }

    const pending = getPendingRegistration() || {
        name: "New user",
        email: ""
    };

    saveSession({
        name: pending.name,
        email: pending.email,
        workspaceType: null,
        workspace: null
    });

    store.remove("pending-registration");

    return { status: "verified" };
}


/* ========================================
   PASSWORD RECOVERY
======================================== */

export async function requestPasswordReset() {
    await wait();

    /* Always resolves the same way so the UI never reveals
       whether an address belongs to an account. */
    return { simulated: true };
}


export async function checkResetLink(linkState) {
    await wait(300);

    if (linkState === "expired" || linkState === "invalid") {
        return { status: linkState };
    }

    return { status: "valid" };
}


export async function resetPassword() {
    await wait();

    /* The new password is never stored in the demo. */
    return { simulated: true };
}
