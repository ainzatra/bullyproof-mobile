import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../FormControls';
import TagSelector from './TagSelector';

import type { ImpactData } from './types';

type Props = {
  initial?: Partial<ImpactData>;
  onNext: (data: ImpactData) => void;
  onBack?: () => void;
  keyboardHeight?: number;
};

/**
 * ImpactForm
 * - Stage 3 of the reporting flow.
 * - Lets users pick multiple feeling tags and add a custom "other" text.
 */
export default function ImpactForm({
  initial = {},
  onNext,
  onBack,
  keyboardHeight = 0,
}: Props) {
  const defaultOptions = [
    'Hurt',
    'Sad',
    'Depressed',
    'Angry',
    'Revengeful',
    'Hopeless',
    'Shameful',
    'Guilty',
    'Suicidal',
    'Lonely',
    'Fearful',
    'Crazy',
    'Distracted',
    'Unaffected',
    'Shocked',
    'Tired',
    'Anxious',
    'Restless',
  ];

  const [feelings, setFeelings] = useState<string[]>(initial.feelings ?? []);
  const [others, setOthers] = useState(initial.others ?? '');

  const handleProceed = () => {
    onNext({ feelings, others });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: keyboardHeight > 0 ? keyboardHeight : 40,
      }}
      className="px-4 pt-2 bg-white"
    >
      <Text className="text-center text-lg text-slate-600 font-semibold mb-4">
        Impact
      </Text>

      <View className="space-y-4">
        <TagSelector
          options={defaultOptions}
          value={feelings}
          onChange={setFeelings}
          placeholder="How are you feeling? *"
        />

        <View>
          <Text className="text-sm text-slate-600 mb-2">Others</Text>
          <TextInput
            value={others}
            onChangeText={setOthers}
            placeholder="If not listed above, describe here"
            className="rounded px-4 py-3 bg-gray-100 text-slate-700"
          />
        </View>

        <View className="mt-4 flex-row">
          <TouchableOpacity
            onPress={() => onBack?.()}
            className="px-4 py-3 rounded-full bg-slate-100 items-center justify-center mr-3 flex-1"
          >
            <Text className="text-slate-700 text-center">Back</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="Submit Report"
            onPress={handleProceed}
            additionalClasses="w-1/2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
