import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PrivacyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-slate-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-semibold text-slate-900">
          Privacy Policy
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Title Section */}
        <View className="px-4 pt-6 pb-4">
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-full bg-indigo-100 items-center justify-center mb-4">
              <Feather name="shield" size={40} color="#6366f1" />
            </View>
            <Text className="text-2xl font-bold text-slate-900 mb-2">
              Privacy Policy
            </Text>
            <Text className="text-base text-slate-600 text-center">
              Your safety matters — and so does your privacy.
            </Text>
          </View>

          <View className="bg-slate-100 rounded-xl p-4">
            {/* Introduction */}
            <View className=" rounded-lg p-4 mb-4">
              <Text className="text-base text-slate-700 leading-6 mb-4">
                At BullyProof, we are committed to keeping your information
                safe, private, and protected. This app is designed to support
                students and the Guidance Office in identifying and addressing
                online bullying — not to invade your privacy.
              </Text>
            </View>

            {/* What We Collect */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  🔒
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  What We Collect
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                We collect the following only if bullying content is detected or
                manually reported:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Your report details
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    AI-generated insights (toxicity score, bullying category,
                    etc.)
                  </Text>
                </View>
              </View>
            </View>

            {/* How Your Data is Used */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  ✅
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  How Your Data is Used
                </Text>
              </View>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    To generate reports for the school's Guidance Office
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    To help identify trends and respond with appropriate
                    interventions
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    To update you on your report status (e.g., in progress,
                    resolved)
                  </Text>
                </View>
              </View>
            </View>

            {/* Your Privacy Choices */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  🔒
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Your Privacy Choices
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                You always have control. You can:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Choose whether or not to report a bullying incident
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    View your activity and submitted reports
                  </Text>
                </View>
              </View>
            </View>

            {/* Your Trust Matters */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  💛
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Your Trust Matters
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                We understand how sensitive this is. That's why:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Your data is stored securely
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Only the Guidance Office and authorized school officials can
                    access your report
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-indigo-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    We will never sell or share your data for advertising or any
                    other purpose
                  </Text>
                </View>
              </View>
              <Text className="text-base text-slate-700 leading-6 mt-3 italic">
                No data is shared outside the school, and all information is
                used only for student safety and support.
              </Text>
            </View>

            {/* Contact Information */}
            <View className=" rounded-lg p-4 mb-6">
              <Text className="text-base text-slate-700 leading-6 mb-3">
                If you have any questions about how your information is handled,
                feel free to reach out to:
              </Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Feather
                    name="mail"
                    size={16}
                    color="#6366f1"
                    className="mr-2"
                  />
                  <Text className="text-base text-slate-700">
                    bullyproofapp1@gmail.com
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
