# Dashboard Starterkit PRD

## Proposed test seam

Use one highest-level seam: the authenticated `/dashboard` route. Verify the complete flow through the dashboard shell, sidebar navigation, existing Projects feature, auth boundary, loading/error states, and responsive layout.

## Problem Statement

The starterkit has an authenticated Convex dashboard route, but it currently renders only a basic projects view. It lacks a reusable dashboard shell with sidebar navigation, responsive layout, header controls, and shadcn/ui dashboard styling.

## Solution

Integrate shadcn/ui `dashboard-01` as the dashboard starter shell while preserving the existing Better Auth protection, Convex provider, project CRUD behavior, pagination, and error handling.

Adapt the block to the repository's `base-nova`, Tailwind v4, Base UI, workspace-package, and feature-local architecture.

## User Stories

1. As an authenticated user, I want to see a polished dashboard shell, so that the starterkit feels ready for application development.
2. As an authenticated user, I want a persistent sidebar, so that I can understand the application's navigation structure.
3. As an authenticated user, I want the sidebar to collapse responsively, so that I can use the dashboard on smaller screens.
4. As an authenticated user, I want a mobile-friendly off-canvas navigation, so that dashboard content remains usable on phones.
5. As an authenticated user, I want a dashboard navigation item, so that I can return to the dashboard overview.
6. As an authenticated user, I want a Projects navigation item, so that I can access the existing projects workflow.
7. As an authenticated user, I want navigation links to point to real routes, so that starter navigation does not lead to broken placeholder pages.
8. As an authenticated user, I want a dashboard header, so that the current application context is clear.
9. As an authenticated user, I want a sidebar toggle control, so that I can control the amount of navigation space.
10. As an authenticated user, I want the dashboard shell to support light and dark themes, so that it follows the starterkit's existing theme behavior.
11. As an authenticated user, I want the existing Projects feature to remain available inside the new shell, so that the dashboard redesign does not remove working functionality.
12. As an authenticated user, I want to create projects from the dashboard, so that the existing CRUD example remains useful.
13. As an authenticated user, I want to edit projects from the dashboard, so that I can maintain project information.
14. As an authenticated user, I want to delete projects from the dashboard, so that I can remove obsolete projects.
15. As an authenticated user, I want project mutation feedback to remain visible, so that I know whether an action succeeded or failed.
16. As an authenticated user, I want project pagination to remain available, so that large project lists remain manageable.
17. As an authenticated user, I want empty project states to remain clear, so that I know what to do when no projects exist.
18. As an authenticated user, I want loading states to remain clear, so that the dashboard does not appear broken while data loads.
19. As an authenticated user, I want retryable error states, so that temporary data failures can be recovered from.
20. As an unauthenticated visitor, I want protected dashboard access to redirect to sign-in, so that private data remains protected.
21. As an authenticated user, I want Convex queries to mount only after authentication resolves, so that protected data access does not race the auth boundary.
22. As a starterkit maintainer, I want reusable UI primitives to remain shared, so that future features can reuse the dashboard building blocks.
23. As a starterkit maintainer, I want dashboard-specific composition to remain in the web app, so that product navigation does not leak into the shared UI package.
24. As a starterkit maintainer, I want the implementation to use the repository's existing aliases, so that imports remain consistent.
25. As a starterkit maintainer, I want existing shared primitives preserved unless an API-compatible update is required, so that unrelated features do not regress.
26. As a starterkit maintainer, I want only dependencies used by the implementation installed, so that the starterkit stays lean.
27. As a starterkit maintainer, I want the dashboard block adapted to the current shadcn registry source, so that generated code is reproducible.
28. As a starterkit maintainer, I want no duplicate route definitions, so that Next.js routing remains unambiguous.
29. As a starterkit maintainer, I want static demo content clearly identified, so that fabricated values are not mistaken for production metrics.
30. As a starterkit maintainer, I want real project data to remain the source of truth, so that the dashboard does not duplicate server state.
31. As a user, I want the dashboard to remain usable at desktop widths, so that navigation and project content have sufficient space.
32. As a user, I want the dashboard to remain usable at tablet widths, so that intermediate layouts do not overflow.
33. As a user, I want controls and content to remain readable at mobile widths, so that the starterkit demonstrates responsive behavior.
34. As a user, I want keyboard-accessible sidebar and menu controls, so that I can navigate without a mouse.
35. As a user, I want visible focus states, so that keyboard navigation remains understandable.
36. As a user, I want semantic navigation landmarks, so that assistive technologies can interpret the dashboard.
37. As a user, I want charts, cards, or tables labeled as starter content when shown, so that their meaning is not misleading.
38. As a developer, I want the dashboard shell to be easy to extend with future routes, so that new features can adopt the same layout.
39. As a developer, I want the shell to support future real dashboard metrics without requiring a structural rewrite, so that Convex aggregate queries can be added later.
40. As a developer, I want linting, typechecking, and production builds to pass, so that the starterkit remains reliable.

## Implementation Decisions

- Use the current shadcn `dashboard-01` registry source as the visual reference.
- Adapt generated code to the repository's `base-nova`, Tailwind v4, CSS-variable, and Base UI conventions.
- Keep reusable primitives in the shared UI package.
- Keep app-specific sidebar, header, navigation, and dashboard composition in the web application.
- Integrate the shell into the existing authenticated dashboard route group.
- Preserve the existing Convex provider and Better Auth boundary.
- Preserve the existing feature error boundary around the Projects feature.
- Keep `ProjectsView` as the source of truth for project data and CRUD behavior.
- Do not create a second route that resolves to `/dashboard`.
- Use real dashboard and projects links rather than placeholder hashes.
- Preserve existing theme tokens, sidebar variables, and dark-mode behavior.
- Add only dependencies required by imported dashboard components.
- Use chart/table/demo elements only as clearly labeled starter content unless real Convex data is available.
- Do not add schema or Convex API changes for fabricated dashboard metrics.
- Do not duplicate project server state in Redux or local dashboard state.
- Use the existing project loading, empty, error, pagination, and mutation feedback states.
- Preserve unrelated uncommitted work in the repository.
- Avoid broad formatting or regeneration outside the dashboard integration.

## Testing Decisions

- Test observable behavior rather than internal component structure.
- Prefer the authenticated dashboard route as the single high-level integration seam.
- Verify unauthenticated users are redirected to sign-in.
- Verify authenticated users see the dashboard shell and Projects feature.
- Verify sidebar collapse and mobile navigation behavior.
- Verify Dashboard and Projects navigation links.
- Verify project creation, editing, deletion, and feedback behavior remains intact.
- Verify loading, empty, error, retry, loading-more, and exhausted pagination states.
- Verify light and dark theme rendering.
- Verify keyboard focus and accessible labels for navigation controls.
- Run the repository's lint command.
- Run the repository's typecheck command.
- Run the production build.
- Use browser smoke testing with valid Convex and Better Auth configuration.
- Follow existing project feature tests and integration conventions if tests are added.

## Out of Scope

- Building new product routes beyond the existing dashboard and projects route.
- Adding organizations, teams, roles, or tenancy.
- Adding new Convex dashboard aggregate queries.
- Replacing the existing Projects feature with a separate data-table implementation.
- Turning static shadcn demo metrics into claimed production metrics.
- Changing Better Auth configuration.
- Changing Convex schema or authorization rules.
- Replacing Redux architecture.
- Adding a complete analytics system.
- Adding real search, settings, reports, or team-management pages.
- Redesigning public landing or authentication pages.
- Cleaning up unrelated pre-existing working-tree changes.

## Further Notes

The official block includes demo-oriented cards, chart, table, navigation, and additional UI primitives. The main integration risk is adapting those pieces without overwriting existing shared components or introducing a duplicate `/dashboard` route.

The issue tracker and `ready-for-agent` label vocabulary are not configured in this repository. Run `/setup-matt-pocock-skills` before publishing this PRD as an issue.
