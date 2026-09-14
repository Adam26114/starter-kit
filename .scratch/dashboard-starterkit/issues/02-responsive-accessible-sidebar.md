# 02: Add responsive sidebar and accessible navigation

**What to build:**

Users can collapse the sidebar on desktop, use mobile off-canvas navigation, dismiss it with Escape or an overlay, navigate by keyboard, see focus states, and use the shell correctly across desktop, tablet, and mobile widths while preserving existing admin navigation.

**Blocked by:** 01: Integrate authenticated dashboard shell

**Status:** ready-for-agent

## Acceptance criteria

- [x] Desktop sidebar collapse and mobile off-canvas behavior work at their appropriate viewport sizes.
- [x] Mobile navigation dismisses through Escape and the overlay without trapping users in a closed or unreachable state.
- [x] Navigation links and sidebar controls are keyboard accessible and expose meaningful accessible names.
- [x] Focus states are visible, and semantic navigation landmarks are present.
- [x] Existing admin navigation remains preserved and reachable.
- [x] Light and dark themes remain visually coherent across the sidebar, header, overlay, and content.
- [x] Desktop, tablet, and mobile layouts remain usable without horizontal overflow.
