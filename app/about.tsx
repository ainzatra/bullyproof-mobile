import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-slate-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-semibold text-slate-900">
          About Us
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Title Section */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-4">
            <Ionicons name="shield-checkmark" size={40} color="#3b82f6" />
          </View>
          <Text className="text-2xl font-bold text-slate-900 mb-4">
            About BullyProof
          </Text>
        </View>

        {/* Main Content */}
        <View className="space-y-4 p-4 rounded-xl bg-slate-100">
          <Text className="text-base text-slate-700 text-justify mb-6">
            BullyProof is a safe space built just for you — a digital companion
            designed to help protect students from the harmful effects of
            cyberbullying.
          </Text>

          <Text className="text-base text-slate-700 text-justify mb-4">
            Created to support student, this app uses the power of AI and
            sentiment analysis to detect harmful online behavior — like threats,
            name-calling, or harassment — and gives you the choice and support
            to take action.
          </Text>

          <Text className="text-base text-slate-700 text-justify mb-4">
            We know how difficult it can be to speak up, especially when
            bullying happens online. That’s why BullyProof was made to:
          </Text>

          {/* Key Features */}
          <View className="space-y-3 ml-2">
            <View className="flex-row items-start">
              <Text className="text-blue-500 mr-2">•</Text>
              <Text className="flex-1 text-base text-slate-700">
                Empower you to take control of your online experience
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 mr-2">•</Text>
              <Text className="flex-1 text-base text-slate-700">
                Support your well-being with thoughtful tools and professional
                help
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 mr-2">•</Text>
              <Text className="flex-1 text-base text-slate-700">
                Bridge the gap between what's happening on social media and how
                the school can respond with care and intervention
              </Text>
            </View>
          </View>

          {/* Closing Message */}
          <View className="mt-6 p-4 bg-blue-50 rounded-lg">
            <Text className="text-base text-slate-700 text-justify mb-4">
              BullyProof isn't just a monitoring tool — it's a reminder that
              you're not alone.
            </Text>
            <Text className="text-base text-slate-700 text-justify mb-4">
              Whether you want to quietly keep track of harmful interactions or
              bravely report something that's not okay, this app helps you do it
              safely, privately, and with the full support of your school's
              Guidance Office.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
