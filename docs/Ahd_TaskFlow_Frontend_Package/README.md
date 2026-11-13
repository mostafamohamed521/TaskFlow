# Ahd — TaskFlow Frontend Package

**المسؤولة:** عهد عمار عيسى البقري  
**النطاق:** Time Tracking + Calendar + Gantt / Scheduling + Reports  
**التقنية:** HTML5 + CSS3 + Vanilla JavaScript ES Modules فقط  
**الهدف:** تسليم موديولات مترابطة بصريًا ووظيفيًا على مشروع TaskFlow الموجود بالفعل، بدون إعادة بناء Public أو Auth أو Onboarding.

## ابدأي من هنا

1. افتحي `HOW-TO-USE.md` لمعرفة ترتيب الاستخدام.
2. افتحي `FILE-STRUCTURE-AND-ROUTES.md` و`SHARED-DATA-CONTRACTS.md` لمعرفة مسارات التنفيذ والتكامل ونظام البيانات.
3. صمّمي كل شاشة من `01-UI-Design-Prompts/` مع إرفاق صورة شعار TaskFlow والشاشات المشتركة المعتمدة.
4. بعد اعتماد صورة الشاشة، أرفقيها مع مشروع Frontend الحالي واستخدمي الملف المناظر في `02-Frontend-Implementation-Prompts/`.
5. نفّذي الصفحات تدريجيًا باستخدام نفس Shared Design System لمصطفى، ومصدر بيانات مشترك مع أحمد وآلاء وإيمان.

## تفاصيل الشاشات والملكية

| # | الواجهة | النوع المفضل | المسار |
|---|---|---|---|
| 01 | Time Tracking Dashboard | Full page | `frontend/pages/app/time-tracking/index.html` |
| 02 | Active Timer | Dedicated focused view plus reusable widget | `frontend/pages/app/time-tracking/active-timer.html` |
| 03 | Time Entries | Full page | `frontend/pages/app/time-tracking/entries.html` |
| 04 | Manual Time Entry | Full-page accessible form, reusable modal preferred | `frontend/pages/app/time-tracking/manual-entry.html` |
| 05 | Timesheets | Full page | `frontend/pages/app/time-tracking/timesheets.html` |
| 06 | Calendar | Full page | `frontend/pages/app/calendar/index.html` |
| 07 | Create Calendar Event | Reusable modal or drawer plus optional direct route | `frontend/pages/app/calendar/create-event.html` |
| 08 | Gantt Chart | Full page | `frontend/pages/app/scheduling/gantt.html` |
| 09 | Milestones | Full page | `frontend/pages/app/scheduling/milestones.html` |
| 10 | Task Dependencies | Focused page or tab within Gantt | `frontend/pages/app/scheduling/dependencies.html` |
| 11 | Reports Overview | Full page | `frontend/pages/app/reports/index.html` |
| 12 | Project Progress Report | Full page | `frontend/pages/app/reports/project-progress.html` |
| 13 | Time Tracking Report | Full page | `frontend/pages/app/reports/time-tracking.html` |
| 14 | Team Workload Report | Full page | `frontend/pages/app/reports/team-workload.html` |
| 15 | Productivity Report | Full page | `frontend/pages/app/reports/productivity.html` |

**الإجمالي: 15 واجهة وظيفية = 15 UI prompt + 15 Frontend prompt.** العدد مش معناه بالضرورة 15 صفحة مستقلة لا يمكن دمجها؛ بعض النماذج يجب أن تكون Modal/Drawer وبعض الأجزاء يمكن أن تكون Tabs. كل برومبت يحدد صورة تصميم مستقلّة ونقطة دخول HTML اختيارية عند الحاجة.

## ما الذي تملكه عهد بالضبط؟

### Time Tracking
- تشغيل المؤقت يدويًا Start / Pause / Resume / Stop، وربطه بمهمة/مشروع.
- Active Timer widget قابل لإعادة الاستخدام داخل Task Details لدى آلاء.
- إدخالات الوقت اليدوية، التعديل والحذف، حالات Billable/Non-billable.
- Timesheets أسبوعية/حسب المستخدم أو المشروع، مع إجماليات متسقة.
- تصدير بيانات الـDemo فقط عندما يتم تنفيذه فعليًا.

### Calendar
- Month / Week / Day، تواريخ تسليم المهام ومواعيد الأحداث.
- إنشاء/تعديل أحداث Calendar داخل Modal/Drawer.
- دعم المنطقة الزمنية وإعدادات أول الأسبوع من Settings.

### Scheduling / Gantt
- Gantt لمهام المشروع ومواعيدها.
- Milestones وإدارة حالاتها.
- Task Dependencies مع منع الدورات Cycles والتكرارات.

### Reports
- Overview، Project Progress، Time Tracking، Team Workload، Productivity.
- الرسوم والحسابات مشتقة من بيانات فعلية داخل الـMock repository؛ لا أرقام مخترعة أو تحليل ذكاء اصطناعي.
- الحفاظ على الصلاحيات؛ تقارير الفريق قد تقتصر على الأعضاء المخولين.

## تقاطع الشغل مع باقي الأعضاء

| المالك | نطاقه | واجهة التكامل مع عهد |
|---|---|---|
| مصطفى | Shared Shell, Design System, Forms, Navigation, Auth | إعادة استخدام Sidebar/Topbar/Inputs/Modal/Toasts والتفضيلات |
| أحمد رضا | Workspaces, Projects, Members | قراءة Projects/Members والروابط إلى Overview، بدون تعديل ملكية مشاريع أحمد |
| آلاء عصام | Tasks, Kanban, Task Details | قراءة Task IDs/Status/Due Dates؛ توفير Timer widget فقط داخل Task Details |
| إيمان محمد | Clients, Deliverables, Client Portal | تعرض إيمان Milestones المشتركة مع العميل فقط، لا تكشف البيانات الداخلية |

## قاعدة مهمة: هوية TaskFlow

- Palette: Sage `#4CAF7B`, Olive `#2E7D32`, Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.
- خط Inter، الشعار الأصلي فقط، لا Emojis في واجهة الموقع.
- لا React/Vite/Angular/Vue/TypeScript، ولا backend في مرحلة التنفيذ الحالية.
- لا صفحة أو خدمة منفصلة لكل موديول لو المكون موجود؛ لا تكرار في الكود.

## الأولويات المقترحة

1. Shared time model + Time Tracking Dashboard + Timer (الأهم لتكامل آلاء).
2. Time Entries + Manual Time Entry + Timesheets.
3. Calendar + Create Event.
4. Gantt + Milestones + Dependencies.
5. Reports Overview + التقارير الأربعة.
6. Responsive, data consistency, accessibility, integration and regression testing.

## تعريف التسليم Done

- [ ] 15 UI References معتمدة، أو توثيق واضح لأي مرجع لم يجهز.
- [ ] صفحات/مكونات HTML/CSS/JS مستقلة ومرتبطة بالمشروع.
- [ ] مؤقت واحد متسق عبر الصفحات؛ لا double counting.
- [ ] نماذج Manual Entry/Event تعمل Demo وتتحقق من المدخلات.
- [ ] الجداول والتقارير تعتمد على نفس بيانات المهام/الوقت.
- [ ] Gantt/Calendar تحترم التواريخ والمنطقة الزمنية.
- [ ] Charts ذات محاور ووحدات واضحة ومعاينات Empty State.
- [ ] لا تبدو أي وظيفة Backend أو إشعار/تقرير مالي وهمي كأنه حقيقي.
- [ ] لا يوجد Emojis أو Spaghetti Code أو روابط مكسورة.
- [ ] تم اختبار 360–1920px وتوثيق الملفات المعدّلة.

**الحزمة برومبتات ووثائق، وليست واجهات مبرمجة بالفعل.**
