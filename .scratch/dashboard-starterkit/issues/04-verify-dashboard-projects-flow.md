# 04: Verify dashboard and Projects flow

**What to build:**

The complete dashboard and Projects flow is verified end to end in a valid Convex and Better Auth environment, including authentication, navigation, themes, responsive and accessible behavior, project states and mutations, and repository quality gates. Environment-only failures are distinguished from product failures.

**Blocked by:** 02: Add responsive sidebar and accessible navigation; 03: Add starter dashboard presentation content

**Status:** ready-for-agent

## Acceptance criteria

- [x] Unauthenticated access redirects to sign-in, and authenticated users render the dashboard shell and Projects feature.
- [ ] Dashboard and Projects navigation, including preserved admin navigation, are verified with real routes.
- [x] Light and dark themes are verified across the shell and starter content.
- [x] Desktop, tablet, and mobile responsive behavior is verified without overflow, including sidebar collapse, mobile off-canvas dismissal, keyboard access, visible focus, and semantic landmarks.
- [x] Project create, edit, delete, and mutation feedback behavior are verified.
- [ ] Project loading, empty, error, retry, loading-more, and exhausted pagination states are verified.
- [x] Lint, typecheck, and production build pass, or any failure is documented as environment-only with the precise environment cause distinguished from implementation failures.
- [x] Browser smoke testing succeeds with valid Convex and Better Auth configuration.

## Verification notes

The valid target was dev `dynamic-capybara-985`. LoadingFirstPage, empty, 10+1 pagination, exhausted, CRUD, mutation feedback, reactive edit retention, and non-admin admin redirect were observed. `bun test` passed 18 tests; lint, typecheck, and production build passed; the build emitted the expected unique routes including `/dashboard`, `/projects`, and `/admin`. All created project fixtures were deleted, and local browser credential/state files were removed. One disposable non-admin dev test account remains because the app has no supported account deletion flow. Transient LoadingMore and query-error/retry were not deterministically induced at the route seam. Admin-visible navigation could not be runtime-tested without admin credentials. These are verification gaps, not known implementation failures.
