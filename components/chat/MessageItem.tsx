import { ChatMessage } from '@/app/hooks/useSocket';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  message: ChatMessage;
  isOwn?: boolean;
};

const MessageItem = ({ message, isOwn = false }: Props) => {
  const containerAlign = isOwn ? 'items-end' : 'items-start';
  const bubbleBg = isOwn ? 'bg-primary-main' : 'bg-slate-100';
  const textColor = isOwn ? 'text-white' : 'text-slate-800';
  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View className={`w-full px-4 my-2 ${containerAlign}`}>
      <View className={`max-w-[80%] px-4 py-2 rounded-2xl ${bubbleBg}`}>
        {message.senderName && !isOwn ? (
          <Text className="text-xs text-slate-500 mb-1">
            {message.senderType === 'ai'
              ? 'AI-Generated Response'
              : capitalize(message.senderType)}
          </Text>
        ) : null}
        <Text className={`${textColor} text-base`}>{message.content}</Text>
        {message.createdAt ? (
          <Text
            className={`text-[10px] text-slate-400 mt-1 ${isOwn ? 'text-white/70' : ''}`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default MessageItem;
