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
import TermsModal from './TermsModal';

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
  const [showTermsModal, setShowTermsModal] = useState(false);
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
            simple, usually taking only 3–5 minutes to complete. The report form
            has two sections, and both must be filled out before submission:
          </Text>
          <View className="ms-3 mt-2">
            <Text className="text-sm text-slate-700 text-justify">
              1. Incident – Upload your evidences (supporting any type of file
              or image) and provide details of what happened, where it occurred,
              and who was involved.
            </Text>
            <Text className="text-sm text-slate-700 text-justify mt-2">
              2. Impact – Share how the incident made you feel by selecting from
              the list of emotions provided.
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-sm text-slate-700 font-semibold text-justify">
              Information you may need before starting:
            </Text>
            <View className="mt-2 ms-4 space-y-2">
              <Text className="text-sm text-slate-700 text-justify mt-2">
                • The text, screenshot, or media that shows the incident.
              </Text>
              <Text className="text-sm text-slate-700 text-justify mt-2">
                • The social media account link or username of the person
                involved (if available).
              </Text>
              <Text className="text-sm text-slate-700 text-justify mt-2">
                • Victim details (especially age if under 18, for proper
                handling and escalation).
              </Text>
            </View>

            <Text className="text-sm text-slate-700 font-semibold text-justify mt-3">
              Important reminders:
            </Text>
            <View className="mt-2 ms-4 space-y-2">
              <Text className="text-sm mt-2 text-slate-700 text-justify">
                • If the incident involves financial loss or fraud, immediately
                call the National Helpline at 1326 and contact your bank
              </Text>
              <Text className="text-sm mt-2 text-slate-700 text-justify">
                • If there is immediate danger to anyone’s safety, contact a
                trusted adult or call the police at 911 right away.
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <View className="flex-row items-center gap-2 pb-1  mb-2 border-b border-primary-main ">
              <AntDesign name="forward" size={16} color="primary-main" />
              <Text className="text-base text-primary-main font-semibold text-justify">
                After you submit your report:
              </Text>
            </View>
            <View className="ms-3">
              <Text className="text-sm text-slate-700 mt-2 text-justify">
                • You will receive a case number for reference.
              </Text>
              <Text className="text-sm text-slate-700 mt-2 text-justify">
                • The system will log the incident and provide updates in the
                “Track” tab.
              </Text>
              <Text className="text-sm text-slate-700 mt-2 text-justify">
                • For sensitive cases, trained counselors are available to
                review and provide support
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setAgree(!agree)}
              className="mr-2"
              disabled={!agree}
            >
              {agree ? (
                <View className="w-5 h-5 border border-slate-300 rounded-sm items-center justify-center bg-[#c85e48]">
                  <AntDesign name="check" size={16} color="white" />
                </View>
              ) : (
                <View className="w-5 h-5 border border-slate-300 rounded-sm items-center justify-center bg-white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowTermsModal(true)}>
              <Text className="text-sm text-primary-main underline">
                I understand & agree
              </Text>
            </TouchableOpacity>
          </View>

          <TermsModal
            visible={showTermsModal}
            onClose={() => setShowTermsModal(false)}
            onAgree={() => {
              setAgree(true);
              setShowTermsModal(false);
            }}
          />
        </View>
        <View className="mt-4 px-4 pb-6">
          {agree && (
            <PrimaryButton
              title="Proceed"
              onPress={onAgree}
              disabled={!agree}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
