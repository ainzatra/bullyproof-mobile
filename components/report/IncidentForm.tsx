import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../FormControls';
import FileUploader from './FileUploader.v2';

import type { FileRef, IncidentData } from './types';

type Props = {
  initial?: Partial<IncidentData>;
  onNext: (data: IncidentData) => void;
  onBack?: () => void;
  keyboardHeight?: number;
};

/**
 * IncidentForm
 * - Stage 2 of the reporting flow.
 * - Upload files, select type of bullying, offender known/unknown, and provide details.
 */
export default function IncidentForm({
  initial = {},
  onNext,
  onBack,
  keyboardHeight = 0,
}: Props) {
  const [files, setFiles] = useState<FileRef[]>(initial.files ?? []);
  const [details, setDetails] = useState(initial.details ?? '');
  const [knowsBully, setKnowsBully] = useState(initial.knowsBully ?? 'false');
  const maxChars = 2000;

  const bullyOptions = [
    { label: 'Verbal Abuse', value: 'verbal' },
    { label: 'Harassment', value: 'harassment' },
    { label: 'Exclusion', value: 'exclusion' },
    { label: 'Cyberbullying', value: 'cyber' },
    { label: 'Threats', value: 'threats' },
    { label: 'Sexual', value: 'sexual' },
  ];

  const knowsBullyOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
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
          value={files}
          onChange={(items) => setFiles(items)}
          maxFiles={5}
          placeholder="Upload Evidence* (Max 5 files)"
        />

        <View className="my-2">
          <Text className="text-sm text-slate-600 mb-2">
            Do you know the person who bullied you?
          </Text>
          <View className="bg-gray-100 rounded-md">
            <Picker
              selectedValue={knowsBully}
              onValueChange={(itemValue) => setKnowsBully(itemValue)}
              style={{ height: 50 }}
            >
              {knowsBullyOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  color="black"
                />
              ))}
            </Picker>
          </View>
        </View>
        <View className="mt-2">
          <Text className="text-sm text-slate-600 mb-2">Incident Details*</Text>
          <View className=" bg-gray-100 h-40 rounded-md">
            <TextInput
              value={details}
              onChangeText={(t) => setDetails(t.slice(0, maxChars))}
              placeholder="Describe the incident (2000 characters)"
              multiline
              numberOfLines={6}
              className="rounded px-4 py-4 text-black placeholder:text-black"
            />
          </View>

          <Text className="text-xs text-slate-400 text-right my-1">
            {details.length}/{maxChars}
          </Text>
        </View>

        <View className="mt-auto flex-row">
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
                files,
                details,
                knowsBully,
              })
            }
            additionalClasses="w-1/2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
