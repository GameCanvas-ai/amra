import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { palette, space, type } from "../../theme/tokens";

export type Section = { id: string; label: string; offsetY: number };

type Props = {
  sections: Section[];
  scrollY: SharedValue<number>;
  onTap: (offsetY: number) => void;
};

export function SectionNav({ sections, scrollY, onTap }: Props) {
  if (sections.length === 0) return null;
  return (
    <View style={[styles.rail, { pointerEvents: "box-none" }]}>
      {sections.map((section, i) => (
        <SectionDot
          key={section.id}
          index={i}
          section={section}
          sections={sections}
          scrollY={scrollY}
          onPress={() => onTap(section.offsetY)}
        />
      ))}
    </View>
  );
}

function SectionDot({
  index,
  section,
  sections,
  scrollY,
  onPress,
}: {
  index: number;
  section: Section;
  sections: Section[];
  scrollY: SharedValue<number>;
  onPress: () => void;
}) {
  const activeIndex = useDerivedValue(() => {
    const y = scrollY.value;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec && y + 120 >= sec.offsetY) idx = i;
    }
    return idx;
  });

  const dotStyle = useAnimatedStyle(() => {
    const isActive = Math.abs(activeIndex.value - index) < 0.5;
    const w = interpolate(isActive ? 1 : 0, [0, 1], [4, 16], Extrapolation.CLAMP);
    return {
      width: w,
      opacity: isActive ? 1 : 0.35,
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const isActive = Math.abs(activeIndex.value - index) < 0.5;
    return {
      opacity: isActive ? 1 : 0,
    };
  });

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Jump to ${section.label}`}>
      <View style={styles.row}>
        <Animated.Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {section.label}
        </Animated.Text>
        <Animated.View style={[styles.dot, dotStyle]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rail: {
    position: "absolute",
    right: space.md,
    top: "32%",
    bottom: "32%",
    width: 140,
    alignItems: "flex-end",
    justifyContent: "center",
    gap: space.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    height: 16,
  },
  label: {
    ...type.label,
    color: palette.textSecondary,
  },
  dot: {
    height: 2,
    backgroundColor: palette.dener,
    borderRadius: 1,
  },
});
