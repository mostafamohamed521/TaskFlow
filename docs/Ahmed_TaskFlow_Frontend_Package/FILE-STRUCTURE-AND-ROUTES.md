# Ahmed — Frontend Paths & Ownership Map

## Project path conventions

The `frontend/` directory already exists. All paths in this package are relative to it. **Do not create a second `frontend` directory.** The owning module is either `workspaces` or `projects`. If the actual project has already adopted another sensible route naming pattern, follow the existing conventions consistently and record the map.

## Workspaces

```text
frontend/
├── pages/app/workspaces/
│   ├── index.html
│   ├── overview.html
│   ├── create.html
│   ├── settings.html
│   ├── members.html
│   └── invitations.html
├── css/pages/workspaces/
│   ├── index.css
│   ├── overview.css
│   ├── create.css
│   ├── settings.css
│   ├── members.css
│   └── invitations.css
└── js/pages/workspaces/
    ├── index.js
    ├── overview.js
    ├── create.js
    ├── settings.js
    ├── members.js
    └── invitations.js
```

## Projects

```text
frontend/
├── pages/app/projects/
│   ├── index.html
│   ├── create.html
│   ├── overview.html
│   ├── edit.html
│   ├── settings.html
│   ├── members.html
│   ├── templates.html
│   └── archived.html
├── css/pages/projects/
│   ├── index.css
│   ├── create.css
│   ├── overview.css
│   ├── edit.css
│   ├── settings.css
│   ├── members.css
│   ├── templates.css
│   └── archived.css
└── js/pages/projects/
    ├── index.js
    ├── create.js
    ├── overview.js
    ├── edit.js
    ├── settings.js
    ├── members.js
    ├── templates.js
    └── archived.js
```

## Shared components to REUSE from Mostafa

```text
frontend/
├── css/foundation/tokens.css
├── css/layouts/app-shell.css
├── css/components/buttons.css
├── css/components/form-fields.css
├── js/core/paths.js
├── js/modules/form-validation.js
├── js/modules/form-state.js
├── js/modules/toast-manager.js
├── js/modules/modal-manager.js
└── components/app/ (sidebar/topbar/mobile-navigation)
```

Paths in Shared block are target/reference names: inspect the user's actual repo before importing. **Do not create duplicates if matching components already exist.**

## Shared mock services (only once for entire Ahmed module)

```text
frontend/js/services/mock/workspace-service.js
frontend/js/services/mock/project-service.js
frontend/js/services/mock/membership-service.js
frontend/js/services/mock/invitation-service.js
frontend/js/services/mock/project-template-service.js
```

Use stable IDs, workspace-scoped queries and deterministic fixtures. Cross-page data must stay consistent. Do not pretend mock permissions are real security.

## Routing examples

```text
pages/app/workspaces/index.html
pages/app/workspaces/overview.html?workspaceId=demo-ws-001
pages/app/workspaces/members.html?workspaceId=demo-ws-001
pages/app/projects/index.html?workspaceId=demo-ws-001
pages/app/projects/overview.html?projectId=demo-pr-001
pages/app/projects/members.html?projectId=demo-pr-001
```

Use a central path helper if one exists, and make routes work in a project served from a subdirectory. Missing IDs should give an explicit not-found or selection state. The HTML page URL is a user-facing route, **not an access-control mechanism**.

## Cross-team integration boundaries

| Area | Owner | What Ahmed does |
|---|---|---|
| Public, Auth, first-workspace Onboarding | Mostafa | Links; reuses App Shell/design system |
| Workspaces, Membership, Invitations dashboard | Ahmed | Owns management/list/admin UI |
| Projects and project settings | Ahmed | Owns creation, details, templates, archive |
| Tasks, Kanban, task discussion | Alaa | Links to board/task contexts |
| Time tracking, calendar, Gantt, reports | Ahd | Displays link/summary via data contract |
| Clients, Client Portal, deliverables | Eman | Links only; no internal permission leakage |
