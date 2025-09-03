import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  DatePickerField,
  DropdownSelect,
  InputField,
  PrimaryButton,
} from '../FormControls';

type VictimData = {
  name: string;
  email: string;
  birthday?: string;
  gender?: string;
  grade?: string;
  section?: string;
  guardian?: {
    name?: string;
    email?: string;
    phone?: string;
    relationship?: string;
    address?: string;
  };
};

type Props = {
  initial?: Partial<VictimData>;
  onNext: (data: VictimData) => void;
  onBack?: () => void;
  keyboardHeight?: number;
};

export default function VictimDetailsForm({
  initial = {},
  onNext,
  onBack,
  keyboardHeight = 0,
}: Props) {
  const formatISOToYMD = (iso?: string) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return iso?.split?.('T')?.[0] ?? '';
    }
  };

  const [name, setName] = useState(initial.name ?? '');
  const [email, setEmail] = useState(initial.email ?? '');
  const [dob, setDob] = useState(formatISOToYMD(initial.birthday) ?? '');
  const [gender, setGender] = useState(initial.gender ?? '');
  const [grade, setGrade] = useState(initial.grade?.toString() ?? '');
  const [section, setSection] = useState(initial.section ?? '');
  const [parentName, setParentName] = useState(initial.guardian?.name ?? '');
  const [parentEmail, setParentEmail] = useState(initial.guardian?.email ?? '');
  const [contactNumber, setContactNumber] = useState(
    initial.guardian?.phone ?? '',
  );
  const [relationship, setRelationship] = useState(
    initial.guardian?.relationship ?? '',
  );
  const [address, setAddress] = useState(initial.guardian?.address ?? '');

  const gradeOptions = [
    { label: 'Grade 1', value: '1' },
    { label: 'Grade 2', value: '2' },
    { label: 'Grade 3', value: '3' },
    { label: 'Grade 4', value: '4' },
    { label: 'Grade 5', value: '5' },
    { label: 'Grade 6', value: '6' },
    { label: 'Grade 7', value: '7' },
    { label: 'Grade 8', value: '8' },
    { label: 'Grade 9', value: '9' },
    { label: 'Grade 10', value: '10' },
    { label: 'Grade 11', value: '11' },
    { label: 'Grade 12', value: '12' },
  ];

  const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' },
  ];

  const handleProceed = () => {
    // Basic required checks (name, email)
    const payload: VictimData = {
      name,
      email,
      birthday: dob,
      gender,
      grade,
      section,
      guardian: {
        name: parentName,
        email: parentEmail,
        phone: contactNumber,
        relationship,
        address,
      },
    };
    onNext(payload);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: keyboardHeight > 0 ? keyboardHeight + 40 : 40,
      }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
      className="p-6 bg-[#f6f6f8] rounded-t-3xl"
    >
      <Text className="text-center text-gray-600 mb-3 font-medium">
        Personal Information
      </Text>

      <View className="gap-3 mb-4">
        <InputField
          value={name}
          onChangeText={setName}
          placeholder="Full name*"
          additionalClass="bg-gray-200"
        />
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="Email*"
          keyboardType="email-address"
          additionalClass="bg-gray-200"
        />

        <View className="flex-row gap-3">
          <DatePickerField
            value={dob}
            onChange={setDob}
            placeholder="Date of birth*"
            additionalClass="bg-gray-200"
          />
          <DropdownSelect
            options={genderOptions}
            selectedValue={gender}
            onValueChange={setGender}
            placeholder="Gender"
            style={{ width: 112 }}
          />
        </View>

        <View className="flex-row gap-3">
          <DropdownSelect
            options={gradeOptions}
            selectedValue={grade}
            onValueChange={setGrade}
            placeholder="Grade"
            style={{ width: 100 }}
          />
          <InputField
            value={section}
            onChangeText={setSection}
            placeholder="Section"
            additionalClass="bg-gray-200"
          />
        </View>
      </View>

      <Text className="text-center text-gray-600 mb-3 font-medium">
        Parents/Guardian Information
      </Text>
      <View className="gap-3 mb-3">
        <InputField
          value={parentName}
          onChangeText={setParentName}
          placeholder="Full name*"
          additionalClass="bg-gray-200"
        />
        <InputField
          value={parentEmail}
          onChangeText={setParentEmail}
          placeholder="Email*"
          keyboardType="email-address"
          additionalClass="bg-gray-200"
        />
        <InputField
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Contact Number*"
          keyboardType="phone-pad"
          additionalClass="bg-gray-200"
        />
        <InputField
          value={relationship}
          onChangeText={setRelationship}
          placeholder="Relationship*"
          additionalClass="bg-gray-200"
        />
        <InputField
          value={address}
          onChangeText={setAddress}
          placeholder="Address*"
          additionalClass="bg-gray-200"
        />
      </View>

      <View className="mt-4 flex-row">
        <TouchableOpacity
          onPress={() => onBack?.()}
          className="px-4 py-3 rounded-full bg-white items-center justify-center mr-3 flex-1"
        >
          <Text className="text-slate-700 text-center">Back</Text>
        </TouchableOpacity>
        <PrimaryButton
          title="Proceed"
          onPress={handleProceed}
          additionalClasses={'w-1/2'}
        />
      </View>
    </ScrollView>
  );
}
