/* ========================================
   APP SHELL
   Shared behavior for every app page with the
   sidebar + topbar layout:
   - frontend-only access guard (demo session)
   - fills sidebar, topbar and profile summary
   - dropdown menus, mobile drawer, settings search
   - sign out
======================================== */

import { getSession, signOut } from "../services/mock/mock-auth-service.js";
import { getAccountSettings } from "../modules/settings-state.js";
import { getTimeZoneLabel } from "../modules/time-zones.js";
import { showToast } from "../modules/toast-manager.js";


const WORKSPACE_TYPE_LABELS = {
    personal: "Personal",
    freelancer: "Freelancer",
    team: "Team",
    company: "Company"
};

const SEARCH_TARGETS = [
    { words: ["profile", "name", "photo", "bio", "job", "phone", "location"], href: "../settings/profile.html" },
    { words: ["security", "password", "2fa", "two-factor", "session"], href: "../settings/security.html" },
    { words: ["email"], href: "../settings/security.html#change-email" },
    { words: ["preference", "theme", "dark", "language", "date", "time", "week", "view", "digest"], href: "../settings/preferences.html" },
    { words: ["notification", "alert", "push"], href: "../settings/notifications.html" },
    { words: ["privacy", "data", "export", "download"], href: "../settings/data-privacy.html" },
    { words: ["account", "delete", "ownership", "import"], href: "../settings/account.html" }
];


/* ----------------------------------------
   Access guard (UI only; the server must enforce this)
---------------------------------------- */

function redirectIfNotAllowed(session) {
    const authBase = "../../auth/";

    if (!session) {
        window.location.replace(`${authBase}session-expired.html`);

        return true;
    }

    if (session.workspaceType === "client") {
        window.location.replace(`${authBase}access-denied.html`);

        return true;
    }

    return false;
}


/* ----------------------------------------
   Account context
---------------------------------------- */

function formatRole(role) {
    if (!role) {
        return "Member";
    }

    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}


function getInitials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return "U";
    }

    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}


export function getAccountContext() {
    const session = getSession();

    if (!session) {
        return null;
    }

    const settings = getAccountSettings(session.email);
    const name = settings.profile.fullName || session.name || "";

    return {
        session,
        settings,
        email: session.email,
        name,
        initials: getInitials(name),
        photo: settings.profile.photo,
        role: formatRole(session.role),
        isOwner: String(session.role).toLowerCase() === "owner",
        workspaceName: session.workspace || "No workspace yet",
        workspaceType: WORKSPACE_TYPE_LABELS[session.workspaceType] || "Personal",
        location: settings.profile.location,
        timeZone: getTimeZoneLabel(settings.preferences.timeZone)
    };
}


/* ----------------------------------------
   Rendering
---------------------------------------- */

function renderAvatar(element, context) {
    element.replaceChildren();

    if (context.photo) {
        const image = document.createElement("img");

        image.src = context.photo;
        image.alt = "";
        element.append(image);

        return;
    }

    element.textContent = context.initials;
}


function fillText(selector, values) {
    document.querySelectorAll(selector).forEach((element) => {
        const key = element.dataset.shell || element.dataset.summary;

        if (key in values) {
            element.textContent = values[key];
        }
    });
}


export function renderAccount(context = getAccountContext()) {
    if (!context) {
        return;
    }

    const values = {
        name: context.name,
        email: context.email,
        role: context.role,
        workspaceName: context.workspaceName,
        workspaceType: context.workspaceType,
        location: context.location,
        timeZone: context.timeZone
    };

    fillText("[data-shell]:not([data-shell='avatar'])", values);
    fillText("[data-summary]:not([data-summary='avatar']):not([data-summary='roleBadge'])", values);

    document.querySelectorAll("[data-shell='avatar'], [data-summary='avatar']").forEach((element) => {
        renderAvatar(element, context);
    });

    document.querySelectorAll("[data-fact]").forEach((fact) => {
        fact.hidden = !values[fact.dataset.fact];
    });

    document.querySelectorAll("[data-summary='roleBadge'] svg").forEach((crown) => {
        crown.style.display = context.isOwner ? "" : "none";
    });
}


/* ----------------------------------------
   Menus
---------------------------------------- */

function closeAllMenus(except = null) {
    document.querySelectorAll("[aria-haspopup='true'][aria-expanded='true']").forEach((button) => {
        if (button === except) {
            return;
        }

        button.setAttribute("aria-expanded", "false");
        document.getElementById(button.getAttribute("aria-controls")).hidden = true;
    });
}


function initMenus() {
    document.querySelectorAll("[aria-haspopup='true'][aria-controls]").forEach((button) => {
        const menu = document.getElementById(button.getAttribute("aria-controls"));

        button.addEventListener("click", (event) => {
            event.stopPropagation();

            const willOpen = menu.hidden;

            closeAllMenus(button);
            menu.hidden = !willOpen;
            button.setAttribute("aria-expanded", String(willOpen));

            if (willOpen) {
                menu.querySelector("a, button")?.focus();
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".tf-menu")) {
            closeAllMenus();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        const openButton = document.querySelector("[aria-haspopup='true'][aria-expanded='true']");

        closeAllMenus();
        openButton?.focus();
    });
}


/* ----------------------------------------
   Mobile drawer
---------------------------------------- */

function initDrawer() {
    const app = document.querySelector(".tf-app");
    const toggle = document.querySelector("#sidebar-toggle");

    if (!app || !toggle) {
        return;
    }

    const setOpen = (isOpen) => {
        app.classList.toggle("tf-app--nav-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    };

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(!app.classList.contains("tf-app--nav-open"));
    });

    document.addEventListener("click", (event) => {
        if (app.classList.contains("tf-app--nav-open") && !event.target.closest(".tf-sidebar")) {
            setOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setOpen(false);
        }
    });
}


/* ----------------------------------------
   Search (settings only for now)
---------------------------------------- */

function findSearchTarget(query) {
    const text = query.trim().toLowerCase();

    return SEARCH_TARGETS.find((target) => target.words.some((word) => text.includes(word)));
}


function initSearch() {
    const form = document.querySelector("#app-search");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = form.elements.query.value;

        if (!query.trim()) {
            return;
        }

        const target = findSearchTarget(query);

        if (target) {
            window.location.assign(target.href);

            return;
        }

        showToast("Search covers settings for now. Projects and tasks arrive with their modules.");
    });
}


/* ----------------------------------------
   Sign out
---------------------------------------- */

function initSignOut() {
    document.querySelector("#sign-out-button")?.addEventListener("click", () => {
        signOut();
        window.location.assign("../../auth/login.html");
    });
}


/**
 * Call first on every app page. Returns the account context,
 * or null while redirecting away.
 */
export function initAppShell() {
    const session = getSession();

    if (redirectIfNotAllowed(session)) {
        return null;
    }

    const context = getAccountContext();

    renderAccount(context);
    initMenus();
    initDrawer();
    initSearch();
    initSignOut();

    return context;
}
