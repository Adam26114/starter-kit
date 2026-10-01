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

Fresh quality-gate and agent-browser runs passed all current gates: `bun test` 18/18, lint 2 tasks, typecheck 2 tasks, and a production build with unique `/dashboard`, `/projects`, and `/admin` routes. Unauthenticated redirect, disposable signup/authenticated shell, real Dashboard and Projects routes, non-admin `/admin` redirect, light/dark themes, desktop 1440x900, tablet 1024x900 and 768x1024, mobile 390x844, no overflow, sidebar collapse, off-canvas behavior, overlay/Escape dismissal, focus entry/restoration, navigation close, keyboard focus, and semantics all passed with no normal console errors. Selector-center overlay clicking was initially misleading because the center lay beneath the z-50 panel; three unobstructed overlay clicks passed.

Projects used an initially empty disposable account and a unique fixture prefix. Create, edit, delete, toasts, cleanup, and restoration of the empty state passed. Ten initial records plus `Load more` were observed; the first click did not visibly advance, while a later load exposed the remaining fixture and exhausted message, so `LoadingMore` remains unverified. `LoadingFirstPage` was too brief to observe. Fresh offline navigation produced Chrome `ERR_INTERNET_DISCONNECTED`, while an already-loaded page preserved its last state and reconnected automatically. Deterministic app error/`Try again` and admin-positive `/admin` access/sidebar remain unverified. The run-created disposable non-admin account remains because there is no supported account deletion flow. Criteria 14 and 18 remain unchecked because these are verification gaps, not known failures.
