# TaskFlow — UI DESIGN PROMPT 06/14

**Screen:** Workspace Invitations  
**Owner:** Ahmed Reda Ahmed Sedik — Workspaces & Projects  
**Screen path after implementation:** `frontend/pages/app/workspaces/invitations.html`  
**Deliverable now:** One complete **static image** of this page, NOT HTML/CSS/JS.

## Your role and exact goal

Act as a top-tier SaaS Creative Director, Principal Product Designer, visual interaction designer and Figma-level art director. Design the **Workspace Invitations** page for TaskFlow to a premium, meticulously aligned, polished enterprise SaaS standard. TaskFlow serves individuals, freelancers, teams and companies with workspaces, projects, tasks, schedules, time tracking and a separate Client Portal.

**What this page does:** مركز متابعة دعوات أعضاء Workspace وإرسال دعوات جديدة وإعادة الإرسال أو الإلغاء في Demo آمن.

Your task is specifically THIS page; do not generate the other 13 pages or drift into another team's feature.

## Brand palette and core aesthetic

- Dark Forest: `#0D2C26` (sidebar/brand depth)
- Forest: `#123B31` (headings, deep surfaces)
- Olive: `#2E7D32` (primary actions)
- Sage: `#4CAF7B` (focus/selection/success)
- Warm Beige: `#F5EFE6` (background)
- Off-white: `#FCFAF6` (surfaces)
- Terracotta: `#C96F4A` (restrained highlights)
- Charcoal: `#1F2937` (main text)
- Slate: `#64748B` (muted text)
- Font: **Inter**; line icons SVG, no emoji anywhere in UI.

## Exact visual and art-direction rules

- Receive and inspect the official **TaskFlow brand board**, original logo asset, Ahmed-related approved screenshots if supplied, and the existing Public/Auth/Onboarding UI. The latest brand image is a reference, not a license to redraw the logo; use the real logo asset. **No emojis in any interface**.
- Produce **one complete 16:9, high-resolution desktop UI mockup** for this exact screen, with no side-by-side unrelated concepts, no collage and no code. The mockup must look like a real running SaaS page with precisely aligned UI, readable labels, realistic content and purposeful actions.
- Maintain the shared App Shell: a restrained deep-forest sidebar (~248–260px at desktop) with official brand logo, workspace switcher and navigation (Overview, Projects, Tasks, Calendar, Time Tracking, Team, Clients where applicable, Reports, Settings); off-white topbar (~68–76px) with workspace context, search, notifications and user menu. On this page, show the correct active nav item. The public floating glass Navbar belongs to the marketing website, **not** the internal App Shell.
- Canvas: warm off-white/beige, subtle organic curves only where the references use them, generous but usable whitespace, off-white panels, thin neutral borders, soft calibrated shadows. Corner radii approx 12–14px controls, 18–24px cards. Inter typography; headings charcoal/forest, muted descriptions slate, primary actions olive; hover/focus via sage.
- Make layout design purposeful: clear page hierarchy, a top breadcrumb/heading and primary action, visible workspace/project context, content modules with sensible data density. Avoid the same generic large cards repeated everywhere. Use small, consistent line icons, not emoji or arbitrary clipart.
- At 1920×1080 keep all primary actions and important content in the frame; reflect how the design stacks at 1366, 1024, 768 and 390px. **Do not put full-screen auth branding art on application pages**.
- The screenshot represents a design reference only, not evidence that any feature is already implemented. Never invent specific prices, active paid plans, real emails sent, unseen users' data or production analytics.


## Page-specific visual composition (do not omit)

**Active Sidebar item:** `Workspaces`.

**Primary title visible in design:** “Workspace Invitations”  
**Subtitle:** “Keep track of who has been invited to collaborate.”

**Exact visual layout concept:** Header + CTA Invite، tabs/filter Pending / Accepted / Expired / Revoked، invitation list فيها email، assigned role، inviter، sent date، expiry، status، menu منضبط.

**Essential on-screen content:** Invitation status pills, email, role, sender, date, expiry, overflow actions.

**High-value interaction cues to depict:** Resend and revoke require coherent status transitions; copied link is demo-only.

**Critical behavioral meaning:** Keep invites belonging to a workspace isolated.

## Page controls and input elements

The final design must show these controls (some inside an opened drawer/modal if that state is specifically the best visual reference; the default full-page screenshot should still be clear):

- **Invite email** — place and label this clearly, using the established input/select/search/filter design system.
- **Role selector Admin / Member / Viewer** — place and label this clearly, using the established input/select/search/filter design system.
- **Search by invitee email** — place and label this clearly, using the established input/select/search/filter design system.
- **Status filters** — place and label this clearly, using the established input/select/search/filter design system.
- **Optional expiry display (read-only)** — place and label this clearly, using the established input/select/search/filter design system.

## Primary and secondary actions

- **Send Invitation (demo)** — show a recognizable, correctly placed and context-appropriate action.
- **Resend Invitation (demo)** — show a recognizable, correctly placed and context-appropriate action.
- **Revoke Invitation (demo)** — show a recognizable, correctly placed and context-appropriate action.
- **Copy demo invitation URL** — show a recognizable, correctly placed and context-appropriate action.
- **View Invitations** — show a recognizable, correctly placed and context-appropriate action.
- **Open Members** — show a recognizable, correctly placed and context-appropriate action.

Every prominent action must have a sensible destination or outcome; never imply that users can edit something their role does not permit.

## Detail states to plan in the design

Provide a main design that exemplifies the populated or appropriate default state, and make the same component styles support:

- Pending.
- Accepted.
- Expired.
- Revoked.
- Empty list.
- Duplicate invitation.
- Invalid email.
- Invite action not permitted.

Use clear muted empty states where relevant, realistic list records, role badges, status chips, help text and occasional dividers. For important visual states, a small inset state example is acceptable only if it does not overwhelm the single-page mockup; priority is one full screen.

## Data presented (visually coherent, example content only)

- Invitation ID, workspace ID.
- Invited email, assigned role.
- Status and timestamps.
- Inviter identifier.
- Demo invite URL/token placeholder.

Use a single coherent demo workspace (“My Creative Studio”) and a small set of consistent sample project names only when content is needed. Never show 12 projects in a header and 3 in another if both are meant to be totals. For a first-time empty workspace show 0 projects/0 tasks rather than fake trends.

## Permissions, ownership, and product boundaries

- Owner role must not be inviteable.
- Recipient cannot alter invited role.
- Sending/resending email must not be claimed real in frontend-only implementation.
- Accept Invitation screen belongs to Mostafa; this screen is invitation management.

**Owner/Admin/Member/Viewer** are workspace roles, not job titles. The workspace creator is Owner. An external invited Client is a separate persona and sees only approved Client Portal information.

## Layout and visual precision checklist

1. Respect supplied visual references and original logo; text remains legible at presentation size.
2. Proper breadcrumb, title hierarchy, secondary copy and aligned primary CTA.
3. Sidebar, Topbar, badges, form components and cards reuse TaskFlow's established system.
4. No random colors or charts, no marketing-page floating Navbar, no decorative emojis.
5. All major page areas align to a consistent 8px-based spacing rhythm.
6. Clear responsive intent: desktop app shell, tablet rearrangement, mobile cards/scrollable controls and navigation drawer.
7. State distinction through readable labels/icons as well as color; selected/disabled/focus states look credible.
8. Do not crop important actions; avoid overcrowding and oversized empty cards.
9. Produce ONE polished, high-resolution, full-page desktop mockup in **16:9**; keep the design original and implementable in HTML/CSS/JS.

## Strict negative prompt

No React screenshots, generic Bootstrap template, unrelated corporate stock photos, random glass blocks, invented mobile UI on desktop, fake pricing claims, garbled text, duplicated logo, emoji, unbounded shadows, fake analytics, unauthorized actions, or visible controls without a meaningful purpose.

**FINAL DESIGN INSTRUCTION:** Create a production-grade visual mockup of **Workspace Invitations**, pixel-consistent with TaskFlow's established Auth/Onboarding/App look, with accurate, purposeful page-specific components and nothing irrelevant.
