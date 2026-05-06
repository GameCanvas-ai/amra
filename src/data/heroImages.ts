import type { ImageSourcePropType } from "react-native";
import type { Focal } from "../components/primitives/FocalImage";

export type HeroImage = {
  source: ImageSourcePropType;
  focal?: Focal;
};

const heroImages: Record<string, HeroImage> = {
  introduction: { source: require("../../assets/heroes/introduction.webp") },
  "history-of-amra": { source: require("../../assets/heroes/history-of-amra.webp") },
  races: { source: require("../../assets/heroes/races.webp") },
  magic: { source: require("../../assets/heroes/magic.webp") },
  religions: { source: require("../../assets/heroes/religions.webp") },
  cosmology: { source: require("../../assets/heroes/cosmology.webp") },
  factions: { source: require("../../assets/heroes/factions.webp") },

  alkebu: { source: require("../../assets/heroes/alkebu.webp") },
  aregor: { source: require("../../assets/heroes/aregor.webp") },
  banlaya: {
    source: require("../../assets/heroes/banlaya.webp"),
    focal: { x: 0.6, y: 0.5 },
  },
  castell: { source: require("../../assets/heroes/castell.webp") },
  "dead-islands": { source: require("../../assets/heroes/dead-islands.webp") },
  "dhon-kopjar": { source: require("../../assets/heroes/dhon-kopjar.webp") },
  "dhon-mendor": { source: require("../../assets/heroes/dhon-mendor.webp") },
  "dhon-toruhm": { source: require("../../assets/heroes/dhon-toruhm.webp") },
  "dhon-vondaral": { source: require("../../assets/heroes/dhon-vondaral.webp") },
  kievan: { source: require("../../assets/heroes/kievan.webp") },
  manajur: {
    source: require("../../assets/heroes/manajur.webp"),
    focal: { x: 0.7, y: 0.55 },
  },
  skapta: { source: require("../../assets/heroes/skapta.webp") },
  "tel-areth": { source: require("../../assets/heroes/tel-areth.webp") },
  "tel-donor": { source: require("../../assets/heroes/tel-donor.webp") },
  "tel-dovan": { source: require("../../assets/heroes/tel-dovan.webp") },
  tianzhu: { source: require("../../assets/heroes/tianzhu.webp") },
  yamato: { source: require("../../assets/heroes/yamato.webp") },

  gazetteer: { source: require("../../assets/heroes/gazetteer.webp") },
};

export function getHeroImage(tomeId: string | undefined): HeroImage | undefined {
  if (!tomeId) return undefined;
  return heroImages[tomeId];
}
