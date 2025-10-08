import api from '@/api/api';
import {
  registerForPushNotifications,
  setupNotificationHandler,
} from '@/services/SimpleNotificationHandler';
import { useUser } from '@/stores/useUserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function useSimpleNotifications() {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const user = useUser();

  useEffect(() => {
    initializeNotifications();
  }, []);

  useEffect(() => {
    if (user && user.token && pushToken) {
      registerTokenWithBackend();
    }
  }, [user, pushToken]);

  const initializeNotifications = async () => {
    try {
      // Setup notification handler
      setupNotificationHandler();

      // Check for existing token
      const storedToken = await AsyncStorage.getItem('pushToken');
      if (storedToken) {
        setPushToken(storedToken);
        setIsRegistered(true);
      } else {
        // Register for new token
        const token = await registerForPushNotifications();
        if (token) {
          setPushToken(token);
          setIsRegistered(true);
          await AsyncStorage.setItem('pushToken', token);
        }
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };
  const registerTokenWithBackend = async () => {
    if (!user || !user.token || !pushToken) {
      return;
    }

    try {
      const deviceId = Device.osBuildId || 'unknown-device';

      await api.notifications.registerToken(
        pushToken,
        user.id,
        deviceId,
        Platform.OS,
        user.token,
      );

      console.log('Push token registered with backend successfully');
    } catch (error) {
      console.error('Error registering token with backend:', error);
    }
  };

  const unregisterToken = async () => {
    if (!pushToken || !user?.token) {
      return;
    }

    try {
      await api.notifications.unregisterToken(pushToken, user.token);
      console.log('Push token unregistered successfully');

      // Clear local storage
      await AsyncStorage.removeItem('pushToken');
      setPushToken(null);
      setIsRegistered(false);
    } catch (error) {
      console.error('Error unregistering token:', error);
    }
  };

  const getRegistrationStatus = () => ({
    isRegistered,
    pushToken,
    hasUser: !!user,
  });

  return {
    isRegistered,
    pushToken,
    getRegistrationStatus,
    unregisterToken,
  };
}
