import React from 'react';
import { Text, View } from 'react-native';

/**
 * StepProgress
 * - Replaces simple dots with a horizontal step indicator:
 *   • colored circles connected by lines
 *   • labels underneath each step
 * - Props:
 *   - total: number of steps
 *   - active: zero-based active step index
 *   - labels?: optional array of labels for each step
 */
export default function StepProgress({
  total,
  active,
  labels = [],
}: {
  total: number;
  active: number;
  labels?: string[];
}) {
  const baseCircleSize = 10;

  return (
    <View className="px-4 mb-2">
      <View className="flex-row items-center">
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            <View className="items-center">
              <View
                style={{
                  width: baseCircleSize,
                  height: baseCircleSize,
                  borderRadius: baseCircleSize / 2,
                }}
                className={`${i <= active ? (i === active ? 'bg-[#c86d55]' : 'bg-[#063b82]') : 'bg-slate-300'}`}
              />
            </View>

            {i < total - 1 && (
              <View
                key={`line-${i}`}
                className="flex-1 h-[2px] mx-3"
                style={{
                  backgroundColor: i < active ? '#063b82' : '#e2e8f0',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <View className="flex-row mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} className="flex-1 items-center">
            <Text
              className={`${i === active ? 'text-[#c85e48] font-semibold' : 'text-slate-600 text-xs'}`}
            >
              {labels[i] ?? `Step ${i + 1}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
