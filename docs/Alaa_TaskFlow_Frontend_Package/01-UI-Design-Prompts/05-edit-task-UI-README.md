# TaskFlow — UI DESIGN MASTER PROMPT 05/13
## Edit Task | آلاء — Task Management & Kanban

> **Purpose:** Copy this entire Markdown prompt into your image/UI design tool, attach the **original TaskFlow logo and approved brand/application screenshots**, and request **one high-fidelity desktop UI mockup** for this exact view. This document requests a design image, not executable code.

## 1. Role and visual standard

Act as an internationally recognized Senior SaaS Product Designer and Creative Director. Create an original, exceptional, **production-realistic TaskFlow `Edit Task` user-interface screenshot**, not a generic template, wireframe, or Figma placeholder. The visual must be highly legible, elegant, balanced, practical, and consistent with every other TaskFlow screen. Produce one complete landscape image at **1920×1080 (16:9)** or equivalent, showing no clipped controls. Treat this design as a handoff-ready visual specification for a pure HTML/CSS/vanilla JS engineer.

**Functional goal:** Edit an existing task while respecting edit permissions and preserving history.

**Place in product:** full page route and reusable drawer. This is one unified form UI that can be presented as a full-page route and reused in a side drawer/modal. Do not design separate inconsistent editors.

## 2. Non-negotiable brand art direction

- **TaskFlow palette:** Sage `#4CAF7B`, Olive `#2E7D32`, Warm Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.
- **Typography:** Inter, high-contrast headings, polished 14–16px body text, consistent weights.
- **Shell:** reuse Mostafa’s dark forest-green App Sidebar, warm cream content canvas, Topbar, workspace switcher and responsive mobile navigation, never recreate an unrelated shell.
- **Interaction visuals:** soft radius (~12–16px controls, ~20–24px cards), sage focus rings, subtle borders/shadows, consistent SVG line icons, minimal animation, no emoji.
- **Source of truth:** the supplied original TaskFlow logo/brand board and approved public/auth/app UI screenshots; do not redraw or restyle the logo.

Use an intentional editorial layout, real task-management hierarchy, accurate domain terminology, balanced negative space, compact professional data density, and careful alignment. Preserve the app shell, spacing rhythm and icon family seen in the supplied TaskFlow references. No purple-dominant generic SaaS theme, no excess gradients, no huge empty cards, no arbitrary hero illustrations dominating a work interface, no fake AI widgets, and absolutely **no emojis**. Use sensible realistic sample task names and coherent dates, avoiding invented real customer claims or fabricated metrics presented as facts.

## 3. Exact view composition

The mockup must clearly include and visually prioritize all of the following, in this order where meaningful:

1. Task breadcrumb and edit heading
2. Prefilled shared task editor form
3. Current status, priority, assignees and dates
4. Unsaved-changes notice
5. Save Changes / Cancel action bar
6. Archive or destructive action separated from Save

**Layout brief:** a stable 248–260px left Sidebar with TaskFlow logo and work navigation, 68–76px top bar with search/notifications/avatar, main content centered within a comfortable responsive maximum width. A strong title/toolbar row must anchor the screen. Use semantic visual groupings: data-heavy list/table where appropriate, smaller secondary panels where useful, and crisp action hierarchy. Do not force every feature into identical cards. The active Tasks or Kanban navigation state should be correct. For nested views, visibly relate the content to its parent task and project.

## 4. Fields, filters and information hierarchy

Represent the following exact fields and display controls when appropriate to this view:

- Title
- Description
- Project (change only if supported)
- Status
- Priority
- Assignees
- Start date
- Due date
- Labels
- Estimate
- Checklist

Labels and placeholder text must be consistent, grammatically correct, and readable. Use appropriate realistic example values; never invent client-only capabilities for internal task screens. Data visuals must agree with one another: completed checklist items must match progress counts, statuses must match column placement, task counts should be mathematically plausible, and due-date warnings must be logically consistent.

## 5. Primary and secondary actions

The user should immediately understand how to perform these actions:

- Load task by ID from mock store
- Validate edits
- Save changes
- Cancel and restore initial values
- Confirm unsaved changes before leaving
- Write audit event to shared demo activity

Design the primary CTA as strong forest/olive green, secondary actions as quiet outlined/neutral controls, destructive actions in restrained red, and tertiary actions as understated text/icon actions. Show proper tooltips or clear labels for icon-only buttons. Action placement should reflect frequency and danger; do not show misleading functional affordances.

## 6. Critical TaskFlow behavior constraints

- Do not fabricate reassignment access
- Keep creation and edit forms in shared component
- An edited task must update Kanban and lists consistently

**Permissions:** Owner/Admin/Member/Viewer are workspace-related roles; actual edit access may also depend on project membership. A Viewer must not be shown as able to modify restricted tasks. A client uses Eman’s separate Client Portal and sees only shared information. The task Timer belongs to **Ahd** and, if shown, should be an integration slot or read-only indicator, not a newly invented timer implementation. Workspace/project administration belongs to **Ahmed**.

## 7. Visual micro-details and required states

Design consistent: hover/active/selected rows and cards, keyboard-visible focus, disabled actions, inline validation, empty states, loading skeletons, success toasts, and error feedback. The hero reference screenshot should show the **main useful populated state** unless this view is primarily empty by design. The chosen state must not contain contradictory data. Provide a clear accessible text hierarchy and enough space for longer task titles, variable dates, and varying number of assignees.

For tables: consistent column widths, sticky or clear headers, scan-friendly row spacing, badges with both text and color, truncation behavior and horizontal overflow plan. For board cards: compact task hierarchy, visible due dates, drag affordances and status clarity. For forms: labels above inputs, ~52–56px control heights, helpful examples, compact errors and an obvious Cancel/Save hierarchy.

## 8. Responsive thought-through design

At 1440px: keep the same navigation and main hierarchy; at 1024/768px: stack secondary panels and collapse side sections; at 430/390/360px: switch to a genuinely mobile composition, accessible controls, scrollable table where unavoidable, and a mobile-safe Kanban/list alternative. All touch targets ≥44px and no horizontal page overflow. Decorative shapes must never obstruct content. Avoid fixed heights clipping task forms or long comments.

## 9. Required visual handoff

- Produce **one desktop high-fidelity screenshot**, not a collage of multiple pages or an image containing actual code.
- Keep the entire screen crisp enough to guide pixel-accurate HTML/CSS implementation.
- Show correct TaskFlow logo and all user-visible labels accurately.
- Maintain exact same app shell as approved TaskFlow designs.
- If an exact asset is missing, use a transparent/reproducible UI treatment rather than inventing another logo.
- Do not show source code, pseudo-code, JSON or browser mockup chrome in the image.

**Final creative direction:** sophisticated, highly functional, warm modern project-management SaaS—every control intentionally placed and ready for a real developer to implement.
