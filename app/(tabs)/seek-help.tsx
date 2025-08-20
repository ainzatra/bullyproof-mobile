import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SeekHelp = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
      <View className="w-28 h-28 rounded-full items-center justify-center bg-primary-main/10">
          <MaterialCommunityIcons name="account-question" size={56} color="#063b82" />
      </View>
      
      <Text className="mt-4 text-lg text-primary-main font-semibold">Seek Help</Text>
      <Text className="mt-2 text-center text-slate-500 px-6">
        Find nearby support, call hotlines, or report concerns here.
      </Text>
    </SafeAreaView>
  )
}

export default SeekHelp