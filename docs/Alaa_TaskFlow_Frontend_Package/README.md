# TaskFlow — آلاء عصام حامد عبدالقادر
## Task Management & Kanban Frontend Ownership Package

> **العضو:** آلاء عصام حامد عبدالقادر  
> **المسؤولية:** Tasks, Kanban Board, Task Details, Checklists, Comments, Attachments, Activity, Task Templates, Archived Tasks.  
> **التقنية:** HTML5 + CSS3 + Vanilla ES6 JavaScript فقط.  
> **المخرجات:** 13 برومبت مستقل لتصميم الـUI + 13 برومبت مستقل لتنفيذ الـFrontend + دليل مسارات وتنفيذ.

## 1 — الهدف

آلاء مسؤولة عن **طبقة إدارة المهام بالكامل** داخل الـWorkspace والمشروع الموجودين مسبقًا. المستخدم يفتح مشروعًا أنشأه أحمد، ويبدأ إضافة مهام، وتعيين المسؤولين، وضبط الأولويات والمواعيد، وتحريك المهام في Kanban، وإدارة Checklist وتعليقات وملفات وسجل نشاط. يجب أن تنعكس كل التعديلات فورًا في My Tasks وAll Tasks والـKanban.

**المطلوب ليس إنشاء تطبيق منفصل**: استخدمي مشروع TaskFlow الموجود بالفعل وتصميم مصطفى المعتمد، وبيانات الـWorkspace والـProjects التي يملكها أحمد، مع ترك Time Tracking لعهد وClient Portal لإيمان.

## 2 — الـ13 واجهة المطلوبة بالترتيب

| # | الشاشة | دورها | طريقة عرض موصى بها |
|---:|---|---|---|
| 01 | **All Tasks** | Central cross-project list of tasks visible to the current user in the current workspace | full page |
| 02 | **My Tasks** | Focused personal task inbox for tasks assigned to signed-in user | full page |
| 03 | **Task Details** | Primary single-task information hub that hosts checklist, comments, attachments and activity sections | full detail page or drawer |
| 04 | **Create Task** | Create a new task inside a selected project with validation and sensible defaults | full page route and reusable drawer |
| 05 | **Edit Task** | Edit an existing task while respecting edit permissions and preserving history | full page route and reusable drawer |
| 06 | **Kanban Board** | Primary project-scoped Kanban board for managing task workflow through drag-and-drop | full page |
| 07 | **Board Settings** | Configure one project Kanban board columns and workflow rules | full settings page |
| 08 | **Task Checklists** | Focused checklist/subtask management for a specific parent task | task detail tab with optional deep-link page |
| 09 | **Task Comments** | Task-specific discussion feed and comment composer | task detail tab with optional deep-link page |
| 10 | **Task Attachments** | Organize and preview files attached to tasks using browser-only demo file handling | task detail tab with optional deep-link page |
| 11 | **Task Activity** | Read-only chronological audit-style history for changes to an individual task | task detail tab with optional deep-link page |
| 12 | **Task Templates** | Manage reusable task blueprints for commonly repeated work | full page |
| 13 | **Archived Tasks** | Browse archived tasks and restore those allowed by permissions | full page |

**مهم جدًا:** الـ13 واجهة هي نطاق عمل وظيفي، وليست إلزامًا بإنشاء 13 شاشات مستقلة بمعزل عن بعض. Checklists / Comments / Attachments / Activity تفضل Tabs داخل `Task Details` مع مسارات deep links اختيارية. `Create Task` و`Edit Task` يجب أن يعتمدا على Form واحد قابل لإعادة الاستخدام في Drawer أو صفحة. `Board Settings` إعدادات للـKanban نفسه، وليست Workspace Settings (ملك أحمد).

## 3 — المستخدم يعمل إيه بالضبط؟

```text
Workspace (Ahmed) → Project (Ahmed)
                         ↓
                    Kanban Board
                         ↓
                   Create New Task
                         ↓
          Set assignee / status / due date
                         ↓
       Open Task Details → Checklist / Comments
                         ↓             / Attachments / Activity
            Move status: To Do → In Progress
                         ↓
                   In Review → Done
                         ↓
              My Tasks & Reports update
```

- المهام ممكن تكون ضمن مشروع واحد أو أكثر عبر الـWorkspace، لكن كل مهمة يجب ترتبط بمشروع محدد.
- تغيير حالة المهمة في Board ينعكس في All Tasks/My Tasks/Details.
- تعيين عضو يتم من أعضاء المشروع المسموحين.
- العميل الخارجي لا يشاهد التعليقات أو المرفقات الداخلية إلا بسياسات مشاركة صريحة ينفذها جزء إيمان.
- التايمر تعرض آلاء له مكان دمج فقط؛ منطق Start/Pause/Resume/Stop ملك عهد.

## 4 — التقسيم بين الفريق

| العضو | يمتلك | نقطة التكامل |
|---|---|---|
| مصطفى | Design System + Sidebar/Topbar + Auth/Onboarding + Shared Forms | آلاء تستهلك المكونات المشتركة والـCSS tokens |
| أحمد | Workspaces + Projects + Project Members/Templates | آلاء تعرض المشاريع والأعضاء المرجعيين، لا تنشئهم |
| **آلاء** | **Tasks + Kanban + task detail sections** | المصدر الموحد لحالة المهمة |
| عهد | Time Tracking + Calendar + Gantt + Reports | يقرأ task ID/status/due date ويُدمج Timer Widget |
| إيمان | Clients + Client Portal + Deliverables | بيانات مهمة داخلية لا تُعرض للعميل دون إذن |

## 5 — مبدأ الملفات

- نفس مشروع `frontend` الحالي. ممنوع إنشاء مجلد `frontend/frontend` أو مشروع React/Vite.
- ملف HTML لكل شاشة رئيسية أو deep-link اختياري؛ قسم الـUI داخل Details يجب أن يظل مكونًا مشتركًا.
- CSS مشترك للـTask UI، وCSS متخصص عند اختلافات الصفحة.
- `task-store.js` مشترك لجميع الواجهات؛ ممنوع مصفوفة Tasks مختلفة لكل شاشة.
- كل كود مفهوم، مسافات وأسطر، لا Spaghetti Code، لا CSS مضغوط ولا JavaScript مضغوط.
- لا Emojis في واجهات الموقع، استخدموا SVG Icons.
- لا تخزين لكلمات مرور أو بيانات شديدة الحساسية محليًا.

## 6 — نموذج الداتا المطلوب (Frontend Demo)

```javascript
const exampleTask = {
    id: "task-001",
    projectId: "project-001",
    title: "Design the homepage",
    description: "Build the hero and responsive layout",
    status: "in-progress",
    columnId: "in-progress",
    priority: "high",
    assigneeIds: ["member-001"],
    startDate: "2026-11-15",
    dueDate: "2026-11-22",
    labels: ["design", "frontend"],
    estimatedMinutes: 240,
    isArchived: false,
    createdAt: "2026-11-13T10:00:00Z",
    updatedAt: "2026-11-13T10:00:00Z"
};
```

المثال توضيحي وليس بيانات حقيقية أو عقد API نهائي. استخدم IDs ثابتة في الـMock Data وقيم منطقية، ولا تعتبر صلاحيات الواجهة حماية أمنية فعلية.

## 7 — طريقة تنفيذ العمل

1. اقرئي `FILE-STRUCTURE-AND-ROUTES.md` و`HOW-TO-USE.md`.
2. افتحي أول ملف UI من مجلد `01-UI-Design-Prompts/`، وارفعِ صور الهوية والـSidebar المعتمدة واللوجو الأصلي لأداة توليد UI.
3. بعد اعتماد الصورة، افتحي ملف التنفيذ المناظر داخل `02-Frontend-Implementation-Prompts/`، وأرفقي الصورة والكود الموجود للمشروع كله.
4. ابدئي بالمكونات والـtask-store، ثم All Tasks / My Tasks / Task Details / Create/Edit، وبعدها Kanban، ثم الأقسام الثانوية والقوالب والأرشيف.
5. اختبري كل تغيير في جميع الواجهات المرتبطة، وبالـResponsive، ثم وثقيه.

## 8 — تعريف Done

- التصميم مطابق تقريبًا للمرجع المرفق بعد فحص فعلي.
- HTML/CSS/JS منفصل ومنظم وقابل للقراءة.
- جميع الروابط والأزرار الأساسية تعمل في Demo واضح.
- الـKanban يعمل Drag-and-Drop بالإضافة إلى بديل Keyboard/Mobile.
- عمليات create/edit/archive/restore متسقة بين كل القوائم.
- Checklists/comments/files/activity مرتبطين بالمهمة الأصلية.
- كل الحقول لها Validation والحالات Empty/Error/Loading/Success.
- لا يتم كسر صفحات مصطفى أو أحمد أو عهد أو إيمان.
- لا يتم الادعاء بوجود Backend أو إرسال/تخزين حقيقي للملفات.
- مراجعة Console وخطوط/صور/روابط ومسارات بدون 404s.
