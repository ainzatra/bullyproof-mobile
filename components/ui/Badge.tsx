import React from 'react';
import { Text, View } from 'react-native';

export default function Badge({ count }: { count?: number }) {
  if (!count) return null;
  return (
    <View className="absolute -top-1 -right-1 bg-rose-500 rounded-full px-1.5 py-0.5 min-w-[18] items-center justify-center">
      <Text className="text-[10px] text-white font-semibold">{count}</Text>
    </View>
  );
}
