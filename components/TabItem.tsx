import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';

type IconRenderer = (props: { color: string; size: number }) => React.ReactNode
 
export default function TabItem({
  label,
  focused,
  onPress,
  renderIcon,
  color,
}: {
  label: string
  focused: boolean
  onPress: (e?: GestureResponderEvent) => void
  renderIcon: IconRenderer
  color?: string
}) {
  // Focused: larger white circular pill with colored icon
  // Unfocused: smaller muted circular pill
  const circleBg = focused ? 'bg-white' : 'bg-slate-200'
  const labelClass = focused ? 'text-white' : 'text-slate-400'
  const iconColor = focused ? (color ?? '#063b82') : '#64748b'
  const iconSize = focused ? 26 : 20
  const circleClass = focused ? 'w-16 h-16 rounded-2xl' : 'w-14 h-14 rounded-xl'
 
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-1 items-center"
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
    >
      <View className={`${circleClass} items-center justify-center shadow ${circleBg}`}>
        {renderIcon({ color: iconColor, size: iconSize })}
      </View>
 
      <Text className={`text-xs mt-1 ${labelClass}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}