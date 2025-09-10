import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  message?: string;
};

/**
 * LoadingOverlay
 * - Covers the entire screen with a semi-opaque backdrop.
 * - Prevents user interaction while visible (pointerEvents="auto").
 * - Uses Tailwind classes (nativewind) for styling.
 */
export default function LoadingOverlay({
  visible,
  message = 'Please wait...',
}: Props) {
  if (!visible) return null;

  return (
    <View
      pointerEvents="auto"
      className="absolute inset-0 items-center justify-center bg-black/40 z-50"
    >
      <View className="bg-white/95 rounded-lg px-6 py-5 items-center shadow-lg">
        <ActivityIndicator size="large" color="#063b82" />
        <Text className="mt-3 text-slate-700 font-medium">{message}</Text>
      </View>
    </View>
  );
}
