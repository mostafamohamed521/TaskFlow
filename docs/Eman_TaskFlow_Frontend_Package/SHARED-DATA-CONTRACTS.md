# Shared Data Contracts — Eman's Module

> Conceptual contracts for frontend demo alignment. Coordinate final field names with Ahmed and Mustafa before implementation. **Never treat frontend mock permissions as real authorization.**

## Entities and relationships

```text
Workspace (Ahmed)
  ├─ Project (Ahmed) ---- Client Project Association (Eman)
  │                         └─ Client (Eman)
  ├─ Client (Eman) ------------- Client Invitation (Eman creates, Mustafa accepts)
  └─ Project
       ├─ Master Milestone (Ahd) -> Explicit Shared Milestone (Eman client projection)
       └─ Deliverable (Eman)
            ├─ DeliverableVersion V1, V2, ... (immutable)
            ├─ Review (clientId + exact versionId)
            └─ ChangeRequest (original reviewed versionId)
                 └─ Public Updates / new version references
```

## Suggested JSON model

```json
{
  "client": {
    "id": "cli-1", "workspaceId": "ws-1", "name": "Example Client",
    "company": "Example Co", "email": "demo.client@example.test",
    "phone": "", "status": "active", "linkedProjectIds": ["proj-1"]
  },
  "clientInvitation": {
    "id": "inv-1", "workspaceId": "ws-1", "clientId": "cli-1",
    "email": "demo.client@example.test", "projectIds": ["proj-1"],
    "status": "pending", "expiresAt": "2027-01-01T00:00:00Z",
    "invitedBy": "usr-1"
  },
  "deliverable": {
    "id": "del-1", "workspaceId": "ws-1", "projectId": "proj-1",
    "clientId": "cli-1", "title": "Homepage Design",
    "currentVersionId": "ver-2", "status": "submitted",
    "sharedWithClient": true
  },
  "version": {
    "id": "ver-2", "deliverableId": "del-1", "versionNumber": 2,
    "authorId": "usr-1", "files": [], "notes": "Updated layout",
    "submittedAt": "2026-11-13T11:00:00Z", "isCurrent": true
  },
  "review": {
    "id": "rev-1", "deliverableId": "del-1", "versionId": "ver-1",
    "clientId": "cli-1", "decision": "changes_requested",
    "comment": "Please refine the header", "createdAt": "2026-11-10T11:00:00Z"
  },
  "changeRequest": {
    "id": "cr-1", "projectId": "proj-1", "deliverableId": "del-1",
    "versionId": "ver-1", "clientId": "cli-1",
    "description": "Please refine the header", "status": "resubmitted",
    "createdAt": "2026-11-10T11:00:00Z"
  }
}
```

## Required invariants

1. Client linked projects belong to the same `workspaceId` as Client.
2. Project record master data from Ahmed; no parallel independent `projects` array for Eman.
3. Client invitation accepted by Mustafa's Auth flow; Eman owns creation/revoke status UI.
4. Portal visibility must be explicit by client and project and resource. A Boolean `sharedWithClient` is useful but not sufficient alone for real backend access.
5. Only a **submitted current version** is reviewable; review stores the reviewed `versionId` and decision.
6. Version numbers monotonically increase; never replace V1 content in-place to represent V2.
7. Review history persists after subsequent versions are submitted. A V1 change-request does not automatically mark V2 approved.
8. Public activity is a curated projection; never dump internal audit/event log verbatim.
9. Client-safe milestone fields come from Ahd's milestones, but visibility chosen explicitly.
10. Every screen uses stable IDs, coherent status transitions, and deterministic demo sample data.

## Suggested statuses

- Invitation: `pending`, `accepted`, `expired`, `revoked`, `declined`.
- Deliverable: `draft`, `submitted`, `approved`, `changes_requested`, `withdrawn`.
- Review: `approved`, `changes_requested`.
- Change Request: `open`, `acknowledged`, `in_progress`, `resubmitted`, `resolved`, `closed`.

Status values are proposals; agree with the team before backend wiring. Never infer security from front-end-only status flags.

## Screen-specific validation principles

- Contacts: required name + valid email when invitation is requested; no duplicate records without confirmation.
- Invitations: valid client/project mapping; warn on pending invitations; show clear mock-only delivery notice.
- Deliverables: title and project required; client association; local file validation if supported; draft vs submitted distinction.
- Reviews: explicit decision; change request requires textual feedback; no repeated approval for already-reviewed same version.
- Change request: always point to a deliverable version; expose only client-public status notes.

## Accessibility and output formatting

All code: consistent formatting, readable distinct functions/selectors, no one-line spaghetti; all statuses text-labelled, all forms validation accessible; no emojis. Use demo safe data only, not real client identities.
