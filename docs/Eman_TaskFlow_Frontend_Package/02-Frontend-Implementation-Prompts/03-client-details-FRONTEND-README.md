# FRONTEND IMPLEMENTATION PROMPT 03 — Client Details

> **Use AFTER approving the corresponding UI image** `01-UI-Design-Prompts/03-client-details-UI-README.md`. Attach **the complete existing TaskFlow frontend**, official logo/assets and the approved **Client Details** screenshot. Deliver implementation code in the EXISTING project, not a new independent frontend.

## 01. Engineer's job

Act as a Principal Frontend Engineer, Vanilla JavaScript Architect, accessibility specialist, and pixel-accuracy UI engineer. Implement **Client Details** so it looks almost identical to its approved screenshot and performs the real frontend demo interactions. Functional objective: Review the contact profile, permitted project associations, invitations and delivery history for one client.

The intended presentation is: **Full page**. Avoid duplicated UI logic if it is a tab, drawer or modal embedded in a canonical parent page.

## 02. Audit existing project before modifying it

Inspect public landing, Auth, Onboarding, shared App Shell, `tokens.css`, common form/input/modal/toast components, existing workspace/project/task data, route conventions and other team changes. Save and preserve existing behavior. Do not introduce React/Vue/Vite/Next/Angular/TypeScript, Razor, a new router or a build system. Keep multi-page HTML, CSS3, ES6+ Vanilla JS Modules; any already-installed lightweight dependency must be justified. Never create `frontend/frontend` or an unrelated duplicate repo.

Use source screenshot as specification: measure canvas, layout ratios, x/y positions, margins, typography, form controls, backgrounds, illustrations and icon shapes; use Grid/Flex for structure and reserve absolute positioning for decoration. Real DOM controls, never flatten a screenshot to HTML background. If an original asset is missing, report it honestly.

## 03. Exact recommended paths

| Deliverable | Path |
|---|---|
| HTML direct-entry/fallback | `frontend/pages/app/clients/details.html` |
| Page-only CSS | `frontend/css/pages/clients/client-details.css` |
| Page ES Module | `frontend/js/pages/clients/client-details.js` |
| Shared brand tokens | `frontend/css/foundation/tokens.css` (reuse existing) |
| Shared app/portal shell | `frontend/css/layouts/app-shell.css` or existing portal equivalent |
| Reusable controls | `frontend/css/components/` and `frontend/js/modules/` (reuse existing) |

The appropriate shell is **existing internal App Shell from Mostafa**. If existing project paths differ but are coherent, prefer established project conventions and document actual paths. Avoid generating placeholder files; create only what is used. For modals and tabs, implement a SINGLE canonical form/component that can be opened from parent screen and accessed via the optional deep-link if the route already exists.

## 04. Exact screen sections

Client identity header with status; contact/details panel; linked projects table; invitation status; recent deliverables and activity tabs; contextual Edit/Invite actions.

Use `main`, `header`, `section`, `nav`, `form`, `label`, `button`, `dialog`, `table` and `time` semantically. Ensure every major visible label and element matches the approved screenshot. Use page-specific classes under `.tf-client-*`, `.tf-portal-*`, `.tf-deliverable-*`, or `.tf-review-*` rather than generic `.box`/`.left` or global element overrides.

## 05. Complete interaction specification

Edit details; link/unlink project; start invitation; open linked project; view shared deliveries.

For EVERY visible button/link/selector provide a truthful action: navigation, validated mock CRUD, state change, opens a real modal/drawer, downloads an actual local demo file, or a clearly disabled/unavailable notice. No dead buttons, raw browser alerts, fake email delivery or remote uploads. Validate input before changing demo state; show loading, success, invalid and cancelled states.

## 06. Data contract and integration IDs

Use these conceptual entities (adapt to any team-agreed canonical data store):

`client {id,workspaceId,...}, project {id,workspaceId,clientIds}, invitation {status}, deliverable {id,projectId,clientId,status}`

All records must carry stable IDs, workspaceId/projectId/clientId as applicable; never link by copied display names alone. Resolve project labels from **Ahmed's** project repository, team task references from **Alaa's** repository only if needed, milestones from **Ahd's** service. Reuse the **single canonical** client/deliverables/reviews store used by Eman screens. Never maintain separate hardcoded totals or contradictory mock approval states.

Suggested feature-scoped modules, create **only if needed and absent**:

- `frontend/js/services/mock/clients-service.js`
- `frontend/js/services/mock/client-invitations-service.js`
- `frontend/js/services/mock/deliverables-service.js`
- `frontend/js/services/mock/reviews-service.js`
- `frontend/js/services/mock/change-requests-service.js`
- `frontend/js/modules/client-portal/portal-projection.js` (curated visible data only)
- `frontend/js/modules/deliverables/version-utils.js`
- Shared date/format/validation/dialog/toast utilities from Mustafa's existing codebase.

Do not create all suggested files automatically. Use a single canonical source of demo records. Define deterministic, non-sensitive sample data. Use safe storage only for non-sensitive demo state where necessary; do not pretend browser storage is authentication/authorization.

## 07. Domain rules — must enforce in mock UI flows

Internal details are for authorized staff only; do not leak internal notes into Client Portal.

- Client records do not automatically create portal accounts.
- Client invitations are generated by Eman UI and accepted by Mustafa's Auth pages.
- Never let external clients view internal workspace navigation, internal comments, unshared files, timesheets, staff workloads or unrelated projects.
- A client's permitted projectIds must scope every client-portal screen; **backend enforcement is still required** in production.
- Approvals and revision requests identify an exact submitted `deliverableVersionId`.
- A revised deliverable creates a new immutable version rather than rewriting already-reviewed files.
- Pending / Approved / Changes Requested must represent coherent state transitions; do not overwrite review history.
- Private internal notes should be stored separately from public client-visible updates.

## 08. Screen-specific states and boundary cases

No linked projects; pending invitation; portal not activated; missing client; restricted user.

Implement coherent states: initial, populated, empty, filtered-empty, loading, disabled, validation error, success and access denied where relevant. An invitation's status can be pending/accepted/expired/revoked; a deliverable's can be draft/submitted/approved/changes-requested; request statuses must be documented. These are different enums. Don't silently combine status categories or let a Client approve a draft.

## 09. Accessibility and responsive requirements

- Test 1920, 1440, 1280, 1024, 768, 430, 390, 360 widths. Compare implementation to the screenshot at same reference resolution; refine typography, geometry and illustration positioning.
- Labels for every input, `aria-invalid` and `aria-describedby` on errors, `aria-live` for feedback, `aria-current` for nav, visible keyboard focus, proper button types.
- Modal/dialog: trap focus where appropriate, Escape behavior, restore focus to trigger, deliberate confirmation for destructive actions.
- Mobile: reuse established app mobile nav or separate client header, stacked responsive forms, readable file/version tables, no viewport clipping or horizontal page overflow.
- Respect reduced motion; don't use color as sole status indication. Ensure external clients only see sanitized visible data.

## 10. Non-negotiable clean code format

**No spaghetti code and no minification.** HTML: indentation 4 spaces or consistent repo 2 spaces; nested semantic tags each on own line, logical blank lines between sections. CSS: one property per line, selector braces separate, clean section headings, use `var(--tf-...)`; no duplicate base style definitions. JS: ES modules, descriptive variables and named functions, `addEventListener` rather than inline `onclick`, short functions, separate DOM render/validation/data/persistence, avoid deeply nested conditionals and unsafe `innerHTML` of user content. Don't place HTML/CSS/JS together in one huge file. Avoid unnecessary abstraction and one-line logic blocks.

Example expected formatting:

```javascript
function renderClientStatus(statusElement, statusText) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = statusText;
}


function initializePage() {
    const statusElement = document.querySelector('[data-client-status]');

    if (!statusElement) {
        return;
    }

    renderClientStatus(statusElement, 'Ready');
}


initializePage();
```

Use a formatter such as Prettier **if already installed**; maintain consistent style throughout. Do not remove meaningful existing docs/comments or change unrelated teammates' code.

## 11. Integration ownership and safety

- **Mustafa:** shell, auth acceptance, foundational UI components, nav and integration.
- **Ahmed:** workspace and project source data; Eman links to projects, does not implement master project editor.
- **Alaa:** task details and Kanban; no duplicate task management in Client Portal.
- **Ahd:** milestone scheduling, calendar, time reports; Eman only displays public milestone projection.
- **Eman:** contacts, invitation creation, client portal, deliverables, versions, review, revisions and client-safe activity.

No emojis. No AI features. No fake SaaS pricing. Don't claim to have sent real emails, uploaded files to server, enforced security, or synced client approvals remotely. When an API is absent, make it demonstrably mock-only.

## 12. Acceptance tests for this exact screen

1. Open `frontend/pages/app/clients/details.html` through local HTTP server and load all assets and ES modules.
2. Compare desktop screenshot side-by-side with approved design at matching viewport size.
3. Validate task-specific actions: **Edit details; link/unlink project; start invitation; open linked project; view shared deliveries.**.
4. Exercise edge cases: **No linked projects; pending invitation; portal not activated; missing client; restricted user.**.
5. Confirm cross-project/client visibility boundaries and correct selected workspace.
6. Check links to upstream/downstream related pages, no missing destinations.
7. Check keyboard/tab order, Escape and error announcements as applicable.
8. Test desktop, tablet and mobile widths, no overflow, no console errors.
9. Retest existing Public, Auth, Onboarding and teammate pages after any shared refactor.
10. Confirm displayed demo totals/statuses derive from actual shared mock data.

## 13. Final handoff

Report files created/modified/moved and exact routes, main features, shared modules reused, demo data schema, screen states handled, visual differences remaining, missing art, screenshots actually compared, responsive checks, accessibility notes, and features that require the future backend. Note any unresolved integration decisions rather than inventing them.

**FINAL STANDARD:** Keep it visually faithful, context-correct, permission-safe in demonstration, maintainable and fully integrated into the existing TaskFlow frontend. Do not create a new project. Do not claim backend actions are real.
