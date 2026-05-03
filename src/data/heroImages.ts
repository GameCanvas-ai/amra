import type { ImageSourcePropType } from "react-native";

const heroImages: Record<string, ImageSourcePropType> = {
  introduction: require("../../assets/heroes/introduction.png"),
  "history-of-amra": require("../../assets/heroes/history-of-amra.png"),
  races: require("../../assets/heroes/races.png"),
  magic: require("../../assets/heroes/magic.png"),
  religions: require("../../assets/heroes/religions.png"),
  cosmology: require("../../assets/heroes/cosmology.png"),
  factions: require("../../assets/heroes/factions.png"),

  alkebu: require("../../assets/heroes/alkebu.png"),
  aregor: require("../../assets/heroes/aregor.png"),
  banlaya: require("../../assets/heroes/banlaya.png"),
  castell: require("../../assets/heroes/castell.png"),
  "dead-islands": require("../../assets/heroes/dead-islands.png"),
  "dhon-kopjar": require("../../assets/heroes/dhon-kopjar.png"),
  "dhon-mendor": require("../../assets/heroes/dhon-mendor.png"),
  "dhon-toruhm": require("../../assets/heroes/dhon-toruhm.png"),
  "dhon-vondaral": require("../../assets/heroes/dhon-vondaral.png"),
  kievan: require("../../assets/heroes/kievan.png"),
  manajur: require("../../assets/heroes/manajur.png"),
  skapta: require("../../assets/heroes/skapta.png"),
  "tel-areth": require("../../assets/heroes/tel-areth.png"),
  "tel-donor": require("../../assets/heroes/tel-donor.png"),
  "tel-dovan": require("../../assets/heroes/tel-dovan.png"),
  tianzhu: require("../../assets/heroes/tianzhu.png"),
  yamato: require("../../assets/heroes/yamato.png"),

  gazetteer: require("../../assets/heroes/gazetteer.png"),
};

export function getHeroImage(tomeId: string | undefined): ImageSourcePropType | undefined {
  if (!tomeId) return undefined;
  return heroImages[tomeId];
}
