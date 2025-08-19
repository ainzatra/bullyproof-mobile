import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const NextButton = ({ onPress, isLast }: { onPress: () => void; isLast: boolean }) => {
  return (
    <TouchableOpacity onPress={onPress} className="w-11 h-11 rounded-full bg-white items-center justify-center">
        {isLast ? 
        <FontAwesome5 name="check" size={24} color="black" /> :
        <AntDesign name="arrowright" size={24} color="black" />
        }
    </TouchableOpacity>
  )
}

export default NextButton