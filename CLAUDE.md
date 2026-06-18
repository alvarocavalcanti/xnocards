# CLAUDE.md — xnocards

Per-project guidance for AI coding agents working in this directory.

## What this extension does

An anonymous TTRPG safety tool for Owlbear Rodeo. Any participant clicks an X, N, or O card;
the card is broadcast via `OBR.broadcast` to all connected participants and shown as a
full-screen overlay. No sender identity is ever stored or transmitted.

## Architecture

- **Entry mode detection**: `src/main.tsx` checks `?obrref` in the URL.
  - With `?obrref` → plugin mode (`PluginGate → App → SPA`)
  - Without → `Homepage`
- **Broadcast channel**: `com.alvarocavalcanti.xnocards/card`
  - Payload is a single string: `"X"`, `"N"`, or `"O"`
  - Sent with `destination: "ALL"` so the sender also sees the overlay
- **Overlay**: Managed as state in `SPA.tsx`. Card appears, auto-dismisses after 8 s.
  Each participant dismisses their own overlay independently.
- **No routing library**: single-view, no react-router-dom.
- **No role differentiation**: X/N/O cards are available to all participants equally.

## Key files

| File | Purpose |
|------|---------|
| `src/components/CardPanel.tsx` | Popover UI — three SVG card buttons + send logic + CardSVG renderer |
| `src/components/CardOverlay.tsx` | Full-screen overlay with animations and auto-dismiss |
| `src/components/SPA.tsx` | Broadcast listener, overlay state management |
| `src/hooks/useTheme.ts` | Syncs OBR theme to Tailwind `dark` class |
| `src/utils.ts` | Analytics wrapper (no-op in dev) |
| `public/manifest.json` | OBR extension manifest — version must stay in sync with `package.json` |

## Styling

- Tailwind v4 via `@tailwindcss/postcss`
- Custom animations in `src/index.css`:
  - `card-hover-glow-*` for panel card buttons
  - `overlay-card-in / overlay-card-out` for overlay entrance/exit
  - `progress-drain` for the auto-dismiss progress bar
  - `float-*` for homepage hero animation

## Versioning

Date-based: `YYYY-MM-DD`. Update in both `public/manifest.json` and `package.json`,
then run `npm install` to regenerate `package-lock.json`.

## Development commands

```bash
npm install          # install deps
npm run dev          # dev server (hot reload)
npm run build        # tsc + vite build
tsc --noEmit         # type-check only
```

Always run `tsc --noEmit` or `npm run build` after TypeScript changes before committing.
