# Amra

A motion-rich, offline reader for the worldbuilding of Amra — the continent setting of the Eridia campaign world. Single-codebase Expo app for iOS, Android, web, and tablet.

The app surfaces 7 thematic chapters (Introduction, History, Races, Magic, Religions, Cosmology, Factions) and 17 regional gazetteer entries — totaling ~52,000 words and 277 sub-entries — through a "Modern Reader" interface optimized for long-form reading: charcoal background, Inter sans body, scroll-linked hero parallax, scroll-spy section nav.

No backend, no authentication, no telemetry. Content is bundled at build time.

## Getting started

### Prerequisites

- Node 20+
- For native development: Xcode (iOS) and/or Android Studio (Android)

### Install and run

```bash
npm install
npm start          # Expo dev server, default
npm run web        # web only
npm run ios        # iOS simulator
npm run android    # Android emulator
```

The lore JSON is regenerated automatically before `npm start`. To regenerate manually: `npm run lore:build`.

### Type checking

```bash
npm run typecheck
```

### Web export

```bash
npm run build:web
```

Produces a static bundle in `dist/`.

## Content format

Lore lives in `lore/` as a custom flat-file dialect — line-prefixed `key: value` records separated by `---` lines. Each file is one chapter or one region; the first record is the overview, subsequent records are sub-entries (houses, cities, sub-events).

```
title: Aregor
subTitle: Realm of Noble Houses
pullQuote1Top: Marble halls
pullQuote1Bottom: and hidden daggers
callout1: House D'Arvano has ruled Aregor for centuries...
callout2: Beneath the region's prosperity and cultural brilliance lies a web of political intrigue...
historyInfo1: Aregor's roots stretch back to a time when nomadic tribes...
historyInfo2: Today, Aregor remains a shining jewel of commerce and culture...
constructionInfo1: Aregor is ruled by House D'Arvano from the capital Monero...
constructionInfo2: Key figures include King Aldéric D'Arvano...
locationInfo1: Monero, the capital of Aregor with 50,000 inhabitants...
locationInfo2: Aregor's notable places reflect its diverse nature...

---

title: House D'Arvano
historyInfo1: House D'Arvano stands as the founding dynasty of Aregor...
historyInfo2: Yet the D'Arvanos' very success has sown seeds of doubt...

---

title: House Valoria
...
```

`scripts/lore-build.ts` parses these into a typed `assets/lore.json` (gitignored, regenerated on every `npm start`). Field types live in `src/types/lore.ts`.

To add a new region, drop a `<name>.md` into `lore/8_gazetteer/` and rebuild — it appears automatically in the gazetteer grid.

## Architecture at a glance

- **Expo Router (file-based)** in `app/`: `index.tsx` is the home Tome (8-spread vertical pager), `gazetteer.tsx` is the region grid, `[tomeId]/index.tsx` is the chapter/region detail, `[tomeId]/[entryId].tsx` is the sub-entry detail.
- **Build-time data pipeline**: the app never parses markdown at runtime. `scripts/lore-build.ts` runs as a `prestart` step.
- **Theme tokens** in `src/theme/`: palette (charcoal `#0e0f12`, silver Dener `#b8c4dc`, crimson Iothas `#d87070`), Inter + JetBrains Mono, type scale, spacing, motion easings.
- **Motion**: `react-native-reanimated` v4 + `react-native-worklets`. All animation honors `AccessibilityInfo.isReduceMotionEnabled` via `useReducedMotion`.
- **Responsive**: phone is the default; tablet and web (>= 768px) get a `maxWidth: 760` content cap so prose stays at ~75 characters per line.
- **TypeScript strict**, plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.

## Project layout

```
amra-app/
├─ app/                       Expo Router routes
│  ├─ index.tsx               Home Tome
│  ├─ gazetteer.tsx           Region grid
│  └─ [tomeId]/
│     ├─ index.tsx            Chapter / region overview
│     └─ [entryId].tsx        Sub-entry
├─ src/
│  ├─ components/
│  │  ├─ home/                HeroSpread, HomeTome, PageIndicator
│  │  ├─ detail/              DetailScroll, DetailHero, Callouts, IndexStrip, …
│  │  └─ primitives/          ScreenFrame, Hairline
│  ├─ data/loadLore.ts        Typed accessors over assets/lore.json
│  ├─ hooks/                  useReducedMotion, useResponsive
│  ├─ theme/                  tokens, fonts, motion
│  └─ types/lore.ts           Lore schema (shared with the build script)
├─ scripts/lore-build.ts      Markdown → JSON transformer
├─ lore/                      Source content (chapters 1–7 + gazetteer/)
└─ assets/                    Icons, splash, generated lore.json (gitignored)
```

## Status

`v0.1.0` — initial release. The data schema includes an unused `heroImage?` slot per entry; renderers will pick up illustrations dropped into `assets/heroes/<tomeId>.{webp,jpg}` when added.

## Acknowledgments

Motion vocabulary inspired by the [Wonderous app](https://github.com/gskinnerTeam/flutter-wonderous-app) by gskinner — parallax, scroll-linked reveals, hero swipe.
