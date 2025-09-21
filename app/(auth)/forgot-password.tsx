import { useSendResetOtp } from '@/api/mutations';
import { PrimaryButton } from '@/components/FormControls';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const sendResetOtp = useSendResetOtp();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSend = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendResetOtp.mutateAsync({ email: email.trim() });
      Alert.alert('Sent', 'A verification code has been sent to your email.');
      router.replace({
        pathname: '/forgot/verify/[email]',
        params: { email: email.trim() },
      });
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.message || 'Unable to send verification code.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#063b58]"
    >
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center">
          <Image source={images.logoDarkv2} className="w-12 h-12 mr-3" />
          <Text className="text-white text-3xl font-extrabold">
            Forgot Password
          </Text>
        </View>
        <Text className="text-[#bcd3df] mt-2">
          Enter your email and we'll send a code to reset your password
        </Text>
      </View>

      <View className="flex-1 bg-[#f6f6f8] rounded-t-3xl p-6 justify-start">
        <View className="gap-4">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            className="bg-gray-200 rounded px-4 py-3 text-gray-800"
          />

          <PrimaryButton
            title={sendResetOtp.isPending ? 'Sending...' : 'Send Code'}
            onPress={onSend}
            loading={sendResetOtp.isPending}
          />

          <View className="mt-6">
            <Text className="text-center text-slate-600">
              If the account exists, you'll receive an email with a verification
              code.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
