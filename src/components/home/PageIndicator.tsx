import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { palette, space } from "../../theme/tokens";

type Props = {
  total: number;
  pageHeight: number;
  scrollY: SharedValue<number>;
};

export function PageIndicator({ total, pageHeight, scrollY }: Props) {
  return (
    <View style={[styles.rail, { pointerEvents: "none" }]}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} pageHeight={pageHeight} scrollY={scrollY} />
      ))}
    </View>
  );
}

function Dot({
  index,
  pageHeight,
  scrollY,
}: {
  index: number;
  pageHeight: number;
  scrollY: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const range = [(index - 1) * pageHeight, index * pageHeight, (index + 1) * pageHeight];
    const opacity = interpolate(scrollY.value, range, [0.25, 1, 0.25], Extrapolation.CLAMP);
    const height = interpolate(scrollY.value, range, [4, 18, 4], Extrapolation.CLAMP);
    return { opacity, height };
  });
  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  rail: {
    position: "absolute",
    right: space.md,
    top: "30%",
    bottom: "30%",
    width: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: space.xs,
  },
  dot: {
    width: 2,
    backgroundColor: palette.dener,
    borderRadius: 1,
  },
});
