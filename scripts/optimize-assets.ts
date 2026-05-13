/**
 * Asset optimization pass for the next build.
 *
 * Re-encodes hero webp images (preserving 1600×900 dimensions for iPad Pro
 * full-bleed sharpness) and the app icon, shelling out to the already-
 * installed cwebp and ImageMagick. Re-encodes from the codex source where
 * available (one-step quality conversion) and falls back to in-place
 * re-encoding for curated app-only assets.
 *
 * Usage:
 *   tsx scripts/optimize-assets.ts                 # write
 *   tsx scripts/optimize-assets.ts --dry-run       # report-only
 *   tsx scripts/optimize-assets.ts --quality=82    # custom q
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, basename, dirname, relative } from "node:path";
import { execFileSync } from "node:child_process";

const APP_ROOT = join(__dirname, "..");
const CODEX_ART_DIR = "/Users/eridia/Projects/amra-world/public/art/codex";
const HEROES_DIR = join(APP_ROOT, "assets", "heroes");
const IMAGES_DIR = join(APP_ROOT, "assets", "images");

type Args = { dryRun: boolean; quality: number };

function parseArgs(argv: string[]): Args {
  const out: Args = { dryRun: false, quality: 78 };
  for (const a of argv) {
    if (a === "--dry-run") out.dryRun = true;
    else if (a.startsWith("--quality=")) {
      const v = Number(a.slice("--quality=".length));
      if (!Number.isFinite(v) || v < 1 || v > 100) throw new Error(`invalid --quality: ${a}`);
      out.quality = v;
    }
  }
  return out;
}

function size(file: string): number {
  return existsSync(file) ? statSync(file).size : 0;
}

function fmtKb(bytes: number): string {
  return (bytes / 1024).toFixed(0).padStart(4) + " KB";
}

function fmtMb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function walkWebp(root: string): string[] {
  const out: string[] = [];
  if (!existsSync(root)) return out;
  const stack: string[] = [root];
  while (stack.length > 0) {
    const dir = stack.pop()!;
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      const st = statSync(abs);
      if (st.isDirectory()) stack.push(abs);
      else if (st.isFile() && abs.endsWith(".webp")) out.push(abs);
    }
  }
  return out;
}

function encodeWebp(input: string, output: string, quality: number, dryRun: boolean): void {
  if (dryRun) return;
  execFileSync(
    "cwebp",
    ["-q", String(quality), "-mt", "-m", "6", "-af", "-metadata", "none", "-quiet", input, "-o", output],
    { stdio: "inherit" },
  );
}

function encodePng(input: string, output: string, dryRun: boolean): void {
  if (dryRun) return;
  execFileSync(
    "magick",
    [
      input,
      "-resize",
      "1024x1024^",
      "-strip",
      "-define",
      "png:compression-level=9",
      output,
    ],
    { stdio: "inherit" },
  );
}

type Stat = { before: number; after: number };

function totalsLine(label: string, s: Stat): string {
  const delta = s.before - s.after;
  const pct = s.before === 0 ? 0 : ((delta / s.before) * 100).toFixed(1);
  return `${label.padEnd(28)} ${fmtMb(s.before)} → ${fmtMb(s.after).padStart(7)}   −${fmtMb(delta)} (${pct}%)`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`optimize-assets${args.dryRun ? " (dry-run)" : ""}  q=${args.quality}`);
  console.log("");

  // ---- Hero webps ----
  const heroFiles = walkWebp(HEROES_DIR);
  const heroStat: Stat = { before: 0, after: 0 };
  console.log(`scanning ${heroFiles.length} hero webp files…`);

  // Build a quick index of available codex source files
  const codexSources = new Set<string>(
    existsSync(CODEX_ART_DIR)
      ? readdirSync(CODEX_ART_DIR).filter((n) => n.endsWith(".webp"))
      : [],
  );

  const heroDetails: Array<{ rel: string; before: number; after: number; source: "codex" | "in-place" }> = [];
  for (const file of heroFiles) {
    const baseName = basename(file); // e.g. "aregor.webp"
    const before = size(file);
    heroStat.before += before;

    // Prefer re-encoding from codex source (one-step conversion).
    const codexPath = codexSources.has(baseName) ? join(CODEX_ART_DIR, baseName) : null;
    const inputForEncode = codexPath ?? file;
    encodeWebp(inputForEncode, file, args.quality, args.dryRun);
    const after = args.dryRun
      ? estimateWebpSize(inputForEncode, args.quality)
      : size(file);
    heroStat.after += after;
    heroDetails.push({
      rel: relative(APP_ROOT, file),
      before,
      after,
      source: codexPath ? "codex" : "in-place",
    });
  }

  // ---- icon.png ----
  const iconPath = join(IMAGES_DIR, "icon.png");
  const iconStat: Stat = { before: size(iconPath), after: 0 };
  if (existsSync(iconPath)) {
    encodePng(iconPath, iconPath, args.dryRun);
    iconStat.after = args.dryRun ? Math.round(iconStat.before * 0.3) : size(iconPath);
  }

  // ---- welcome.webp ----
  const welcomePath = join(IMAGES_DIR, "welcome.webp");
  const welcomeStat: Stat = { before: size(welcomePath), after: 0 };
  if (existsSync(welcomePath)) {
    encodeWebp(welcomePath, welcomePath, args.quality, args.dryRun);
    welcomeStat.after = args.dryRun ? Math.round(welcomeStat.before * 0.7) : size(welcomePath);
  }

  // ---- report ----
  console.log("");
  console.log("=== top 10 heroes by reduction ===");
  const sorted = [...heroDetails].sort((a, b) => b.before - b.after - (a.before - a.after));
  for (const h of sorted.slice(0, 10)) {
    const delta = h.before - h.after;
    const pct = h.before === 0 ? 0 : Math.round((delta / h.before) * 100);
    console.log(`  ${fmtKb(h.before)} → ${fmtKb(h.after)}  −${pct}%  ${h.source.padEnd(8)}  ${h.rel}`);
  }

  console.log("");
  console.log("=== summary ===");
  console.log(totalsLine("heroes (" + heroFiles.length + " webp)", heroStat));
  console.log(totalsLine("icon.png", iconStat));
  console.log(totalsLine("welcome.webp", welcomeStat));
  const totalBefore = heroStat.before + iconStat.before + welcomeStat.before;
  const totalAfter = heroStat.after + iconStat.after + welcomeStat.after;
  console.log(totalsLine("TOTAL", { before: totalBefore, after: totalAfter }));
}

// Rough estimate for --dry-run when we can't actually encode and measure.
// Assumes ~32% reduction from codex source at q78, ~25% from in-place re-encode.
function estimateWebpSize(input: string, _quality: number): number {
  const before = size(input);
  return Math.round(before * 0.68);
}

main();
