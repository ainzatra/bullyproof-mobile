import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const report = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
      <View className="w-28 h-28 rounded-full items-center justify-center bg-primary-main/10">
        <FontAwesome5 name="exclamation-circle" size={56} color="#063b82" />
      </View>

      <Text className="mt-4 text-lg text-primary-main font-semibold">Report</Text>
      <Text className="mt-2 text-center text-slate-500 px-6">
        Submit a report about any inappropriate behavior or incidents. Your feedback helps us take action and maintain a safe environment.
      </Text>
    </SafeAreaView>
  )
}

export default report