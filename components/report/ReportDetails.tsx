import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ReportStatusBadge from './ReportStatusBadge';
import { ReportStatus } from './types';

type ReportShape = {
  id?: string;
  ai_flag: {
    toxicity?: number | string;
    insult?: boolean | string;
    threat?: boolean | string;
    profanity?: boolean | string;
    // The backend may return bullying categories as an array or a
    // stringified JSON. Accept both and parse at runtime.
    bullying_category?: string[] | string;
    sentiment?: string;
    urgency?: string;
    reason: string; // summary actually
  };
  status?: ReportStatus | string;
  notes?: string;
  actionTaken?: string;
  createdAt?: string;
};

type Props = {
  report: ReportShape | null | undefined;
};

/**
 * ReportDetails
 * - Presents a scrollable details card for a single report.
 * - Uses Tailwind classes (nativewind) so it fits the app's styling.
 * - Defensive: works even if fields are missing.
 */
export default function ReportDetails({ report }: Props) {
  if (!report) {
    return (
      <View className="p-4">
        <Text className="text-center text-slate-500">Report not found.</Text>
      </View>
    );
  }

  const boolToYesNo = (v: any) => {
    if (v === true || v === 'true')
      return { label: 'Yes', color: 'text-rose-600' };
    if (v === false || v === 'false')
      return { label: 'No', color: 'text-emerald-700' };
    return { label: String(v ?? 'No'), color: 'text-slate-700' };
  };

  /**
   * Parse bullying categories which may come as:
   * - an array of strings
   * - a JSON string like '["a","b"]'
   * - a comma-separated string 'a, b'
   */
  const parseBullyingCategories = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      // Try JSON.parse first (stringified JSON like '["a","b"]')
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
        if (parsed && typeof parsed === 'object') {
          // If an object was returned, try to extract values
          return Object.values(parsed).flat().map(String);
        }
      } catch {
        // Not JSON — fall back to comma-separated values
        return val
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }
    return [];
  };

  const categories = parseBullyingCategories(report.ai_flag?.bullying_category);

  const parseToxicity = (v: any) => {
    const n = Number(String(v ?? '').replace('%', ''));
    if (Number.isFinite(n)) return Math.max(0, Math.min(100, n));
    return null;
  };

  const toxicity = parseToxicity(report.ai_flag?.toxicity);
  const createdAtLabel = report.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : undefined;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View className="bg-white rounded-lg border border-slate-200 p-4">
        {/* Header: id + date + status */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 pr-3">
            <Text className="text-sm text-slate-500">Report ID</Text>
            <Text className="font-semibold text-slate-900">
              {report.id ?? '-'}
            </Text>
            {createdAtLabel ? (
              <Text className="text-xs text-slate-400 mt-1">
                {createdAtLabel}
              </Text>
            ) : null}
          </View>

          <View className="items-end">
            <ReportStatusBadge status={String(report.status ?? 'Pending')} />
          </View>
        </View>

        {/* AI Flags section */}
        <View className="bg-sky-50 rounded-md px-3 py-3 mb-4 border border-sky-100">
          <View className="flex-row items-center gap-2 mb-2">
            <Feather name="cpu" size={18} color="#0369a1" />
            <Text className="text-sky-800 font-semibold">
              AI-Generated flags
            </Text>
          </View>

          <View className="space-y-3">
            {/* Toxicity with simple bar */}
            <View className="flex-row items-center">
              <Text className="w-36 font-medium text-slate-700">Toxicity</Text>
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-slate-700">
                    {toxicity !== null ? `${toxicity}%` : 'N/A'}
                  </Text>
                  {toxicity !== null ? (
                    <Text
                      className={`text-xs font-semibold ${
                        toxicity >= 70
                          ? 'text-rose-600'
                          : toxicity >= 40
                            ? 'text-amber-600'
                            : 'text-emerald-700'
                      }`}
                    >
                      {toxicity >= 70
                        ? 'High'
                        : toxicity >= 40
                          ? 'Medium'
                          : 'Low'}
                    </Text>
                  ) : null}
                </View>
                <View className="h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
                  <View
                    style={{
                      width: toxicity !== null ? `${toxicity}%` : '0%',
                      backgroundColor:
                        toxicity === null
                          ? '#94a3b8'
                          : toxicity >= 70
                            ? '#fecaca'
                            : toxicity >= 40
                              ? '#fde68a'
                              : '#bbf7d0',
                      height: 8,
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Binary flags */}
            <View className="flex-row items-start">
              <Text className="w-36 font-medium text-slate-700">Insult</Text>
              <Text
                className={`font-medium ${boolToYesNo(report.ai_flag?.insult).color}`}
              >
                {boolToYesNo(report.ai_flag?.insult).label}
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="w-36 font-medium text-slate-700">Threat</Text>
              <Text
                className={`font-medium ${boolToYesNo(report.ai_flag?.threat).color}`}
              >
                {boolToYesNo(report.ai_flag?.threat).label}
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="w-36 font-medium text-slate-700">Profanity</Text>
              <Text
                className={`font-medium ${boolToYesNo(report.ai_flag?.profanity).color}`}
              >
                {boolToYesNo(report.ai_flag?.profanity).label}
              </Text>
            </View>

            {/* Categories */}
            <View>
              <Text className="w-36 font-medium text-slate-700">
                Categories
              </Text>
              <View className="mt-2 flex-row flex-wrap ps-3">
                {categories && categories.length > 0 ? (
                  categories.map((c, idx) => (
                    <View
                      key={idx}
                      className="flex-row items-center bg-slate-100 rounded-full px-3 py-1 mr-2 mb-2"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <Feather name="tag" size={14} color="#475569" />
                      <Text className="text-sm text-slate-700 ml-2">{c}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-sm text-slate-500">
                    No categories detected
                  </Text>
                )}
              </View>
            </View>

            {/* Sentiment & Urgency */}
            <View className="flex-row items-start">
              <Text className="w-36 font-medium text-slate-700">Sentiment</Text>
              <Text className="text-slate-700">
                {report.ai_flag?.sentiment ?? 'Unknown'}
              </Text>
            </View>

            <View className="flex-row items-start">
              <Text className="w-36 font-medium text-slate-700">Urgency</Text>
              <Text className="text-rose-600 font-semibold">
                {report.ai_flag?.urgency ?? 'Normal'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action & text sections */}
        <View className="space-y-3">
          <View className="flex-row items-start">
            <Text className="w-36 font-medium text-slate-700">
              Action Taken
            </Text>
            <Text className="text-slate-700">
              {report.actionTaken ?? 'None'}
            </Text>
          </View>

          <View>
            <Text className="font-semibold text-slate-800">Summary</Text>

            <Text className="text-slate-600 mt-1 text-justify">
              {' '}
              {report.ai_flag?.reason ?? '-'}
            </Text>
          </View>

          <View>
            <Text className="font-semibold text-slate-800">Notes</Text>
            <Text className="text-slate-600 mt-1">{report.notes ?? '-'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
