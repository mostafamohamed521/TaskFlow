# إيمان — TaskFlow Clients & Client Portal & Deliverables

**العضو:** إيمان محمد مسعد المتولي — موديول إدارة العملاء وبوابة العميل والتسليمات والمراجعات وطلبات التعديل.

> الحزمة دي **برومبتات ومواصفات**، مش كود Frontend جاهز ولا صور مصممة. فيها **16 برومبت تصميم UI** و**16 برومبت تنفيذ Frontend**، كل واحد مستقل ومخصص لشاشة/واجهة بعينها. استخدمي الصور المعتمدة والشعار الأصلي والمشروع الجاري كمدخلات. لا تعتمدي على شعار معاد توليده.

## إيه الهدف من الموديول؟

TaskFlow يخدم أفراد وفريلانسرز وفرق وشركات. موديول إيمان يسمح لمستخدم داخلي مخوّل بإدارة Contacts للعملاء وربطها بالمشروعات، إصدار دعوات Client Portal محدودة الوصول، إرسال Deliverable بإصدارات، استقبال موافقة أو طلب تغيير، وتتبع مراجعة كل إصدار. العميل الخارجي يرى فقط ما تم مشاركته معه، وليس بيانات الفريق الداخلية.

## الـ16 واجهة — نطاق إيمان بالضبط

| # | الشاشة | HTML المستهدف | أسلوب العرض |
|---|---|---|---|
| 01 | Clients List | `clients/index.html` | Full page |
| 02 | Add Client | `clients/create.html` | Reusable modal/drawer with optional direct-entry HTML |
| 03 | Client Details | `clients/details.html` | Full page |
| 04 | Edit Client | `clients/edit.html` | Reusable edit drawer/modal with optional direct-entry HTML |
| 05 | Invite Client | `clients/invite.html` | Focused invite modal or page accessible from Client Details |
| 06 | Client Portal Dashboard | `client-portal/index.html` | Dedicated restricted portal page with client-specific shell |
| 07 | Client Project Overview | `client-portal/project.html` | Dedicated client-facing project page |
| 08 | Client Milestones | `client-portal/milestones.html` | Portal tab/section; optional deep-link HTML |
| 09 | Deliverables | `client-portal/deliverables.html` | Client portal list with internal submission handoff |
| 10 | Deliverable Details | `client-portal/deliverable-details.html` | Client-facing detail page with review actions |
| 11 | Submit Deliverable | `deliverables/create.html` | Internal team submission form page or drawer |
| 12 | Deliverable Versions | `deliverables/versions.html` | Internal version history page/section |
| 13 | Deliverable Review | `client-portal/review.html` | Client-focused review form, preferably modal + deep-link fallback |
| 14 | Change Requests | `client-portal/change-requests.html` | Client portal request list, internal team-safe handoff |
| 15 | Change Request Details | `client-portal/change-request-details.html` | Client-visible request details and resolution timeline |
| 16 | Client Activity | `client-portal/activity.html` | Client portal activity feed / tab |

المسارات في الجدول نسبية لجذر `frontend/pages/app/`. كل صفحة لها ملف UI prompt تحت `01-UI-Design-Prompts/` وبرومبت implementation مطابق تحت `02-Frontend-Implementation-Prompts/`.

## 3 رحلات عمل يجب أن تكون مفهومة

### رحلة إضافة عميل

Internal Workspace → Clients List → Add Client (Contact فقط) → Link Existing Project → Invite Client → **Mustafa's Accept Client Invitation** → Client Portal.

### رحلة تسليم الشغل

Internal Team → Project → Submit Deliverable (Draft ثم Shared Submission) → Client Portal → View Specific Version → **Approve** أو **Request Changes** → مراجعة محددة بالإصدار.

### رحلة التعديل

Request Changes → Change Request linked to deliverable version → Internal team prepares **new version** → Client reviews new version → Approve أو Request Changes من جديد. التاريخ القديم لا يُمحى.

## المسميات والحدود المهمة

- إنشاء العميل في Contacts **مش** إنشاء حساب Auth ولا إرسال دعوة تلقائيًا.
- إنشاء/إدارة الدعوة من شغل إيمان؛ قبول الدعوة وإنشاء حساب العميل ضمن Auth الذي يملكه مصطفى.
- دور العميل الخارجي مش Owner/Admin/Member/Viewer داخل Workspace. له Portal permissions مقيدة.
- أحمد يملك Project/Workspace master data؛ إيمان تربط Clients بمشروعاته.
- عهد تملك Milestones master schedule؛ إيمان تعرض فقط milestones المنشورة للعميل.
- آلاء تملك Task/Kanban؛ العميل لا يرى التعليقات أو المهام الداخلية إلا إذا تم تعريف مشاركة صريحة متفق عليها.
- مصطفى يملك App Shell وUI tokens وForm/Toast/Modal primitives؛ إيمان تستهلكها.

## قواعد صلاحيات العميل

1. الصلاحية مرتبطة بـclientId + projectId + shared resource IDs؛ لا تفترض أن كل مشروعات الشركة متاحة.
2. كل Deliverable Review يتعلق بـ**versionId ثابت**؛ لا تعتمد على اسم الملف.
3. لا تتحدث عن موافقة على مشروع كامل إن المقصود اعتماد إصدار تسليم واحد.
4. كل نسخة جديدة تحصل على version number جديد، وتحتفظ بسجل الموافقات والطلبات السابقة.
5. الأحداث الموجودة في Client Activity لازم تكون curated public events فقط، مش Audit Log داخلي.
6. إخفاء عناصر UI **مش ضمان أمني**؛ الـBackend لاحقاً لازم يفرض Authorization حقيقي.

## الواجهة والتكنولوجيا

- HTML5 + CSS3 + Vanilla JS ES Modules؛ لا React/Vite/Angular أو Backend في المرحلة الحالية.
- ألوان TaskFlow: Sage `#4CAF7B`, Olive `#2E7D32`, Beige `#F5EFE6`, Terracotta `#C96F4A`, Charcoal `#1F2937`, Slate `#64748B`, Off-white `#FCFAF6`, Forest `#123B31`, Dark Forest `#0D2C26`.
- Font Inter؛ لوجو TaskFlow الأصلي من Assets؛ لا Emojis؛ لا بيانات عميل حقيقية في Demo.
- كود مقروء: HTML عناصر متداخلة في أسطر منفصلة، CSS كل declaration في سطر، JS وظائف صغيرة واضحة، مسافات بين الأقسام، بدون Spaghetti Code.
- الـClient Portal لازم يكون له navigation مناسب للعملاء؛ ممنوع إعادة عرض Sidebar داخلي فيه Team Admin/Time Tracking.

## الأولويات العملية

**الأولوية 1:** Clients List / Add Client / Client Details / Edit Client / Invite Client.

**الأولوية 2:** Client Portal Dashboard / Project Overview / Client Milestones / Deliverables List.

**الأولوية 3:** Deliverable Details / Submit Deliverable / Version History / Review.

**الأولوية 4:** Change Requests / Change Request Details / Client Activity + QA.

## قبل ما تعتبر الشغل خلص

- كل شاشة تستند لصورة UI معتمدة ونفس الشعار والـShared Components.
- الـHTML/CSS/JS في مسارات واضحة ومتكاملة مع المشروع الموجود.
- أزرار وFilters وForms وDialogs شغالة بشكل حقيقي كـDemo.
- بيانات العملاء والتسليمات مشتركة ومترابطة ومش نسخ متناقضة.
- حالات empty/loading/error/permission/review/version موجودة.
- Desktop/Tablet/Mobile tested.
- مفيش إدعاء إرسال إيميلات أو رفع ملفات أو تنفيذ Authorization حقيقي.
- مفيش تغيير غير مبرر في ملفات زملاء الفريق.

**ابدئي بعد الملف ده بـ`HOW-TO-USE.md` و`FILE-STRUCTURE-AND-ROUTES.md` و`SHARED-DATA-CONTRACTS.md`.**
