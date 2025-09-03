import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tips = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-28 h-28 rounded-full items-center justify-center bg-primary-main/10">
          <Ionicons name="bulb-outline" size={56} color="#063b82" />
        </View>

        <Text className="mt-4 text-lg text-primary-main font-semibold">
          Tips
        </Text>
        <Text className="mt-2 text-center text-slate-500 px-6">
          Helpful tips on how to stay safe and prevent bullying. Read short
          guides and resources.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Tips;
