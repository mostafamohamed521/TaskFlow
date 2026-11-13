/* ========================================
   STORAGE
   Namespaced wrapper around sessionStorage / localStorage.
   Refuses keys or object fields that look like passwords,
   secrets or tokens, so none can be persisted by mistake.
======================================== */

const NAMESPACE = "tf:";
const SENSITIVE_PATTERN = /pass|pwd|secret|token/i;


function getArea(useSession) {
    return useSession ? sessionStorage : localStorage;
}


function containsSensitiveData(key, value) {
    if (SENSITIVE_PATTERN.test(key)) {
        return true;
    }

    if (value && typeof value === "object") {
        return SENSITIVE_PATTERN.test(Object.keys(value).join(" "));
    }

    return false;
}


export const store = {
    get(key) {
        for (const area of [sessionStorage, localStorage]) {
            try {
                const raw = area.getItem(NAMESPACE + key);

                if (raw !== null) {
                    return JSON.parse(raw);
                }
            } catch (error) {
                // Storage can be unavailable (private mode, blocked cookies).
            }
        }

        return null;
    },

    set(key, value, { session = false } = {}) {
        if (containsSensitiveData(key, value)) {
            throw new Error("Refusing to store sensitive data.");
        }

        try {
            getArea(!session).removeItem(NAMESPACE + key);
            getArea(session).setItem(NAMESPACE + key, JSON.stringify(value));
        } catch (error) {
            // Demo state is optional; ignore storage failures.
        }
    },

    remove(key) {
        try {
            sessionStorage.removeItem(NAMESPACE + key);
            localStorage.removeItem(NAMESPACE + key);
        } catch (error) {
            // Ignore storage failures.
        }
    }
};
