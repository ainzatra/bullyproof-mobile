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
};

/**
 * SubmissionModal
 * - Displays after a report is successfully submitted.
 * - Shows the "report submitted" message plus helpful hotlines and in-person support info.
 * - Styled with Tailwind classes (nativewind) to match app look-and-feel.
 */
export default function SubmissionModal({ visible, onClose }: Props) {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <SafeAreaView className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-xl max-h-[85%]">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-200">
            <Text className="text-lg font-semibold text-[#063b82]">
              Submitted
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Text className="text-sm text-slate-700">Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            className="px-4 py-4"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text className="text-base font-semibold text-slate-800 mb-2">
              Your report has been submitted.
            </Text>

            <Text className="text-sm text-slate-700 mb-4">
              Thank you for reporting. If you need immediate emotional support
              or crisis assistance, please contact any of the resources below.
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-slate-800">
                📞 National Center for Mental Health (NCMH) Crisis Hotline
              </Text>
              <Text className="text-sm text-slate-700 mt-1">
                Available 24/7, nationwide
              </Text>
              <View className="mt-2 space-y-1 ms-2">
                <Text className="text-sm text-slate-700">
                  • Landline: (02) 1553
                </Text>
                <Text className="text-sm text-slate-700">
                  • Globe / TM (toll-free): 0966-351-4518
                </Text>
                <Text className="text-sm text-slate-700">
                  • Smart / TNT (toll-free): 0908-639-2672
                </Text>
                <Text className="text-sm text-slate-700">
                  • Landline (toll-free): 1553
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-slate-800">
                📞 Hopeline Philippines
              </Text>
              <Text className="text-sm text-slate-700 mt-1">
                Available 24/7, nationwide
              </Text>
              <View className="mt-2 space-y-1 ms-2">
                <Text className="text-sm text-slate-700">
                  • Globe / TM (regular rates apply): 0917-558-4673
                </Text>
                <Text className="text-sm text-slate-700">
                  • Smart / TNT (regular rates apply): 0918-873-4673
                </Text>
                <Text className="text-sm text-slate-700">
                  • Landline (regular rates apply): (02) 8804-4673
                </Text>
              </View>
            </View>

            <View className="mb-2">
              <Text className="text-sm font-semibold text-slate-800">
                🏫 For in-person support
              </Text>
              <Text className="text-sm text-slate-700 mt-1 ms-2">
                You may also visit the Guidance Office of Mariano Ponce National
                High School for direct assistance.
              </Text>
            </View>
          </ScrollView>

          <View className="px-4 pb-6">
            <PrimaryButton title="Okay" onPress={onClose} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
