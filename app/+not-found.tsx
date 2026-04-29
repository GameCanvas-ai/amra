import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { palette, space, type } from "../src/theme/tokens";

export default function NotFound() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Lost in the wilds</Text>
      <Text style={styles.body}>This page does not exist in the tome.</Text>
      <Link href="/" style={styles.link}>
        Return home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: space.xl,
  },
  title: { ...type.title, color: palette.textPrimary, marginBottom: space.md },
  body: { ...type.body, color: palette.textSecondary, marginBottom: space.xl, textAlign: "center" },
  link: { ...type.caption, color: palette.dener },
});
