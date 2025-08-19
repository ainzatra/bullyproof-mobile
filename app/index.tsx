import { images } from '@/constants/images'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className="px-4 flex h-full items-center justify-around bg-primary-main py-10">
      <Image source={images.logoDark} className="w-36 h-36" />

      <View className="w-full px-8">
        <Link
          href="/login"
          className="bg-secondary-main py-3 rounded-lg items-center mb-3"
        >
          <Text className="text-center text-secondary-foreground font-semibold">Login</Text>
        </Link>

        <Link
          href="/signup"
          className="border border-secondary-main py-3 rounded-lg items-center"
        >
          <Text className="text-center text-secondary-foreground font-semibold">Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default index