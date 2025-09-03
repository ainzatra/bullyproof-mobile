import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../FormControls';

type Props = {
  onAgree: () => void;
  onCancel?: () => void;
};

/**
 * TermsCard
 * - Shows a scrollable terms/intro text and a checkbox-like agree action.
 * - Uses existing PrimaryButton for the action button.
 * - Lightweight, styled with tailwind classes (nativewind).
 */
export default function TermsCard({ onAgree }: Props) {
  const [agree, setAgree] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-lg font-semibold text-[#c85e48]">
          Report an Incident
        </Text>
      </View>

      <ScrollView
        className="px-4 mt-4"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
      >
        <View className="bg-slate-50 rounded-lg p-4">
          <View className="flex-row items-center gap-2 pb-1  mb-2 border-b border-primary-main ">
            <AntDesign name="forward" size={16} color="primary-main" />
            <Text className="text-base text-primary-main font-semibold text-justify">
              Before you report
            </Text>
          </View>
          <Text className="text-sm text-slate-700 text-justify">
            Reporting an incident of cyberbullying using our system is quick and
            easy, typically taking 5-7 minutes to complete. The report form is
            divided into three sections, and all sections must be filled out
            before submitting your report.
          </Text>

          <View className="mt-3">
            <Text className="text-sm text-slate-700 font-semibold text-justify">
              Before you begin, please ensure you have the following information
              ready:
            </Text>
            <View className="mt-2 ms-4 space-y-2">
              <Text className="text-sm text-slate-700 text-justify">
                • The text comment that was flagged by our system as potentially
                abusive or bullying.
              </Text>
              <Text className="text-sm text-slate-700 text-justify">
                • The social media account link of the perpetrator (from
                Facebook or Twitter).
              </Text>
              <Text className="text-sm text-slate-700 text-justify">
                • Victim details, including age (if under 18) for appropriate
                handling and escalation.
              </Text>
            </View>

            <Text className="text-sm mt-2 text-slate-700 text-justify">
              If the incident invovles any financial loss, please immediately
              report it to the national helpline at 1930 and contact your bank
              for further assistance.
            </Text>
            <Text className="text-sm mt-2 text-slate-700 text-justify">
              In case of immediate danger, contact a trusted adult or call the
              police at 100.
            </Text>
          </View>

          <View className="mt-4">
            <View className="flex-row items-center gap-2 pb-1  mb-2 border-b border-primary-main ">
              <AntDesign name="forward" size={16} color="primary-main" />
              <Text className="text-base text-primary-main font-semibold text-justify">
                When you submit your report
              </Text>
            </View>
            <Text className="text-sm text-slate-700 mt-2 text-justify">
              Once you submit your report through the app, you will receive a
              case number. Our system will log the incident and provide updates
              via the "Track" tab. If the case is sensitive, trained counselors
              are available to assist.
            </Text>
            <Text className="text-sm text-slate-700 mt-2 text-justify">
              The system will also sore the flagged coment locally, ensuring
              that even if the comment is deleted or edited later, it remain
              preserved for further investigation and action.
            </Text>
          </View>
        </View>

        <View className="mt-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setAgree(!agree)}
          >
            {agree ? (
              <View className="w-5 h-5 border border-slate-300 rounded-sm mr-2 items-center justify-center bg-[#c85e48]">
                <AntDesign name="check" size={16} color="white" />
              </View>
            ) : (
              <View className="w-5 h-5 border border-slate-300 rounded-sm mr-2 items-center justify-center bg-white" />
            )}
            <Text className="text-sm text-slate-600">I understand & agree</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 px-4 pb-6">
          <PrimaryButton title="Proceed" onPress={onAgree} disabled={!agree} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
