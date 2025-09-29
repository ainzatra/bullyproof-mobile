import { images } from '@/constants/images';
import { useLogoutUser } from '@/stores/useUserStore';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BlockedScreen() {
  const logoutUser = useLogoutUser();

  const handleLogout = () => {
    logoutUser();
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-main justify-center items-center p-4">
      <Image source={images.logoDarkv2} className="w-72 h-72" />
      <View className="items-center">
        <Text className="text-2xl font-bold text-red-500 mb-4">
          Account Blocked
        </Text>
        <Text className="text-base text-white text-center mb-8">
          Your account has been blocked. Please contact the guidance office for
          more information.
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
