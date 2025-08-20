import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const router = useRouter()
  const toLogin = () => router.replace('/login')
  const toSignup = () => router.replace('/signup')

  return (
    <SafeAreaView className="px-4 flex h-full items-center justify-around bg-primary-main py-10">
      <Image source={images.logoDark} className="w-36 h-36" />

      <View className="w-full px-8">
        <TouchableOpacity
          onPress={toLogin}
          className="bg-secondary-main py-3 rounded-lg items-center mb-3"
        >
          <Text className="text-center text-secondary-foreground font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toSignup}
          className="border border-secondary-main py-3 rounded-lg items-center"
        >
          <Text className="text-center text-secondary-foreground font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index