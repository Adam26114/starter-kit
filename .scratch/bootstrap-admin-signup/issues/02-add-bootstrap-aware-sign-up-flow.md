# 02: Add bootstrap-aware sign-up flow
**What to build:** Add a sign-up experience with name, email, and password fields plus a conditional first-user role selector, safe validation and error handling, accessible controls, and continuation into the existing sign-in and dashboard flow.
**Blocked by:** 01: Add server-owned user roles and bootstrap gate
**Status:** ready-for-agent

Acceptance checklist:

- [ ] The first-user sign-up state shows the role selector with clear admin and user choices.
- [ ] Later-user sign-up state hides the role selector and does not expose a misleading choice.
- [ ] A valid registration succeeds and continues through the existing sign-in and dashboard flow.
- [ ] Invalid or unsafe input receives clear, safe validation errors without leaking sensitive details.
- [ ] Submission loading, server failures, and retry behavior are communicated clearly.
- [ ] Form controls, labels, focus states, and feedback are accessible by keyboard and assistive technology.
- [ ] UI state never grants authority or overrides the server-owned role decision.
