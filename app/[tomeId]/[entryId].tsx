import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ScreenFrame } from "../../src/components/primitives/ScreenFrame";
import { SubEntryView } from "../../src/components/detail/SubEntryView";
import { getTome } from "../../src/data/loadLore";
import { palette, space, type } from "../../src/theme/tokens";

export default function EntryRoute() {
  const { tomeId, entryId } = useLocalSearchParams<{ tomeId: string; entryId: string }>();
  const tome = tomeId ? getTome(tomeId) : undefined;
  const idx = tome?.subEntries.findIndex((e) => e.id === entryId) ?? -1;
  const entry = tome && idx >= 0 ? tome.subEntries[idx] : undefined;

  if (!tome || !entry) {
    return (
      <ScreenFrame>
        <View style={styles.empty}>
          <Text style={styles.title}>Entry not found</Text>
          <Text style={styles.body}>
            {tomeId} / {entryId}
          </Text>
        </View>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame>
      <SubEntryView entry={entry} tome={tome} index={idx} />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl, gap: space.md },
  title: { ...type.hero, color: palette.textPrimary, textAlign: "center" },
  body: { ...type.body, color: palette.textMuted, textAlign: "center" },
});
