# 05: Verify complete bootstrap authentication flow
**What to build:** Produce end-to-end evidence across the signup request boundary, the persisted Better Auth user record, browser UI, sign-in, and dashboard access for the complete bootstrap authentication flow.
**Blocked by:** 02: Add bootstrap-aware sign-up flow; 03: Protect role immutability and dashboard authorization; 04: Handle bootstrap failures and concurrency recovery
**Status:** ready-for-agent

Acceptance checklist:

- [ ] Evidence covers first registration as admin and first registration as user.
- [ ] Evidence covers later registration as user, including attempted role forgery.
- [ ] Evidence covers failed bootstrap registration, retry recovery, and concurrent first registration.
- [ ] Evidence connects the signup request boundary to the persisted Better Auth user record.
- [ ] Browser checks cover sign-up, sign-in, and role-appropriate dashboard access.
- [ ] Bun lint, typecheck, and build checks pass.
- [ ] Focused integration and browser checks pass for the bootstrap authentication flow.
- [ ] Verification confirms unrelated work is preserved.
