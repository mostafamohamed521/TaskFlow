# UI DESIGN PROMPT 16 — Client Activity

> **Use as a standalone image-generation / design brief.** Attach the official TaskFlow brand board, original logo, approved app shell visual, and relevant existing module screenshots. Output **one 1920×1080 desktop high-fidelity static mockup** with readable labels. This document requests an IMAGE, not code.

## 1. Role, product, and target user

Act as an award-winning Senior SaaS Product Designer, UX Architect, and Creative Director. Produce a distinctive, authentic and extremely refined TaskFlow **Client Activity** design. **Purpose:** Show a transparent timeline of relevant shared project events without exposing internal audit logs.

This belongs to **Eman’s Clients, Client Portal & Deliverables module**. The application serves Individuals, Freelancers, Teams and Companies; external clients are invited to a restricted portal. This design represents **client portal activity feed / tab**. Never confuse an internal staff screen with the client-facing portal.

## 2. Non-negotiable TaskFlow identity

- Official colors: Sage `#4CAF7B`, Olive `#2E7D32`, Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.
- Inter typography, real original TaskFlow logo asset, precise green/cream visual hierarchy, subtle warm curves, balanced whitespace, border-driven cards, gentle shadows, consistent SVG outline icons, **NO EMOJIS**.
- Reuse Mustafa's official App Shell (sidebar/topbar/navbar, navigation, forms, buttons, modals, toasts), NOT a redesigned clone. **Client Portal is a separate restricted client shell** and must not use internal admin navigation.
- Screens should look like the same real SaaS product as the already approved TaskFlow public/Auth/Onboarding design references.

Target UI metrics (adapt to supplied references): internal sidebar ~248–264px, topbar ~68–76px, content max suitable for app width, 12–20px panel radius, 16–24px sectional gaps, 44–52px actions, 14–16px body text, 26–32px main headings. Use a 12-column content grid where useful. Avoid random fake charts, dashboard clutter, oversized KPI blocks, purple gradients, generic Bootstrap defaults, stock people and unreadable type.

## 3. Exact screen composition

Implement this composition in the **single image**, reflecting hierarchy and balance:

Chronological feed; project/date filters; event type icon; actor-safe labels; linked projects and deliverables; pagination/Load More; no-events state.

At the top: context breadcrumb + clear title **Client Activity** + one dominant task-specific CTA. Within the content: an understandable toolbar and correctly labeled data regions. Keep dense details in suitable tables, forms, tabs or drawers—not endless cards. For client-facing screens the visible navigation must contain only shared Projects, Deliverables, Reviews, Change Requests and Activity where actually permitted.

## 4. Precise UI controls and interactions to depict

Filter by project/date; open linked shared item; load older events.

Every field or action must have explicit visible label, selected value or affordance. Internal staff operations must be distinct from client review actions. Contextual forms should visually be depicted as **client portal activity feed / tab** rather than artificially creating a completely different page shell.

## 5. Specific data/content to visualize

Render a small internally consistent **demo** dataset using the conceptual contract:

`publicActivity {id,clientId,projectId,type,actorDisplay,occurredAt,resourceId,isVisibleToClient}`

Use shared realistic sample labels across projects, clients, versions and reviews (e.g., **Northstar Studio**, **Restaurant Website**, **Homepage Design**, **Version 2**, **Awaiting Review**). No real contact email or identity claims. Status labels must be semantically correct; if an approval refers to V2, don't accidentally show V1 as approved. Distinguish status for each record type; always show the project and client context.

## 6. Product-domain correctness and ownership

The internal audit log and private comments must not be exposed. Public activity is a curated allowed event stream only.

Important boundaries:

- **Mustafa** owns Auth invitation acceptance, global App Shell, tokens, reusable forms, modal/toast framework.
- **Ahmed** owns master Workspace/Project details and project membership.
- **Alaa** owns internal Tasks/Kanban, not client-facing review decisions.
- **Ahd** owns master Milestones/Gantt, Time Tracking and Reports; client milestones are projections only.
- **Eman** owns internal client records, invitation creation, deliverables, client access UI, review and change-request experience.

Use IDs and related data consistently. UI designs must not imply that merely hiding a panel enforces actual permissions; backend authorization is required later.

## 7. Important screen states to account for

No recent updates; multiple projects; large history; revoked item; date filter empty.

Use representative sample content only, never claim real users or production data. Design the primary screenshot in one coherent state; specify zero/error/loading/permission states in implementation notes without showing incompatible states simultaneously. Every relevant action needs a real interaction/destination later; never add fake decorative actions.

Include thoughtful skeleton, error, empty, filtered-empty, disabled, confirmation and pending states in implementation-ready design thinking. Prioritize client trust and comprehensible action feedback.

## 8. Form, table, timeline and preview polish

- Inputs with visible top labels and restrained sage focus rings; error messages appear below the affected control.
- Table rows use status pill + readable secondary metadata; actions should be visually discoverable.
- Client project progress should reflect shared visible milestones only; do not leak sensitive internal calculations.
- Deliverable version numbers and review decisions must be clearly associated.
- Use fine separators, subtle off-white surfaces and generous negative space rather than decorative gradients.
- Icons: SVG outline family, consistent stroke and optical size, not emojis.
- Accurate alignment to 8px rhythm without sacrificing screenshot reference precision.

## 9. Responsive and accessibility design intent

Desktop deliverable is one high-resolution **1920×1080 mockup**, but plan responsive behavior for 1440/1280/1024/768/430/390/360px. Maintain a coherent hierarchy as the sidebar becomes Mustafa's existing mobile nav. In the client portal use its own compact header. Tables may become labelled item cards on mobile; complicated controls may become full-screen drawers. Keep all forms touch friendly and contrast sufficient. Show no impossible desktop-only positioning.

## 10. Strict negative instructions

NO React code, NO HTML markup, NO site screenshot-as-background, NO invented subscription pricing, NO public clients listed in internal team navigation, NO emojis, NO fake paid plans or security certification, NO contradictory statuses, NO overstuffed widgets, NO invented permission escalation, NO internal-only information in the client portal. Never change the TaskFlow logo or fonts.

## 11. Deliverable checklist

One comprehensive beautiful **Client Activity** visual mockup, no clipped edges, correct shell, exact main content, matching TaskFlow palette, professionally typeset, appropriate status states, realistic sample details and a direct translation path to HTML/CSS/Vanilla JavaScript. If multiple UI states are needed, keep them as later separate variations rather than cluttering the primary image.
