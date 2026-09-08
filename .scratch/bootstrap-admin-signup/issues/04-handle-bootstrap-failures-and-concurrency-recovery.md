# 04: Handle bootstrap failures and concurrency recovery
**What to build:** Provide safe recovery after failed bootstrap registration and deterministic behavior for concurrent first registrations, including retry handling without a stranded bootstrap lock.
**Blocked by:** 01: Add server-owned user roles and bootstrap gate
**Status:** ready-for-agent

Acceptance checklist:

- [ ] A failed first registration releases or safely recovers its bootstrap claim.
- [ ] At most one concurrent signup receives the bootstrap-selected admin role.
- [ ] A concurrent signup that loses the first-user decision safely becomes user.
- [ ] A failed attempt can be retried without requiring manual recovery.
- [ ] No failed or completed path leaves a stranded bootstrap lock or unusable gate.
- [ ] Regression coverage verifies failure recovery, concurrency, and retry behavior.
