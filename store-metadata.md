# App Store Connect — Amra submission metadata

Copy each field below into App Store Connect. Character counts shown next to each
limited field are exact. Apple deduplicates words across Name / Subtitle / Keywords —
each unique word is indexed once, so we put the brand in the name, the value-prop in
the subtitle, and high-volume tabletop terms in the keywords field.

---

## App Name (30 char limit)
```
Amra — World Compendium
```
*23 chars. Owns the brand "Amra" and indexes "World" + "Compendium".*

## Subtitle (30 char limit)
```
Fantasy lore, maps & gazetteer
```
*30 chars exactly. Adds "Fantasy", "lore", "maps", "gazetteer" to the index.*

## Promotional Text (170 char limit, updatable any time without resubmission)
```
Step into Amra — a fully realized fantasy world of marble courts, highland clans, and the long memory of fire. Seven chapters. Seventeen realms. One compendium.
```
*160 chars. Borrows the lede directly from your welcome screen for tonal consistency.*

## Keywords (100 char limit, comma-separated, no leading spaces)
```
dnd,d&d,dungeon,master,dm,gm,rpg,ttrpg,tabletop,campaign,setting,worldbuilding,atlas,sorcery,medieval
```
*98 chars. Picks the highest-volume tabletop terms; avoids duplicating words already
in the name/subtitle. "dnd" and "d&d" are both indexed (Apple treats them as
distinct tokens). "homebrew" / "wizard" / "dragon" are higher-volume but
misleading or oversaturated for a niche static reader; "sorcery" + "medieval"
target intent better.*

## Description (4000 char limit; below is ~900 chars — readable, scannable)
```
Amra is a fantasy world compendium for readers, dungeon masters, and worldbuilders.

Seven illustrated chapters and seventeen mapped realms — from the marble courts of Aregor to the highland clans of Skapta and the long memory of Tel'Donor. Every region, faction, and ancient power is laid out in a clean, motion-rich reader designed for late-night reference and long-form exploration.

WHAT'S INSIDE
• 7 chapters: Introduction, History, Races, Magic, Religions, Cosmology, Factions
• Gazetteer of 17 regions, each with construction, location, and historical notes
• 300+ sub-entries — cities, houses, events, ruins, gods, factions
• Cross-linked navigation between chapters and regions
• Pull-quotes, callouts, and hairline-typeset prose for serious reading

DESIGN
• Built for phone and iPad — body text caps at ~75 characters per line for readability
• Dark theme, no flashing motion, respects iOS Reduce Motion
• Fully offline — no account, no tracking, no ads

For tabletop GMs running campaigns in Amra, players who want to know the world before session zero, and worldbuilders looking for a reference example of a fully developed setting.
```

## Category
- **Primary:** Reference
- **Secondary:** Books

*"Reference" is the strongest fit for a static lore compendium and the least
crowded category vs. "Entertainment" or "Games".*

## Age Rating Questionnaire
Walk through the questionnaire with these answers (target rating: **12+**):

| Question | Answer |
|---|---|
| Cartoon or Fantasy Violence | Infrequent/Mild *(historical battles, mythological references)* |
| Realistic Violence | None |
| Sexual Content / Nudity | None |
| Profanity / Crude Humor | None |
| Alcohol, Tobacco, Drug Use or References | None |
| Mature / Suggestive Themes | Infrequent/Mild *(religion, mortality)* |
| Horror / Fear Themes | None or Infrequent/Mild |
| Gambling | None |
| Medical/Treatment Information | None |
| Unrestricted Web Access | No |
| User-Generated Content | No |

## Copyright
```
© 2026 Carlos Donderis
```

## Privacy — App Privacy section
This is the simplest path through and the most defensible at review:

- **Does your app collect data?** → **No**
  *(The app bundles all content statically via `assets/lore.json`. No analytics SDK, no network calls at runtime, no user accounts.)*
- All Data Type checkboxes → leave **unchecked**.

## Privacy Policy URL (required)
You need to host a one-page policy. The minimum viable text:

```
Amra Privacy Policy

Effective: [today's date]

Amra is a fantasy reference app that collects no personal information.

The app does not require an account, does not transmit data to any server,
does not use third-party analytics, and does not display advertising. All
content is bundled with the app at install time and read locally on your
device.

We do not collect, store, share, or sell any data — personal, technical, or
otherwise. The app does not use cookies, identifiers, or tracking technologies.

If this policy ever changes, we will update this page and the effective date
above before the change takes effect.

Contact: [your email]
```

Host options (any is fine):
- GitHub Pages: push the markdown to a `gh-pages` branch of any repo, URL becomes `https://<user>.github.io/<repo>/privacy`.
- Notion: publish a page to the web, copy the share URL.
- A single static page on any domain you own.

## Support URL (required)
Easiest: the same GitHub Pages site, with a separate `/support` page or a
mailto link. Apple accepts a mailto if it's wrapped in a hosted page.

## Marketing URL (optional)
Skip for v1.0 unless you have a landing page.

## App Review Information — Reviewer Notes (free-form text)
Paste this verbatim — explicitly answers the questions reviewers usually ask
and short-circuits common rejection reasons:

```
Amra is a static fantasy reference reader. Notes for the reviewer:

• No login or account creation. All features are accessible immediately on launch.
• No in-app purchases, no advertising, no subscriptions.
• No network requests at runtime. All content (~400 KB of lore data and bundled
  artwork) ships with the app and is read locally.
• No third-party SDKs or analytics. No data collection.
• Content is original, authored by the developer. All artwork is licensed for
  this use.
• Tested on iPhone (portrait) and iPad (portrait + landscape).
• No special hardware required.
• Demo credentials: not applicable — no login flow exists.

Suggested test path:
  1. Launch app → tap "Begin Reading →" on the welcome screen.
  2. Vertically swipe through the 8 hero spreads.
  3. Tap any spread to open a chapter; scroll to read prose, callouts, and
     pull-quotes.
  4. Open the Gazetteer (8th spread) → tap any region tile to view its detail.
  5. Use the hamburger button (top-left) to switch tabs (Home / Lore / Settings).
```

## App Review Information — Contact
- First / last name: Carlos Donderis
- Phone number: [yours]
- Email: [yours]

## What's New (1.0 release notes — optional for first submission)
```
Welcome to Amra. Seven chapters and seventeen realms — your first edition of
the world compendium. Read offline, anywhere.
```

---

## Required screenshots
Apple requires screenshots for these device classes (your `app.json` has
`supportsTablet: true`, so iPad shots are mandatory):

| Class | Resolution | Capture from |
|---|---|---|
| 6.9" iPhone | 1320 × 2868 | iPhone 17 Pro Max simulator, ⌘+S |
| 6.1" iPhone | 1206 × 2622 | iPhone 17 / 16 simulator |
| 13" iPad Pro | 2064 × 2752 | iPad Pro (M4) 13-inch simulator |

Suggested 5-shot sequence (works for all device classes):
1. Welcome screen ("Welcome to Amra / Begin Reading →")
2. Hero spread (e.g. Cosmology or Factions — visually striking)
3. Chapter detail showing facts + history + pull-quote
4. Gazetteer region grid
5. Region detail (e.g. Banlaya or Manajur)

Capture each in the simulator with `Device → Trigger Screenshot` (⌘+S). Files
land on your Desktop.

---

## Submission order checklist
1. Create the app record in App Store Connect (bundle ID `app.amra.lore`).
2. Fill in name, subtitle, promotional text, description, keywords, category,
   age rating, copyright (this file).
3. Add privacy policy URL + support URL.
4. Capture and upload screenshots.
5. Run `eas build --profile production --platform ios`.
6. Run `eas submit --platform ios --latest` (after stubbing your Apple ID + ascAppId in `eas.json`).
7. Wait for the build to finish processing (~15–30 min in App Store Connect).
8. Attach the build to the version, complete the App Privacy section.
9. Click **Submit for Review**.
