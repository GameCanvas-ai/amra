import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useResponsive } from "../../hooks/useResponsive";
import { palette } from "../../theme/tokens";
import type { HomeSpread as HomeSpreadData } from "../../types/lore";
import { HeroSpread } from "./HeroSpread";
import { PageIndicator } from "./PageIndicator";

type Props = {
  spreads: HomeSpreadData[];
};

export function HomeTome({ spreads }: Props) {
  const router = useRouter();
  const { height } = useResponsive();
  const pageHeight = height;
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const handleOpen = useCallback(
    (spread: HomeSpreadData) => {
      if (spread.routeGazetteer) {
        router.push("/gazetteer");
      } else if (spread.routeTomeId) {
        router.push({ pathname: "/[tomeId]", params: { tomeId: spread.routeTomeId } });
      }
    },
    [router],
  );

  const totalHeight = useMemo(() => pageHeight * spreads.length, [pageHeight, spreads.length]);

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ height: totalHeight }}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={pageHeight}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {spreads.map((spread, i) => (
          <HeroSpread
            key={spread.id}
            spread={spread}
            index={i}
            total={spreads.length}
            scrollY={scrollY}
            pageHeight={pageHeight}
            onOpen={() => handleOpen(spread)}
          />
        ))}
      </Animated.ScrollView>

      <PageIndicator total={spreads.length} pageHeight={pageHeight} scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  scroll: {
    flex: 1,
  },
});
