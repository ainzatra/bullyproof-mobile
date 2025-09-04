import { useCreateReport } from '@/api/mutations';
import { useReports } from '@/api/queries';
import Header from '@/components/Header';
import ImpactForm from '@/components/report/ImpactForm';
import IncidentForm from '@/components/report/IncidentForm';
import ReportList from '@/components/report/ReportList';
import StepProgress from '@/components/report/StepProgress';
import TermsCard from '@/components/report/TermsCard';
import { ImpactData, IncidentData } from '@/components/report/types';
import { useUser } from '@/stores/useUserStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
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
  const createReportMutation = useCreateReport();
  const [subTab, setSubTab] = useState<'report' | 'track'>('report');

  const [agreed, setAgreed] = useState(false);
  const [stage, setStage] = useState(0); // 0 = incident, 1 = impact
  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);
  const [impactData, setImpactData] = useState<ImpactData | null>(null);

  const { data: reports } = useReports(user?.token ?? '', user?.id ?? '');
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

  const startReport = () => {
    setAgreed(true);
    setStage(0);
  };

  const handleIncidentNext = (data: any) => {
    setIncidentData(data);
    setStage(1);
  };

  const handleImpactNext = async (data: any) => {
    // keep local state
    setImpactData(data);

    try {
      const form = new FormData();
      form.append('studentId', String(user?.id ?? ''));
      form.append('details', incidentData?.details ?? '');
      let feelingsList = data?.feelings ?? [];
      if (data?.others) {
        feelingsList = [...feelingsList, data.others];
      }
      form.append('feelings', feelingsList.join(','));

      const files = incidentData?.files ?? [];
      for (let i = 0; i < files.length; i++) {
        const f: any = files[i];
        const name = f.name ?? (f.uri ? f.uri.split('/').pop() : `file_${i}`);
        const type = f.type ?? f.mimeType ?? 'application/octet-stream';
        // React Native FormData file shape
        form.append('evidences', {
          uri: f.uri,
          name,
          type,
        } as any);
      }

      const token = user?.token || '';
      const respData = await createReportMutation.mutateAsync({ form, token });

      Alert.alert('Submitted', 'Your report has been submitted.');

      // reset flow and go to Track tab
      setAgreed(false);
      setStage(0);
      setIncidentData(null);
      setImpactData(null);
      setSubTab('track');
    } catch (error: any) {
      console.error('Error', error);
      Alert.alert(
        'Error',
        error?.message || 'Network error. Please try again.',
      );
    }
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
            total={2}
            active={stage}
            labels={['Incident', 'Impact']}
          />

          <View className="flex-1">
            {stage === 0 && (
              <IncidentForm
                initial={incidentData ?? {}}
                onNext={handleIncidentNext}
                onBack={() => setAgreed(false)}
                keyboardHeight={keyboardHeight}
              />
            )}
            {stage === 1 && (
              <ImpactForm
                initial={impactData ?? {}}
                onNext={handleImpactNext}
                onBack={() => setStage(0)}
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
