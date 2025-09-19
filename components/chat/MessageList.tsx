import { ChatMessage } from '@/app/hooks/useSocket';
import React, { useEffect, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';
import MessageItem from './MessageItem';

type Props = {
  messages: ChatMessage[];
  userId?: string;
  bottomInset?: number;
};

const MessageList = ({ messages, userId, bottomInset = 0 }: Props) => {
  const flatRef = useRef<FlatList>(null);

  const rendered = useMemo(
    () =>
      messages.map((m) => ({
        key: m.id ?? `${m.senderId ?? 'anon'}-${m.createdAt ?? Math.random()}`,
        ...m,
      })),
    [messages],
  );

  useEffect(() => {
    // scroll to bottom on new message (ensure mounted + layout)
    // a small timeout ensures FlatList has measured content on some platforms
    const t = setTimeout(() => {
      flatRef.current?.scrollToEnd({ animated: true });
    }, 50);
    return () => clearTimeout(t);
  }, [rendered.length]);

  return (
    <FlatList
      ref={flatRef}
      data={rendered}
      renderItem={({ item }) => (
        <MessageItem message={item} isOwn={item.senderId === userId} />
      )}
      inverted={false}
      keyboardShouldPersistTaps="handled"
      className="h-3/4"
      // ensure the list has room for the input bar / safe area
      // contentContainerStyle={{ paddingBottom: bottomInset }}
      // also scroll to bottom whenever the content size changes (covers initial render)
      onContentSizeChange={() => flatRef.current?.scrollToEnd()}
    />
  );
};

export default MessageList;
