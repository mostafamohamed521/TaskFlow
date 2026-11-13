/* ========================================
   THEME
   Uses the same "tf-theme" key as the public site
   (read before paint by js/core/theme-init.js).
   "system" removes the key and follows the OS.
======================================== */

const THEME_KEY = "tf-theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");


function resolveTheme(preference) {
    if (preference === "light" || preference === "dark") {
        return preference;
    }

    return darkQuery.matches ? "dark" : "light";
}


export function getThemePreference() {
    try {
        const stored = localStorage.getItem(THEME_KEY);

        return stored === "light" || stored === "dark" ? stored : "system";
    } catch (error) {
        return "system";
    }
}


/** Applies a theme to the page without saving it (used for live preview). */
export function previewTheme(preference) {
    document.documentElement.setAttribute("data-theme", resolveTheme(preference));
}


export function saveTheme(preference) {
    try {
        if (preference === "system") {
            localStorage.removeItem(THEME_KEY);
        } else {
            localStorage.setItem(THEME_KEY, preference);
        }
    } catch (error) {
        // Theme storage is optional.
    }

    previewTheme(preference);
}


/* Keeps "System" in sync when the OS theme changes. */
darkQuery.addEventListener("change", () => {
    if (getThemePreference() === "system") {
        previewTheme("system");
    }
});
