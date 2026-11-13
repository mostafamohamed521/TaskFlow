# FILE STRUCTURE & ROUTES — TaskFlow / Alaa

الملفات التالية **مقترحات مسارات ثابتة** داخل مشروع TaskFlow القائم. إن وُجدت مسارات صحيحة بالفعل يجب الحفاظ عليها أو توحيدها بأمان مع تحديث كل الروابط؛ لا تُنشئ نسخة أخرى من المشروع.

## 1) Route matrix

| # | Screen | HTML | CSS | JavaScript | UI pattern |
|---:|---|---|---|---|---|
| 01 | All Tasks | `frontend/pages/app/tasks/index.html` | `frontend/css/pages/tasks/index.css` | `frontend/js/pages/tasks/index.js` | full page |
| 02 | My Tasks | `frontend/pages/app/tasks/my-tasks.html` | `frontend/css/pages/tasks/my-tasks.css` | `frontend/js/pages/tasks/my-tasks.js` | full page |
| 03 | Task Details | `frontend/pages/app/tasks/details.html` | `frontend/css/pages/tasks/details.css` | `frontend/js/pages/tasks/details.js` | full detail page or drawer |
| 04 | Create Task | `frontend/pages/app/tasks/create.html` | `frontend/css/pages/tasks/editor.css` | `frontend/js/pages/tasks/create.js` | full page route and reusable drawer |
| 05 | Edit Task | `frontend/pages/app/tasks/edit.html` | `frontend/css/pages/tasks/editor.css` | `frontend/js/pages/tasks/edit.js` | full page route and reusable drawer |
| 06 | Kanban Board | `frontend/pages/app/kanban/board.html` | `frontend/css/pages/kanban/board.css` | `frontend/js/pages/kanban/board.js` | full page |
| 07 | Board Settings | `frontend/pages/app/kanban/settings.html` | `frontend/css/pages/kanban/settings.css` | `frontend/js/pages/kanban/settings.js` | full settings page |
| 08 | Task Checklists | `frontend/pages/app/tasks/checklists.html` | `frontend/css/pages/tasks/detail-sections.css` | `frontend/js/pages/tasks/checklists.js` | task detail tab with optional deep-link page |
| 09 | Task Comments | `frontend/pages/app/tasks/comments.html` | `frontend/css/pages/tasks/detail-sections.css` | `frontend/js/pages/tasks/comments.js` | task detail tab with optional deep-link page |
| 10 | Task Attachments | `frontend/pages/app/tasks/attachments.html` | `frontend/css/pages/tasks/detail-sections.css` | `frontend/js/pages/tasks/attachments.js` | task detail tab with optional deep-link page |
| 11 | Task Activity | `frontend/pages/app/tasks/activity.html` | `frontend/css/pages/tasks/detail-sections.css` | `frontend/js/pages/tasks/activity.js` | task detail tab with optional deep-link page |
| 12 | Task Templates | `frontend/pages/app/tasks/templates.html` | `frontend/css/pages/tasks/templates.css` | `frontend/js/pages/tasks/templates.js` | full page |
| 13 | Archived Tasks | `frontend/pages/app/tasks/archived.html` | `frontend/css/pages/tasks/archived.css` | `frontend/js/pages/tasks/archived.js` | full page |

## 2) Suggested frontend tree

```text
frontend/
├── pages/app/
│   ├── tasks/
│   │   ├── index.html
│   │   ├── my-tasks.html
│   │   ├── details.html
│   │   ├── create.html
│   │   ├── edit.html
│   │   ├── checklists.html       # optional deep-link/tab view
│   │   ├── comments.html         # optional deep-link/tab view
│   │   ├── attachments.html      # optional deep-link/tab view
│   │   ├── activity.html         # optional deep-link/tab view
│   │   ├── templates.html
│   │   └── archived.html
│   └── kanban/
│       ├── board.html
│       └── settings.html
├── components/
│   ├── app/                     # Mostafa's shared shell, reuse
│   ├── tasks/
│   │   ├── task-row.html
│   │   ├── task-editor.html
│   │   ├── task-detail-panel.html
│   │   ├── checklist-panel.html
│   │   ├── comments-panel.html
│   │   ├── attachments-panel.html
│   │   ├── activity-panel.html
│   │   └── task-status-badge.html
│   └── kanban/
│       ├── kanban-column.html
│       └── kanban-task-card.html
├── css/
│   ├── foundation/              # existing brand tokens
│   ├── layouts/app-shell.css    # existing shell
│   ├── components/
│   │   ├── tasks.css
│   │   ├── kanban.css
│   │   └── task-editor.css
│   └── pages/
│       ├── tasks/
│       │   ├── index.css
│       │   ├── my-tasks.css
│       │   ├── details.css
│       │   ├── editor.css
│       │   ├── detail-sections.css
│       │   ├── templates.css
│       │   └── archived.css
│       └── kanban/
│           ├── board.css
│           └── settings.css
├── js/
│   ├── core/                    # existing core
│   ├── modules/
│   │   ├── task-store.js
│   │   ├── task-validation.js
│   │   ├── task-selectors.js
│   │   └── kanban-dnd.js
│   ├── services/mock/
│   │   └── mock-task-service.js
│   └── pages/
│       ├── tasks/
│       │   ├── index.js
│       │   ├── my-tasks.js
│       │   ├── details.js
│       │   ├── create.js
│       │   ├── edit.js
│       │   ├── checklists.js
│       │   ├── comments.js
│       │   ├── attachments.js
│       │   ├── activity.js
│       │   ├── templates.js
│       │   └── archived.js
│       └── kanban/
│           ├── board.js
│           └── settings.js
└── assets/icons/                # existing icon family
```

### تنبيه مهم بشأن الـHTML fragments

ليس لازم إنشاء ملفات HTML منفصلة لكل component لو المشروع بيستخدم rendering آمن من JS بدل `fetch` fragments؛ اختاري **طريقة واحدة موحدة** حسب الـexisting architecture. لو اعتمدتِ `fetch` لملفات component HTML لازم تستخدمي local HTTP server وتحلي relative paths من عمق الصفحات بشكل صحيح.

## 3) Link and data contracts

- `taskId` parameter في Task Details والـTabs: مثال `details.html?taskId=task-001`.
- `projectId` في Kanban: مثال `../kanban/board.html?projectId=project-001`، ويجب توليده حسب المسار الفعلي.
- `task-store.js` يمثل المصدر المشترك للداتا؛ كل صفحة تستدعي selectors بدل نسخ mock arrays.
- `board-settings` يمثل إعدادات أعمدة Board واحد فقط؛ Workspace/Project permissions تخص أحمد.
- `Task Details` يستوعب أقسام Checklists/Comments/Attachments/Activity كـtabs؛ deep links ليست مسارات مكررة لنفس DOM.
- `Create Task` و`Edit Task` يعتمدان على reusable Task Editor واحد؛ هما route entry points أو Drawer presentation.
- `Ahd` integrates a timer using task ID (no duplicate timer logic).
- `Eman` consumes only explicitly shareable project/client data (no automatic disclosure of internal comments/files).

## 4) Shared status/priority conventions

- `status`: `to-do`, `in-progress`, `in-review`, `done` (or stable mapped board-column identifiers).
- `priority`: `urgent`, `high`, `medium`, `low`.
- `roles`: `owner`, `admin`, `member`, `viewer` at workspace level; clients follow external portal roles/policies.
- Dates: ISO date strings / timestamps with consistent local display, and no invented timezone assumptions.

## 5) Acceptance

لا قبول لملفات مفصولة ظاهريًا فقط لكن نسخة نفس الكود في كل صفحة. معيار التسليم: components مشتركة + توحيد store + routes سليمة + صور UI مطابقة بقدر المتاح + إمكانية تشغيل حقيقية عبر Live Server + responsive + keyboard support + توثيق.
