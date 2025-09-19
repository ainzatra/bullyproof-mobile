import { useFetchRecentMessages } from '@/api/queries';
import useSocket from '@/app/hooks/useSocket';
import InputBar from '@/components/chat/InputBar';
import MessageList from '@/components/chat/MessageList';
import Header from '@/components/Header';
import { useUser } from '@/stores/useUserStore';
import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

/**
 * Seek Help chat screen
 *
 * - Uses [`app/hooks/useSocket.ts`](@/app/hooks/useSocket.ts:1) for realtime messaging
 * - Small, focused components:
 *   - [`components/chat/MessageItem.tsx`](components/chat/MessageItem.tsx:1)
 *   - [`components/chat/MessageList.tsx`](components/chat/MessageList.tsx:1)
 *   - [`components/chat/InputBar.tsx`](components/chat/InputBar.tsx:1)
 *
 * Tailwind classes are used throughout for styling.
 */
const SeekHelp = () => {
  const user = useUser();
  const { messages: socketMessages, connected, sendMessage } = useSocket();
  const { data: recentMessages } = useFetchRecentMessages(
    user?.token ?? '',
    user?.id ?? '',
  );
  const insets = useSafeAreaInsets();

  const messages = useMemo(() => {
    const out: any[] = [];
    const seen = new Set<string>();
    const push = (m: any) => {
      const key =
        m?.id ?? `${m?.senderId ?? 'anon'}-${m?.createdAt ?? Math.random()}`;
      if (seen.has(key)) return;
      seen.add(key);
      out.push(m);
    };

    if (Array.isArray(recentMessages)) recentMessages.forEach(push);
    if (Array.isArray(socketMessages)) socketMessages.forEach(push);

    // Sort chronologically by createdAt if present
    out.sort((a, b) => {
      const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return ta - tb;
    });

    return out;
  }, [recentMessages, socketMessages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      <View className="flex-1">
        <View className="px-4 py-3 border-b border-slate-100 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-semibold text-primary-main">
              Seek Help
            </Text>
          </View>
          <View className="px-3 py-1 rounded-lg bg-slate-100">
            <Text
              className={`text-sm ${connected ? 'text-emerald-600' : 'text-slate-400'}`}
            >
              {connected ? 'Connected' : 'Offline'}
            </Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={insets.bottom}
        >
          <View className=" bg-white">
            <MessageList
              messages={messages}
              userId={user?.id}
              bottomInset={insets.bottom + 64}
            />
          </View>

          <View className="bg-red-500">
            <InputBar
              onSend={sendMessage}
              disabled={!connected}
              placeholder="Write a message to guidance..."
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SeekHelp;
