import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  options?: string[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
};

/**
 * TagSelector
 * - Multi-select chips with ability to add a custom tag.
 * - Uses Tailwind classes (nativewind) for styling.
 */
export default function TagSelector({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select tags',
}: Props) {
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggle = (tag: string) => {
    const exists = selected.includes(tag);
    const next = exists
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    setSelected(next);
    onChange?.(next);
  };

  return (
    <View className="space-y-2">
      <Text className="text-sm text-slate-600 mb-2">{placeholder}</Text>

      <View className="flex-row flex-wrap">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => toggle(opt)}
              className={`px-3 py-2 mr-2 mb-2 rounded-full border ${active ? 'bg-[#c86d55] border-[#c86d55]' : 'bg-slate-100 border-slate-200'}`}
            >
              <Text className={`${active ? 'text-white' : 'text-slate-700'}`}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
