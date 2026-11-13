# FILE STRUCTURE AND ROUTES — Ahd Module

## مكان الحزمة داخل المشروع

الملفات الموجودة في هذه الحزمة نفسها **Documentation Prompts**. لا تخلطيها مع ملفات تنفيذ الواجهة. مسارات التنفيذ أسفل `TaskFlow/frontend/` القائمة أصلًا.

## خريطة المداخل الرئيسية

| # | شاشة | HTML | CSS | JavaScript |
|---|---|---|---|---|
| 01 | Time Tracking Dashboard | `frontend/pages/app/time-tracking/index.html` | `frontend/css/pages/time-tracking/time-tracking-dashboard.css` | `frontend/js/pages/time-tracking/time-tracking-dashboard.js` |
| 02 | Active Timer | `frontend/pages/app/time-tracking/active-timer.html` | `frontend/css/pages/time-tracking/active-timer.css` | `frontend/js/pages/time-tracking/active-timer.js` |
| 03 | Time Entries | `frontend/pages/app/time-tracking/entries.html` | `frontend/css/pages/time-tracking/time-entries.css` | `frontend/js/pages/time-tracking/time-entries.js` |
| 04 | Manual Time Entry | `frontend/pages/app/time-tracking/manual-entry.html` | `frontend/css/pages/time-tracking/manual-time-entry.css` | `frontend/js/pages/time-tracking/manual-time-entry.js` |
| 05 | Timesheets | `frontend/pages/app/time-tracking/timesheets.html` | `frontend/css/pages/time-tracking/timesheets.css` | `frontend/js/pages/time-tracking/timesheets.js` |
| 06 | Calendar | `frontend/pages/app/calendar/index.html` | `frontend/css/pages/calendar/calendar.css` | `frontend/js/pages/calendar/calendar.js` |
| 07 | Create Calendar Event | `frontend/pages/app/calendar/create-event.html` | `frontend/css/pages/calendar/create-event.css` | `frontend/js/pages/calendar/create-event.js` |
| 08 | Gantt Chart | `frontend/pages/app/scheduling/gantt.html` | `frontend/css/pages/scheduling/gantt-chart.css` | `frontend/js/pages/scheduling/gantt-chart.js` |
| 09 | Milestones | `frontend/pages/app/scheduling/milestones.html` | `frontend/css/pages/scheduling/milestones.css` | `frontend/js/pages/scheduling/milestones.js` |
| 10 | Task Dependencies | `frontend/pages/app/scheduling/dependencies.html` | `frontend/css/pages/scheduling/task-dependencies.css` | `frontend/js/pages/scheduling/task-dependencies.js` |
| 11 | Reports Overview | `frontend/pages/app/reports/index.html` | `frontend/css/pages/reports/reports-overview.css` | `frontend/js/pages/reports/reports-overview.js` |
| 12 | Project Progress Report | `frontend/pages/app/reports/project-progress.html` | `frontend/css/pages/reports/project-progress-report.css` | `frontend/js/pages/reports/project-progress-report.js` |
| 13 | Time Tracking Report | `frontend/pages/app/reports/time-tracking.html` | `frontend/css/pages/reports/time-tracking-report.css` | `frontend/js/pages/reports/time-tracking-report.js` |
| 14 | Team Workload Report | `frontend/pages/app/reports/team-workload.html` | `frontend/css/pages/reports/team-workload-report.css` | `frontend/js/pages/reports/team-workload-report.js` |
| 15 | Productivity Report | `frontend/pages/app/reports/productivity.html` | `frontend/css/pages/reports/productivity-report.css` | `frontend/js/pages/reports/productivity-report.js` |

## هيكل الموديول المقترح

```text
TaskFlow/
└── frontend/
    ├── pages/app/
    │   ├── time-tracking/
    │   │   ├── index.html
    │   │   ├── active-timer.html
    │   │   ├── entries.html
    │   │   ├── manual-entry.html
    │   │   └── timesheets.html
    │   ├── calendar/
    │   │   ├── index.html
    │   │   └── create-event.html
    │   ├── scheduling/
    │   │   ├── gantt.html
    │   │   ├── milestones.html
    │   │   └── dependencies.html
    │   └── reports/
    │       ├── index.html
    │       ├── project-progress.html
    │       ├── time-tracking.html
    │       ├── team-workload.html
    │       └── productivity.html
    ├── css/pages/
    │   ├── time-tracking/
    │   ├── calendar/
    │   ├── scheduling/
    │   └── reports/
    ├── js/pages/
    │   ├── time-tracking/
    │   ├── calendar/
    │   ├── scheduling/
    │   └── reports/
    ├── js/modules/
    │   ├── time-tracking/      # timer-service, timer-widget, duration-utils
    │   ├── scheduling/         # gantt-utils, dependency-validator
    │   ├── reports/            # reusable pure metrics/aggregation
    │   └── dates/              # date/timezone helpers
    ├── js/services/mock/       # shared repositories, create only with owner agreement
    ├── components/app/        # MOSTAFA-owned shared app shell
    ├── components/shared/     # MOSTAFA-owned forms, modals, toasts
    └── assets/images/        # use official brand assets, not screenshot as UI
```

### هام: ما يتعملش Duplicate

- `active-timer.html`: واجهة متخصصة + widget مشترك، لكن timer-service واحد.
- `manual-entry.html`: يمكن يكون Modal/Drawer قابل للوصول من صفحة Entries أو Dashboard؛ لا تكرري implementation.
- `create-event.html`: نفس الفكرة، غالباً Modal قابل للاستخدام داخل Calendar.
- `dependencies.html`: ممكن يكون تبويب داخل Gantt ولكن يعتمد على نفس وحدة التحقق.
- لا تكرري Sidebar/Topbar/Inputs الجاهزة من مصطفى.

## قواعد العقود المشتركة

```text
workspaceId -> Ahmed (workspace/project ownership)
projectId   -> Ahmed (project identity)
taskId      -> Alaa (task identity)
memberId    -> Ahmed (workspace membership)
entryId     -> Ahd (recorded time identity)
eventId     -> Ahd (calendar event identity)
milestoneId -> Ahd (milestone identity)
```

التقارير Derived Views فقط، لا تخلق مصدر بيانات منفصل. أسماء Routes ومسارات CSS/JS هنا مقترحة ومعتمدة للحزمة؛ إذا مشروع الفريق الموجود عنده مسار آخر منظم، احفظي المسارات النهائية في README بعد التعديل بدل إنشاء نسختين.
