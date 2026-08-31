# 04: Verify Bun-native workflow

**What to build:** Maintainers have evidence that the OpenCode MCP path and repository Bun workflow work together after the documentation/configuration cleanup.

**Blocked by:** 01: Make Playwright MCP Bun-native; 02: Update canonical Bun setup guidance; 03: Update duplicated skill guidance

**Status:** ready-for-agent

- [ ] OpenCode MCP startup/help behavior is verified.
- [ ] Static search finds no stale in-scope npm/pnpm command examples.
- [ ] `bun install --frozen-lockfile` passes.
- [ ] `bun run lint` passes.
- [ ] `bun run typecheck` passes.
- [ ] `bun run build` passes.
- [ ] Unrelated working-tree changes are preserved.
