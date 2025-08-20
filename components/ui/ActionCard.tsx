import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  title: string;
  description: string;
  illustration?: any;
  bgClass?: string;
  containerClass?: string;
};

export default function ActionCard({
  title,
  description,
  illustration,
  bgClass = 'bg-white',
  containerClass = '',
}: Props) {
  return (
    <View
      className={`flex-row items-center justify-between ${bgClass} rounded-xl p-4 shadow mb-4 ${containerClass}`}
    >
      <View className="flex-1 pr-3">
        <Text className="text-lg font-semibold text-slate-900">{title}</Text>
        <Text className="text-sm text-slate-600 mt-2">{description}</Text>
      </View>

      {illustration ? (
        <View className="w-24 h-24 rounded-md overflow-hidden">
          <Image
            source={illustration}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      ) : null}
    </View>
  );
}
