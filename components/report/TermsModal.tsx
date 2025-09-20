import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../FormControls';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAgree?: () => void;
};

/**
 * TermsModal
 * - A simple modal that displays the terms & conditions content.
 * - Provides Close and Agree actions. If the user taps Agree we call onAgree.
 * - Separated into its own component so it can be reused or tested independently.
 */
export default function TermsModal({ visible, onClose, onAgree }: Props) {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <SafeAreaView className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-xl max-h-[85%]">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-200">
            <Text className="text-lg font-semibold text-[#c85e48]">
              Terms & Conditions
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <AntDesign name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="px-4 py-4"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text className="text-xl font-extrabold text-slate-700 mb-2">
              I Understand and Agree
            </Text>

            <Text className="text-sm text-slate-700 mb-2">
              By continuing to use the Bullyproof, I acknowledge and agree to
              the following:
            </Text>

            <Text className="font-semibold text-sm text-slate-700 mt-2">
              1. Purpose of the System
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • Bullyproof is designed to help students report bullying and
              cyberbullying safely and privately.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • The system uses AI to analyze reports and provide faster
              responses to the Guidance Office.
            </Text>

            <Text className="font-semibold text-sm text-slate-700 mt-3">
              2. My Participation
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • I may use the system to report incidents I experience or
              witness.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • I can upload evidence (files, images, or descriptions) to
              support my report.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • If the Guidance Office is not immediately available, the
              system’s AI assistant will talk to me and give an initial
              response, while also flagging the report for faster review by
              school personnel.
            </Text>

            <Text className="font-semibold text-sm text-slate-700 mt-3">
              3. My Rights
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • Using the system is voluntary. I am free to stop using it at any
              time without any penalty or loss of school privileges.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • If I feel uncomfortable at any point, I can choose not to submit
              or withdraw my participation.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • My information will remain private and will only be accessed by
              the Guidance Office and authorized school personnel.
            </Text>

            <Text className="font-semibold text-sm text-slate-700 mt-3">
              4. Parental/Guardian Consent
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • If I am under 18 years old, my parents or guardian has been
              informed about this system and has voluntarily given their consent
              for me to use it.
            </Text>

            <Text className="font-semibold text-sm text-slate-700 mt-3">
              5. Benefits
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • Using the system helps ensure that cases of bullying and
              cyberbullying are reported, documented, and addressed more
              quickly.
            </Text>
            <Text className="text-sm text-slate-700 mt-1">
              • This contributes to a safer and more supportive school
              environment.
            </Text>
          </ScrollView>

          <View className="px-4 pb-6">
            <View className="flex-row gap-3">
              <View className="flex-1">
                <TouchableOpacity
                  onPress={onClose}
                  className="rounded-full border border-slate-300 p-3 items-center"
                >
                  <Text className="text-sm text-slate-700">Close</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <PrimaryButton
                  title="Agree"
                  onPress={() => {
                    onAgree?.();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
