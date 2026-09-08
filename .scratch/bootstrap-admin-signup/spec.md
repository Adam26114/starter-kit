# Admin-panel bootstrap sign-up flow

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The application has Better Auth email/password authentication and sign-in, but it does not yet provide a sign-up page or a role model. The admin panel needs a safe bootstrap flow in which the first successful registration can establish an administrator while all later registrations are ordinary users. The decision must be owned by the server, remain safe under forged requests and concurrent sign-ups, and preserve the existing Convex project ownership and Better Auth authentication boundaries.

## Solution

Add a sign-up experience that collects a name, email, password, and, only while bootstrap is available, an initial role choice. The first successful registration can choose either `admin` or `user`. Every later successful registration is persisted as `user`, regardless of client claims. After registration, the user can sign in and reach the appropriate dashboard according to the persisted role.

The browser may display whether the system appears to be in first-user mode, but this value is advisory and never grants authority. The server must make the final decision using an atomic or serialized bootstrap gate, so no implementation may rely on an unprotected count-then-create sequence. Role changes must be rejected through profile updates and forged API requests. A failed bootstrap attempt must release or safely recover the claimed bootstrap state so that the application cannot be stranded without a valid first user.

## User Stories

1. As an unregistered visitor, I want a sign-up page, so that I can create an account without administrator assistance.
2. As an unregistered visitor, I want a name, email, and password form, so that Better Auth can create my identity.
3. As an unregistered visitor during bootstrap, I want a first-admin role choice, so that I can initialize the application for administration.
4. As an unregistered visitor during bootstrap, I want a user role choice, so that I can initialize the application without administrator privileges.
5. As an initial registrant, I want a persisted selected role, so that the initial account has the access level I intentionally chose.
6. As an initial registrant, I want a server decision about bootstrap availability, so that another browser cannot impersonate bootstrap state.
7. As an ordinary registrant, I want a form without role selection, so that the normal registration path is simple and predictable.
8. As an ordinary registrant, I want a user default for my account, so that public registration cannot create additional administrators.
9. As an account registrant, I want a server rule that ignores a submitted admin role after bootstrap, so that client tampering cannot elevate my account.
10. As an account registrant, I want a safe response to invalid role values, so that malformed requests cannot create unexpected permissions.
11. As an attacker, I want a safe failure for forged role requests, so that API manipulation cannot grant administrator access.
12. As an existing user, I want a profile update that preserves my role, so that editing my personal information cannot change authorization.
13. As an administrator, I want a protected admin role, so that another user cannot downgrade or replace my privileges.
14. As an active concurrent registrant, I want a single bootstrap claim among simultaneous requests, so that there is never more than one first-user privilege decision.
15. As an active concurrent registrant whose request loses the bootstrap race, I want a user registration fallback, so that concurrency does not unnecessarily block account creation.
16. As an initial bootstrap registrant whose request fails, I want a retry path, so that a transient failure does not permanently prevent initial setup.
17. As an operator, I want a safely recovered failed bootstrap claim, so that the system cannot remain locked in an unusable claimed state.
18. As an account registrant, I want a duplicate-email feedback message, so that I know why account creation did not succeed.
19. As an account registrant, I want a password validation feedback message, so that I can correct weak or malformed credentials before retrying.
20. As an account registrant, I want a name and email validation feedback message, so that incomplete or invalid identity data is clear and actionable.
21. As an account registrant, I want a safely presented server validation error, so that I can recover without learning internal state.
22. As an account registrant, I want a preserved safe input state after a failed request, so that recovery does not require re-entering every field.
23. As an account owner who just registered, I want a clear completion response, so that I know whether I should sign in or continue to the dashboard.
24. As an authenticated user, I want a Better Auth email-and-password sign-in, so that I can access my account securely.
25. As an administrator, I want a admin dashboard after sign-in, so that I can manage the admin panel.
26. As an ordinary user, I want a user dashboard after sign-in, so that I can use permitted application features.
27. As an ordinary user, I want a denial for admin-only dashboard routes, so that persisted authorization is enforced consistently.
28. As an unauthenticated visitor, I want a protected dashboard route requirement for sign-in, so that private data is not publicly accessible.
29. As an authenticated user, I want a dashboard access decision based on my server-persisted role, so that stale browser state cannot alter authorization.
30. As an accessibility-focused keyboard user, I want a logical order for every sign-up control, so that I can complete registration without a mouse.
31. As an accessibility-focused screen-reader user, I want a association between labels and validation messages, so that I can understand and correct the form.
32. As an end user with limited vision, I want a visible focus and error state, so that I can identify the active control and required corrections.
33. As an end user on a small screen, I want a usable sign-up form, so that bootstrap registration works on mobile devices.
34. As an end user, I want a apparent loading and submission state, so that I do not accidentally submit the form multiple times.
35. As an end user, I want a recoverable generic error for unexpected failures, so that I can retry without seeing implementation details.
36. As an administrator, I want a public sign-up restriction against later admins, so that the initial bootstrap boundary remains meaningful.
37. As an application maintainer, I want a small explicit role model, so that authorization checks remain easy to audit.
38. As an application maintainer, I want a authentication boundary within Better Auth, so that the sign-up flow does not duplicate identity management.
39. As an application maintainer, I want a user ownership boundary within the Better Auth component, so that Convex integration follows the existing ownership boundary.
40. As an application maintainer, I want a Convex operation role boundary, so that backend behavior matches dashboard authorization.
41. As an application maintainer, I want a generated Better Auth and Convex schema output regenerated through Bun, so that generated artifacts remain consistent with their sources.
42. As an application maintainer, I want a set of Bun scripts for linting, type checking, and builds, so that the flow can be verified using the repository workflow.
43. As an application maintainer, I want a focused integration and browser check suite, so that both the auth boundary and visible form behavior are covered.
44. As an operator, I want a observable sign-up failure without leaked credentials, so that recovery and diagnosis are possible while secrets remain protected.
45. As an application security reviewer, I want a atomically decided server-side role assignment, so that time-of-check/time-of-use races cannot elevate accounts.

## Implementation Decisions

- Better Auth email/password remains the authentication mechanism.
- Add a server-owned role with exactly `admin` and `user` values.
- The default role is always `user`.
- The first successful user registration may choose `admin` or `user`.
- Once any user exists, the sign-up UI shows only name, email, and password; the server ignores or rejects any submitted role and persists `user`.
- First-user status shown to the browser is advisory only.
- Enforce bootstrap privilege server-side with a serialized/atomic bootstrap gate; never use an unprotected count-then-create decision.
- Prevent role changes through profile updates or forged API requests.
- Preserve existing Convex project ownership and Better Auth auth boundaries.
- Regenerate generated Better Auth/Convex schema through Bun, never hand-edit generated output.
- Include a safe recovery path if a bootstrap attempt fails after claiming bootstrap state.

## Testing Decisions

The single highest testing seam is the sign-up request through the Better Auth/Convex boundary. The primary focused integration assertion must verify both the persisted Better Auth user record and the observable authentication response. There is no existing auth test harness, so introduce only the smallest focused harness needed for this boundary and keep setup compatible with the current repository.

External-behavior coverage must include:

- The first successful sign-up selecting `admin`.
- The first successful sign-up selecting `user`.
- A later sign-up being forced to `user`.
- A forged admin role request being ignored or rejected and never persisted as admin.
- A role mutation through profile or API update being rejected and leaving the role unchanged.
- Concurrent first sign-ups producing at most one bootstrap-selected administrator, with the other successful account safely treated as user.
- A failed bootstrap sign-up recovering so a valid retry can complete.
- Validation failures, duplicate identity failures, and generic server errors producing safe, actionable responses.
- Sign-in succeeding for valid credentials and dashboard access matching the persisted role.
- UI field visibility showing the role control only while bootstrap is available and showing only name, email, and password afterward.
- Accessible labels, keyboard operation, focus handling, and associated error messaging.

Run the repository's Bun lint, typecheck, and build workflows. Also run focused integration verification at the Better Auth/Convex boundary and focused browser verification for sign-up, sign-in, field visibility, validation, and dashboard access.

## Out of Scope

- Unrelated application redesign.
- Social authentication.
- Multi-tenant organizations.
- Arbitrary role management.
- Public admin creation after bootstrap.
- Trusting client role state.
- Hand-editing generated files.
- Unrelated working-tree changes.

## Further Notes

- The local Markdown tracker is configured under `.scratch/`.
- `ready-for-agent` is a valid tracker status and label.
- Current auth has email/password and sign-in but no sign-up page or role model.
- Users are owned by the Better Auth component.
- Installed versions are `@convex-dev/better-auth 0.12.5` and `better-auth 1.6.11`.
- No `CONTEXT-MAP.md` or ADR directory exists.
- The working tree contains unrelated changes.
- This specification is ready for an agent; do not create tickets yet.
