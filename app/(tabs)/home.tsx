import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { useLogoutUser, useUser } from '@/stores/useUserStore';

import { useReports } from '@/api/queries';
import Header from '@/components/Header';
import ActionCard from '@/components/ui/ActionCard';
import SummaryCard from '@/components/ui/SummaryCard';

export default function Home() {
  const user = useUser();
  const logout = useLogoutUser();
  const { data: reports } = useReports(user?.token ?? '', user?.id ?? '');

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { submitted: 0, alert: 0, resolved: 0 };
    (reports ?? []).forEach((r: any) => {
      const s = String(r?.status ?? '').toLowerCase();
      if (s.includes('resolved')) c.resolved++;
      else if (
        s.includes('inprogress') ||
        s.includes('in progress') ||
        s.includes('progress') ||
        s.includes('alert')
      )
        c.alert++;
      else if (s.includes('pending')) c.submitted++;
      else c.submitted++;
    });
    return c;
  }, [reports]);

  const summary = [
    {
      id: 'pending',
      number: reports?.length ?? 0,
      label: 'Total Reports',
      icon: <FontAwesome5 name="file-alt" size={20} color="#fa984d" />,
      bgClass: 'bg-white',
    },
  ];

  const onLogout = () => logout();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header notificationCount={1} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View className="bg-blue-800 rounded-xl p-4 flex-row items-center mb-4">
          <Image
            source={user?.avatar ? { uri: user.avatar } : images.logoDarkv2}
            className="w-14 h-14 rounded-full mr-3 border-2 border-white"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">
              {user?.name.split(' ')[0] ?? 'Jasmine Cruz'}
            </Text>
          </View>
        </View>
        {/* Summary Section */}
        <Text className="text-slate-700 font-semibold mb-2">Summary</Text>
        <View className="mb-4 flex flex-row w-full justify-between gap-2">
          {summary.map((s) => (
            <SummaryCard
              key={s.id}
              number={s.number}
              label={s.label}
              icon={s.icon}
              bgClass={s.bgClass}
            />
          ))}
        </View>

        {/* Main Action Cards */}
        <Text className="text-slate-700 font-semibold mb-2">Explore</Text>

        <ActionCard
          title="Report an Incident"
          description="Report cyberbullying, get expert support and track progress. We're here to help!"
          bgClass="bg-rose-100"
          illustration={images.onboard2}
        />

        <ActionCard
          title="Seek Help"
          description="Overcome cyberbullying trauma with our counsellors. Start healing today!"
          bgClass="bg-sky-100"
          illustration={images.onboard3}
        />

        <ActionCard
          title="Safety Tips"
          description="Get smart about cyber safety. Learn how to report, block, and get help today!"
          bgClass="bg-amber-100"
          illustration={images.onboard4}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
