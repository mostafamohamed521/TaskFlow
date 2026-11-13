# HOW TO USE — طريقة استعمال حزمة آلاء

## 1) قبل أي برومبت

- جهّزي نسخة كاملة من مشروع TaskFlow الحالي (Public/Auth/Onboarding/App Shell).
- استخدمي **اللوجو الأصلي** وصور الـBrand Board وشاشات مصطفى المعتمدة، لا صورًا مولّدة أعادت رسم اللوجو بشكل مختلف.
- لو مشروع أحمد موجود، ارفقي الملفات المتعلقة بـWorkspaces/Projects/Project Members، وليس المطلوب نسخ شغله أو الكتابة فوقه.
- اقري `FILE-STRUCTURE-AND-ROUTES.md` لمعرفة المسارات.

## 2) لكل شاشة

**أولًا — UI image prompt:** افتحي `01-UI-Design-Prompts/NN-...-UI-README.md`، انسخي البرومبت لأداة صور/UI، وأرفقي المرجع؛ راجعي التفاصيل والكتابة والمحاذاة ولا تعتمدي صورة بها أرقام أو نصوص متناقضة.

**ثانيًا — Frontend implementation prompt:** افتحي نفس الرقم في `02-Frontend-Implementation-Prompts/NN-...-FRONTEND-README.md`، وأرفقي صورة الشاشة *المعتمدة* ومشروع الكود الحالي. خلي أداة البرمجة **تراجع الموجود قبل تعديله** وتنفذ في المسار الصحيح. لا تعيدي تصميم الصور في مرحلة التنفيذ.

**ثالثًا — اختبار وتسليم:** افتحي الصفحة عبر HTTP server، جرّبي كل Action والـForms وحالات الخطأ، راجعي Responsive (360/390/430/768/1024/1440px)، ثم تأكدي أن العمليات تظهر في الصفحات الأخرى المرتبطة.

## 3) ترتيب التنفيذ المقترح

1. `task-store.js` + domain schema + reusable task components + task validation.
2. All Tasks, My Tasks, Task Details.
3. Shared Create/Edit Task Form.
4. Kanban Board + Board Settings.
5. Checklist, Comments, Attachments, Activity sections inside Task Details.
6. Templates, Archived Tasks.
7. Full integration + regression test + documentation.

## 4) تنبيهات مهمة

- الـ13 برومبت واجهات وظيفية، مش شرط كل واحدة Layout مستقل؛ تفاصيل الـTask تبقى Tabs.
- Drag/drop له دائمًا بديل تحريك Keyboard/Mobile.
- لا تجعل Avatar/Status/Badges مجرد زينة؛ لازم تمثل بيانات متسقة.
- تخصيص الصلاحيات Mock UI فقط وليس بديلًا لحماية Backend.
- منطق Timer يخص عهد؛ مشروع/أعضاء المشروع يخص أحمد؛ Client Portal يخص إيمان؛ UI Shell يخص مصطفى.
- استخدمي ملفات JS وCSS مفصولة بوضوح، وبداخلها تنسيق أسطر مريح بلا كود مضغوط أو Spaghetti Code.
