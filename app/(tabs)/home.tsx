import { useUser } from '@/stores/useUserStore'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
  const user = useUser()
  return (
    <SafeAreaView>
      <Text>Welcome home, {user?.email}</Text>
      <Text>Welcome home, {user?.id}</Text>
      <Text>Welcome home, {user?.name}</Text>
    </SafeAreaView>
  )
}

export default home