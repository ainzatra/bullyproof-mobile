import React, { useEffect, useRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  autoFocus?: boolean;
};

/**
 * OTPInput
 * - Renders `length` single-character inputs for numeric OTP entry.
 * - Advances focus automatically, supports backspace navigation and paste.
 * - Calls `onChange` with the full code (may contain empty strings for unfilled positions).
 * - Calls `onComplete` when the code reaches the expected length.
 */
const OTPInput = ({ value, onChange, length = 6, autoFocus = true }: Props) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // keep refs array within length
    inputs.current = inputs.current.slice(0, length);
  }, [length]);

  const focusInput = (idx: number) => {
    const el = inputs.current[idx];
    if (el) el.focus();
  };

  const handleChange = (text: string, idx: number) => {
    // initialize array from current value
    const chars = (value || '')
      .split('')
      .concat(Array(length).fill(''))
      .slice(0, length);

    // pasted string handling
    if (text.length > 1) {
      const paste = text.split('').slice(0, length - idx);
      for (let i = 0; i < paste.length; i++) {
        chars[idx + i] = paste[i];
      }
      const newVal = chars.join('').slice(0, length);
      onChange(newVal);
      //   if (newVal.length >= length) onComplete?.(newVal);
      return;
    }

    // single char
    chars[idx] = text;
    const newVal = chars.join('').slice(0, length);
    onChange(newVal);

    if (text && idx < length - 1) {
      focusInput(idx + 1);
    }
    // if (newVal.length >= length) onComplete?.(newVal);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const chars = (value || '')
        .split('')
        .concat(Array(length).fill(''))
        .slice(0, length);
      if (chars[idx]) {
        // clear current
        chars[idx] = '';
        onChange(chars.join(''));
        return;
      }
      // move to previous if empty
      if (idx > 0) {
        focusInput(idx - 1);
        const prev = (value || '')
          .split('')
          .concat(Array(length).fill(''))
          .slice(0, length);
        prev[idx - 1] = '';
        onChange(prev.join(''));
      }
    }
  };

  const renderInputs = () => {
    const items = [];
    for (let i = 0; i < length; i++) {
      items.push(
        <TextInput
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={(value || '')[i] ?? ''}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
          textContentType="oneTimeCode"
          className="w-12 h-20  mx-1 bg-gray-200 rounded text-center text-4xl"
          autoFocus={autoFocus && i === 0}
        />,
      );
    }
    return items;
  };

  return <View className="flex-row justify-center">{renderInputs()}</View>;
};

export default OTPInput;
