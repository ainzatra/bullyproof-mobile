import { getBaseUrl } from '@/api/axios';
import { useCreateReport } from '@/api/mutations';
import { useReports } from '@/api/queries';
import Header from '@/components/Header';
import IncidentForm from '@/components/report/IncidentForm';
import ReportList from '@/components/report/ReportList';
import SubmissionModal from '@/components/report/SubmissionModal';
import TermsCard from '@/components/report/TermsCard';
import { IncidentData } from '@/components/report/types';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useUser } from '@/stores/useUserStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import * as ExpoFileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
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
  const qc = useQueryClient();
  const [subTab, setSubTab] = useState<'report' | 'track'>('report');
  const [loading, setLoading] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const [agreed, setAgreed] = useState(false);
  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);

  const { data: reports } = useReports(user?.token ?? '', user?.id ?? '');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (subTab === 'track') {
      qc.invalidateQueries({ queryKey: ['reports'] });
    }
  }, [subTab]);

  useFocusEffect(
    useCallback(() => {
      if (subTab === 'track') {
        qc.invalidateQueries({ queryKey: ['reports'] });
      }
    }, [subTab]),
  );

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
  };

  const handleIncidentSubmit = async (data: any) => {
    setLoading(true);
    // keep local state
    console.log('incident data', data);
    setIncidentData(data);

    console.log('files on incident submit', data);

    try {
      const form = new FormData();
      const studentId = String(user?.id ?? '');
      const incidentDetails = data?.details ?? '';
      const knowsBully = data?.knowsBully ?? 'false';

      form.append('studentId', studentId);
      form.append('details', incidentDetails);
      form.append('knowsBully', knowsBully);
      // Remove feelings from the form as we're no longer collecting impact data
      form.append('feelings', 'N/A');

      const files = data?.files ?? [];

      // Append all the evidence files to form data
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const name = f.name ?? (f.uri ? f.uri.split('/').pop() : `file_${i}`);
        const type = f.type ?? f.mimeType ?? 'application/octet-stream';
        // React Native FormData file shape
        form.append(
          'evidences',
          {
            uri: f.uri,
            name,
            type,
          } as any,
          f.name,
        );
      }

      const token = user?.token || '';

      console.log('Report payload:', form);
      const API_URL = getBaseUrl();
      const response = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || 'Failed to submit report');
      }
      console.log('Report submission response:', result);
      console.log('Report submitted');

      qc.invalidateQueries({ queryKey: ['reports'] });
      console.log('Refetched report list');

      // Show submission modal with helpful resources instead of simple alert.
      setShowSubmissionModal(true);
    } catch (error: any) {
      console.error('Error', error);
      Alert.alert(
        'Report Submission Error',
        error?.message || 'Network error. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const getEncoded = async (uri: string, type: string): Promise<string> => {
    return await ExpoFileSystem.readAsStringAsync(uri, {
      encoding: ExpoFileSystem.EncodingType.Base64,
    }).then((str) => {
      console.log('str', str);
      return `${str}`;
    });
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

          <View className="flex-1">
            <IncidentForm
              initial={incidentData ?? {}}
              onNext={handleIncidentSubmit}
              onBack={() => setAgreed(false)}
              keyboardHeight={keyboardHeight}
            />
          </View>

          <View className="h-6" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <LoadingOverlay message="Submitting Report" visible={loading} />
      <SubmissionModal
        visible={showSubmissionModal}
        onClose={() => {
          setShowSubmissionModal(false);
          // reset flow and go to Track tab
          setAgreed(false);
          setIncidentData(null);
          setSubTab('track');
        }}
      />
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
            onSelect={(r) => router.push(`/report/${r.id}`)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
