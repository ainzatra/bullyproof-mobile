import { images } from '@/constants/images';
import { useSetUser, useUser } from '@/stores/useUserStore';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DatePickerField,
  DropdownSelect,
  InputField,
  PasswordField,
} from '../../components/FormControls';

const Signup = () => {
  const router = useRouter();
  const user = useUser();
  const setUser = useSetUser();
  const [showDate, setShowDate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: '',
    grade: '',
    section: '',
    password: '',
    confirmPassword: '',
    parentName: '',
    parentEmail: '',
    contact: '',
    relationship: '',
    address: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  // Scroll + keyboard helpers — make ScrollView bottom padding follow the keyboard height
  const scrollRef = useRef<any>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e: any) => {
      setKeyboardHeight(e.endCoordinates?.height ?? 0);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Generic input handler
  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    const completeForm = Object.values(formData).every(
      (field) => field !== '' && field !== false,
    );
    if (!completeForm) {
      Alert.alert('Validation', 'Please fill up all fields.');
      return;
    }
    if (!formData.password || formData.password !== formData.confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({ id: '1', name: formData.fullName, email: formData.email }); // Mock user data
      router.replace('/onboarding');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#063b58]"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0} // adjust if needed
    >
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center">
          <Image source={images.logoDark} className="w-12 h-12 mr-3" />
          <Text className="text-white text-3xl font-extrabold">Sign Up</Text>
        </View>
        <Text className="text-[#bcd3df] mt-2">Please create an account</Text>
      </View>

      <View className="flex-1 bg-[#f6f6f8] rounded-t-3xl p-6">
        {/* Tabs */}
        <View className="flex-row items-center justify-center mb-4">
          <Link
            href={'/login'}
            className="bg-white px-6 py-2 rounded-full mr-3"
          >
            <Text className="text-[#c86d55] font-medium">Login</Text>
          </Link>

          <Pressable
            onPress={() => {}}
            className="bg-[#c86d55] px-6 py-2 rounded-full"
            accessibilityLabel="Sign up tab"
          >
            <Text className="text-white font-medium">Sign Up</Text>
          </Pressable>
        </View>

        <View className="items-center mb-6">
          <View className="w-16 h-1.5 bg-black rounded-full opacity-30" />
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 40 : 0,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          {/* Personal Information */}
          <Text className="text-center text-gray-600 mb-3 font-medium">
            Personal Information
          </Text>
          <View className="gap-3 mb-4">
            <InputField
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              placeholder="Full name"
              additionalClass="bg-gray-200"
            />
            <InputField
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Email"
              keyboardType="email-address"
              additionalClass="bg-gray-200"
            />

            <View className="flex-row gap-3">
              <DatePickerField
                value={formData.dob}
                onChange={(value) => handleChange('dob', value)}
                placeholder="Date of birth"
                additionalClass="bg-gray-200 "
              />
              <DropdownSelect
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
                selectedValue={formData.gender}
                onValueChange={(value) => handleChange('gender', value)}
                placeholder="Gender"
                style={{ width: 112 }}
              />
            </View>

            <View className="flex-row gap-3">
              <DropdownSelect
                options={Array.from({ length: 12 }, (_, i) => ({
                  label: `Grade ${i + 1}`,
                  value: `${i + 1}`,
                }))}
                selectedValue={formData.grade}
                onValueChange={(value) => handleChange('grade', value)}
                placeholder="Grade"
                style={{ width: 100 }}
              />
              <InputField
                value={formData.section}
                onChangeText={(text) => handleChange('section', text)}
                placeholder="Section"
                additionalClass="bg-gray-200"
              />
            </View>

            <PasswordField
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="Password"
              additionalClass="bg-gray-200"
            />
            <PasswordField
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange('confirmPassword', text)}
              placeholder="Confirm Password"
              additionalClass="bg-gray-200"
            />
          </View>

          {/* Parents / Guardian */}
          <Text className="text-center text-gray-600 mb-3 font-medium">
            Parents/Guardian Information
          </Text>
          <View className="gap-3 mb-3">
            <InputField
              value={formData.parentName}
              onChangeText={(text) => handleChange('parentName', text)}
              placeholder="Full name"
              additionalClass="bg-gray-200"
            />
            <InputField
              value={formData.parentEmail}
              onChangeText={(text) => handleChange('parentEmail', text)}
              placeholder="Email"
              keyboardType="email-address"
              additionalClass="bg-gray-200"
            />
            <InputField
              value={formData.contact}
              onChangeText={(text) => handleChange('contact', text)}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              additionalClass="bg-gray-200"
            />
            <InputField
              value={formData.relationship}
              onChangeText={(text) => handleChange('relationship', text)}
              placeholder="Relationship"
              additionalClass="bg-gray-200"
            />
            <InputField
              value={formData.address}
              onChangeText={(text) => handleChange('address', text)}
              placeholder="Address"
              additionalClass="bg-gray-200"
            />
          </View>

          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => handleChange('agree', !formData.agree)}
              className="mr-3"
            >
              <View
                className={`flex items-center w-4 h-4 ${formData.agree ? 'bg-[#c86d55]' : 'bg-white border'} rounded-sm`}
              >
                {formData.agree && <Feather name="check" size={12} />}
              </View>
            </TouchableOpacity>
            <Text className="text-gray-600">
              I have read T&C and Privacy Policy.
            </Text>
          </View>

          <TouchableOpacity
            onPress={onSubmit}
            className="bg-[#c86d55] rounded-full py-3 items-center mb-4"
            disabled={loading}
          >
            <Text className="text-white font-semibold">
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
