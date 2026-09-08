# Sign-up failure diagnosis and recovery

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

On the sign-up page, account creation fails with the generic message `Could not create your account. Please check your details and try again.` The application uses Next.js, Better Auth email/password authentication, and Convex. The sign-up page calls Better Auth through the Next catch-all auth route, while Convex mounts the Better Auth HTTP routes. The UI currently hides all `result.error` details. A Better Auth `user.create.after` hook calls an internal Convex mutation to finalize the server-owned bootstrap role. That cross-boundary finalization may fail after the Better Auth user is persisted, causing retries to appear as duplicate-email failures. The runtime exception is not yet confirmed.

The environment values `SITE_URL`, `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL` must also be aligned across the Next.js, Better Auth, and Convex boundaries. Diagnosis must distinguish configuration, Better Auth, route, validation, duplicate-account, and role-finalization failures without exposing passwords, secrets, or raw personally identifiable information.

## Solution

Diagnose the failure first on an isolated non-production deployment. Correlate the browser request and response, using a request or correlation identifier, with sanitized Convex and Better Auth logs to identify the actual failing boundary. Fix the observed authentication, route, environment configuration, or role-finalization failure rather than masking it. Preserve a safe user experience by mapping known duplicate-account and validation errors to actionable messages while keeping unknown failures generic. Make bootstrap role finalization idempotent and recoverable so a persisted Better Auth user cannot be stranded from its required server-owned role state and can safely retry or complete recovery. Preserve server authority for admin and user roles, Better Auth ownership of authentication records, and Convex as the source of truth for application data and authorization.

Add focused external-behavior integration coverage at the highest seam available: exercise the actual Better Auth/Next/Convex sign-up boundary if the repository harness permits it; otherwise use the smallest boundary harness that reproduces the request and response behavior, supplemented by focused Convex function tests. Add browser coverage for form validation, role visibility, submission and retry behavior, safe errors, and post-sign-up navigation. Regenerate generated Convex artifacts, then run typecheck, lint, build, and focused tests. Preserve unrelated working-tree changes.

## User Stories

1. As an operator, I want to reproduce the reported sign-up failure on an isolated non-production deployment, so that production accounts and data are not put at risk.
2. As an operator, I want to identify whether the failure occurs in the browser, Next catch-all route, Better Auth, Convex HTTP mount, or role-finalization mutation, so that the repair addresses the real boundary.
3. As an operator, I want browser requests and responses correlated with sanitized server logs, so that one failed attempt can be traced end to end.
4. As an operator, I want a request or correlation identifier visible in diagnostics but not sensitive form fields, so that investigation is useful without exposing credentials.
5. As a security reviewer, I want passwords, secrets, session tokens, raw PII, and full request bodies excluded from logs and diagnostics, so that failure investigation does not create a data leak.
6. As an operator, I want the exact runtime exception captured with safe context on the isolated deployment, so that an unconfirmed cause is not treated as fact.
7. As an application maintainer, I want configuration values checked for alignment across all auth boundaries, so that mismatched URLs or secrets cannot silently break sign-up.
8. As an application maintainer, I want `SITE_URL` to represent the intended Better Auth base URL, so that callback and same-origin behavior is consistent.
9. As an application maintainer, I want `BETTER_AUTH_SECRET` to be present and consistently configured for the deployment, so that Better Auth can initialize and verify requests.
10. As an application maintainer, I want the public Convex URL values to point to the matching deployment and site routes, so that the browser and server bridge do not cross environments.
11. As an operator, I want configuration checks to identify missing, malformed, or cross-environment values without printing their contents, so that remediation is safe.
12. As an unregistered visitor, I want valid name, email, and password details to create an account successfully, so that sign-up works through the intended Better Auth boundary.
13. As an account registrant, I want a clear success result and predictable navigation, so that I know whether I should sign in or continue to the dashboard.
14. As an account registrant, I want invalid name, email, and password input rejected with actionable field-level feedback, so that I can correct the form before retrying.
15. As an account registrant, I want client and server validation to agree, so that a form accepted by the UI does not fail unexpectedly at the auth boundary.
16. As an account registrant, I want duplicate-email failures mapped to a safe, specific message, so that I understand why a retry was rejected.
17. As an account registrant, I want unknown server failures to remain generic, so that internal exceptions and deployment details are not disclosed.
18. As an account registrant, I want safe known error messages derived from structured error categories rather than arbitrary exception text, so that errors are useful and secure.
19. As an account registrant, I want non-sensitive form values preserved after a recoverable failure, so that retrying does not require unnecessary re-entry.
20. As an account registrant, I want my password cleared after a failure or retry as appropriate, so that credentials are not retained longer than needed.
21. As an end user, I want a visible pending state while sign-up is submitted, so that I do not accidentally create duplicate requests.
22. As an end user, I want submission controls disabled while the request is pending, so that repeated clicks do not create confusing races.
23. As an end user, I want a retry action after a transient failure, so that I can recover without abandoning the form.
24. As a user whose Better Auth record was persisted before role finalization failed, I want a retry to recover the existing account rather than leave bootstrap state stranded.
25. As an operator, I want failed role finalization to be safely retried or repaired, so that a partial sign-up does not require manual database guessing.
26. As an operator, I want role finalization to be idempotent, so that repeating the same recovery cannot create conflicting role records or elevate a user.
27. As an application maintainer, I want role finalization to tolerate the user-already-exists state, so that persistence followed by a hook failure has a deterministic recovery path.
28. As an application maintainer, I want role finalization failures surfaced to observability with a correlation identifier, so that partial sign-ups can be diagnosed without exposing user data.
29. As an initial registrant, I want a successful bootstrap role decision persisted after account creation, so that my dashboard access matches the server decision.
30. As an initial registrant, I want the first bootstrap choice to support the permitted admin or user role, so that setup can intentionally initialize the application.
31. As a later registrant, I want my account persisted as user regardless of client claims, so that public sign-up cannot create additional administrators.
32. As an attacker, I want forged admin role input to be ignored or rejected, so that manipulating the request cannot elevate my account.
33. As an authenticated user, I want profile or account updates unable to change my role, so that identity editing is not an authorization boundary.
34. As an administrator, I want server-owned admin authority preserved, so that a client or Better Auth hook cannot grant arbitrary privileges.
35. As an application maintainer, I want Better Auth to remain the owner of authentication records, so that the fix does not duplicate or drift identity state.
36. As an application maintainer, I want Convex to remain the source of truth for application roles and authorization, so that dashboard decisions use server-owned data.
37. As an application maintainer, I want the Better Auth and Convex ownership boundaries preserved, so that cross-boundary calls use only their intended interfaces.
38. As concurrent registrants, we want at most one bootstrap admin decision, so that retries and simultaneous sign-ups cannot produce multiple administrators.
39. As a concurrent registrant who loses the bootstrap race, I want a safe user fallback, so that another sign-up does not unnecessarily fail.
40. As a registrant retrying after a partial failure, I want the existing account and role state reconciled deterministically, so that retry behavior is not confused with a new duplicate account.
41. As an operator, I want repeated retries to converge on one valid account and one valid role state, so that recovery is safe under network retries.
42. As an operator, I want concurrency and idempotency tests to cover interleavings around persistence and finalization, so that the repair does not only work in the happy path.
43. As a keyboard user, I want a logical tab order through the sign-up form, so that I can submit and retry without a mouse.
44. As a screen-reader user, I want labels, pending state, and validation messages associated with their controls, so that I can understand what to correct.
45. As a user with limited vision, I want visible focus, error, and pending states, so that the current form state is clear.
46. As a mobile user, I want the sign-up, error, retry, and navigation flows usable on a small screen, so that recovery works across devices.
47. As an end user, I want a failed submission not to navigate as though it succeeded, so that I do not lose track of an incomplete account setup.
48. As an end user, I want successful sign-up navigation to be stable and role-appropriate, so that I reach the expected sign-in or dashboard destination.
49. As a maintainer, I want focused external-behavior tests to assert observable responses and persisted state, so that implementation details cannot hide a broken integration.
50. As a maintainer, I want browser tests to cover validation, role visibility, submission, retry, safe errors, and navigation, so that the reported user experience remains protected.
51. As a maintainer, I want Convex function tests to cover role finalization, authorization, idempotency, recovery, and concurrency assumptions, so that backend guarantees remain explicit.
52. As a maintainer, I want generated Convex artifacts regenerated from source, so that checked-in generated interfaces match the repaired functions.
53. As a maintainer, I want typecheck, lint, build, and focused tests run after regeneration, so that the repaired boundary is compatible with the repository workflow.
54. As an operator, I want deployment configuration verified without mutating production or a database during diagnosis, so that investigation is reversible.
55. As an operator, I want the isolated deployment's configuration and generated artifacts kept aligned, so that a fix tested in isolation is representative of the target runtime.
56. As an application maintainer, I want unrelated working-tree changes preserved, so that this repair does not overwrite or reformat other work.

## Implementation Decisions

- First diagnose on an isolated non-production deployment by correlating browser request and response identifiers with sanitized Convex and Better Auth logs; do not expose passwords, secrets, session tokens, raw request bodies, or raw PII.
- Fix the observed failure at its actual authentication, route, environment configuration, or role-finalization boundary rather than relying on a generic client-side workaround.
- Keep Better Auth email/password as the authentication mechanism and keep the Next catch-all route and Convex Better Auth HTTP mount within their existing ownership boundaries.
- Keep Convex as the source of truth for application roles and authorization, and keep Better Auth as the owner of authentication records.
- Require aligned `SITE_URL`, `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL` values for the target isolated deployment without logging their values.
- Preserve server authority for exactly the existing admin and user role model; client-submitted role state must never grant authority.
- Make post-persistence bootstrap role finalization idempotent and recoverable, including the user-already-persisted case, so transient cross-boundary failures cannot strand bootstrap state.
- Preserve safe error UX by mapping known duplicate-account and validation failures to actionable structured messages while keeping unknown errors generic.
- Add external-behavior coverage at the highest seam possible: use the actual Better Auth/Next/Convex signup boundary if the harness permits, otherwise use the smallest boundary harness plus focused Convex function tests.
- Add browser coverage for form validation, role visibility, submission and retry, safe errors, accessibility behavior, and navigation.
- Regenerate generated Convex artifacts through the repository's supported workflow; never hand-edit generated output.
- Run typecheck, lint, build, and focused tests after regeneration, and preserve unrelated working-tree changes.

## Testing Decisions

The highest-value seam is the external sign-up request through the Better Auth/Next/Convex boundary. Prefer an integration harness that exercises the actual request and response path and verifies both the persisted Better Auth user record and the observable response. If that harness is not feasible, introduce only the smallest boundary harness that reproduces the failure and pair it with focused Convex function tests for role finalization, authorization, idempotency, recovery, and concurrency. Browser tests must cover the user-visible form and recovery flow rather than only component internals.

External-behavior coverage must include:

- Reproduction and diagnosis evidence for the reported generic failure on an isolated non-production deployment.
- A successful first sign-up with each permitted bootstrap role.
- A successful later sign-up forced to user.
- Invalid name, email, password, and role inputs producing safe actionable responses.
- Duplicate-email behavior after a normal existing account and after a persisted-user/failed-finalization scenario.
- Unknown server failures remaining generic and free of secrets, raw PII, or internal exception details.
- Failed role finalization recovering through a retry or repair path and converging on valid state.
- Repeated finalization and signup retries being idempotent.
- Concurrent first sign-ups producing at most one bootstrap-selected administrator.
- Forged role requests and role-changing profile/API updates being rejected or ignored.
- Valid sign-in and role-appropriate post-sign-up navigation.
- Form role visibility changing correctly with bootstrap availability.
- Browser validation, pending state, duplicate-submit prevention, retry behavior, focus, keyboard operation, labels, and associated error messaging.
- Sanitized request/correlation identifiers appearing consistently across the browser and server diagnostics.
- Aligned deployment configuration being validated without printing secret or PII values.

Name and preserve the existing prior art in the test plan: the pure role policy coverage in `tests/authBootstrapPolicy.test.ts` remains useful but is insufficient as the primary verification, and the server-owned bootstrap model described in `.scratch/bootstrap-admin-signup/spec.md` remains the behavioral source to preserve. Also follow `docs/architecture.md` for Convex source-of-truth, safe structured errors, ownership boundaries, generated-artifact, and verification expectations.

Run the focused integration and browser tests, focused Convex function tests where needed, then the repository's Bun typecheck, lint, and build workflows after code generation. Do not deploy or mutate any database as part of this specification's verification.

## Out of Scope

- Diagnosing against or mutating production data.
- Exposing passwords, secrets, session tokens, raw PII, or arbitrary server exception text.
- Replacing Better Auth email/password authentication.
- Moving authentication ownership out of Better Auth.
- Moving application role authority out of Convex.
- Creating arbitrary roles or public admin creation after bootstrap.
- Unrelated UI redesign or unrelated working-tree cleanup.
- Hand-editing generated Convex artifacts.
- Deployment or database mutation during implementation verification.

## Further Notes

- The local Markdown tracker is configured under `.scratch/`.
- `ready-for-agent` is a valid tracker status and label.
- The existing bootstrap role requirements are documented in `.scratch/bootstrap-admin-signup/spec.md`; do not modify that spec.
- `tests/authBootstrapPolicy.test.ts` currently covers only pure role policy and does not exercise Better Auth, Next, Convex, persistence, or browser behavior.
- `docs/architecture.md` states that Convex is the source of truth, Better Auth owns authentication records, expected failures use safe structured messages, and generated files are not hand-edited.
- The reported runtime exception remains unconfirmed and must be established through isolated non-production correlation before the final fix is chosen.
- Preserve unrelated existing working-tree changes.
- This specification is ready for an agent; do not create tickets yet.
