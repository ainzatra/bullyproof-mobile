import {
  InputField,
  PasswordField,
  PrimaryButton,
} from '@/components/FormControls';
import { images } from '@/constants/images';
import { useSetUser } from '@/stores/useUserStore';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
/**
 * Improved Login Screen
 * - Uses a clean header with logo
 * - Tab-style toggle between Login / Sign Up
 * - Friendly input fields with clear affordances
 * - Remember me, forgot password, and social login button
 *
 * Note: Uses Tailwind/nativewind className props. If nativewind is not configured,
 * convert className -> style or simple StyleSheet objects.
 */

const Login = () => {
  const router = useRouter();
  const setUser = useSetUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onLogin = () => {
    // basic validation & fake submit for demo
    if (!email.trim() || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation', 'Please enter valid email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For a real app, call your auth API here
      setUser({ id: '1', name: 'User', email }); // Mock user data
      router.replace('/onboarding');
    }, 900);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#063b58]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 min-h-screen">
          {/* Header area */}
          <View className="px-6 pt-12 pb-6">
            <View className="flex-row items-center">
              <Image source={images.logoDark} className="w-12 h-12 mr-3" />
              <Text className="text-white text-3xl font-extrabold">Login</Text>
            </View>
            <Text className="text-[#bcd3df] mt-2">
              Please sign in to continue
            </Text>
          </View>

          {/* Card */}
          <View className="flex-1 bg-[#f6f6f8] rounded-t-3xl p-6">
            {/* Tabs */}
            <View className="flex-row items-center justify-center mb-4">
              <Pressable
                onPress={() => {}}
                className="bg-[#c86d55] px-6 py-2 rounded-full mr-3 shadow"
                accessibilityLabel="Login tab"
              >
                <Text className="text-white font-medium">Login</Text>
              </Pressable>

              <Link
                href={'/signup'}
                className="bg-white px-6 py-2 rounded-full"
                accessibilityLabel="Go to sign up"
              >
                <Text className="text-[#c86d55] font-medium">Sign Up</Text>
              </Link>
            </View>

            {/* Draggable handle mimic */}
            <View className="items-center mb-6">
              <View className="w-16 h-1.5 bg-black rounded-full opacity-30" />
            </View>

            {/* Form */}
            <View className="gap-4">
              <View className="flex-row items-center bg-gray-300 rounded-full px-1 py-1">
                <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
                  <Fontisto name="email" size={24} color="black" />
                </View>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>

              <View className="flex-row items-center bg-gray-300 rounded-full px-1 py-1">
                <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
                  <AntDesign name="lock" size={24} color="black" />
                </View>
                <PasswordField
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                />
              </View>

              <View className="flex-row justify-end items-center px-1">
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Forgot Password',
                      'Password reset flow goes here',
                    )
                  }
                >
                  <Text className="text-sm text-gray-600">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <PrimaryButton
                title={loading ? 'Signing in...' : 'Login'}
                onPress={onLogin}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
