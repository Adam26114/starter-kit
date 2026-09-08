# 01: Diagnose and classify sign-up failures

**What to build:** An isolated non-production reproduction and sanitized tracing flow that follows sign-up across the browser, Next.js auth route, Better Auth, Convex HTTP mount, and bootstrap finalization, so each observed failure can be distinguished as an environment/configuration problem or an application error.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Diagnostics are safe to run and clearly separate non-production reproduction from production behavior.
- [ ] Every sign-up attempt has a correlation identifier that is carried across the full request flow.
- [ ] Traces and diagnostic output contain no secrets, passwords, or raw personally identifiable information.
- [ ] Each reproduced failure includes explicit evidence supporting its classification as an environment/configuration problem or application error.
