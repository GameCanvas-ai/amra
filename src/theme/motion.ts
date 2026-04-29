import { Easing } from "react-native-reanimated";

export const easing = {
  standard: Easing.bezier(0.32, 0.72, 0, 1),
  emphasized: Easing.bezier(0.2, 0, 0, 1),
  decelerate: Easing.bezier(0, 0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0, 1, 1),
} as const;

export const duration = {
  xfast: 140,
  fast: 220,
  standard: 380,
  slow: 600,
  splash: 900,
} as const;

export type EasingKey = keyof typeof easing;
export type DurationKey = keyof typeof duration;
