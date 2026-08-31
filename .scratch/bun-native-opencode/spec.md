Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The repository is intended to be Bun-native, but its OpenCode MCP guidance still launches the Playwright MCP server through npx. Related project guidance and duplicated skill documentation also contain npx, npm, or pnpm command examples. This creates inconsistent setup instructions, makes the documented workflow depend on a different package manager, and can cause OpenCode users to start the MCP server differently from the repository's declared package-manager convention.

The cleanup must be narrowly scoped to package-manager guidance and the OpenCode MCP configuration. It must preserve application behavior, existing scripts, and unrelated work already present in the working tree.

## Solution

Update the Playwright MCP launcher used by OpenCode from npx to bunx. Update project guidance and duplicated skill documentation so command examples use Bun equivalents rather than npx, npm, or pnpm. Keep the repository's existing Bun package-manager declaration and scripts unchanged.

The result is one consistent, Bun-native path for installing, linting, typechecking, building, and starting the Playwright MCP server. The change is documentation and configuration cleanup only: it does not add enforcement, dependencies, schemas, or application behavior.

## User Stories

1. As an application developer, I want a Bun-launched Playwright MCP server, so that my local tooling follows the repository's Bun-native workflow.
2. As an application developer, I want a set of project command examples using Bun equivalents, so that I can copy and run the documented setup without switching package managers.
3. As an application developer, I want a consistent set of duplicated skill documentation commands, so that guidance remains consistent wherever I discover it.
4. As an application developer, I want a preserved package-manager declaration, so that the cleanup does not alter the repository's established runtime convention.
5. As an application developer, I want a set of unchanged existing scripts, so that familiar lint, typecheck, and build entry points continue to work.
6. As an OpenCode maintainer, I want a Playwright MCP configuration using the Bun launcher, so that the supported OpenCode integration has one clear startup path.
7. As an OpenCode maintainer, I want a normalized set of in-scope package-manager examples, so that future readers are not given conflicting installation or verification instructions.
8. As an OpenCode maintainer, I want a cleanup that leaves generated Convex output untouched, so that documentation work cannot introduce unrelated generated-file churn.
9. As an OpenCode maintainer, I want a cleanup that leaves ignored OpenCode metadata untouched, so that local package metadata is not accidentally treated as source configuration.
10. As an OpenCode user, I want a project MCP configuration that loads successfully, so that OpenCode can discover the Playwright MCP server from the repository.
11. As an OpenCode user, I want a Playwright MCP server that starts through bunx, so that the MCP server is available using the documented package manager.
12. As an OpenCode user, I want a verifiable MCP startup or help output, so that I can distinguish a valid launcher from a stale configuration.
13. As an automated CI user, I want a documented set of verification commands using Bun, so that CI checks can mirror the repository's local development workflow.
14. As an automated CI user, I want a frozen-lockfile installation as the documented reproducible install, so that verification does not silently rewrite dependency state.
15. As an eventual starterkit consumer, I want a Bun-native guidance model from the start, so that a new project can adopt the starterkit without package-manager translation.
16. As an eventual starterkit consumer, I want a copyable OpenCode MCP setup, so that I can enable Playwright tooling with minimal configuration work.
17. As an eventual starterkit consumer, I want a preserved set of unrelated starterkit behaviors, so that adopting the cleanup does not change the application examples I depend on.
18. As an onboarding contributor, I want a documented local setup sequence using Bun, so that I can get the repository running without guessing which package manager to use.
19. As an OpenCode user, I want a predictable reload behavior after MCP configuration changes, so that the updated Playwright launcher is used without stale settings.
20. As an OpenCode user, I want a clear MCP failure diagnosis path, so that I can identify whether a problem comes from OpenCode, bunx, or the Playwright server.
21. As an owner of the repository, I want a single documented Bun version, so that local machines and automation use consistent runtime tooling.
22. As an engineer on Windows, I want a portable Bun command workflow, so that the documented MCP setup works on Windows.
23. As an engineer on macOS, I want a portable Bun command workflow, so that the documented MCP setup works on macOS.
24. As an engineer on Linux, I want a portable Bun command workflow, so that the documented MCP setup works on Linux.
25. As an owner of CI, I want a reproducible Bun installation procedure, so that clean runners resolve the same dependency state as local development.
26. As an engineer using CI, I want a cache-safe verification process, so that repeated checks remain comparable.
27. As an application developer, I want a documented Bun cache policy, so that I know when cached packages are reused and when a clean install is needed.
28. As an onboarding contributor, I want a set of onboarding instructions naming the required Bun commands, so that I can complete the first-run workflow efficiently.
29. As an engineer reading documentation, I want a discoverable OpenCode MCP guidance path, so that I can find the supported Playwright setup quickly.
30. As an engineer reading documentation, I want a clear explanation of package installation semantics in Bun terminology, so that I understand what installation does without translating npm concepts.
31. As an OpenCode maintainer, I want a clear generated-file boundary, so that MCP guidance changes do not imply editing generated output.
32. As an engineer using Convex, I want a preserved set of existing Convex workflows, so that backend generation and development continue to work as before.
33. As an engineer using Next.js, I want a preserved set of existing Next.js workflows, so that application development and builds remain unchanged.
34. As an application developer, I want a Bun launcher using the declared package version convention, so that MCP startup matches the repository metadata.
35. As an OpenCode maintainer, I want a removal of stale package-manager examples from duplicated guidance, so that alternate documentation paths do not undermine the canonical setup.
36. As an OpenCode user, I want a documented MCP help output path, so that I can validate the launcher before opening a project session.
37. As an owner of the repository, I want a lockfile immutability policy during verification, so that documentation cleanup cannot introduce dependency drift.
38. As an automated CI user, I want a consistent set of lint, typecheck, and build commands in Bun, so that each validation stage uses the same toolchain.
39. As an onboarding contributor, I want a discoverable failure recovery path near setup guidance, so that I can recover from an incomplete installation.
40. As an owner of cross-platform guidance, I want a platform-neutral set of shell examples, so that contributors can follow the same instructions across operating systems.
41. As an OpenCode user, I want a configuration reload step documented, so that I can confirm changes take effect after restarting or refreshing OpenCode.
42. As an owner of the repository, I want a policy excluding ignored OpenCode metadata from cleanup, so that local caches and package metadata remain untouched.
43. As an application developer, I want a source-of-truth set of existing scripts, so that Bun-native examples do not introduce replacement workflow commands.
44. As an adopter of the starterkit, I want a clear description of Bun installation behavior, so that package resolution and execution are predictable on a fresh checkout.
45. As an owner of documentation, I want a single package-manager convention for all in-scope examples, so that readers receive one unambiguous workflow.

## Implementation Decisions

- Replace the Playwright MCP npx launcher with bunx in the OpenCode MCP configuration.
- Replace npx, npm, and pnpm command examples in project guidance with equivalent Bun commands.
- Replace npx, npm, and pnpm command examples in duplicated skill documentation with equivalent Bun commands.
- Preserve the existing Bun packageManager declaration and all existing scripts.
- Leave ignored OpenCode metadata and generated Convex output untouched.
- Preserve unrelated working-tree changes; edit only the in-scope guidance and OpenCode MCP configuration.
- Do not add enforcement, dependencies, schema changes, or application changes.
- Keep the implementation limited to Bun package-manager guidance and OpenCode MCP configuration.
- Do not regenerate the lockfile as part of this cleanup.

## Testing Decisions

Use a single highest seam: OpenCode loading the project's MCP configuration and starting Playwright MCP via bunx. Verify observable behavior only: the configuration is accepted, the Playwright MCP launcher starts or presents its help output, and no unrelated application behavior is changed by the cleanup.

Use static documentation search as supporting verification. Search the in-scope project guidance and duplicated skill documentation for stale npx, npm, and pnpm command examples, and confirm the Playwright MCP launcher is bunx. Do not treat broad repository matches in ignored metadata or generated Convex output as cleanup targets.

Run the repository's current verification conventions with these exact Bun commands:

```text
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run build
```

Where practical, also perform MCP startup/help verification through the configured OpenCode project MCP entry and confirm observable Playwright MCP startup or help output. Do not add new test infrastructure, enforcement, dependencies, schema checks, or application tests for this documentation/configuration-only change.

## Out of Scope

- Application behavior or application source changes.
- Dependency upgrades or adding dependencies.
- Lockfile regeneration or lockfile edits.
- Ignored `.opencode` package metadata.
- Hand-editing generated Convex files.
- Changes to the existing Bun packageManager declaration or scripts.
- New enforcement for package-manager usage.
- Schema changes.
- Committing unrelated work or altering unrelated working-tree changes.
- A prototype or any broader OpenCode, MCP, or starterkit redesign.

## Further Notes

The root package already declares bun@1.3.10. The local Markdown tracker is configured, and ready-for-agent is a valid tracker label. No CONTEXT-MAP.md or ADR directory exists in the repository. The existing working tree contains unrelated changes, which must be preserved. Follow the local tracker convention of one feature directory and one spec file: this feature uses `.scratch/bun-native-opencode/spec.md`.
