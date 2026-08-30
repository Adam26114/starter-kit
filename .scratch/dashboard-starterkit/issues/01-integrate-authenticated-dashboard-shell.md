# 01: Integrate authenticated dashboard shell

**What to build:**

Authenticated users see the shadcn dashboard shell around the existing Projects feature, with working Dashboard and Projects navigation, while unauthenticated users remain redirected to sign-in. No duplicate `/dashboard` route is introduced.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## Acceptance criteria

- The authenticated dashboard renders a responsive shell with sidebar and header around the existing Projects feature.
- Unauthenticated dashboard access still redirects to sign-in.
- Dashboard and Projects navigation use working routes.
- Convex provider, auth boundary, feature error boundary, project CRUD, and pagination behavior remain intact.
- Lint and typecheck pass for the slice.
