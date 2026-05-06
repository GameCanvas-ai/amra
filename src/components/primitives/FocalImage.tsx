import { useMemo, useState } from "react";
import {
  Image,
  type ImageSourcePropType,
  type LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";

export type Focal = { x: number; y: number };

type Props = {
  source: ImageSourcePropType;
  focal?: Focal;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

export function FocalImage({ source, focal }: Props) {
  const [container, setContainer] = useState<{ w: number; h: number } | null>(null);

  const intrinsic = useMemo(() => {
    const resolved = Image.resolveAssetSource(source as never);
    if (!resolved || !resolved.width || !resolved.height) return null;
    return { w: resolved.width, h: resolved.height };
  }, [source]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContainer((prev) =>
      prev && prev.w === width && prev.h === height ? prev : { w: width, h: height },
    );
  };

  const fx = focal?.x ?? 0.5;
  const fy = focal?.y ?? 0.5;

  const positioned = useMemo(() => {
    if (!container || !intrinsic) return null;
    const scale = Math.max(container.w / intrinsic.w, container.h / intrinsic.h);
    const dw = intrinsic.w * scale;
    const dh = intrinsic.h * scale;
    const left = clamp(container.w / 2 - fx * dw, container.w - dw, 0);
    const top = clamp(container.h / 2 - fy * dh, container.h - dh, 0);
    return { width: dw, height: dh, left, top } as const;
  }, [container, intrinsic, fx, fy]);

  return (
    <View style={StyleSheet.absoluteFill} onLayout={onLayout}>
      {positioned ? (
        <Image
          source={source}
          style={{ position: "absolute", ...positioned }}
          resizeMode="cover"
        />
      ) : (
        <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" />
      )}
    </View>
  );
}
