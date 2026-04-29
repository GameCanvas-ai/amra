import { useWindowDimensions } from "react-native";
import { breakpoints } from "../theme/tokens";

export type Breakpoint = "phone" | "tablet" | "web";

export function useResponsive(): {
  bp: Breakpoint;
  width: number;
  height: number;
  isPhone: boolean;
  isTablet: boolean;
  isWeb: boolean;
} {
  const { width, height } = useWindowDimensions();
  let bp: Breakpoint = "phone";
  if (width >= breakpoints.web) bp = "web";
  else if (width >= breakpoints.tablet) bp = "tablet";
  return {
    bp,
    width,
    height,
    isPhone: bp === "phone",
    isTablet: bp === "tablet",
    isWeb: bp === "web",
  };
}
