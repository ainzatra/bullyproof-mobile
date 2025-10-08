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

export default function TermsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-slate-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-semibold text-slate-900">
          Terms and Conditions
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Title Section */}
        <View className="px-4 pt-6 pb-4">
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center mb-4">
              <Feather name="file-text" size={40} color="#f97316" />
            </View>
            <Text className="text-2xl font-bold text-slate-900 mb-2">
              Terms and Conditions
            </Text>
            <Text className="text-base text-slate-600 text-center">
              Using BullyProof responsibly means staying safe together.
            </Text>
          </View>

          <View className="bg-slate-100 rounded-xl p-4">
            {/* Introduction */}
            <View className=" rounded-lg p-4 mb-4">
              <Text className="text-base text-slate-700 leading-6 mb-4">
                Welcome to BullyProof — a tool developed to help protect
                students from online bullying and promote a safer, kinder
                digital environment. By using this app, you agree to the
                following terms:
              </Text>
            </View>

            {/* 1. Purpose of the App */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  1.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Purpose of the App
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                BullyProof is created for students of Holy Child Academy to:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Detect harmful or bullying content on connected Facebook
                    accounts
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Allow students to report such content voluntarily
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Notify the Guidance Office for review and support
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Provide digital safety tools, tips, and emotional support
                  </Text>
                </View>
              </View>
              <Text className="text-base text-slate-700 leading-6 mt-3 italic">
                This app is not for public or commercial use outside its
                intended school program.
              </Text>
            </View>

            {/* 2. User Responsibilities */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  2.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  User Responsibilities
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                By using BullyProof, you agree to:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Use the app respectfully and honestly
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Report only real cases of harmful or bullying behavior
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Not misuse the system to falsely accuse or target others
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Keep your login information private and secure
                  </Text>
                </View>
              </View>
            </View>

            {/* 4. Data Handling */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  3.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Data Handling
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                We protect your information. Data collected is used:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Only for school-related review and intervention
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Only by authorized school staff (e.g., Guidance Office)
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    In accordance with the school's data protection policies
                  </Text>
                </View>
              </View>
              <Text className="text-base text-slate-700 leading-6 mt-3 italic">
                We do not share your data outside the school or use it for ads
                or third-party services.
              </Text>
            </View>

            {/* 5. AI Feedback & Scores */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  4.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  AI Feedback & Scores
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                The app uses AI to analyze reported content. You understand
                that:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Toxicity, threat, and sentiment scores are automatically
                    generated
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    These are meant to support, not replace, human review
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    The Guidance Office will still make the final decision on
                    each case
                  </Text>
                </View>
              </View>
            </View>

            {/* 6. Limitations */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  5.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Limitations
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                BullyProof aims to help, but it:
              </Text>
              <View className="space-y-2 ml-2">
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    May not detect every harmful comment
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Cannot monitor private messages
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-500 mr-2">•</Text>
                  <Text className="flex-1 text-base text-slate-700">
                    Is not a replacement for professional counseling or
                    emergency help
                  </Text>
                </View>
              </View>
              <Text className="text-base text-slate-700 leading-6 mt-3 italic">
                If you are in serious danger or crisis, please reach out to
                trusted adults or call emergency support lines immediately.
              </Text>
            </View>

            {/* 7. Changes to the Terms */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  6.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Changes to the Terms
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6">
                We may update these terms over time. When we do, we'll let you
                know inside the app. By continuing to use BullyProof, you accept
                those updates.
              </Text>
            </View>

            {/* 8. Contact Us */}
            <View className=" rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Text className="text-lg font-semibold text-slate-900 mr-2">
                  7.
                </Text>
                <Text className="text-lg font-semibold text-slate-900">
                  Contact Us
                </Text>
              </View>
              <Text className="text-base text-slate-700 leading-6 mb-3">
                If you have any questions about these terms, feel free to reach
                out:
              </Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">✉️</Text>
                  <Text className="text-base text-slate-700">
                    bullyproopapp1@gmail.com
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
