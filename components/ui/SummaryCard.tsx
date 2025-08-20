import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  number: string | number;
  label: string;
  icon?: React.ReactNode;
  bgClass?: string;
};

export default function SummaryCard({
  number,
  label,
  icon,
  bgClass = 'bg-white',
}: Props) {
  return (
    <View className={`flex-1 h-20 ${bgClass} rounded-xl  shadow-xl`}>
      <View className="flex-row items-center justify-between p-3">
        <View>
          <Text className="text-2xl font-bold text-slate-800">{number}</Text>
          <Text className="text-xs text-slate-500 mt-1">{label}</Text>
        </View>

        <View className="absolute top-2 right-2 w-10 h-10 rounded-full items-center justify-center bg-slate-100">
          {icon}
        </View>
      </View>
    </View>
  );
}
