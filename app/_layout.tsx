import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useAppFonts } from "../src/theme/fonts";
import { palette } from "../src/theme/tokens";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* noop */
});

export default function RootLayout() {
  const ready = useAppFonts();

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {
        /* noop */
      });
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.bg }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.bg },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="gazetteer" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="[tomeId]/index" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="[tomeId]/[entryId]" options={{ animation: "slide_from_right" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
