import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as ExpoFileSystem from 'expo-file-system';

type UploadItem = {
  uri?: string;
  encodedFile: string;
  name?: string;
  size?: number;
  mimeType?: string;
};

type Props = {
  value?: UploadItem[];
  onChange?: (items: UploadItem[]) => void;
  maxFiles?: number;
  placeholder?: string;
};

export default function FileUploaderV2({
  value = [],
  onChange,
  maxFiles = 5,
  placeholder = 'Upload files',
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleRemove = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange?.(next);
  };

  const handleAdd = async () => {
    console.log(
      'FileUploaderV2: handleAdd start, current value length=',
      value.length,
    );
    if (value.length >= maxFiles) {
      console.log('FileUploaderV2: maxFiles reached, aborting');
      return;
    }
    setLoading(true);
    try {
      // Dynamically import expo-document-picker so component degrades gracefully if not installed
      // @ts-ignore
      console.log('FileUploaderV2: imported expo-document-picker');

      // Some versions support multiple selection via `getDocumentAsync({ multiple: true })`
      console.log('FileUploaderV2: launching DocumentPicker.getDocumentAsync');
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true,
      });

      console.log(
        'FileUploaderV2: picker result=',
        JSON.stringify(result, null, 2),
      );

      if (!result) {
        console.log('FileUploaderV2: no result from picker');
        return;
      }

      let picked: any[] = [];

      if (Array.isArray(result)) {
        picked = result;
      } else if (Array.isArray(result.output)) {
        picked = result.output;
      } else if (Array.isArray((result as any).results)) {
        picked = (result as any).results;
      } else if (Array.isArray((result as any).assets)) {
        // e.g. { assets: [...], canceled: false }
        picked = (result as any).assets;
      } else if (result.type === 'success') {
        // single-file success shape
        picked = [result];
      } else if ('canceled' in result || 'cancelled' in result) {
        const canceled = (result as any).canceled ?? (result as any).cancelled;
        if (!canceled && Array.isArray((result as any).selected)) {
          picked = (result as any).selected;
        }
      }

      console.log(
        'FileUploaderV2: normalized picked array length=',
        picked.length,
        'picked=',
        picked,
      );

      if (picked.length === 0) {
        console.log('FileUploaderV2: no files picked after normalization');
        return;
      }

      const items: UploadItem[] = picked
        .map((p: any) => {
          const uri = p.uri ?? p.fileUri ?? p.fileUrl ?? p.uri;
          const name =
            p.name ?? p.filename ?? (uri ? uri.split('/').pop() : undefined);
          const size = p.size ?? p.fileSize;
          const mimeType = p.mimeType ?? p.type;
          return { uri, name, size, mimeType } as UploadItem;
        })
        .filter(Boolean);

      console.log('FileUploaderV2: normalized items=', items);

      if (items.length > 0) {
        const next = [...(value ?? []), ...items].slice(0, maxFiles);
        console.log(
          'FileUploaderV2: calling onChange with next length=',
          next.length,
        );

        const getEncoded = async (uri: string, type: string): string => {
          return (async () => {
            return await ExpoFileSystem.readAsStringAsync(uri, {
              encoding: ExpoFileSystem.EncodingType.Base64,
            }).then((str) => {
              console.log('str', str);
              return `${str}`;
            });
          })().then((str) => str);
        };

        const encodedData = await Promise.all(
          next.map(async ({ uri, ...others }) => ({
            ...others,
            uri,
            encodedFile: await getEncoded(uri || '', others.mimeType || ''),
          })),
        );

        console.log('nexting...', encodedData);
        onChange?.(encodedData);
      } else {
        console.log('FileUploaderV2: no items to add after filtering');
      }
    } catch (err) {
      console.error(
        'FileUploaderV2: expo-document-picker not available or failed',
        err,
      );
    } finally {
      setLoading(false);
      console.log('FileUploaderV2: handleAdd finished');
    }
  };

  const renderFile = (item: UploadItem, i: number) => {
    const isImage =
      item.uri &&
      (item.uri.toLowerCase().endsWith('.png') ||
        item.uri.toLowerCase().endsWith('.jpg') ||
        item.uri.toLowerCase().endsWith('.jpeg') ||
        (!!item.mimeType && item.mimeType.startsWith?.('image/')));

    if (isImage) {
      return (
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
      );
    }

    return (
      <View
        key={i}
        className="w-full mr-3 mb-3 rounded bg-white p-2 flex-row items-center justify-between"
        style={{ minHeight: 48 }}
      >
        <View className="flex-row items-center flex-1">
          <AntDesign name="file1" size={20} color="#9ca3af" />
          <View className="ml-2 flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-sm text-slate-700"
            >
              {item.name ?? 'file'}
            </Text>
            {item.size ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-xs text-slate-400"
              >
                {Math.round(item.size / 1024)} KB
              </Text>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleRemove(i)}
          className="bg-black/40 rounded-full p-1"
        >
          <AntDesign name="close" size={12} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="space-y-2">
      <Text className="text-sm text-slate-600">{placeholder}</Text>

      <View className="w-full bg-slate-50 rounded-lg p-3">
        <View className="flex-col">
          <View className="flex-row flex-wrap mb-2">
            {value.map((item, i) => renderFile(item as UploadItem, i))}
          </View>

          <View className="flex-row items-center">
            {value.length < maxFiles ? (
              <TouchableOpacity
                onPress={handleAdd}
                activeOpacity={0.8}
                className="px-4 py-3 rounded border border-dashed border-slate-300 items-center justify-center bg-white"
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <View className="items-center flex-row">
                    <AntDesign name="cloudupload" size={18} color="#9ca3af" />
                    <Text className="text-xs text-slate-500 ml-2">
                      Add files
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <Text className="text-xs text-slate-400">
                Maximum of {maxFiles} files added
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
