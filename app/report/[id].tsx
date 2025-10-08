import { useReportById } from '@/api/queries';
import AuthGuard from '@/components/AuthGuard';
import ReportDetails from '@/components/report/ReportDetails';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useUser } from '@/stores/useUserStore';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Dynamic Report Screen (outside tabs)
 * Route: /report/[id]
 * - Placed outside the (tabs) group so it will not show in the tab bar
 * - Reads the id param using expo-router's useLocalSearchParams
 * - Fetches the report using useReportById(token, id)
 * - Uses Tailwind (nativewind) classes and small components
 */

const ReportByIdScreen: React.FC = () => {
  const params = useLocalSearchParams() as { id?: string };
  const router = useRouter();
  const user = useUser();

  const id = String(params?.id ?? '');

  const {
    data: report,
    isLoading,
    isError,
  } = useReportById(user?.token ?? '', id);

  return (
    <AuthGuard>
      <SafeAreaView className="flex-1 bg-white">
        <LoadingOverlay visible={isLoading} message="Loading report..." />

        <View className="px-4 pt-3 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.replace('/report')}
            className="px-2 py-1 flex-row items-center gap-2"
          >
            <AntDesign name="leftcircle" size={18} color="black" />
            <Text className="text-slate-700">Back</Text>
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-[#063b82]">
            Report Details
          </Text>

          <View style={{ width: 40 }} />
        </View>

        <View className="flex-1">
          {isError ? (
            <View className="p-4">
              <Text className="text-center text-rose-600">
                Failed to load report. Please try again later.
              </Text>
            </View>
          ) : (
            <ReportDetails report={report ?? null} />
          )}
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default ReportByIdScreen;
