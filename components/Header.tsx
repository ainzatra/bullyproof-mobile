import { images } from '@/constants/images';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import MenuSheet from './MenuSheet';
import IconButton from './ui/IconButton';

type Props = {
  notificationCount?: number;
};

/**
 * Header component
 * - Left: menu button (opens bottom sheet)
 * - Center-left: notification button with badge
 * - Right: app logo
 */
export default function Header({ notificationCount = 0 }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <IconButton className="p-2" onPress={() => setOpen(true)}>
            <Feather name="menu" size={22} color="#0f172a" />
          </IconButton>

          {/* <View className="ml-2 relative">
            <IconButton className="p-2">
              <Feather name="bell" size={22} color="#0f172a" />
              <Badge count={notificationCount} />
            </IconButton>
          </View> */}
        </View>

        <Image
          source={images.logov2}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>

      <MenuSheet visible={open} onClose={() => setOpen(false)} />
    </>
  );
}
