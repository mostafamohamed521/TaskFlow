# End-to-End Workflows and Test Cases

## Flow A — Create Contact and Invite

1. Internal authorized user opens Clients List.
2. Creates a client CONTACT; it does not create an authenticated portal account.
3. Links existing Project `proj-1`, owned by Ahmed's data service.
4. Opens Invite Client; checks client email, allowed project(s), assigned access summary.
5. Creates a mock pending invitation; clearly labels simulated delivery.
6. Existing Mustafa Auth flow accepts invite, resolves client identity, then routes to client portal.
7. Portal shows **only proj-1** and shared resources; other projects hidden and, later, server-enforced.

**Edge cases:** duplicate email, no client project, revoked/expired invite, different signed-in email, unauthorized project.

## Flow B — Deliverable Review and Revisions

1. Internal staff prepares a deliverable draft.
2. On submission, creates immutable version V1 and client-shared link.
3. Client sees V1 in Awaiting Review.
4. Client opens exact submitted V1 and requests changes with feedback.
5. System records review(V1, changes_requested) + linked Change Request.
6. Team prepares revised V2, maintaining V1 history.
7. V2 appears as submitted and must be independently reviewed.
8. Client approves V2. System preserves the V1 change request history.

**Edge cases:** stale V1 approval attempted after V2 submitted; draft visible to client; multiple unrelated clients; missing attachment; duplicate review submissions.

## Flow C — Client Portal Safety and Activity

- Portal dashboard contains shared projects only.
- Shared milestones are projections of Ahd schedule; internal milestone notes not visible.
- Public activity contains approved events only; internal audit logs never copied.
- Client sees no internal Kanban, time tracking, private comments, team membership admin or billing.
- Test with two clients attached to separate projects; neither must see the other's records.

## QA Matrix

- 1920/1440/1280/1024/768/430/390/360px.
- Tab/Enter/Space keyboard interaction, focus ring, screen reader labels and dialog semantics.
- Shared file paths resolve from local HTTP server, no 404s/console errors.
- All demo statuses and counts derive from canonical data, never hardcoded in a dashboard.
- Approval and change requests reference `versionId` exactly.
- No backend actions claimed real. No passwords in storage. No emojis.
- Existing Public/Auth/Onboarding/Projects/Tasks/Time screens remain functional.
