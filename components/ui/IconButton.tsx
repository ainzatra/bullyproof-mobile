import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
  activeOpacity?: number;
};

export default function IconButton({
  onPress,
  children,
  className = '',
  activeOpacity = 0.8,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={className}
    >
      {children}
    </TouchableOpacity>
  );
}
