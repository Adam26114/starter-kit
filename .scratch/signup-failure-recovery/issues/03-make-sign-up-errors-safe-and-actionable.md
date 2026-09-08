# 03: Make sign-up errors safe and actionable

**What to build:** A sign-up form that gives users useful validation and duplicate-account guidance, presents generic actionable messaging for unknown failures without exposing sensitive or internal details, preserves only non-sensitive form state for retry, handles passwords safely, and provides clear pending, disabled, and retry behavior.

**Blocked by:** 01: Diagnose and classify sign-up failures

**Status:** ready-for-agent

- [ ] Known validation and duplicate-account failures produce useful, user-understandable messages and next steps.
- [ ] Unknown failures produce generic safe messaging without secrets, passwords, raw personal information, or internal implementation details.
- [ ] Non-sensitive form state is preserved for retry while password values are cleared and never exposed in diagnostics or rendered error content.
- [ ] Submission controls communicate pending work, prevent unsafe duplicate submissions, and return to a usable retry state after failure.
- [ ] Error messaging and retry controls are presented accessibly, including appropriate focus, announcement, and keyboard behavior.
