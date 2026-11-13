# File Structure & Routes — Eman

> All primary page routes below are relative to the existing `frontend/` root. Do not create a second `frontend` project.

| # | Screen | HTML | CSS | JavaScript | Mode |
|---|---|---|---|---|---|
| 01 | Clients List | `pages/app/clients/index.html` | `css/pages/clients/clients-list.css` | `js/pages/clients/clients-list.js` | Full page |
| 02 | Add Client | `pages/app/clients/create.html` | `css/pages/clients/add-client.css` | `js/pages/clients/add-client.js` | Reusable modal/drawer with optional direct-entry HTML |
| 03 | Client Details | `pages/app/clients/details.html` | `css/pages/clients/client-details.css` | `js/pages/clients/client-details.js` | Full page |
| 04 | Edit Client | `pages/app/clients/edit.html` | `css/pages/clients/edit-client.css` | `js/pages/clients/edit-client.js` | Reusable edit drawer/modal with optional direct-entry HTML |
| 05 | Invite Client | `pages/app/clients/invite.html` | `css/pages/clients/invite-client.css` | `js/pages/clients/invite-client.js` | Focused invite modal or page accessible from Client Details |
| 06 | Client Portal Dashboard | `pages/app/client-portal/index.html` | `css/pages/client-portal/client-portal-dashboard.css` | `js/pages/client-portal/client-portal-dashboard.js` | Dedicated restricted portal page with client-specific shell |
| 07 | Client Project Overview | `pages/app/client-portal/project.html` | `css/pages/client-portal/client-project-overview.css` | `js/pages/client-portal/client-project-overview.js` | Dedicated client-facing project page |
| 08 | Client Milestones | `pages/app/client-portal/milestones.html` | `css/pages/client-portal/client-milestones.css` | `js/pages/client-portal/client-milestones.js` | Portal tab/section; optional deep-link HTML |
| 09 | Deliverables | `pages/app/client-portal/deliverables.html` | `css/pages/client-portal/deliverables-list.css` | `js/pages/client-portal/deliverables-list.js` | Client portal list with internal submission handoff |
| 10 | Deliverable Details | `pages/app/client-portal/deliverable-details.html` | `css/pages/client-portal/deliverable-details.css` | `js/pages/client-portal/deliverable-details.js` | Client-facing detail page with review actions |
| 11 | Submit Deliverable | `pages/app/deliverables/create.html` | `css/pages/deliverables/submit-deliverable.css` | `js/pages/deliverables/submit-deliverable.js` | Internal team submission form page or drawer |
| 12 | Deliverable Versions | `pages/app/deliverables/versions.html` | `css/pages/deliverables/deliverable-versions.css` | `js/pages/deliverables/deliverable-versions.js` | Internal version history page/section |
| 13 | Deliverable Review | `pages/app/client-portal/review.html` | `css/pages/client-portal/deliverable-review.css` | `js/pages/client-portal/deliverable-review.js` | Client-focused review form, preferably modal + deep-link fallback |
| 14 | Change Requests | `pages/app/client-portal/change-requests.html` | `css/pages/client-portal/change-requests.css` | `js/pages/client-portal/change-requests.js` | Client portal request list, internal team-safe handoff |
| 15 | Change Request Details | `pages/app/client-portal/change-request-details.html` | `css/pages/client-portal/change-request-details.css` | `js/pages/client-portal/change-request-details.js` | Client-visible request details and resolution timeline |
| 16 | Client Activity | `pages/app/client-portal/activity.html` | `css/pages/client-portal/client-activity.css` | `js/pages/client-portal/client-activity.js` | Client portal activity feed / tab |

## Folder tree — recommended targets

```text
frontend/
├── pages/app/
│   ├── clients/                # Internal Contacts: list/create/details/edit/invite
│   ├── deliverables/           # Internal submit/version history
│   └── client-portal/          # External restricted Client Portal and reviews
├── css/
│   ├── foundation/             # From Mostafa: existing global design tokens
│   ├── layouts/                # Reuse app-shell; create client-portal shell only if absent
│   ├── components/             # Reuse shared controls; avoid clones
│   └── pages/
│       ├── clients/
│       ├── deliverables/
│       └── client-portal/
├── js/
│   ├── core/                   # Reuse existing router/path helpers
│   ├── modules/
│   │   ├── client-portal/      # Safe shared projections
│   │   └── deliverables/       # Shared immutable version helpers
│   ├── services/mock/
│   │   ├── clients-service.js
│   │   ├── client-invitations-service.js
│   │   ├── deliverables-service.js
│   │   ├── reviews-service.js
│   │   └── change-requests-service.js
│   └── pages/
│       ├── clients/
│       ├── deliverables/
│       └── client-portal/
└── assets/images/clients/      # Optional original assets only
```

## Collaboration boundaries

- مصطفى: `components/app/`, `components/shared/`, `css/foundation/`, Auth acceptance, unified navigation.
- أحمد: `pages/app/workspaces/`, `pages/app/projects/`, canonical Projects service.
- آلاء: `pages/app/tasks/`, `pages/app/kanban/`.
- عهد: `pages/app/calendar/`, scheduling/Gantt/milestones and time tracking.
- إيمان: all `clients/`, `deliverables/` and `client-portal/` files above.

**Important**: a modal/deep-link may use the optional path listed above for direct testing, but must not cause duplicate UI and data logic. Do not blindly generate 16 entirely separate app shells.
