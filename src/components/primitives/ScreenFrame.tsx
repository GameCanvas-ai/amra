import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { palette } from "../../theme/tokens";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export function ScreenFrame({ children, style }: Props) {
  return <View style={[styles.frame, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: palette.bg,
  },
});
