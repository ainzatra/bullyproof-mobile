import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='login'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='signup'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})