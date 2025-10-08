import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-slate-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-semibold text-slate-900">
          Contact Us
        </Text>
      </View>
      <View className="flex items-center mt-6">
        <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
          <Feather name="phone-call" size={40} color="#10b981" />
        </View>
      </View>

      <ScrollView className="flex-1 p-6 bg-slate-100 m-4 rounded-xl">
        {/* Title Section */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-slate-900 mb-2">
            We're Here for You
          </Text>
          <Text className="text-base text-slate-600 text-center">
            Whether you're looking for support, guidance, or have questions
            about how the app works
          </Text>
        </View>

        {/* School Guidance Office Section */}
        <View className="mb-6">
          <View className="flex-row items-start mb-4">
            <Text className="text-lg font-semibold text-slate-900 mr-2">
              💬
            </Text>
            <Text className="text-lg font-semibold text-slate-900">
              Need Help or Support with Bullying?
            </Text>
          </View>
          <Text className="text-base text-slate-700 mb-4">
            Reach out to your school's Guidance Office. They're here to listen
            and help.
          </Text>

          <View className=" p-4 space-y-3">
            <View className="flex-row items-start mb-4">
              <Ionicons
                name="time-outline"
                size={20}
                color="#3b82f6"
                className="mr-3"
              />
              <View>
                <Text className="text-sm font-medium text-slate-600">
                  Office Hours
                </Text>
                <Text className="text-base text-slate-900">
                  8:00 AM – 5:00 PM (Monday to Friday)
                </Text>
              </View>
            </View>

            <View className="flex-row items-start mb-4">
              <Ionicons
                name="location-outline"
                size={20}
                color="#3b82f6"
                className="mr-3"
              />
              <View>
                <Text className="text-sm font-medium text-slate-600">
                  Location
                </Text>
                <Text className="text-base text-slate-900">
                  2nd Floor of the Holy Child Academy Building, Bustos, Bulacan
                </Text>
              </View>
            </View>

            <View className="flex-row items-start mb-4">
              <Feather name="mail" size={20} color="#3b82f6" className="mr-3" />
              <View>
                <Text className="text-sm font-medium text-slate-600">
                  Email
                </Text>
                <Text className="text-base text-slate-900">
                  bullyproofapp1@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
