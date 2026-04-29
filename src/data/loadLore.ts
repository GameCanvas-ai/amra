import loreJson from "../../assets/lore.json";
import type { Entry, HomeSpread, Lore, Tome } from "../types/lore";

const lore = loreJson as unknown as Lore;

export function getLore(): Lore {
  return lore;
}

export function getHomeSpreads(): HomeSpread[] {
  return lore.homeSpreads;
}

export function getTomes(): Tome[] {
  return lore.tomes;
}

export function getTome(id: string): Tome | undefined {
  return lore.tomes.find((t) => t.id === id);
}

export function getRegions(): Tome[] {
  return lore.tomes.filter((t) => t.kind === "region");
}

export function getEntry(tomeId: string, entryId: string): Entry | undefined {
  const tome = getTome(tomeId);
  if (!tome) return undefined;
  if (tome.overview.id === entryId) return tome.overview;
  return tome.subEntries.find((e) => e.id === entryId);
}
