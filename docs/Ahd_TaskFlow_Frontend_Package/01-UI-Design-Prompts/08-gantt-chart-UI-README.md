# UI DESIGN PROMPT 08 — Gantt Chart

> **Copy/paste this whole prompt into an image/UI design tool.** Attach the TaskFlow official logo/brand board, already-approved TaskFlow app shell screenshot, and the relevant latest UI screenshots. This is a **single-screen high-fidelity image request**, not code. Ahmed/Alaa/Mostafa modules are context, not designs to reinvent.

## 01. Role and deliverable

Act as an award-winning Senior Product Designer, Creative Director, UX Information Architect, and Data Visualization Specialist. Design a **production-realistic, premium, pixel-accurate desktop TaskFlow UI mockup** for the **Gantt Chart** interface. Its purpose: **Visualize project task and milestone timelines with dependencies.**.

Deliver **one** 1920×1080 landscape image. Include the complete page within the frame, with clear professional typography, crisp line icons, no clipping and legible mock data. Your design will be recreated as actual HTML/CSS/JavaScript later. It must look like one integrated application, not a generic template or a Figma component dump.

## 02. Brand and existing application shell

- Sage Green `#4CAF7B`; Olive `#2E7D32`; Warm Beige `#F5EFE6`; Terracotta `#C96F4A`.
- Charcoal `#1F2937`; Slate `#64748B`; Off-white `#FCFAF6`; Forest `#123B31`; Dark Forest `#0D2C26`.
- Font: **Inter**; use the real supplied TaskFlow logo (never redraw or rename it).
- Premium calm SaaS visual language: deep-green sidebar, creamy canvas, precise modular surfaces, soft borders/shadows, generous breathing space, restrained rounded corners, consistent SVG line icons. **NO EMOJIS**.
- Shared app shell belongs to **Mostafa**: sidebar/topbar/mobile-nav, form controls, modal/drawer/toast patterns. Ahd must reuse and extend, never duplicate their global foundations.

Use the approved TaskFlow structure: dark forest-green left app sidebar, warm off-white workspace surface, topbar with workspace switcher/search/notifications/avatar, subtle breadcrumb, and a functional-looking content region. Highlight the appropriate active nav item: **Project Scheduling / Gantt**. Use authentic TaskFlow content density: professional, restrained, modern, with meaningful empty space.

## 03. UI layout blueprint for THIS page

Compose the screen with this **exact page-specific content hierarchy** and no unrelated dashboard widgets:

- Project selector and timeline scale Day / Week / Month
- Sticky task-name table on left, horizontal timeline scroll on right
- Task bars with start/end dates and status, refined green design
- Milestone diamonds and Today marker
- Dependency connector lines and small legend
- Critical path only if correctly computed; otherwise omit
- Empty state for project with unscheduled tasks

Visual hierarchy: screen title and primary action first; filtering/navigation second; work content third; contextual details last. Use a 12-column responsive dashboard grid; use tables for actual tabular data rather than random cards. Target clean 16–24px component spacing and 12–20px radius depending on density, but obey the brand references when they show more precise dimensions. Maintain a coherent 248–264px sidebar, a 64–76px topbar, and constrained content padding. Prefer legibility over ornamental density.

## 04. Exact controls, toolbars, and CTAs to depict

- Project select
- Timeline zoom
- Date range navigation
- Select task bar opens Alaa Task Details
- Click milestone for details
- Optional date adjustments with explicit confirmation; if drag not supported, do not imply it

Make each control recognizable, consistent and usable in a real frontend. Display proper input labels, selected filters, helper copy, and icon affordances. Every major button should have a clear destination or action in the real product. Do not fill the screen with dead decorative call-to-action buttons.

## 05. Data to represent in the visual

Use a tiny coherent, obviously **sample/demo** dataset that relates tasks to projects and time entries. Reuse common project names across visual sections if displayed. Use real calendar arithmetic and plausible totals, but do not invent user testimonials, commercial plan prices, subscription stats or earned revenue. Data entities needed:

- task {id,projectId,title,startDate,dueDate,status,progress}
- dependency {predecessorTaskId,successorTaskId,type}
- milestone {id,projectId,title,dueDate,status}

Show correct units (hours vs tasks vs projects), dates, legends, totals and chart axes. Where data is missing, use a designed empty state rather than suspiciously perfect trend charts.

## 06. Product rules that must shape the UX

- Use one canonical task date source; avoid copying task data into Gantt model.
- Task dependency must not create cycles.
- Milestone may have due date without duration.
- No edits to task permissions outside authorized scope.

**Cross-team boundary:** Alaa owns tasks and edits; Ahmed owns project selection; Ahd owns visualization and scheduling presentation.

## 07. Critical UI states to illustrate in a coherent default screenshot

The main image should show a representative primary state. The visual design must also make room for these states in implementation:

- Empty timeline
- Populated schedule
- Unscheduled tasks list
- Overflow horizontal scrolling
- Dependency warnings
- Read-only viewer mode

Do not cram several contradictory states (e.g., timer both running and paused) into one mockup. If showing an error example, keep it compact and accessible, not as the entire main screen.

## 08. Typography, spacing, chart/table details

- Use Inter for headings, labels and data. Large page title ~26–32px, body ~14–16px, labels ~12–14px. Accurate numerical alignment/tabular digits in time data.
- Text and values must not overlap. Date ranges, filters and selected items must be understandable at a glance.
- Tables: clear sticky header if appropriate, readable row density, accessible status badges and action icon targets.
- Charts: labeled axes/units, accessible legend, restrained forest/olive/sage palette, zero baseline when appropriate; avoid 3D misleading charts.
- Gantt, timesheets and calendar visualizations must preserve their actual domain-specific structures; never replace a timeline with a decorative graph.
- Use soft shadows and thin neutral borders sparingly. Avoid gradient-filled KPI cards everywhere.

## 09. Responsive and accessibility intent

- Desktop reference viewport: create a **16:9 1920×1080** design, while specifying stable tablet/mobile compositions (1440, 1280, 1024, 768, 430, 390, 360px).
- Fixed/scrollable sidebar and topbar follow the **existing** shared shell. On mobile use Mostafa’s nav pattern, no duplicated sidebar framework, no horizontal page overflow.
- Dense charts, timesheet grids, and Gantt may scroll **inside their own containers** or switch to simplified mobile views with labels preserved.
- Add keyboard-visible focus, semantic tables when applicable, properly labelled filters and controls, contrast, error and empty states, reduced-motion compatibility.
- Do not promise a clickable screenshot; this design prompt produces an image only. UI interactions below are future implementation requirements.

## 10. Strict negative instructions

No emojis. No generic Bootstrap look. No unrelated subscription upsell. No AI assistant. No fake productivity-scoring algorithm, no invented team monitoring metrics, no fake time tracking. No new logo. No stock photography. No purple/neon redesign. No false claims of working API, notifications, billing or real-time data. No partial/cropped UI. No blurry tiny text. No unrelated project-creation feature inside Ahd-owned reports. No inconsistent task/project records.

## 11. Final visual acceptance

The rendered design must instantly communicate **Gantt Chart**, preserve the entire TaskFlow identity, implement a legible information hierarchy and show precise, believable product details. It must be suitable as the single approved UI screenshot reference for the engineering implementation prompt with the same number: **08-gantt-chart**.
