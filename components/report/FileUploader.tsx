import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type UploadItem = {
  uri: string;
  name?: string;
  size?: number;
};

type Props = {
  value?: UploadItem[];
  onChange?: (items: UploadItem[]) => void;
  maxFiles?: number;
  placeholder?: string;
};

/**
 * FileUploader
 * - Lightweight image uploader UI for screenshots.
 * - Tries to dynamically import expo-image-picker if available; if not, falls back to a stub callback (no crash).
 * - Shows thumbnails, progress state and allows removing items.
 * - Keeps styling via tailwind classes (nativewind).
 */
export default function FileUploader({
  value = [],
  onChange,
  maxFiles = 5,
  placeholder = 'Upload screenshot(s)',
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleRemove = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange?.(next);
  };

  const handleAdd = async () => {
    if (value.length >= maxFiles) return;
    setLoading(true);
    try {
      // Try to dynamically import expo-image-picker (works in expo-managed apps)
      // cast to any to avoid missing type declarations in some setups
      // @ts-ignore
      const ImagePicker: any = await import('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
      } as any);

      if (!result) {
        return;
      }

      // Handle both old (cancelled/uri) and new (canceled/assets) results
      if ('canceled' in result) {
        // new API: result.canceled (boolean) and result.assets (array)
        if (
          !result.canceled &&
          Array.isArray(result.assets) &&
          result.assets.length > 0
        ) {
          const uri = result.assets[0].uri;
          const item = { uri, name: uri.split('/').pop() };
          onChange?.([...(value ?? []), item]);
        }
      } else if ('cancelled' in result) {
        // older API: result.cancelled (boolean) and result.uri
        // @ts-ignore
        if (!result.cancelled && (result as any).uri) {
          // @ts-ignore
          const uri = (result as any).uri;
          const item = { uri, name: uri.split('/').pop() };
          onChange?.([...(value ?? []), item]);
        }
      }
    } catch (err) {
      // If expo-image-picker isn't available, gracefully fallback by notifying via console.
      console.warn(
        'expo-image-picker not available. Provide a custom onAdd handler or install expo-image-picker.',
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="space-y-2">
      <Text className="text-sm text-slate-600">{placeholder}</Text>

      <View className="w-full bg-slate-50 rounded-lg p-3">
        <View className="flex-row flex-wrap">
          {value.map((item, i) => (
            <View
              key={i}
              className="w-24 h-24 mr-3 mb-3 rounded overflow-hidden bg-white items-center justify-center"
            >
              <Image
                source={{ uri: item.uri }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => handleRemove(i)}
                className="absolute top-1 right-1 bg-black/40 rounded-full p-1"
              >
                <AntDesign name="close" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}

          {value.length < maxFiles && (
            <TouchableOpacity
              onPress={handleAdd}
              activeOpacity={0.8}
              className="w-24 h-24 mr-3 mb-3 rounded border border-dashed border-slate-300 items-center justify-center bg-white"
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View className="items-center">
                  <AntDesign name="cloudupload" size={22} color="#9ca3af" />
                  <Text className="text-xs text-slate-500 mt-1">Add</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
