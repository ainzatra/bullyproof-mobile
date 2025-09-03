import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropdownSelect, PrimaryButton } from '../FormControls';
import FileUploader from './FileUploader';

type IncidentData = {
  screenshots?: { uri: string }[];
  bullyingType?: string;
  offenderKnown?: 'known' | 'unknown';
  whoPosted?: string;
  details?: string;
};

type Props = {
  initial?: Partial<IncidentData>;
  onNext: (data: IncidentData) => void;
  onBack?: () => void;
  keyboardHeight?: number;
};

/**
 * IncidentForm
 * - Stage 2 of the reporting flow.
 * - Upload screenshots, select type of bullying, offender known/unknown, and provide details.
 */
export default function IncidentForm({
  initial = {},
  onNext,
  onBack,
  keyboardHeight = 0,
}: Props) {
  const [screenshots, setScreenshots] = useState<{ uri: string }[]>(
    initial.screenshots ?? [],
  );
  const [bullyingType, setBullyingType] = useState(initial.bullyingType ?? '');
  const [offenderKnown, setOffenderKnown] = useState<'known' | 'unknown'>(
    initial.offenderKnown ?? 'unknown',
  );
  const [whoPosted, setWhoPosted] = useState(initial.whoPosted ?? '');
  const [details, setDetails] = useState(initial.details ?? '');
  const maxChars = 2000;

  const bullyOptions = [
    { label: 'Verbal Abuse', value: 'verbal' },
    { label: 'Harassment', value: 'harassment' },
    { label: 'Exclusion', value: 'exclusion' },
    { label: 'Cyberbullying', value: 'cyber' },
    { label: 'Threats', value: 'threats' },
    { label: 'Sexual', value: 'sexual' },
  ];

  const whoOptions = [
    { label: 'Known', value: 'known' },
    { label: 'Unkown', value: 'unkown' },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: keyboardHeight > 0 ? keyboardHeight : 40,
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      className="px-4 pt-2 bg-white"
    >
      <Text className="text-center text-lg text-slate-600 font-semibold mb-4">
        Incident
      </Text>

      <View className="space-y-3">
        <FileUploader
          value={screenshots}
          onChange={(items) => setScreenshots(items as any)}
          maxFiles={5}
          placeholder="Screenshot (Optional)"
        />

        <View>
          <Text className="text-sm text-slate-600 mb-2">
            Types of Bullying*
          </Text>
          <DropdownSelect
            options={bullyOptions}
            selectedValue={bullyingType}
            onValueChange={setBullyingType}
            placeholder="Select type"
          />
        </View>

        <View className="mt-2">
          <Text className="text-sm text-slate-600 mb-2">Who posted*</Text>
          <DropdownSelect
            options={whoOptions}
            selectedValue={whoPosted}
            onValueChange={setWhoPosted}
            placeholder="Who posted?"
          />
        </View>

        <View className="mt-2">
          <Text className="text-sm text-slate-600 mb-2">Incident Details*</Text>
          <TextInput
            value={details}
            onChangeText={(t) => setDetails(t.slice(0, maxChars))}
            placeholder="Describe the incident (2000 characters)"
            multiline
            numberOfLines={6}
            className="rounded px-4 py-4 bg-gray-100 text-slate-700"
          />
          <Text className="text-xs text-slate-400 text-right mt-1">
            {details.length}/{maxChars}
          </Text>
        </View>

        <View className="mt-4 flex-row">
          <TouchableOpacity
            onPress={() => onBack?.()}
            className="px-4 py-3 rounded-full bg-slate-100 items-center justify-center mr-3 flex-1"
          >
            <Text className="text-slate-700 text-center">Back</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="Proceed"
            onPress={() =>
              onNext({
                screenshots,
                bullyingType,
                offenderKnown,
                whoPosted,
                details,
              })
            }
            additionalClasses="w-1/2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
