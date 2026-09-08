# 04: Verify the complete sign-up experience

**What to build:** Focused integration and browser verification that proves the complete sign-up experience works for first and later users, including role visibility and enforcement, validation, duplicate handling, retry recovery, concurrency, accessibility, and post-sign-up navigation from the user's perspective.

**Blocked by:** 02: Repair bootstrap finalization and retry recovery; 03: Make sign-up errors safe and actionable

**Status:** ready-for-agent

- [ ] Actual external behavior is verified for first-user and later-user sign-up, including role visibility, role enforcement, and post-sign-up navigation.
- [ ] Validation, duplicate-account handling, failed-finalization retry recovery, and concurrent sign-ups are verified through integration and browser coverage.
- [ ] Accessibility behavior is verified for errors, pending states, disabled controls, focus, announcements, keyboard use, and retry.
- [ ] Verification produces the required generated artifacts and passes typecheck, lint, and build checks.
