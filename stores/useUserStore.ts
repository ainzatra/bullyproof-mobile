import { notifications } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  isVerified?: boolean;
  avatar?: string;
  blocked?: boolean;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user: User) => set({ user }),

      logout: async () => {
        const currentUser = useUserStore.getState().user;

        // Unregister push token before logging out
        if (currentUser?.token) {
          try {
            const pushToken = await AsyncStorage.getItem('pushToken');
            if (pushToken) {
              await notifications.unregisterToken(pushToken, currentUser.token);
              await AsyncStorage.removeItem('pushToken');
            }
          } catch (error) {
            console.error(
              'Error unregistering push token during logout:',
              error,
            );
          }
        }

        set({ user: null });
        router.replace('/');
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useUser = () => useUserStore((s) => s.user);
export const useSetUser = () => useUserStore((s) => s.setUser);
export const useLogoutUser = () => useUserStore((s) => s.logout);

export default useUserStore;
