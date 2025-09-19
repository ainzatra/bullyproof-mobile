import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

const InputBar = ({
  onSend,
  disabled = false,
  placeholder = 'Type a message',
}: Props) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View className="flex-row items-center px-3 py-2 border-t border-slate-200 bg-white">
      <TextInput
        className="flex-1 px-4 py-2 rounded-full bg-slate-100 text-slate-900"
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        editable={!disabled}
        returnKeyType="send"
        onSubmitEditing={handleSend}
        multiline
      />
      <TouchableOpacity
        onPress={handleSend}
        disabled={disabled || text.trim().length === 0}
        className={`ml-2 p-2 rounded-full ${text.trim() ? 'bg-primary-main' : 'bg-slate-300'}`}
      >
        <MaterialCommunityIcons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default InputBar;
