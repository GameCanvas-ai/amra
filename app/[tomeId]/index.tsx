import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ScreenFrame } from "../../src/components/primitives/ScreenFrame";
import { DetailScroll } from "../../src/components/detail/DetailScroll";
import { getTome } from "../../src/data/loadLore";
import { palette, space, type } from "../../src/theme/tokens";

export default function TomeOverviewRoute() {
  const { tomeId } = useLocalSearchParams<{ tomeId: string }>();
  const tome = tomeId ? getTome(tomeId) : undefined;

  if (!tome) {
    return (
      <ScreenFrame>
        <View style={styles.empty}>
          <Text style={styles.title}>Unknown tome</Text>
          <Text style={styles.body}>{tomeId}</Text>
        </View>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame>
      <DetailScroll tome={tome} />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl, gap: space.md },
  title: { ...type.hero, color: palette.textPrimary, textAlign: "center" },
  body: { ...type.body, color: palette.textMuted, textAlign: "center" },
});
