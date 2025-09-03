import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type ReportSummary = {
  id: string;
  title: string;
  date?: string;
  status?: 'reported' | 'in_progress' | 'resolved';
  excerpt?: string;
};

type Props = {
  reports?: ReportSummary[];
  onSelect?: (r: ReportSummary) => void;
};

/**
 * ReportList
 * - Simple list used in the Track tab.
 * - Each item shows a short excerpt and status badge.
 */
export default function ReportList({ reports = [], onSelect }: Props) {
  const renderItem = ({ item }: { item: ReportSummary }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect?.(item)}
        className="bg-white rounded-lg p-3 mb-3 border border-slate-200"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="font-semibold text-slate-800">{item.title}</Text>
            <Text className="text-xs text-slate-500 mt-1">{item.excerpt}</Text>
          </View>

          <View className="ml-3 items-end">
            <Text
              className={`text-xs px-2 py-1 rounded ${item.status === 'reported' ? 'bg-emerald-100 text-emerald-700' : item.status === 'resolved' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}
            >
              {item.status}
            </Text>
            <Text className="text-xs text-slate-400 mt-2">{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={reports}
      keyExtractor={(r) => r.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      ListEmptyComponent={
        <Text className="text-center text-slate-500 mt-8">No reports yet</Text>
      }
    />
  );
}
