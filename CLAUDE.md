# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Build the lore JSON (read by the app) | `npm run lore:build` |
| Start dev server (auto-runs lore:build first) | `npm start` |
| Run on iOS / Android / web | `npm run ios` / `npm run android` / `npm run web` |
| Typecheck (strict) | `npm run typecheck` |
| Static web export | `npm run build:web` |

`npm` is the package manager — `pnpm` is **not** installed on this machine.

There is no test suite, lint script, or CI yet.

## Architecture

This is an Expo SDK 54 single-codebase app (React 19, RN 0.81, Expo Router 6) that surfaces the Amra worldbuilding under `lore/` as a motion-rich reader. Targets iOS, Android, web, and tablet from one source.

### Data pipeline (build-time)

The `.md` files in `lore/` are **not standard markdown** — they use a custom dialect: line-prefixed `key: value` records separated by lines containing only `---`. Keys include `title`, `subTitle`, `pullQuote1Top/Bottom`, `callout1/2`, `historyInfo1/2`, plus `constructionInfo1/2` and `locationInfo1/2` for gazetteer regions. Each file's first record is the overview; subsequent records are sub-entries (houses, cities, sub-events).

`scripts/lore-build.ts` is a pre-build step (wired as `prestart`) that parses every `lore/**/*.md` and emits `assets/lore.json`. The app **never parses markdown at runtime** — it imports the static JSON via `src/data/loadLore.ts`. Types live in `src/types/lore.ts` and are shared by the build script and the app.

Output is gitignored (`assets/lore.json`). If you change the parser or add new lore keys, also update `src/types/lore.ts` and the consumers in `src/components/`.

### Routing

Expo Router file-based, in `app/`:

- `index.tsx` — the **Tome** home: a vertical pager of 8 hero spreads (7 chapters + a synthesized "Gazetteer" spread). Tapping a spread routes to `/[tomeId]` for chapters or `/gazetteer` for the atlas.
- `gazetteer.tsx` — region grid (17 regions). Each tile routes to `/[tomeId]`.
- `[tomeId]/index.tsx` — chapter or region detail. Uses `DetailScroll`, which renders Facts → History → Power (gazetteer) → Places (gazetteer) → Pull-Quote Splash → IndexStrip of sub-entries. A scroll-spy `SectionNav` rail floats on the right.
- `[tomeId]/[entryId].tsx` — sub-entry detail (uses `SubEntryView`, simpler than `DetailScroll`).
- `_layout.tsx` — root: loads Inter + JetBrains Mono via `expo-font`, controls the splash screen, sets dark `userInterfaceStyle`, defines transitions.

A "tome" in code = one chapter (`kind: "chapter"`, order 1–7) or one region (`kind: "region"`, order 8). The `homeSpreads` array in `lore.json` is what the home pager renders; the eighth spread has `routeGazetteer: true` instead of a `routeTomeId`.

### Theme

The theme is **Modern Reader**: charcoal `#0e0f12` background, Inter sans body at 16–17pt with line-height 26–28, JetBrains Mono labels, silver Dener (`#b8c4dc`) and crimson Iothas (`#d87070`) as the only accent colors. There is no serif font, no decorative ornaments (no twin-moon glyphs, no rune dividers), and no star field. An earlier "Refined Celestial" theme was rejected for poor body legibility — do not reintroduce serif body, decorative animation behind prose, or the Skia star field unless explicitly asked.

All design tokens live in `src/theme/tokens.ts` (palette, type scale, spacing, breakpoints). Fonts are loaded by `useAppFonts()` in `src/theme/fonts.ts`. Motion easings/durations are in `src/theme/motion.ts`. The only divider primitive is `src/components/primitives/Hairline.tsx`.

### Responsive layout

Phone (`< 768`) is the default. On tablet/web, body content is wrapped in a `width: '100%', maxWidth: 760` container so prose stays at ~75 chars per line. This cap is applied per-screen in `DetailScroll`, `SubEntryView`, and `gazetteer.tsx` (look for the `measure` style). The hero/back-button can extend full-width — only the readable body is clamped.

### Motion & accessibility

All motion uses `react-native-reanimated` (v4 + `react-native-worklets`). The `useReducedMotion` hook in `src/hooks/useReducedMotion.ts` reads `AccessibilityInfo` and is consumed by every animated component (callout stagger, hairline reveal, hero parallax) — when true, animations short-circuit to their final state. Respect this when adding new motion.

### Skia is intentionally absent

`@shopify/react-native-skia` was dropped along with the celestial theme. If you need to re-add it for a future feature, be aware that on web it requires `LoadSkiaWeb` to fetch CanvasKit WASM, **and** Skia's web module evaluates at import time with `global.CanvasKit` undefined — leading to `Cannot read properties of undefined (reading 'PictureRecorder')` runtime crashes if a Skia-using component is imported before init completes. The fix is the Metro platform-extension pattern: `Foo.tsx` (Skia, native) and `Foo.web.tsx` (View/SVG fallback) so Skia never bundles on web. See `memory/skia_web_split.md` (in the user's project memory) for the historical detail.

## Conventions

- TypeScript strict, plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. When passing optional props from search params, use the `{...(value !== undefined ? { key: value } : {})}` spread pattern (see `app/[tomeId]/index.tsx`).
- Path aliases: `@/*` maps to project root, `@app/*` maps to `src/`.
- Use `style.pointerEvents` (not the `pointerEvents` prop) — react-native-web deprecated the prop.
- New native-only deps must follow the platform-extension pattern (see Skia note above) so the web build stays clean.
- Conventional Commits (`feat:`, `fix:`, `refactor:`, etc.) per the user's global preference.
