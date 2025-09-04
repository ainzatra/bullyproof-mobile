import { useResendOtp, useVerifyOtp } from '@/api/mutations';
import { useSetUser } from '@/stores/useUserStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { PrimaryButton } from '@/components/FormControls';
import OTPInput from '@/components/OTPInput';
import { images } from '@/constants/images';

const VerifyEmail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) ?? '';
  const setUser = useSetUser();

  const [otp, setOtp] = useState('');
  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  useEffect(() => {
    if (!email) {
      router.replace('/login');
    }
  }, [email]);

  const onVerify = async () => {
    if (!otp.trim()) {
      Alert.alert('Validation', 'Please enter the verification code.');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'No email provided.');
      return;
    }

    try {
      const data = await verifyMutation.mutateAsync({
        email,
        code: otp.trim(),
      });
      console.log('success verify otp', data);
      setUser(data);
      router.replace('/onboarding');
    } catch (error: any) {
      Alert.alert(
        'Verification Failed',
        error?.message || 'Invalid code or server error',
      );
    }
  };

  const onResend = async () => {
    if (!email) {
      Alert.alert('Error', 'No email provided.');
      return;
    }

    try {
      await resendMutation.mutateAsync({ email });
      Alert.alert('Sent', 'Verification code has been resent to your email.');
    } catch (error: any) {
      Alert.alert('Resend Failed', error?.message || 'Unable to resend code');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#063b58]"
    >
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center">
          <Image source={images.logoDark} className="w-12 h-12 mr-3" />
          <Text className="text-white text-3xl font-extrabold">
            Verify Account
          </Text>
        </View>
        <Text className="text-[#bcd3df] mt-2">
          Enter the code we sent to your email{email ? ` (${email})` : ''}
        </Text>
      </View>

      <View className="flex-1 bg-[#f6f6f8] rounded-t-3xl p-6 justify-start">
        <View className="mb-4">
          <OTPInput value={otp} onChange={setOtp} length={6} />
        </View>

        <PrimaryButton
          title={verifyMutation.isPending ? 'Verifying...' : 'Verify'}
          onPress={onVerify}
          loading={verifyMutation.isPending}
          additionalClasses={'mt-4'}
        />

        <View className="items-center mt-4">
          <Text className="text-sm text-slate-600 mb-2">
            Didn't receive a code?
          </Text>
          <TouchableOpacity onPress={onResend} className="px-4 py-2">
            <Text className="text-primary-main font-semibold">
              {resendMutation.isPending ? 'Resending...' : 'Resend code'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <TouchableOpacity
            onPress={() => {
              router.replace('/login');
            }}
          >
            <Text className="text-center text-slate-600">Back to login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;
