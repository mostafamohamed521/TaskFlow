# TaskFlow — FRONTEND IMPLEMENTATION MASTER PROMPT 13/13
## Archived Tasks | آلاء — Task Management & Kanban

> **How to use:** Attach the existing **complete TaskFlow frontend repository** (Public + Auth + Onboarding + App Shell + Ahmed's workspace/project code where available), the corresponding approved UI image generated from `01-UI-Design-Prompts/13-archived-tasks-UI-README.md`, and this prompt. This is a **coding implementation prompt**, not a request for a new image.

## 1. Mission and exact scope

Act as a Principal Frontend Engineer and Pixel-Accurate UI Implementation Specialist. Extend the **existing** TaskFlow pure HTML5/CSS3/ES6 JavaScript codebase to implement **Archived Tasks** as a real, responsive, keyboard-accessible, fully navigable frontend demo. The screen must closely match the **specific attached approved screenshot** in typography, coordinates, spacing, dimensions, colors, imagery, icons, and text, without flattening the screenshot into the page. Preserve existing landing/auth/onboarding and avoid rewriting other developers’ features.

**Purpose:** Browse archived tasks and restore those allowed by permissions.

**Presentation pattern:** full page. Design this as a proper application page in the existing App Shell.

## 2. Required page and asset paths

Use **existing structure if it already follows a coherent convention**, otherwise adopt the paths below carefully and update all imports and navigation links:

| Responsibility | Exact target path |
|---|---|
| HTML entry page / deep-link | `frontend/pages/app/tasks/archived.html` |
| Page-specific CSS | `frontend/css/pages/tasks/archived.css` |
| Page-specific JavaScript ES Module | `frontend/js/pages/tasks/archived.js` |
| Reusable task components | `frontend/components/tasks/` |
| Reusable board components | `frontend/components/kanban/` |
| Task-wide styles | `frontend/css/components/tasks.css` |
| Task store and selectors | `frontend/js/modules/task-store.js` |
| Task validation | `frontend/js/modules/task-validation.js` |
| Shared mock task service | `frontend/js/services/mock/mock-task-service.js` |
| Shared design tokens | `frontend/css/foundation/tokens.css` |
| Shared App Shell | `frontend/components/app/` and existing `frontend/css/layouts/app-shell.css` |

Do not create 13 redundant copies of the same task shell/editor/table. For nested detail sections, the route is optional for deep-linking; the **main implementation must be reusable within `tasks/details.html`**. For Create/Edit, reuse one editor form component and `tasks/editor.css` rather than maintaining two conflicting style systems. Create only necessary real files, never empty placeholders.

## 3. TaskFlow style and pixel matching

- **TaskFlow palette:** Sage `#4CAF7B`, Olive `#2E7D32`, Warm Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.
- **Typography:** Inter, high-contrast headings, polished 14–16px body text, consistent weights.
- **Shell:** reuse Mostafa’s dark forest-green App Sidebar, warm cream content canvas, Topbar, workspace switcher and responsive mobile navigation, never recreate an unrelated shell.
- **Interaction visuals:** soft radius (~12–16px controls, ~20–24px cards), sage focus rings, subtle borders/shadows, consistent SVG line icons, minimal animation, no emoji.
- **Source of truth:** the supplied original TaskFlow logo/brand board and approved public/auth/app UI screenshots; do not redraw or restyle the logo.

Inspect all provided image/reference files, find original assets, and estimate screenshot region sizes (sidebar, topbar, content area, panels, rows, toolbar, icons) at the screenshot's resolution. Implement with CSS Grid and Flexbox plus a small set of design tokens—not hardcoded absolute coordinates for everything. Compare screenshot of implementation to reference at matching viewport size; refine gap, font weight, line height, padding, borders, radii, and shadows. Do not claim visual equivalence without comparing. If original artwork is missing, document the gap; never use the entire reference screenshot as a rendered page.

## 4. Exact screen sections and DOM organization

Implement the following *real UI areas*, using semantic HTML and clear reusable markup:

1. Archived Tasks title and explanatory banner
2. Search, project, archived-by and date filters
3. Archive table with original project, archived date, assignee and status
4. Task detail read-only preview
5. Restore and permanent-delete confirmation where allowed
6. Empty archive and no-results views

**Data and form controls:**

- Search
- Project
- Archived date
- Archived by
- Task status

Use correctly associated `<label>`, `<input>`, `<button>`, `<select>` / accessible custom components, `<table>` for true tabular content, accessible `dialog` for confirmation, `<nav>` for navigation and proper headings. Do not put fake clickable `div`s in place of controls.

## 5. Required working actions (frontend demo)

1. View archived task
2. Restore task to original or fallback column
3. Filter archive
4. Confirm destructive delete only if policy supports it

Every visible action must cause a meaningful result: update local demo state, open working dialog/drawer, navigate to a valid route, or clearly state its intentionally unavailable status. No dead buttons, fake API promises, `alert()` or `confirm()` as the main UX. Show useful loading, success and error states. Where no backend exists, explicitly label the action as **demo/local**; never claim remote persistence, security or file delivery.

## 6. Domain model, data consistency, and integration

The page needs these domain data pieces:

- task.archivedAt/archivedBy/isArchived
- original project/board column
- viewer permissions

Use one normalized **shared mock task store** where appropriate. Suggested task fields: `id`, `projectId`, `title`, `description`, `status`, `columnId`, `priority`, `assigneeIds`, `startDate`, `dueDate`, `labels`, `estimatedMinutes`, `checklistIds`, `commentIds`, `attachmentIds`, `createdAt`, `updatedAt`, `isArchived`, `archivedAt`. Use stable IDs. Mock reference sets: project IDs/members from Ahmed, current user from Mostafa’s demo context, time tracking component/data via Ahd integration, and client privacy through Eman’s portal. Cross-view actions must update **All Tasks / My Tasks / Kanban / Task Details** consistently; no isolated hardcoded arrays in every page.

**Rules that must never be violated:**

- Archived tasks excluded from active All Tasks and Kanban
- Restoring task must not create duplicate IDs
- Permanent deletion must not be presented as real backend deletion
- Preserve original task data and history

### Ownership boundaries

- **Alaa** owns Task Details, task create/edit/archive, checklists, comments, attachments, activity, templates and Kanban (and board settings).
- **Ahmed** owns Workspace/Project creation, management, membership and project templates. Read project/member data, don't reimplement his administration screens.
- **Ahd** owns start/pause/resume/stop Time Tracking, timesheets, Calendar, Gantt and reporting. Provide a component integration slot in Task Details, not a duplicate timer implementation.
- **Eman** owns Client Portal, deliverables, client approvals. Never leak internal task comments, attachments or private progress into a client view without explicit sharing rules.
- **Mostafa** owns Public/Auth/Onboarding and shared design tokens/app navigation/common form components. Reuse them.

## 7. Validation and state behavior

Create real handling for: empty data, loaded/populated data, filtered/no-results, invalid input, disabled permissions, loading, save success, save failure, missing task/project IDs, stale deleted item, and archive/restore where applicable. Errors must appear near affected fields with `aria-invalid` and `aria-describedby`; focus the first invalid input on submit. Form Cancel must not commit edits. For changes with side effects, use a custom accessible confirmation UI. Prevent double-submit. Dates must follow actual calendar logic and workspace time zone; status badges must have text as well as color.

## 8. Security and mock frontend limits

Use **only HTML5, CSS3, Vanilla JS ES Modules**; no React/Vite/TypeScript/framework migration. Mock roles are UI demonstrations, **not authorization**: real restrictions must later be enforced server-side. Do not use `innerHTML` with unsanitized task/comment/file names; prefer `textContent` and safe DOM construction. Do not store tokens, passwords or private documents in localStorage. Avoid fake networking, fake notification delivery, and claims of secure permanent persistence. If persisting non-sensitive task demo data locally for cross-page behavior, centralize serialization, include schema versioning, handle invalid/corrupt storage, and document its limitations.

## 9. Code cleanliness — absolutely non-negotiable

**No spaghetti code. No minification. No giant one-line HTML, CSS or JavaScript.** Use an agreed 4-space indentation (or existing consistent style). Place each nested HTML element on a logical line and separate major sections with blank lines. Each CSS selector gets braces on separate lines and **one property per line**, grouped by layout / spacing / typography / states, with blank lines between selector blocks. JavaScript uses descriptive names, one-purpose functions, early returns, module imports and `addEventListener` (never inline `onclick`). Break very long handlers into validation, state update, view rendering and navigation helpers. Comments explain intent rather than obvious syntax; no empty placeholders or duplicated utilities. Reuse Mostafa's CSS tokens and app shell; new styles must be scoped to the Tasks/Kanban module.

**Format quality example:**

```javascript
import { getTaskById, updateTask } from "../../modules/task-store.js";

const taskRoot = document.querySelector("[data-task-root]");

function getCurrentTaskId() {
    const params = new URLSearchParams(window.location.search);

    return params.get("taskId");
}

function renderTaskView(task) {
    if (!taskRoot) {
        return;
    }

    taskRoot.textContent = task?.title || "Task not found";
}

function initializePage() {
    const taskId = getCurrentTaskId();
    const task = getTaskById(taskId);

    renderTaskView(task);
}

initializePage();
```

This snippet demonstrates readable formatting only. Implement actual helper modules and correct relative imports based on final paths; **do not leave undefined imports or functions**. The actual screen must render full UI rather than just a task title.

## 10. Responsive and accessible implementation

Match reference at 1920×1080 and test at 1440, 1280, 1024, 768, 430, 390, 360px. Reflow columns, toolbars and detail side rails; use true mobile menu; ensure 44px touch targets; adapt table density or allow localized scroll rather than page overflow. Kanban requires touch-safe and keyboard move controls in addition to drag-and-drop; no interaction may depend exclusively on hover or pointer drag. Use semantic headings, keyboard navigation, visible focus, appropriate aria status, reduced-motion preferences and proper modal focus trapping/restoration.

## 11. Test checklist — specific to Archived Tasks

1. Open the page from the correct Sidebar/project route and verify all files load without 404s or console errors
2. Test every listed primary and secondary action with realistic demo data
3. Test empty/invalid/permission-denied states plus a successful flow
4. Refresh after a change and verify the documented mock persistence contract
5. Open the same task/project in another task view and verify the state remains consistent
6. Compare the real page screenshot against the approved UI image at matching viewport
7. Check desktop, tablet, mobile, keyboard and screen-reader label behavior
8. Regression-test Public/Auth/Onboarding and Ahmed/Ahd/Eman navigation entry points

## 12. Final delivery and report

Implement the screen **in the provided existing project**, not a parallel demo. Report: files created/modified/moved, exact routes, reused components, tasks/actions now working, mock-only limitations, missing assets, screenshot-comparison notes, failed tests (if any), and clear instructions to run with local HTTP server/VS Code Live Server. Do not claim backend functionality exists. Update documentation or README for this feature and preserve existing code.

**Final acceptance:** Archived Tasks must be visibly faithful to its approved design, logically integrated with the 13-view Alaa task-management subsystem, easy for five developers to maintain, and safely prepared for future ASP.NET Core backend API integration.
