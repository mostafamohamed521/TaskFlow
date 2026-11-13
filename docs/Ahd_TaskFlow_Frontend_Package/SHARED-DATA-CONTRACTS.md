# SHARED-DATA-CONTRACTS — اتفاق البيانات المشتركة

## قاعدة ذهبية

TaskFlow frontend demo يشتغل من **بيانات متسقة** بين الموديولات. لسه مفيش Backend حقيقي. التقارير والـDashboard والـTimesheets كلها views مشتقة من نفس arrays/objects. أي رقم ظاهر في تقرير لازم نقدر نعيد حسابه من سجلات المهام والوقت.

## Entities مقترحة للتنسيق مع الفريق

```javascript
const project = {
    id: "project-001",
    workspaceId: "workspace-001",
    name: "Website Redesign",
    status: "active"
};

const task = {
    id: "task-001",
    projectId: "project-001",
    title: "Design Homepage",
    status: "in-progress",
    assigneeIds: ["member-001"],
    startDate: "2026-11-15",
    dueDate: "2026-11-20",
    completedAt: null
};

const timeEntry = {
    id: "entry-001",
    workspaceId: "workspace-001",
    projectId: "project-001",
    taskId: "task-001",
    memberId: "member-001",
    startedAt: "2026-11-15T09:00:00+02:00",
    endedAt: "2026-11-15T10:30:00+02:00",
    durationSeconds: 5400,
    isBillable: true,
    note: "Homepage wireframes"
};

const activeTimer = {
    status: "paused", // idle | running | paused
    workspaceId: "workspace-001",
    projectId: "project-001",
    taskId: "task-001",
    memberId: "member-001",
    accumulatedSeconds: 900,
    lastResumedAt: null
};

const calendarEvent = {
    id: "event-001",
    projectId: "project-001",
    title: "Design Review",
    startsAt: "2026-11-19T14:00:00+02:00",
    endsAt: "2026-11-19T15:00:00+02:00",
    allDay: false,
    type: "meeting"
};

const milestone = {
    id: "milestone-001",
    projectId: "project-001",
    title: "Design Approved",
    dueDate: "2026-11-25",
    status: "upcoming",
    linkedTaskIds: ["task-001"],
    sharedWithClient: false
};

const dependency = {
    id: "dependency-001",
    projectId: "project-001",
    predecessorTaskId: "task-001",
    successorTaskId: "task-002",
    type: "finish-to-start"
};
```

## Data quality and consistency

- Duration is an integer number of seconds, converted to displayed `HH:MM`/decimal hours with one shared utility.
- Timer elapsed = accumulatedSeconds + (now - lastResumedAt) while running; no double counting during pause.
- A task can have no schedule. Don't invent a start date for Gantt unless explicitly indicated as demo fallback.
- `task.completedAt` should be set by Alaa’s module so Productivity report can calculate real completion dates.
- Dependency graph is directed, no cycles or self-links; no automatic task rescheduling without agreement.
- Project completion denominator zero => `N/A`, not forced 100%.
- Workload reports should label **assigned task count** or **logged hours** precisely; neither automatically equals employee utilization.
- Date-only `YYYY-MM-DD` values are calendar dates, not UTC timestamps; don’t shift them by timezone conversion accidentally.
- Views and controls respect user context and roles as UI demo; real permissions require backend authorization.
- Client-visible milestones only when deliberately shared by Eman’s workflow.

## Suggested acceptance sample

Time entries: 3600s + 1800s + 5400s = 10800s = 3h. Timesheet totals, report card and exported CSV should agree exactly.
