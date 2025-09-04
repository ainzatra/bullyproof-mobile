import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ReportStatus } from './types';

type ReportSummary = {
  id: string;
  title: string;
  date?: string;
  status?: ReportStatus;
  details: string;
  createdAt: string;
};

type Props = {
  reports?: ReportSummary[];
  onSelect?: (r: ReportSummary) => void;
};

export default function ReportList({ reports = [], onSelect }: Props) {
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const formattedTime = date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .replace(' ', ''); // remove extra space before AM/PM

    return `${formattedDate} ${formattedTime}`;
  };

  const renderItem = ({ item }: { item: ReportSummary }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect?.(item)}
        className="bg-white rounded-lg p-3 mb-3 border border-slate-200"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="font-semibold text-slate-800">
              Report ID: {item.id}
            </Text>

            <Text className="text-xs text-slate-500 mt-1 text-justify">
              Details:
            </Text>
            <Text
              className="text-xs text-slate-500 mt-1 text-justify ps-4"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.details}
            </Text>
          </View>

          <View className="ml-3 items-end">
            <Text
              className={`text-xs px-2 py-1 rounded ${item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : item.status === 'InProgress' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}
            >
              {item.status}
            </Text>
            <Text className="text-xs text-slate-400 mt-2">{item.date}</Text>
          </View>
        </View>
        <Text className="mt-1 text-xs text-slate-500 text-right ">
          {formatDate(item.createdAt)}
        </Text>
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
