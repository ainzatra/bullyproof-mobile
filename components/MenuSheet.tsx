import { images } from '@/constants/images';
import { useLogoutUser, useUser } from '@/stores/useUserStore';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function MenuSheet({ visible, onClose }: Props) {
  const user = useUser();
  const logout = useLogoutUser();

  const navigateTo = (path: string) => {
    onClose();
    router.push(path as any);
  };

  const confirmLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          onClose();
        },
      },
    ]);
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onClose();
            Alert.alert('Account has been deleted');
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView className="bg-white rounded-t-3xl max-h-3/4">
        <View className="px-4 pt-4 pb-2 border-b border-slate-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={images.logo}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
              <View className="ml-3">
                <Text className="text-base font-semibold text-slate-900">
                  {user?.name ?? 'User'}
                </Text>
                <Text className="text-xs text-slate-500">
                  {user?.email ?? ''}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                onClose();
                // No profile screen yet
                // router.push('/profile');
              }}
              className="p-2"
              accessibilityRole="button"
            >
              <Feather name="edit-2" size={20} color="#0f172a" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View className="px-4 pt-4">
            <TouchableOpacity
              onPress={() => navigateTo('/report')}
              className="flex-row items-center py-3"
            >
              <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                <Feather name="alert-circle" size={20} color="#64748b" />
              </View>
              <View className="ml-3">
                <Text className="font-semibold text-slate-900">
                  Report Incident
                </Text>
                <Text className="text-xs text-slate-500">
                  Report or track an incident
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('/seek-help')}
              className="flex-row items-center py-3"
            >
              <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                <Feather name="phone" size={20} color="#64748b" />
              </View>
              <View className="ml-3">
                <Text className="font-semibold text-slate-900">Seek Help</Text>
                <Text className="text-xs text-slate-500">
                  Find nearby support
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('/tips')}
              className="flex-row items-center py-3"
            >
              <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                <Ionicons name="bulb-outline" size={20} color="#64748b" />
              </View>
              <View className="ml-3">
                <Text className="font-semibold text-slate-900">
                  Safety Tips
                </Text>
                <Text className="text-xs text-slate-500">
                  Read safety recommendations
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="my-3 border-t border-slate-200" />

          <View className="px-4">
            <TouchableOpacity
              onPress={() => navigateTo('/about')}
              className="flex-row items-center py-3"
            >
              <Feather name="info" size={18} color="#64748b" />
              <Text className="ml-3 text-slate-800">About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('/contact')}
              className="flex-row items-center py-3"
            >
              <Feather name="phone-call" size={18} color="#64748b" />
              <Text className="ml-3 text-slate-800">Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('/privacy')}
              className="flex-row items-center py-3"
            >
              <Feather name="shield" size={18} color="#64748b" />
              <Text className="ml-3 text-slate-800">Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('/terms')}
              className="flex-row items-center py-3"
            >
              <Feather name="file-text" size={18} color="#64748b" />
              <Text className="ml-3 text-slate-800">Terms and Conditions</Text>
            </TouchableOpacity>
          </View>

          <View className="my-4 px-4 gap-2">
            <TouchableOpacity
              onPress={confirmDeleteAccount}
              className="bg-red-500 rounded-md items-center justify-center py-3"
            >
              <Text className="text-white font-semibold">DELETE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmLogout}
              className="border border-primary-main rounded-md items-center justify-center py-3"
            >
              <Text className="text-slate-800 font-semibold">LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
