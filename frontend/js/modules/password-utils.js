/* ========================================
   PASSWORD UTILITIES (pure, no DOM)
   Rules follow the approved copy:
   "Use at least 8 characters, including a number and a symbol."
======================================== */

export const PASSWORD_REQUIREMENTS = [
    {
        id: "length",
        label: "8+ characters",
        test: (password) => password.length >= 8
    },
    {
        id: "number",
        label: "A number",
        test: (password) => /\d/.test(password)
    },
    {
        id: "symbol",
        label: "A symbol",
        test: (password) => /[^A-Za-z0-9\s]/.test(password)
    }
];

/* Stricter rule set used when changing a password in Security settings. */
export const STRONG_PASSWORD_REQUIREMENTS = [
    PASSWORD_REQUIREMENTS[0],
    {
        id: "upper",
        label: "An uppercase letter",
        test: (password) => /[A-Z]/.test(password)
    },
    {
        id: "lower",
        label: "A lowercase letter",
        test: (password) => /[a-z]/.test(password)
    },
    PASSWORD_REQUIREMENTS[1],
    PASSWORD_REQUIREMENTS[2]
];

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];


export function getRequirementResults(password, requirements = PASSWORD_REQUIREMENTS) {
    return requirements.map((requirement) => ({
        id: requirement.id,
        label: requirement.label,
        met: requirement.test(password)
    }));
}


export function meetsAllRequirements(password, requirements = PASSWORD_REQUIREMENTS) {
    return getRequirementResults(password, requirements).every((result) => result.met);
}


/** Returns { level: 0-4, label }. Level 0 means nothing entered. */
export function getPasswordStrength(password) {
    if (!password) {
        return {
            level: 0,
            label: "Not entered"
        };
    }

    const metCount = getRequirementResults(password).filter((result) => result.met).length;
    const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

    let level = Math.max(1, metCount);

    if (metCount === PASSWORD_REQUIREMENTS.length && (hasMixedCase || password.length >= 12)) {
        level = 4;
    }

    return {
        level,
        label: STRENGTH_LABELS[level]
    };
}


export function validateNewPassword(password, requirements = PASSWORD_REQUIREMENTS) {
    if (!password) {
        return "Password is required.";
    }

    if (!meetsAllRequirements(password, requirements)) {
        return requirements === PASSWORD_REQUIREMENTS
            ? "Use at least 8 characters, including a number and a symbol."
            : "Use at least 8 characters with uppercase and lowercase letters, a number and a symbol.";
    }

    return "";
}


export function validatePasswordConfirmation(password, confirmation) {
    if (!confirmation) {
        return "Please confirm your password.";
    }

    if (password !== confirmation) {
        return "Passwords do not match.";
    }

    return "";
}
