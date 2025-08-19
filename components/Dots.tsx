import React from 'react';
import { View } from 'react-native';

const Dots = ({ total, active }: { total: number; active: number }) => {
  return (
    <View className="flex-row justify-center mb-2">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={`w-2 h-2 rounded-full mx-1 ${i === active ? 'bg-white' : 'bg-slate-400'}`}
        />
      ))}
    </View>
  )
}

export default Dots