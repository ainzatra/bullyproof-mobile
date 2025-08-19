import { Entypo, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
type Option = { label: string; value: string }

type ButtonProps = {
  title: string
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  style?: any
}

export const PrimaryButton = ({ title, onPress, disabled, loading, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      className="bg-[#c86d55] rounded-full py-3 items-center"
      style={style}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">{title}</Text>}
    </TouchableOpacity>
  )
}

type InputProps = {
  value: string
  onChangeText: (t: string) => void
  placeholder?: string
  keyboardType?: any
  secureTextEntry?: boolean
  style?: any
  placeholderTextColor?: string
  additionalClass?: string
  onPress?: (e: any) => void
}

export const InputField = ({ value, onChangeText, placeholder, keyboardType, secureTextEntry, style, placeholderTextColor = '#6b7280', additionalClass, onPress }: InputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      className={`rounded px-4 py-3 text-gray-800 flex-1 ${additionalClass}`}
      placeholderTextColor={placeholderTextColor}
      style={style}
      onPress={onPress}
    />
  )
}

export const PasswordField = ({ value, onChangeText, placeholder = 'Password' , style, additionalClass }: InputProps) => {
  const [secure, setSecure] = useState(true)
  return (
    <View className={`flex-row items-center flex-1 rounded px-4 py-1 ${additionalClass}`}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        className="flex-1 py-3 text-gray-800"
        placeholderTextColor="#6b7280"
        style={style}
      />
      <TouchableOpacity onPress={() => setSecure(!secure)} className="px-3">
        <Text>{secure ? <Entypo name='eye' size={24}/> : <Entypo name='eye-with-line' size={24}/>}</Text>
      </TouchableOpacity>
    </View>
  )
}

type DropdownProps = {
  options: Option[]
  selectedValue?: string
  onValueChange?: (v: string) => void
  placeholder?: string
  style?: any
}

export const DropdownSelect = ({ options, selectedValue, onValueChange, placeholder = 'Select', style }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const selectedLabel = options.find((o) => o.value === selectedValue)?.label
  return (
    <View>
      <Pressable onPress={() => setOpen(true)} className="bg-gray-200 rounded px-4 py-3 flex-row items-center justify-between" style={style}>
        <Text className={`${selectedLabel ? 'text-gray-800' : 'text-gray-500'}`}>{selectedLabel ?? placeholder}</Text>
        <Text className="text-gray-500">▾</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/40 items-center justify-center" onPress={() => setOpen(false)}>
          <View className="w-11/12 bg-white rounded-lg p-4">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange?.(item.value)
                    setOpen(false)
                  }}
                  className="py-3 border-b border-gray-200"
                >
                  <Text className="text-gray-800">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
 
export type DatePickerProps = {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  style?: any
  additionalClass?: string
}

/**
 * DatePickerField
 * - Shows a Pressable that displays the selected date (ISO yyyy-mm-dd) or placeholder.
 * - Opens @react-native-community/datetimepicker when pressed.
 * - Calls onChange with an ISO date string (yyyy-mm-dd).
 */
export const DatePickerField = ({ value, onChange, placeholder = 'Select date', style, additionalClass }: DatePickerProps) => {
  const [show, setShow] = useState(false)
  const displayValue = value ?? ''
  return (
    <View className='flex-1'>
      <Pressable
        onPress={() => setShow(true)}
        className={`bg-gray-200 rounded px-4 py-3 flex-row items-center justify-between ${additionalClass ?? ''}`}
        style={style}
      >
        <Text className={`${displayValue ? 'text-gray-800' : 'text-gray-500'}`}>{displayValue || placeholder}</Text>
        <Fontisto name="date" size={18} color="gray" />
      </Pressable>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) {
              const iso = date.toISOString().split('T')[0]
              onChange?.(iso)
            }
            setShow(false)
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  // fallback styles if nativewind isn't used
  row: { flexDirection: 'row', alignItems: 'center' },
})

export default {
  PrimaryButton,
  InputField,
  PasswordField,
  DropdownSelect,
  DatePickerField,
}