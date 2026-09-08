# 02: Repair bootstrap finalization and retry recovery

**What to build:** A sign-up recovery experience in which a user whose Better Auth account was persisted but whose role finalization failed can safely retry, complete bootstrap without stranded state, and receive the correct role, while concurrent sign-ups still produce at most one administrator.

**Blocked by:** 01: Diagnose and classify sign-up failures

**Status:** ready-for-agent

- [ ] A persisted user can recover successfully when the initial role finalization fails.
- [ ] Repeating finalization is idempotent and leaves no stranded bootstrap state.
- [ ] A failed first sign-up can be retried without creating an unusable duplicate or requiring unsafe manual repair.
- [ ] Concurrent sign-ups result in at most one administrator and deterministic role assignment for all other users.
- [ ] Role assignment is server-owned and cannot be escalated or selected by an untrusted client.
