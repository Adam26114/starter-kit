# 03: Protect role immutability and dashboard authorization
**What to build:** Protect server-side profile and API updates from changing persisted roles, and authorize dashboard behavior from the persisted role without changing existing project ownership rules.
**Blocked by:** 01: Add server-owned user roles and bootstrap gate
**Status:** ready-for-agent

Acceptance checklist:

- [ ] An admin role remains admin through permitted profile and API updates.
- [ ] A user role remains user through permitted profile and API updates.
- [ ] Forged role-update requests are rejected or safely ignored without changing persisted authority.
- [ ] Unauthenticated requests cannot update roles or access protected dashboard behavior.
- [ ] Dashboard behavior follows the persisted admin or user role on the server.
- [ ] Existing project ownership and access rules remain unchanged.
