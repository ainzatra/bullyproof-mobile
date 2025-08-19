import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name='onboarding'
            options={{
                headerShown: false,
            }}
        />
        <Tabs.Screen 
            name='home'
            options={{
                headerShown: false,
            }}
        />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})