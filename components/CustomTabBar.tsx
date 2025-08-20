import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import TabItem from './TabItem'
 
export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routeIcons: Record<string, (props: { color: string; size: number }) => React.ReactNode> = {
    home: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
    'seek-help': ({ color, size }) => <MaterialCommunityIcons name="account-question" size={size} color={color} />,
    report: ({ color, size }) => <FontAwesome5 name="exclamation-circle" size={size} color={color} />,
    tips: ({ color, size }) => <Ionicons name="bulb" size={size} color={color} />,
  }

  // Per-route accent colors (used when a tab is focused)
  const routeColors: Record<string, string> = {
    home: '#063b82',
    'seek-help': '#cc614d',
    report: '#f97316',
    tips: '#f59e0b',
  }
 
  return (
    <View className="absolute left-0 right-0 bottom-0">
      {/* Outer blue pill background */}
      <View className="bg-primary-main rounded-3xl px-4 pt-3 pb-12 shadow-lg flex-row items-center justify-around">
        {state.routes.map((route, index) => {
          const focused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
 
          const options = descriptors[route.key].options
          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as string)
              : options.title !== undefined
              ? options.title
              : route.name
 
          const iconRenderer = routeIcons[(route.name as string).toLowerCase()] || routeIcons.home
 
          return (
            <TabItem
              key={route.key}
              label={label as string}
              focused={focused}
              onPress={onPress}
              renderIcon={iconRenderer}
              color={routeColors[(route.name as string).toLowerCase()]}
            />
          )
        })}
      </View>
    </View>
  )
}