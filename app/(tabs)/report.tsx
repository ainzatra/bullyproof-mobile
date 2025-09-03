import Header from '@/components/Header';
import ImpactForm from '@/components/report/ImpactForm';
import IncidentForm from '@/components/report/IncidentForm';
import ReportList from '@/components/report/ReportList';
import StepProgress from '@/components/report/StepProgress';
import TermsCard from '@/components/report/TermsCard';
import VictimDetailsForm from '@/components/report/VictimDetailsForm';
import { useUser } from '@/stores/useUserStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportScreen = () => {
  const user = useUser();
  const [subTab, setSubTab] = useState<'report' | 'track'>('report');

  const [agreed, setAgreed] = useState(false);
  const [stage, setStage] = useState(0); // 0 = victim, 1 = incident, 2 = impact
  const [victimData, setVictimData] = useState<any>(null);
  const [incidentData, setIncidentData] = useState<any>(null);
  const [impactData, setImpactData] = useState<any>(null);

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

  // local reports list (in-memory). In a real app, persist or use API.
  const [reports, setReports] = useState<any[]>([
    {
      id: '1',
      title: 'John Doe - Bullying Report',
      date: '2024-06-01 14:23',
      status: 'reported',
      excerpt: 'A student was bullied on the school bus...',
    },
    {
      id: '2',
      title: 'Jane Smith - Harassment Report',
      date: '2024-05-28 09:15',
      status: 'in progress',
      excerpt: 'An incident of online harassment was reported...',
    },
    {
      id: '3',
      title: 'Mike Johnson - Cyberbullying Report',
      date: '2024-05-20 16:45',
      status: 'resolved',
      excerpt: 'A case of cyberbullying involving social media...',
    },
  ]);

  const startReport = () => {
    setAgreed(true);
    setStage(0);
  };

  const handleVictimNext = (data: any) => {
    const shapedVictim = {
      name: data.fullName ?? data.name ?? '',
      email: data.email ?? '',
      birthday: data.dob ?? data.birthday ?? '',
      gender: data.gender ?? '',
      grade: data.grade ?? '',
      section: data.section ?? '',
      guardian: {
        name: data.parentName ?? data.guardian?.name ?? '',
        phone: data.contactNumber ?? data.guardian?.phone ?? '',
        email: data.parentEmail ?? data.guardian?.email ?? '',
        relationship: data.relationship ?? data.guardian?.relationship ?? '',
        address: data.address ?? data.guardian?.address ?? '',
      },
    };
    setVictimData(shapedVictim);
    setStage(1);
  };

  const handleIncidentNext = (data: any) => {
    setIncidentData(data);
    setStage(2);
  };

  const handleImpactNext = (data: any) => {
    setImpactData(data);

    // assemble report summary and add to list
    const id = Date.now().toString();
    const title = victimData?.name
      ? `${victimData.name} - ${incidentData?.bullyingType ?? 'Report'}`
      : 'New report';
    const excerpt = (incidentData?.details ?? '').slice(0, 60);
    const summary = {
      id,
      title,
      date: new Date().toLocaleString(),
      status: 'reported',
      excerpt,
      full: { victim: victimData, incident: incidentData, impact: data },
    };
    setReports((prev) => [summary, ...prev]);

    // reset flow and go to Track tab
    setAgreed(false);
    setStage(0);
    setVictimData(null);
    setIncidentData(null);
    setImpactData(null);
    setSubTab('track');
  };

  // Render the right content for the report flow
  const renderReportFlow = () => {
    if (!agreed) {
      return <TermsCard onAgree={startReport} />;
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        className="flex-1 bg-white"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-4 pt-3">
            <Text className="text-lg font-semibold text-[#c85e48]">
              REPORTING FORM
            </Text>
          </View>

          <StepProgress
            total={3}
            active={stage}
            labels={['Victim Details', 'Incident', 'Impact']}
          />

          <View className="flex-1">
            {stage === 0 && (
              <VictimDetailsForm
                initial={user as any}
                onNext={handleVictimNext}
                onBack={() => setAgreed(false)}
                keyboardHeight={keyboardHeight}
              />
            )}
            {stage === 1 && (
              <IncidentForm
                initial={incidentData ?? {}}
                onNext={handleIncidentNext}
                onBack={() => setStage(0)}
                keyboardHeight={keyboardHeight}
              />
            )}
            {stage === 2 && (
              <ImpactForm
                initial={impactData ?? {}}
                onNext={handleImpactNext}
                onBack={() => setStage(1)}
                keyboardHeight={keyboardHeight}
              />
            )}
          </View>

          <View className="h-6" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <View className="px-4 pt-2">
        <View className="flex-row items-center justify-between">
          <View />
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setSubTab('report')}
              className={`px-4 py-2 rounded-l-full ${subTab === 'report' ? 'bg-[#063b82]' : 'bg-slate-100'}`}
            >
              <Text
                className={`${subTab === 'report' ? 'text-white' : 'text-slate-700'} font-semibold`}
              >
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubTab('track')}
              className={`px-4 py-2 rounded-r-full ${subTab === 'track' ? 'bg-[#063b82]' : 'bg-slate-100'}`}
            >
              <Text
                className={`${subTab === 'track' ? 'text-white' : 'text-slate-700'} font-semibold`}
              >
                Track
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <FontAwesome5 name="exclamation-circle" size={22} color="#063b82" />
          </View>
        </View>
      </View>

      <View className="flex-1">
        {subTab === 'report' ? (
          renderReportFlow()
        ) : (
          <ReportList
            reports={reports}
            onSelect={(r) =>
              console.log('selected', JSON.stringify(r, null, 2))
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
