import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  status?: string;
  className?: string;
};

/**
 * ReportStatusBadge
 * - Small reusable badge that maps status -> color.
 * - Uses nativewind (tailwind) classes.
 */
export default function ReportStatusBadge({
  status = 'Pending',
  className = '',
}: Props) {
  const statusLabel = status === 'InProgress' ? 'In Progress' : status;

  let bg = 'bg-amber-100';
  let text = 'text-amber-700';

  if (status === 'Resolved') {
    bg = 'bg-emerald-100';
    text = 'text-emerald-700';
  } else if (status === 'InProgress') {
    bg = 'bg-sky-100';
    text = 'text-sky-700';
  }

  return (
    <View className={`px-4 py-1 rounded-full ${bg} ${className}`}>
      <Text className={`text-xs font-semibold ${text}`}>{statusLabel}</Text>
    </View>
  );
}
