/* ========================================
   ROUTES
   Every Authentication and Onboarding page lives one
   folder below pages/ (pages/auth/, pages/onboarding/),
   so these relative paths work from both.
======================================== */

export const ROUTES = {
    home: "../../index.html",

    login: "../auth/login.html",
    register: "../auth/register.html",
    verifyEmail: "../auth/verify-email.html",
    emailVerified: "../auth/email-verified.html",
    forgotPassword: "../auth/forgot-password.html",
    resetPassword: "../auth/reset-password.html",
    passwordResetSuccess: "../auth/password-reset-success.html",
    sessionExpired: "../auth/session-expired.html",
    accessDenied: "../auth/access-denied.html",

    onboardingStart: "../onboarding/choose-workspace-type.html",
    createWorkspace: "../onboarding/create-workspace.html",
    inviteTeam: "../onboarding/invite-team.html",
    onboardingComplete: "../onboarding/complete.html",

    /* Temporary destinations (stub pages until the app is built) */
    workspace: "../app/dashboard/index.html",
    clientPortal: "../client-portal/index.html"
};


export function navigateTo(path) {
    window.location.assign(path);
}


export function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}
