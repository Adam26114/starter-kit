# 01: Add server-owned user roles and bootstrap gate
**What to build:** Add persisted enum roles for admin and user, default new users to user, allow the first successful registration to choose its role, force later registrations to user, protect the decision from forged requests, and serialize the atomic first-user decision.
**Blocked by:** None (can start immediately)
**Status:** ready-for-agent

Acceptance checklist:

- [ ] User records persist only the approved admin or user role values.
- [ ] New registrations default to user unless the atomic first-user decision selects admin or user.
- [ ] The first successful registration can become admin or user according to the server-owned bootstrap decision.
- [ ] Every later registration is forced to user regardless of submitted role data.
- [ ] Forged role requests cannot grant or alter server-owned authority.
- [ ] Concurrent signup attempts produce one deterministic first-user decision without multiple bootstrap-selected admins.
- [ ] Focused boundary tests cover role assignment, request tampering, and serialized first-user behavior.
