# 01: Integrate authenticated dashboard shell

**What to build:**

Authenticated users see the dashboard shell around the existing Projects feature, with a header, sidebar, and working Dashboard and Projects navigation. Unauthenticated users remain redirected to sign-in, and the existing admin navigation remains available without introducing a duplicate dashboard route.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## Acceptance criteria

- [x] The authenticated dashboard renders a shell with a header and sidebar around the existing Projects feature.
- [x] Dashboard and Projects navigation point to real routes, and no duplicate route resolves to the dashboard.
- [x] `DashboardAuthBoundary` resolves Better Auth before protected Convex queries mount, preserving the existing authentication and data-loading order. The Convex provider itself remains mounted at the route-group boundary.
- [x] The Projects feature remains protected by the existing FeatureErrorBoundary.
- [x] Unauthenticated dashboard access redirects to sign-in.
- [x] Project create, edit, delete, mutation feedback, and pagination behavior remain intact.
