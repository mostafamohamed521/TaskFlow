# FRONTEND IMPLEMENTATION PROMPT 06 — Calendar

> **Copy/paste this prompt into the coding tool after its corresponding UI screenshot is approved.** Attach the **existing TaskFlow frontend source**, the official TaskFlow logo/assets, and **06-calendar-UI reference screenshot**. Do not ask the coding tool to generate a separate project.

## 01. Engineer's mission

Act as a Principal Frontend Engineer and UI fidelity specialist. Implement **Calendar** for TaskFlow as actual HTML5, CSS3, and Vanilla JavaScript ES Modules, integrated into the existing multi-page frontend. The feature's purpose is **Show task deadlines, milestones, and scheduled events in day/week/month views.**. Reproduce the approved screenshot accurately while implementing all required real frontend interactions and mock-data logic. Do not redesign it or flatten the screenshot into an image.

## 02. Integration-first audit and protection

Before writing code: inspect current `frontend/` directories, original logo/images, existing components, data services, navigation, CSS tokens, chart/date libraries, and route conventions. Reuse existing assets and functions; do not create a parallel TaskFlow project. The screenshot supplied by the user is the approved visual reference: reproduce the layout, text, scale, colors, typography, x/y positioning and illustration assets as closely as feasible. Real HTML controls, not a screenshot-as-background. Record any missing art instead of silently substituting another logo. Validate desktop screenshot visual similarity by opening both at equal viewport sizes, comparing and refining; never claim pixel-perfect without testing.

**Frontend behavior is a demo unless backend services truly exist**. Data should be deterministic and sourced from one canonical mock repository so dashboards, reports, tasks and time entries agree. Do not fabricate any authentication, permission enforcement, notification email, invoicing, tracking of real users, or cross-device synchronization.

Use the original brand logo and **Inter**, established colors: Sage `#4CAF7B`, Olive `#2E7D32`, Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.

## 03. Exact primary file paths

| Purpose | Required path |
|---|---|
| HTML entry / standalone fallback | `frontend/pages/app/calendar/index.html` |
| Page CSS only | `frontend/css/pages/calendar/calendar.css` |
| Page controller ES module | `frontend/js/pages/calendar/calendar.js` |

`frontend/css/foundation/tokens.css`, `frontend/css/components/`, `frontend/css/layouts/app-shell.css` belong to/shared with Mostafa. Only add new reusable component files if absent and agreed upon; avoid duplicating an existing token/form/modal system.

**Preferred presentation:** Full page. A dedicated HTML entry is useful for direct route, design QA and navigation; however, where specified as a modal/drawer/tab, **reuse exactly the same UI controller/form inside the canonical parent page** and never maintain two independent implementations. If an existing project has a coherent alternative path scheme, integrate into that convention and document the actual path; do not duplicate modules.

## 04. Exact page structure from the approved screenshot

Build these blocks in this order, faithfully matching reference geometry, typography, spacing and display copy:

- Calendar topbar with Today, Previous, Next, Month/Week/Day switch
- Left compact mini-calendar/filter panel on desktop
- Main calendar grid with clear day headings and current-day highlight
- Color-coded event types with legend: Task due / Milestone / Event
- Upcoming items panel (optional, fits reference)
- Overflow event summary for crowded days

Use semantic `main`, `section`, `header`, `form`, `table`, `nav`, `button`, `label` as applicable. Keep CSS classes namespaced (e.g. `tf-time-*`, `tf-calendar-*`, `tf-report-*`) to avoid collision with other owners’ styles. Use real DOM elements rather than hardcoding all text into a canvas or screenshot image. If Chart.js or Frappe Gantt is already installed and approved, reuse it; otherwise prefer simple, maintainable JS/SVG/CSS rendering that actually supports the required behaviors; do not add bundlers.

## 05. All interactive controls to implement

- Month/Week/Day views
- Today/prev/next
- Filter project and event type
- Click event for details
- Create event opens modal
- Optional date navigation keyboard support

Every visible primary/secondary action must do something truthful: actual UI state change, validated mock CRUD, navigation, modal open/close, accessible disabled/unavailable state, or a clear explanatory demo message. **No dead buttons**. Do not fake network sends, payroll processing, remote integrations or server data.

## 06. Data model and shared contracts

These exact conceptual entities are required; reconcile with any existing canonical mock repository before adding new ones:

- calendarEvent {id,workspaceId,projectId,title,startAt,endAt,allDay,description,type}
- task dueDate source
- milestone dueDate source

Data-contract rules:

- Store IDs, not just copied labels; resolve titles from the Ahmed Projects and Alaa Tasks shared mock data.
- Use one canonical `timeEntries` collection and at most one active timer per demo user; reports derive values from that data.
- Dates must use an explicit timezone interpretation and ISO-like machine-readable values. Keep human-readable formatting in utilities.
- Keep read-only reports derived from the source collections; do not persist contradictory report totals.
- Scope records by workspace and permissions in the UI demonstration, while stating that real authorization requires the backend.
- Export truthful demo JSON/CSV only when export is implemented; name it as demo data.

## 07. Screen-specific business rules and edge cases

- Task deadlines come from Alaa’s task data; do not silently duplicate them as events.
- Milestones from scheduling data are displayed using the same project IDs.
- All dates use selected timezone; midnight and all-day events render correctly.
- Avoid false promise of Google Calendar sync.

**Integration/ownership:** Integrates task deadlines from Alaa and milestones from Ahd; event creation managed by Ahd.

Apply validation with actionable inline error copy; preserve valid inputs after an error; show disabled/loading/success UI states where appropriate. Avoid any implied behavior not supported by data.

## 08. Required states to implement and inspect

- No events
- Month view
- Week view
- Day view
- Multiple items in one cell
- Event details modal
- Filter empty
- Overflow

For every state, design actual UI feedback with meaningful headings/text, proper `aria-live` feedback where appropriate, and consistent TaskFlow styles. No native `alert()` or `confirm()` for primary flows; use shared toast/confirmation components.

## 09. Suggested module separation (create only if missing)

- Shared data services: `frontend/js/services/mock/workspace-projects.js`, `.../tasks.js`, `.../time-entries.js`, `.../calendar-events.js`, `.../milestones.js`, `.../dependencies.js` — agree on names with the team; **never create duplicate copies of another owner's service**.
- Timer logic shared at `frontend/js/modules/time-tracking/timer-service.js` and compact Task Details widget at `frontend/js/modules/time-tracking/timer-widget.js` where needed.
- Derived calculations at `frontend/js/modules/reports/metrics.js` or feature-specific pure utility modules.
- Date formatting/timezone helpers at `frontend/js/modules/dates/date-utils.js` unless already present.
- Shared notifications/modals/buttons/forms remain with Mostafa's foundation.
- Separate page controller `frontend/js/pages/calendar/calendar.js` initializes only the UI belonging to **Calendar**.

Do not blindly create all suggested files. Add only the modules this page truly needs; reuse what previous Ahd pages already created.

## 10. Code formatting — hard acceptance requirement

- HTML5 semantic structure; clear 4-space indentation (or consistent pre-existing 2 spaces), one logically nested element per line; blank lines between meaningful sections.
- CSS: one declaration per line, clearly separated selector blocks, reusable design tokens, meaningful component/page selectors. Do not minify or concatenate rules.
- Vanilla ES6 JavaScript Modules: small focused named functions, clear imports, separate DOM/render/validation/mock service/data aggregation concerns; no inline `onclick`, no huge scripts, no compressed one-liners.
- Avoid spaghetti code, excessive global variables, fake helper imports, duplicate styles, `alert()` or `confirm()`; event handlers use `addEventListener`.
- Preserve public site, Authentication, Onboarding and other owners’ module files. Do not introduce React/Vue/Vite/Next/Angular/Razor/jQuery or a new build tool.
- Do not store real passwords or claim real backend actions. Use mock data explicitly; outputs and charts must be computed from that data, not invented at runtime.

Good example of readable code:

```javascript
function calculateTotalSeconds(entries) {
    return entries.reduce((total, entry) => {
        return total + entry.durationSeconds;
    }, 0);
}


function renderTotalHours(entries, outputElement) {
    const totalSeconds = calculateTotalSeconds(entries);

    outputElement.textContent = formatDuration(totalSeconds);
}
```

Provide actual implementation/import of any helper such as `formatDuration`; **never leave undefined example helpers in delivered code**. Use logical blank lines between functions and cohesive sections, not one-line spaghetti code. Keep code manually readable and consistently indented.

## 11. Responsive behavior

Test at 1920, 1440, 1280, 1024, 768, 430, 390, 360px. Match reference at its original viewport first, then adapt. Use Mostafa's app shell and mobile navigation. Complex tables may scroll within a properly labelled region. On mobile, use an alternative agenda for calendars or concise task timeline for Gantt if dense grid becomes unusable. Do not hide essential labels, selected filters, totals or actions. Avoid whole-page horizontal overflow.

## 12. Accessibility and privacy

Use semantic structures, associated form labels, proper focus states, `aria-invalid` with messages, accessible modal focus/escape handling, keyboard-usable filters, status text (not color only), logical heading order and reduced-motion rules. Ensure charts have adjacent accessible summaries or data tables. Do not use emojis. Never claim hidden background employee tracking, automated surveillance, real server enforcement, AI predictions or payroll/billing calculations.

## 13. Precise QA cases for this screen

- Navigation changes correct dates
- Events land on correct day
- Filter reflects event types
- No duplicates between task and event records
- Mobile agenda view is readable

General regression: Landing Page, Auth, Onboarding, Shared Sidebar/Topbar, Ahmed’s workspace/project pages, Alaa’s task links, and Eman’s read-only client views remain intact. Check HTML links, CSS imports, ES module paths, image paths, browser console and local HTTP server loading. Verify test data totals and date logic.

## 14. Definition of done and delivery report

The page must (1) visually resemble the approved screenshot, (2) work with canonical mock data, (3) provide all specified interactions and states, (4) link correctly to appropriate TaskFlow pages, (5) work across breakpoints and keyboard interaction, (6) preserve other teams’ code, (7) contain clean, readable source. Report **files created/changed/moved**, component reuse, screen routes, test results, mock-only limitations, missing assets, screenshots compared and any remaining visual differences. Mark any blocked integration explicitly. Do **not** claim the backend, timer sync, real notification delivery or team permissions are implemented when they are not.

## 15. Implementation order

1. Audit current code + identify relevant shared data owners.
2. Confirm and map approved screenshot elements.
3. Build/reuse the shared data and UI contract.
4. Create page semantic HTML at `frontend/pages/app/calendar/index.html`.
5. Add focused stylesheet at `frontend/css/pages/calendar/calendar.css`.
6. Add controller at `frontend/js/pages/calendar/calendar.js`; split calculations and state into reused, focused modules.
7. Implement the specified states, actions and validation.
8. Test cross-page navigation, derived data, responsive and accessibility.
9. Compare rendered screenshot with approved image; refine iteratively.
10. Update module README and report changed files and demo limits.

**Execute completely within existing TaskFlow frontend using maintainable, non-spaghetti code.**
