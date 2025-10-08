import {
  addNotificationResponseListener,
  getNotificationSettings,
  getStoredPushToken,
  registerForPushNotifications,
  storePushToken,
} from '@/services/NotificationService';
import { useUser } from '@/stores/useUserStore';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import { useEffect, useState } from 'react';

export type NotificationSettings = {
  granted: boolean;
  canAskAgain: boolean;
};

export function useNotifications() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      granted: false,
      canAskAgain: true,
    });
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationListener, setNotificationListener] =
    useState<Subscription | null>(null);
  const [responseListener, setResponseListener] = useState<Subscription | null>(
    null,
  );

  const user = useUser();

  // Initialize notifications
  useEffect(() => {
    initializeNotifications();

    return () => {
      cleanup();
    };
  }, []);

  // Register push token when user logs in
  useEffect(() => {
    if (user && user.token) {
      registerTokenWithBackend();
    }
  }, [user, pushToken]);

  const initializeNotifications = async () => {
    try {
      setIsLoading(true);

      // Get notification settings
      const settings = await getNotificationSettings();
      setNotificationSettings(settings);

      // Get stored push token
      const storedToken = await getStoredPushToken();
      setPushToken(storedToken);

      // Register for push notifications if permissions are granted
      if (settings.granted) {
        const token = await registerForPushNotifications();
        if (token) {
          setPushToken(token);
        }
      }

      // Set up notification listeners
      setupNotificationListeners();
    } catch (error) {
      console.error('Error initializing notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupNotificationListeners = () => {
    // Listen for notifications received in foreground
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received in foreground:', notification);
        // You can handle in-app notifications here
      },
    );

    // Listen for notification responses (user taps notification)
    const responseListener = addNotificationResponseListener();

    setNotificationListener(notificationListener);
    setResponseListener(responseListener);
  };

  const cleanup = () => {
    if (notificationListener) {
      notificationListener.remove();
    }
    if (responseListener) {
      responseListener.remove();
    }
  };

  const requestPermissions = async () => {
    try {
      const token = await registerForPushNotifications();
      if (token) {
        setPushToken(token);
        const settings = await getNotificationSettings();
        setNotificationSettings(settings);
        return { success: true, token };
      }
      return { success: false, error: 'Failed to get push token' };
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return { success: false, error };
    }
  };

  const registerTokenWithBackend = async () => {
    if (!user || !user.token || !pushToken) {
      return;
    }

    try {
      // This will be implemented when backend is ready
      // For now, we'll just log the token
      console.log('Registering push token with backend:', {
        userId: user.id,
        token: pushToken,
      });

      // TODO: Implement backend API call
      // await api.notifications.registerToken({
      //   token: pushToken,
      //   userId: user.id,
      //   deviceId: await Device.getDeviceIdAsync(),
      //   platform: Platform.OS
      // });
    } catch (error) {
      console.error('Error registering token with backend:', error);
    }
  };

  const unregisterToken = async () => {
    if (!pushToken) return;

    try {
      // TODO: Implement backend API call to unregister token
      console.log('Unregistering push token:', pushToken);

      // Remove from local storage
      await storePushToken('');
      setPushToken(null);
    } catch (error) {
      console.error('Error unregistering token:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification',
          body: 'This is a test notification from BullyProof',
          data: { type: 'test' },
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  return {
    notificationSettings,
    pushToken,
    isLoading,
    requestPermissions,
    unregisterToken,
    sendTestNotification,
    isRegistered: !!pushToken && notificationSettings.granted,
  };
}
